<?php
    require_once 'db.php'; //Include il file con le credenziali DB

    $data = json_decode(file_get_contents('php://input'), true); // Legge il JSON che arriva dalla fetch() in JavaScript

    $email = trim($data['email']    ?? '');
    $password = $data['password'] ?? '';

    //controlliamo se i campi sono vuoti
    if (!$email || !$password) 
    {
        $response = [];
        $response['ok'] = false;
        $response['msg'] = 'Missing fields';    
        echo json_encode($response);
        exit();
    }

    //query sicura
    $stmt = 'SELECT id, username, password FROM users WHERE email = ?';
    $logStmt = mysqli_prepare($connection, $stmt); //prepara la query
    mysqli_stmt_bind_param($logStmt, 's', $email); //sostituisce il ? con il valore di $email (la 's' indica che è una stringa)
    mysqli_stmt_execute($logStmt); //esegue la query
    $result = mysqli_stmt_get_result($logStmt); //recupero i dati

    if (mysqli_num_rows($result) === 0) // Nessun utente trovato con quella email
    {
        $response = [];
        $response['ok'] = false;
        $response['msg'] = 'Invalid email or password';    
        echo json_encode($response);
        exit();
    }

    $ctrlUser = mysqli_fetch_assoc($result); //array associativo

    if (!password_verify($password, $ctrlUser['password']))  // Verifica password
    {
        $response = [];
        $response['ok'] = false;
        $response['msg'] = 'Invalid email or password';    
        echo json_encode($response);
        exit();               
    }

    // LOGIN RIUSCITO → avvia la sessione
    session_start();
    $_SESSION['user_id']  = $ctrlUser['id'];
    $_SESSION['username']   = $ctrlUser['username'];
    $response = [];
    $response['ok'] = true;
    $response['msg'] = 'Welcome, ' . $ctrlUser['username'] . '!';
    echo json_encode($response);

    mysqli_stmt_close($logStmt);
    mysqli_close($connection);
?>