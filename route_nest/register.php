<?php
    require_once 'db.php';

    $data = json_decode(file_get_contents('php://input'), true);

    $username = trim($data['username'] ?? '');
    $email    = trim($data['email']    ?? '');
    $password = $data['password'] ?? '';

    //controlliamo se i campi sono vuoti
    if (!$username || !$email || !$password) 
    {
        $response = [];
        $response['ok'] = false;
        $response['msg'] = 'Missing fields';    
        echo json_encode($response);
        exit();
    }

    // Controlliamo se il formato email è valido
    if (!filter_var($email, FILTER_VALIDATE_EMAIL)) 
    {
        $response = [];
        $response['ok'] = false;
        $response['msg'] = 'Invalid Email';    
        echo json_encode($response);
        exit();
    }

    // Controlliamo la lunghezza minima della password (8 caratteri)
    if (strlen($password) < 8) 
    {
        $response = [];
        $response['ok'] = false;
        $response['msg'] = 'Password must be at least 8 characters long';    
        echo json_encode($response);
        exit();
    }

    //controlliamo se l'email è già registrata
    $checkStmt = 'SELECT id FROM users WHERE email = ?';
    $ctrlStmt = mysqli_prepare($connection, $checkStmt); //prepara la query
    mysqli_stmt_bind_param($ctrlStmt, 's', $email); //sostituisce il ? con il valore di $email (la 's' indica che è una stringa)
    mysqli_stmt_execute($ctrlStmt); //esegue la query
    mysqli_stmt_store_result($ctrlStmt); //recupera i risultati

    if (mysqli_stmt_num_rows($ctrlStmt) > 0) // conta le righe trovate: se è maggiore di 0 l'email esiste già
    {
        $response = [];
        $response['ok'] = false;
        $response['msg'] = 'This email is already registered';    
        echo json_encode($response);
        exit();
    }
    mysqli_stmt_close($ctrlStmt); 

    //controlliamo se il nome utente è già utilizzato
    $checkStmt = 'SELECT id FROM users WHERE username = ?';
    $ctrlStmt = mysqli_prepare($connection, $checkStmt); //prepara la query
    mysqli_stmt_bind_param($ctrlStmt, 's', $username); //sostituisce il ? con il valore di $username (la 's' indica che è una stringa)
    mysqli_stmt_execute($ctrlStmt); //esegue la query
    mysqli_stmt_store_result($ctrlStmt); //recupera i risultati

    if (mysqli_stmt_num_rows($ctrlStmt) > 0) // conta le righe trovate: se è maggiore di 0 l'username esiste già
    {
        $response = [];
        $response['ok'] = false;
        $response['msg'] = 'This user is already registered';    
        echo json_encode($response);
        exit();
    }
    mysqli_stmt_close($ctrlStmt); 

    //salviamo la password con hash (non in chiaro)
    //PASSWORD_DEFAULT è una costante che dice a PHP: Usa l'algoritmo di hashing più sicuro e aggiornato disponibile in questa versione.
    $hashedPassword = password_hash($password, PASSWORD_DEFAULT);

    //inserimento sicuro dei dati
    $stmt = 'INSERT INTO users (username, email, password) VALUES (?, ?, ?)';
    $regStmt = mysqli_prepare($connection, $stmt);
    mysqli_stmt_bind_param($regStmt, 'sss', $username, $email, $hashedPassword);            
    if (mysqli_stmt_execute($regStmt))
    {
        $response = [];
        $response['ok'] = true;
        $response['msg'] = 'Account created successfully';    
        echo json_encode($response);        
    }
    else
    {
        $response = [];
        $response['ok'] = false;
        $response['msg'] = 'Error, please try again';    
        echo json_encode($response);        
    }

    mysqli_stmt_close($regStmt);
    mysqli_close($connection);