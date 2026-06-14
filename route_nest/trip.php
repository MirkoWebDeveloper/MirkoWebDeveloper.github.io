<?php
    session_start();
    require_once 'db.php';

    // Prende l'id del viaggio dall'URL
    if (!isset($_GET['id'])) 
    {
        header('Location: trips.php');
        exit;
    }

    $trip_id = intval($_GET['id']);
    $user_id = isset($_SESSION['user_id']) ? $_SESSION['user_id'] : null;

    // Recupera i dati del viaggio
    $stmt = mysqli_prepare($connection, "SELECT trips.*, users.username, users.profile_image FROM trips JOIN users ON trips.user_id = users.id WHERE trips.id = ?");
    mysqli_stmt_bind_param($stmt, "i", $trip_id);
    mysqli_stmt_execute($stmt);
    $result = mysqli_stmt_get_result($stmt);
    $trip = mysqli_fetch_assoc($result);

    if (!$trip) 
    {
        echo "Trip not found";
        exit;
    }   

    // Recupera le immagini del viaggio
    $stmt_img = mysqli_prepare($connection, "SELECT * FROM trip_images WHERE trip_id = ?");
    mysqli_stmt_bind_param($stmt_img, "i", $trip_id);
    mysqli_stmt_execute($stmt_img);
    $result_img = mysqli_stmt_get_result($stmt_img);
    $images = [];
    while ($row = mysqli_fetch_assoc($result_img)) 
    {
        $images[] = $row;
    }

    // Conta i like
    $stmt_like_count = mysqli_prepare($connection, "SELECT COUNT(*) AS totale FROM likes WHERE trip_id = ?");
    mysqli_stmt_bind_param($stmt_like_count, "i", $trip_id);
    mysqli_stmt_execute($stmt_like_count);
    $result_like_count = mysqli_stmt_get_result($stmt_like_count);
    $row_like = mysqli_fetch_assoc($result_like_count);
    $total_like = $row_like['totale'];

    // Controlla se l'utente loggato ha già messo like
    $is_like = false;
    if ($user_id) 
    {
        $stmt_like_check = mysqli_prepare($connection, "SELECT id FROM likes WHERE trip_id = ? AND user_id = ?");
        mysqli_stmt_bind_param($stmt_like_check, "ii", $trip_id, $user_id);
        mysqli_stmt_execute($stmt_like_check);
        $result_like_check = mysqli_stmt_get_result($stmt_like_check);
        if (mysqli_num_rows($result_like_check) > 0) 
        {
            $is_like = true;
        }
    }

    // Gestione like / unlike
    if ($_SERVER['REQUEST_METHOD'] == 'POST' && isset($_POST['action_like']) && $user_id) 
    {
        if ($_POST['action_like'] == 'like') 
        {
            $ins = mysqli_prepare($connection, "INSERT INTO likes (trip_id, user_id) VALUES (?, ?)");
            mysqli_stmt_bind_param($ins, "ii", $trip_id, $user_id);
            mysqli_stmt_execute($ins);
            $is_like = true;
            $total_like++;
        } 
        else if ($_POST['action_like'] == 'unlike') 
        {
            $del = mysqli_prepare($connection, "DELETE FROM likes WHERE trip_id = ? AND user_id = ?");
            mysqli_stmt_bind_param($del, "ii", $trip_id, $user_id);
            mysqli_stmt_execute($del);
            $is_like = false;
            $total_like--;
        }
    }

    // Gestione eliminazione viaggio
    if ($_SERVER['REQUEST_METHOD'] == 'POST' && isset($_POST['delete_trip']) && $user_id == $trip['user_id']) 
    {
        // Elimina le immagini fisiche e dal DB
        foreach ($images as $img) 
        {
            if (file_exists($img['image_path'])) 
            {
                unlink($img['image_path']);
            }
        }
        $del_img = mysqli_prepare($connection, "DELETE FROM trip_images WHERE trip_id = ?");
        mysqli_stmt_bind_param($del_img, "i", $trip_id);
        mysqli_stmt_execute($del_img);

        // Elimina i like del viaggio
        $del_like = mysqli_prepare($connection, "DELETE FROM likes WHERE trip_id = ?");
        mysqli_stmt_bind_param($del_like, "i", $trip_id);
        mysqli_stmt_execute($del_like);

        // Elimina il viaggio
        $del_trip = mysqli_prepare($connection, "DELETE FROM trips WHERE id = ? AND user_id = ?");
        mysqli_stmt_bind_param($del_trip, "ii", $trip_id, $user_id);
        mysqli_stmt_execute($del_trip);

        header('Location: trips.php');
        exit;
    }

    // Controlla se il proprietario sta guardando
    $is_owner = $user_id && $user_id == $trip['user_id'];
