<?php
    session_start();
    require_once 'db.php';

    // Solo utenti loggati
    if (!isset($_SESSION['user_id'])) 
    {
        header('Location: index.php');
        exit;
    }

    // Recupera tutti i viaggi con username e prima immagine
    $stmt = mysqli_prepare($connection, "
    SELECT trips.id, trips.title, users.id AS user_id, users.username, users.profile_image,
           (SELECT image_path FROM trip_images WHERE trip_id = trips.id ORDER BY id ASC LIMIT 1) AS copertina
    FROM trips 
    JOIN users ON trips.user_id = users.id
    ORDER BY trips.created_at DESC
    ");
    mysqli_stmt_execute($stmt);
    $result = mysqli_stmt_get_result($stmt);

    $trips = [];
    while ($row = mysqli_fetch_assoc($result)) 
    {
        $trips[] = $row;
    }
?>

<!DOCTYPE html>
<html>
    <head>
        <meta charset="UTF-8">
        <title>RouteNest - Trips</title>
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
                            <li><a class="navi" aria-current="page" href="index.php">Home</a></li>
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
            <section class="trips">
                <div class="container">

                    <h2 class="trips-tit">ALL TRIPS</h2>

                    <?php if (count($trips) == 0): ?>
                        <p>No trips published yet</p>
                    <?php else: ?>
                        <div class="row">
                            <?php foreach ($trips as $trip): ?>
                                <div class="box col-12 col-md-4">
                                    <a href="trip.php?id=<?php echo $trip['id']; ?>">
                                        <div class="card-trip">

                                            <!-- Copertina -->
                                            <?php if ($trip['copertina']): ?>
                                                <img 
                                                    src="<?php echo htmlspecialchars($trip['copertina']); ?>"
                                                    class="img-trip"
                                                    alt="Copertina viaggio"                                                    
                                                >
                                            <?php else: ?>
                                                <img
                                                    class="img-trip" 
                                                    src="/immagini_utenti/default.jpg"                                                    
                                                    alt="Copertina viaggio"
                                                >
                                            <?php endif; ?>

                                            <div class="card-body">
                                                <!-- Titolo -->
                                                <h5 class="card-title"><?php echo htmlspecialchars($trip['title']); ?></h5>

                                                <!-- Autore -->
                                                <div class="d-flex align-items-center gap-2 mt-2">
                                                    <img 
                                                        src="immagini_profilo/<?php echo htmlspecialchars($trip['profile_image']); ?>"
                                                        alt="Foto profilo"
                                                        class="profile-photo"                                                        
                                                    >
                                                    <span><?php echo htmlspecialchars($trip['username']); ?></span>
                                                </div>
                                            </div>

                                        </div>
                                    </a>
                                </div>
                            <?php endforeach; ?>
                        </div>
                    <?php endif; ?>

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