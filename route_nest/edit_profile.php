<?php
    session_start();
    require_once 'db.php';

    // Se non è loggato, rimanda alla home
    if (!isset($_SESSION['user_id'])) 
    {
        header('Location: index.php');
        exit;
    }

    $user_id = $_SESSION['user_id'];
    $error = "";
    $success = "";

    // Recupera i dati attuali dell'utente
    $stmt = mysqli_prepare($connection, "SELECT username, bio, profile_image FROM users WHERE id = ?");
    mysqli_stmt_bind_param($stmt, "i", $user_id);
    mysqli_stmt_execute($stmt);
    $result = mysqli_stmt_get_result($stmt);
    $user = mysqli_fetch_assoc($result);

    // Quando l'utente clicca Save Changes
    if ($_SERVER['REQUEST_METHOD'] == 'POST') 
    {
        $new_username = trim($_POST['username']);
        $new_bio = trim($_POST['bio']);

        // Controlla che lo username non sia già usato da qualcun altro
        $check = mysqli_prepare($connection, "SELECT id FROM users WHERE username = ? AND id != ?");
        mysqli_stmt_bind_param($check, "si", $new_username, $user_id);
        mysqli_stmt_execute($check);
        $result_check = mysqli_stmt_get_result($check);

        if (mysqli_num_rows($result_check) > 0) 
        {
            $error = "Username already in use";
        } 
        else 
        {
            // Gestione upload immagine profilo
            $name_img = $user['profile_image']; // tiene quella vecchia di default

            if (isset($_FILES['profile_image']) && $_FILES['profile_image']['error'] == 0) 
            {
                $extension = pathinfo($_FILES['profile_image']['name'], PATHINFO_EXTENSION);
                $file_extension = ['jpg', 'jpeg'];

                if (!in_array(strtolower($extension), $file_extension)) 
                {
                    $errore = "Unsupported image format. Please use JPG or JPEG";
                }
                else 
                {
                    $name_img = $user_id . '.jpg';
                    $route = 'immagini_profilo/' . $name_img;
                    move_uploaded_file($_FILES['profile_image']['tmp_name'], $route);
                }
            }

            // Salva nel DB se non ci sono errori
            if ($error == "") 
            {
                $update = mysqli_prepare($connection, "UPDATE users SET username = ?, bio = ?, profile_image = ? WHERE id = ?");
                mysqli_stmt_bind_param($update, "sssi", $new_username, $new_bio, $name_img, $user_id);
                mysqli_stmt_execute($update);

                // Aggiorna i dati in pagina dopo il salvataggio
                $user['username'] = $new_username;
                $user['bio'] = $new_bio;
                $user['profile_image'] = $name_img;

                $success = "Profile updated!";
            }
        }
    }
?>

