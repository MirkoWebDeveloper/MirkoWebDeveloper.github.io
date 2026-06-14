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

    if ($_SERVER['REQUEST_METHOD'] == 'POST') 
    {
        $title = trim($_POST['title']);
        $description = trim($_POST['description']);
        $country = trim($_POST['country']);
        $city = trim($_POST['city']);
        $budget = trim($_POST['budget']);

    // Controllo campi obbligatori
    if ($title == "" || $description == "") 
    {
        $error = "Title and description are required";
    } 
    else 
    {
        // Inserisce il viaggio nel DB
        $stmt = mysqli_prepare($connection, "INSERT INTO trips (user_id, title, description, country, city, budget) VALUES (?, ?, ?, ?, ?, ?)");
        mysqli_stmt_bind_param($stmt, "issssd", $user_id, $title, $description, $country, $city, $budget);
        mysqli_stmt_execute($stmt);

        // Prende l'id del viaggio appena inserito
        $trip_id = mysqli_insert_id($connection);

        // Gestione immagini (opzionale)
        if (isset($_FILES['images']) && $_FILES['images']['error'][0] != 4) 
        {
            $total_files = count($_FILES['images']['name']);

            // Massimo 10 immagini
            if ($total_files > 10) 
            {
                $total_files = 10;
            }

            $file_extension = ['jpg', 'jpeg'];

            for ($i = 0; $i < $total_files; $i++) 
            {
                // Salta file con errori
                if ($_FILES['images']['error'][$i] != 0) 
                {
                    continue;
                }

                $extension = strtolower(pathinfo($_FILES['images']['name'][$i], PATHINFO_EXTENSION));

                if (!in_array($extension, $file_extension)) 
                {
                    continue; // salta i file con formato non valido
                }

                // Prende il prossimo id disponibile in trip_images per il nome file
                $name_file = $user_id . '_' . $trip_id . '_' . time() . '_' . $i . '.jpg';
                $route = 'immagini_utenti/' . $name_file;

                if (move_uploaded_file($_FILES['images']['tmp_name'][$i], $route)) 
                {
                    // Salva il percorso nel DB
                    $img_stmt = mysqli_prepare($connection, "INSERT INTO trip_images (trip_id, image_path) VALUES (?, ?)");
                    mysqli_stmt_bind_param($img_stmt, "is", $trip_id, $route);
                    mysqli_stmt_execute($img_stmt);
                }
            }
        }

        header('Location: trip.php?id=' . $trip_id);
        exit;
    }
}
?>

<!DOCTYPE html>
<html>
    <head>
        <meta charset="UTF-8">
        <title>RouteNest - New Trip</title>
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
            <nav class="navbar navbar-expand-lg">
                <div class="container-fluid">
                    <a href="index.php">
                        <img class="logo" src="immagini/logo.png" alt="RouteNest logo">
                    </a>
                    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent"
                        aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span class="navbar-toggler-icon"></span>
                    </button>
                    <div class="menu-navigation collapse navbar-collapse" id="navbarSupportedContent">
                        <ul class="navbar-nav">
                            <li><a class="navi" href="index.php">Home</a></li>
                            <li><a class="navi" href="trips.php">Trips</a></li>
                            <li><a class="navi" href="#">News</a></li>
                            <li><a class="navi" href="#map">Map</a></li>
                        </ul>
                    </div>
                    <div class="menu-login">
                        <ul class="navbar-nav">
                            <li><a class="navi logout" href="logout.php">Logout</a></li>
                            <li><a class="navi profile" href="profile.php">Profile</a></li>
                            <li><a class="navi new-trip" href="new_trip.php">+New Trip</a></li>
                        </ul>
                    </div>
                </div>
            </nav>
        </header>

        <main>
            <section class="newtrip">
                <div class="contenitore">

                    <h2>New Trip</h2>

                    <?php if ($error != ""): ?>
                        <div class="alert alert-danger"><?php echo $error; ?></div>
                    <?php endif; ?>

                    <form action="new_trip.php" method="POST" enctype="multipart/form-data">

                        <!-- Titolo -->
                        <div>
                            <label for="title" class="form-label">Title <span class="text-danger">*</span></label>
                            <input type="text" class="form-control" id="title" name="title" required>
                        </div>

                        <!-- Descrizione -->
                        <div>
                            <label for="description" class="form-label">Description <span class="text-danger">*</span></label>
                            <textarea class="form-control" id="description" name="description" rows="5"></textarea>
                        </div>

                        <!-- Paese e Città affiancati -->
                        <div>
                            <div>
                                <label for="country" class="form-label">Country</label>
                                <input type="text" class="form-control" id="country" name="country">
                            </div>
                            <div>
                                <label for="city" class="form-label">City</label>
                                <input type="text" class="form-control" id="city" name="city">
                            </div>
                        </div>

                        <!-- Budget -->
                        <div>
                            <label for="budget" class="form-label">Budget</label>
                            <input type="number" step="0.01" min="0" class="form-control" id="budget" name="budget">
                        </div>

                        <!-- Upload immagini -->
                        <div>
                            <label for="images" class="form-label">Photos (max 10, only jpg/jpeg)</label>
                            <input 
                                type="file" 
                                class="form-control" 
                                id="images" 
                                name="images[]" 
                                accept=".jpg,.jpeg"
                                multiple
                                onchange="ctrlImages(this)">

                            <div id="error_images" class="text-danger" style="display:none;">
                                Max 10 images
                            </div>
                            <!-- Anteprima foto selezionate -->
                            <div id="preview"></div>
                        </div>

                        <!-- Bottone -->
                        <div>
                            <button class="save" type="submit">Publish Trip</button>
                        </div>

                    </form>
                </div>
            </section>
        </main>

         <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.8/dist/js/bootstrap.bundle.min.js" 
            integrity="sha384-FKyoEForCGlyvwx9Hj09JcYn3nv7wiPVlz7YYwJrWVcXK/BmnVDxM+D2scQbITxI" 
            crossorigin="anonymous">
        </script>
    </body>
</html>