?>

<!DOCTYPE html>
<html>
    <head>
        <meta charset="UTF-8">
        <title>RouteNest - <?php echo htmlspecialchars($trip['title']); ?></title>
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
            <section class="trip-detail">
                <div class="container">

                    <!-- Titolo e pulsanti proprietario -->
                    <div>
                        <h2 class="trip-tit"><?php echo htmlspecialchars($trip['title']); ?></h2>

                        <?php if ($is_owner): ?>
                            <div class="buttons">
                                <a class="edit" href="edit_trip.php?id=<?php echo $trip_id; ?>">Edit</a>
                                <!-- Bottone Delete con conferma -->
                                <form method="POST" onsubmit="return confirm('Are you sure you want to delete this trip? This action is irreversible');">
                                    <input type="hidden" name="delete_trip" value="1">
                                    <button class="delete" type="submit">Delete</button>
                                </form>
                            </div>
                        <?php endif; ?>
                    </div>

                    <!-- Autore e data -->
                    <div>
                        <img 
                            src="immagini_profilo/<?php echo htmlspecialchars($trip['profile_image']); ?>"
                            alt="photo profile"
                            class="rounded-circle"
                            style="width: 40px; height: 40px; object-fit: cover;">
                        <a href="profile.php?id=<?php echo $trip['user_id']; ?>">
                            <?php echo htmlspecialchars($trip['username']); ?>
                        </a>
                        <span>— <?php echo date('d/m/Y', strtotime($trip['created_at'])); ?></span>
                    </div>

                    <!-- Paese, Città, Budget -->
                    <div>
                        <?php if ($trip['country']): ?>
                            <span><strong>Paese:</strong> <?php echo htmlspecialchars($trip['country']); ?></span>
                        <?php endif; ?>
                        <?php if ($trip['city']): ?>
                            <span><strong>Città:</strong> <?php echo htmlspecialchars($trip['city']); ?></span>
                        <?php endif; ?>
                        <?php if ($trip['budget']): ?>
                            <span><strong>Budget:</strong> €<?php echo number_format($trip['budget'], 2, ',', '.'); ?></span>
                        <?php endif; ?>
                    </div>

                    <!-- Descrizione -->
                    <p><?php echo nl2br(htmlspecialchars($trip['description'])); ?></p>

                    <!-- Immagini -->
                    <?php if (count($images) > 0): ?>
                        <div class="row">
                            <?php foreach ($images as $img): ?>
                                <div class="box-2 col-12 col-md-4">
                                    <img 
                                        class="img-trips" 
                                        src="<?php echo htmlspecialchars($img['image_path']); ?>"
                                        alt="Photo trip"                                        
                                    >
                                </div>
                            <?php endforeach; ?>
                        </div>
                    <?php endif; ?>

                    <!-- Like -->
                    <div>
                        <?php if ($user_id): ?>
                            <form method="POST">
                                <?php if ($is_like): ?>
                                    <input type="hidden" name="action_like" value="unlike">
                                    <button class="like" type="submit">♥ Unlike (<?php echo $total_like; ?>)</button>
                                <?php else: ?>
                                    <input type="hidden" name="action_like" value="like">
                                    <button class="like" type="submit">♡ Like (<?php echo $total_like; ?>)</button>
                                <?php endif; ?>
                            </form>
                        <?php else: ?>
                            <span class="like">♥ <?php echo $total_like; ?> like — <a href="#" onclick="openModal()">Login</a> to like</span>
                        <?php endif; ?>
                    </div>

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