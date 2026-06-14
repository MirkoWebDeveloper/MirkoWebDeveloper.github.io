<?php 
    session_start();

    require_once 'db.php';

    //Prende l'id del profilo dall'URL (?id=3) Se non c'è, usa l'id dell'utente loggato
    if (isset($_GET['id'])) 
    {
        $profile_id = intval($_GET['id']);
    }
    elseif (isset($_SESSION['user_id'])) 
    {
        $profile_id = $_SESSION['user_id'];
    }
    else 
    {
        //Se non c'è nessun id e nessuno è loggato, rimanda alla home
        header('Location: index.php');
        exit;
    }

    //Recupera i dati dell'utente dal DB
    $stmt = mysqli_prepare($connection, "SELECT id, username, email, profile_image, bio, created_at FROM users WHERE id = ?");
    mysqli_stmt_bind_param($stmt, "i", $profile_id);
    mysqli_stmt_execute($stmt);
    $result = mysqli_stmt_get_result($stmt);
    $user = mysqli_fetch_assoc($result);

    //Se l'utente non esiste nel DB, blocca tutto
    if (!$user) 
    {
        echo "Utente non trovato.";
        exit;
    }

    //Controlla se chi sta guardando il profilo è il proprietario confrontando l'id della sessione con l'id del profilo che si sta visitando
    if (isset($_SESSION['user_id']) && $_SESSION['user_id'] == $profile_id) 
    {
        $is_owner = true;
    } 
    else 
    {
        $is_owner = false;
    }

    //Controlla se l'utente loggato segue già questo profilo
    $is_following = false;
    if ($is_owner == false && isset($_SESSION['user_id'])) 
    {
        $f = mysqli_prepare($connection, "SELECT id FROM follows WHERE follower_id = ? AND following_id = ?");
        mysqli_stmt_bind_param($f, "ii", $_SESSION['user_id'], $profile_id);
        mysqli_stmt_execute($f);
        $result_follow = mysqli_stmt_get_result($f);
        // Se trova almeno una riga, l'utente segue già il profilo
        if (mysqli_num_rows($result_follow) > 0) 
        {
            $is_following = true;
        }
    }

    // Conta i followers (quante persone seguono questo profilo)
    $stmt_followers = mysqli_prepare($connection, "SELECT COUNT(*) AS totale FROM follows WHERE following_id = ?");
    mysqli_stmt_bind_param($stmt_followers, "i", $profile_id);
    mysqli_stmt_execute($stmt_followers);
    $result_followers = mysqli_stmt_get_result($stmt_followers);
    $row_followers = mysqli_fetch_assoc($result_followers);
    $total_followers = $row_followers['totale'];

    // Conta i like totali ricevuti sui trip di questo utente
    $stmt_likes = mysqli_prepare($connection, "SELECT COUNT(*) AS totale FROM likes WHERE trip_id IN (SELECT id FROM trips WHERE user_id = ?)");
    mysqli_stmt_bind_param($stmt_likes, "i", $profile_id);
    mysqli_stmt_execute($stmt_likes);
    $result_likes = mysqli_stmt_get_result($stmt_likes);
    $row_likes = mysqli_fetch_assoc($result_likes);
    $total_likes = $row_likes['totale'];
?>

<!DOCTYPE html>
<html>
    <head>
        <meta charset="UTF-8">
        <title>RouteNest - <?php echo htmlspecialchars($user['username']); ?></title>
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
            <section class="hero-profile">
                <!-- Immagine profilo -->
                <img 
                    src="/immagini_profilo/<?php echo htmlspecialchars($user['profile_image']); ?>" 
                    alt="Foto profilo" class="profile-img">

                <!-- Username -->
                <h2 class="profile-username"><?php echo htmlspecialchars($user['username']); ?></h2>

                <!-- Data registrazione -->
                <p class="profile-date">
                    Member since: <?php echo date('d/m/Y', strtotime($user['created_at'])); ?>
                </p>
                
                <!--followers totali-->
                <strong><?php echo $total_followers; ?></strong>
                <span>Followers</span>

                <!--like totali-->
                <strong><?php echo $total_likes; ?></strong>
                <span>Likes</span>

                <!-- Bio -->
                <p class="profile-bio">
                    <?php
                        if ($user['bio']) 
                        {
                            echo htmlspecialchars($user['bio']);
                        } 
                        else 
                        {
                            echo "<em>Write your bio.</em>";
                        }
                    ?>
                </p>

                <!-- Pulsanti -->
                <?php if ($is_owner == true): ?>
                    <!-- È il proprietario: mostra Edit -->
                    <a class="edit" href="edit_profile.php" class="edit-profile">Edit Profile</a>

                <?php elseif (isset($_SESSION['utente_id'])): ?>
                    <!-- È un altro utente loggato: mostra Follow o Unfollow -->
                    <?php if ($is_following == true): ?>
                    <a class="follow" href="unfollow.php?id=<?php echo $profile_id; ?>" class="unfollow-profile">Unfollow</a>
                    <?php else: ?>
                    <a class="unfollow" href="follow.php?id=<?php echo $profile_id; ?>" class="follow-profile">Follow</a>
                    <?php endif; ?>

                <?php else: ?>
                    <!-- Visitatore non loggato -->
                    <p><a href="#" onclick="openModal()">Login</a> to follow this user</p>
                <?php endif; ?>
                  
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