<!DOCTYPE html>
<html>
    <head>
        <meta charset="UTF-8">
        <title>RouteNest - Edit Profile</title>
        <link rel="icon" href="immagini/icon.png" sizes="16x16" type="image/png">
        <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.8/dist/css/bootstrap.min.css" rel="stylesheet" 
            integrity="sha384-sRIl4kxILFvY47J16cr9ZwB07vP4J8+LH7qKQnuqkuIAvNWLzeN8tE5YBujZqJLB" 
            crossorigin="anonymous">
        <link rel="preconnect" href="https://fonts.googleapis.com">
        <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
        <link href="https://fonts.googleapis.com/css2?family=Inter:ital,opsz,wght@0,14..32,100..900;1,14..32,100..900&family=Poppins:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap" 
            rel="stylesheet">
        <link rel="stylesheet" href="css/reset.css">
        <link rel="stylesheet" href="css/style.css">
        <script src="js/main.js" defer></script>
    </head>

    <body>
        <header>
            <nav class="navbar navbar-expand-lg"><!--MENU DI NAVIGAZIONE + LOGO-->
                <div class="container-fluid">
                    <a href="index.php">
                        <img class="logo" src="immagini/logo.png" alt="RouteNest logo"><!--Logo cliccabile-->
                    </a>
                    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" 
                        aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span class="navbar-toggler-icon"></span>
                    </button>
                    <div class="menu-navigation collapse navbar-collapse" id="navbarSupportedContent">
                        <ul class="navbar-nav"><!--Lista menu di navigazione-->
                            <?php if (!isset($_SESSION['user_id'])): ?>                                
                            
                            <?php else: ?>                            
                            <li><a class="navi" href="index.php">Home</a></li>
                            <li><a class="navi" href="trips.php">Trips</a></li>                            
                            <li><a class="navi" href="index.php#map">Map</a></li> <!--punta alla mappa interattiva sotto-->
                            
                            <?php endif; ?>
                        </ul>   
                    </div>
                    <div class="menu-login">
                        <ul class="navbar-nav"><!--Lista login, Aggiungi viaggio-->
                            <?php if (!isset($_SESSION['user_id'])): ?><!-- Utente NON loggato: solo Login -->
                                <li><a class="login" href="#" onclick="openModal()">Login</a></li>
                            
                            <?php else: ?><!-- Utente loggato: Logout, Profilo, +Trip -->
                                <li><a class="navi profile" href="profile.php">Profile</a></li>
                                <li><a class="logout" href="logout.php">Logout</a></li>                                
                                <li><a class="new-trip" href="new_trip.php">+New Trip</a></li>

                            <?php endif; ?>                                                                   
                        </ul>  
                    </div>
                </div>
            </nav> 
        </header>

        <main>
            <section class="edit-profile">
                <div>

                    <h2 class="edit-tit">EDIT PROFILE</h2>

                    <!-- Messaggio errore -->
                    <?php if ($error != ""): ?>
                        <div class="alert alert-danger"><?php echo $error; ?></div>
                    <?php endif; ?>

                    <!-- Messaggio successo -->
                    <?php if ($success != ""): ?>
                        <div class="alert alert-success"><?php echo $success; ?></div>
                    <?php endif; ?>

                    <form action="edit_profile.php" method="POST" enctype="multipart/form-data">
                        <div>

                            <!-- COLONNA SINISTRA: foto profilo -->
                            <div>
                                <img 
                                    src="immagini_profilo/<?php echo htmlspecialchars($user['profile_image']); ?>"
                                    alt="Foto profilo"                                    
                                    id="anteprima_foto">
                                <div>
                                    <label class="upload" for="profile_image">
                                        Upload image
                                    </label>
                                    <input 
                                        type="file" 
                                        id="profile_image" 
                                        name="profile_image" 
                                        accept="image/*"
                                        style="display: none;"
                                        onchange="previewImage(this)">
                                </div>
                            </div>

                            <!-- COLONNA DESTRA: username e bio -->
                            <div>
                                <div>
                                    <label for="username" class="form-label">Username</label>
                                    <input 
                                        type="text" 
                                        class="form-control" 
                                        id="username" 
                                        name="username" 
                                        value="<?php echo htmlspecialchars($user['username']); ?>"
                                        required>
                                </div>
                                <div>
                                    <label for="bio" class="form-label">Bio</label>
                                    <textarea 
                                        class="form-control" 
                                        id="bio" 
                                        name="bio" 
                                        rows="5">
                                        <?php echo htmlspecialchars($utente['bio'] ?? ''); ?>
                                    </textarea>
                                </div>
                            </div>

                        </div>

                        <!-- Bottone Save in fondo -->
                        <div>
                            <div>
                                <button class="save" type="submit">Save Changes</button>
                            </div>
                        </div>

                    </form>

                </div>
            </section>
        </main>

        <footer>
            <h4 class="footer">RouteNest - Web Developer Casula Mirko</h3>
        </footer> 

        <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.8/dist/js/bootstrap.bundle.min.js" 
            integrity="sha384-FKyoEForCGlyvwx9Hj09JcYn3nv7wiPVlz7YYwJrWVcXK/BmnVDxM+D2scQbITxI" 
            crossorigin="anonymous">
        </script>
    </body>
</html>