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

    // Prende l'id del viaggio dall'URL
    if (!isset($_GET['id'])) 
    {
        header('Location: trips.php');
        exit;
    }

    $trip_id = intval($_GET['id']);

    // Recupera i dati del viaggio e controlla che appartenga all'utente loggato
    $stmt = mysqli_prepare($connection, "SELECT * FROM trips WHERE id = ? AND user_id = ?");
    mysqli_stmt_bind_param($stmt, "ii", $trip_id, $user_id);
    mysqli_stmt_execute($stmt);
    $result = mysqli_stmt_get_result($stmt);
    $trip = mysqli_fetch_assoc($result);

    // Se il viaggio non esiste o non è suo, blocca
    if (!$trip) 
    {
        echo "Trip not found or you don't have permission to edit it.";
        exit;
    }

    // Recupera le immagini già caricate per questo viaggio
    $stmt_img = mysqli_prepare($connection, "SELECT * FROM trip_images WHERE trip_id = ?");
    mysqli_stmt_bind_param($stmt_img, "i", $trip_id);
    mysqli_stmt_execute($stmt_img);
    $result_img = mysqli_stmt_get_result($stmt_img);
    $images = [];
    while ($row = mysqli_fetch_assoc($result_img)) 
    {
        $images[] = $row;
    }

    if ($_SERVER['REQUEST_METHOD'] == 'POST') 
    {
        // Eliminazione immagini selezionate
        if (isset($_POST['delete_images']) && is_array($_POST['delete_images'])) 
        {
            foreach ($_POST['delete_images'] as $img_id) 
            {
                $img_id = intval($img_id);

                // Recupera il percorso del file prima di eliminarlo
                $del_stmt = mysqli_prepare($connection, "SELECT image_path FROM trip_images WHERE id = ? AND trip_id = ?");
                mysqli_stmt_bind_param($del_stmt, "ii", $img_id, $trip_id);
                mysqli_stmt_execute($del_stmt);
                $del_result = mysqli_stmt_get_result($del_stmt);
                $del_row = mysqli_fetch_assoc($del_result);

                if ($del_row) 
                {
                    // Elimina il file fisico dalla cartella
                    if (file_exists($del_row['image_path'])) 
                    {
                        unlink($del_row['image_path']);
                    }
                    // Elimina dal DB
                    $del_db = mysqli_prepare($connection, "DELETE FROM trip_images WHERE id = ? AND trip_id = ?");
                    mysqli_stmt_bind_param($del_db, "ii", $img_id, $trip_id);
                    mysqli_stmt_execute($del_db);
                }
            }
        }

        // Conta quante immagini rimangono dopo le eliminazioni
        $count_stmt = mysqli_prepare($connection, "SELECT COUNT(*) AS totale FROM trip_images WHERE trip_id = ?");
        mysqli_stmt_bind_param($count_stmt, "i", $trip_id);
        mysqli_stmt_execute($count_stmt);
        $count_result = mysqli_stmt_get_result($count_stmt);
        $count_row = mysqli_fetch_assoc($count_result);
        $images_now = $count_row['totale'];

        // Aggiunta nuove immagini
        if (isset($_FILES['new_images']) && $_FILES['new_images']['error'][0] != 4) 
        {
            $total_new = count($_FILES['new_images']['name']);
            $slot_empty = 10 - $images_now;

            if ($total_new > $slot_empty) 
            {
                $error = "You can add to the maximum " . $slot_empty . " images. The trip has already " . $images_now . ".";
            } 
            else 
            {
                $file_extension = ['jpg', 'jpeg'];

                for ($i = 0; $i < $total_new; $i++) 
                {
                    if ($_FILES['new_images']['error'][$i] != 0) 
                    {
                        continue;
                    }

                    $extension = strtolower(pathinfo($_FILES['new_images']['name'][$i], PATHINFO_EXTENSION));

                    if (!in_array($extension, $file_extension)) 
                    {
                        continue;
                    }

                    // Prende il prossimo id disponibile in trip_images
                    $name_file = $user_id . '_' . $trip_id . '_' . time() . '_' . $i . '.jpg';
                    $route  = 'immagini_utenti/' . $name_file;

                    if (move_uploaded_file($_FILES['new_images']['tmp_name'][$i], $route)) 
                    {
                        $img_stmt = mysqli_prepare($connection, "INSERT INTO trip_images (trip_id, image_path) VALUES (?, ?)");
                        mysqli_stmt_bind_param($img_stmt, "is", $trip_id, $route);
                        mysqli_stmt_execute($img_stmt);
                    }
                }
            }
        }

        // Aggiornamento campi viaggio
        if ($error == "") 
        {
            $title = trim($_POST['title']);
            $description = trim($_POST['description']);
            $country = trim($_POST['country']);
            $city = trim($_POST['city']);
            $budget = trim($_POST['budget']);

            if ($title == "" || $description == "") 
            {
                $error = "Title and description are required";
            } 
            else 
            {
                $update = mysqli_prepare($connection, "UPDATE trips SET title = ?, description = ?, country = ?, city = ?, budget = ? WHERE id = ? AND user_id = ?");
                mysqli_stmt_bind_param($update, "ssssdii", $title, $description, $country, $city, $budget, $trip_id, $user_id);
                mysqli_stmt_execute($update);

                $success = "Trip updated!";

                // Ricarica i dati aggiornati
                $trip['title'] = $title;
                $trip['description'] = $description;
                $trip['country'] = $country;
                $trip['city'] = $city;
                $trip['budget'] = $budget;

                // Ricarica le immagini aggiornate
                $stmt_img2 = mysqli_prepare($connection, "SELECT * FROM trip_images WHERE trip_id = ?");
                mysqli_stmt_bind_param($stmt_img2, "i", $trip_id);
                mysqli_stmt_execute($stmt_img2);
                $result_img2 = mysqli_stmt_get_result($stmt_img2);
                $images = [];
                while ($row = mysqli_fetch_assoc($result_img2)) 
                {
                    $images[] = $row;
                }
            }
        }
    }
?>

<!DOCTYPE html>
<html>
    <head>
        <meta charset="UTF-8">
        <title>RouteNest - Edit Trip</title>
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
            <section class="edit-trip">
                <div class="container">

                    <h2 class="edit-tit">EDIT TRIP</h2>

                    <?php if ($error != ""): ?>
                        <div class="alert alert-danger"><?php echo $error; ?></div>
                    <?php endif; ?>

                    <?php if ($success != ""): ?>
                        <div class="alert alert-success"><?php echo $success; ?></div>
                    <?php endif; ?>

                    <form action="edit_trip.php?id=<?php echo $trip_id; ?>" method="POST" enctype="multipart/form-data">

                        <!-- Titolo -->
                        <div>
                            <label for="title" class="form-label">Title <span class="text-danger">*</span></label>
                            <input type="text" class="form-control" id="title" name="title" 
                                value="<?php echo htmlspecialchars($trip['title']); ?>" required>
                        </div>

                        <!-- Descrizione -->
                        <div class="mb-3">
                            <label for="description" class="form-label">Description <span class="text-danger">*</span></label>
                            <textarea class="form-control" id="description" name="description" rows="5">
                                <?php echo htmlspecialchars($trip['description']); ?>
                            </textarea>
                        </div>

                        <!-- Paese e Città -->
                        <div>
                            <div>
                                <label for="country" class="form-label">Country</label>
                                <input type="text" class="form-control" id="country" name="country"
                                    value="<?php echo htmlspecialchars($trip['country'] ?? ''); ?>">
                            </div>
                            <div>
                                <label for="city" class="form-label">City</label>
                                <input type="text" class="form-control" id="city" name="city"
                                    value="<?php echo htmlspecialchars($trip['city'] ?? ''); ?>">
                            </div>
                        </div>

                        <!-- Budget -->
                        <div>
                            <label for="budget" class="form-label">Budget</label>
                            <input type="number" step="0.01" min="0" class="form-control" id="budget" name="budget"
                                value="<?php echo $trip['budget'] ?? ''; ?>">
                        </div>

                        <!-- Immagini esistenti -->
                        <?php if (count($images) > 0): ?>
                            <div>
                                <label class="form-label">Images uploads (tick the ones to delete)</label>
                                <div>
                                    <?php foreach ($images as $img): ?>
                                        <div class="text-center">
                                            <img 
                                                src="<?php echo htmlspecialchars($img['image_path']); ?>"
                                                style="width: 120px; height: 120px; object-fit: cover;"
                                                class="rounded mb-1">
                                            <div>
                                                <input 
                                                    type="checkbox" 
                                                    name="delete_images[]" 
                                                    value="<?php echo $img['id']; ?>"
                                                    id="img_<?php echo $img['id']; ?>">
                                                <label for="img_<?php echo $img['id']; ?>" class="text-danger small">Delete</label>
                                            </div>
                                        </div>
                                    <?php endforeach; ?>
                                </div>
                            </div>
                        <?php endif; ?>

                        <!-- Aggiunta nuove immagini -->
                        <?php
                        $slots = 10 - count($images);
                        if ($slots > 0):
                        ?>
                            <div>
                                <label for="new_images" class="form-label">
                                    Add Photo (max <?php echo $slots; ?> slots empty, only jpg/jpeg)
                                </label>
                                <input 
                                    type="file" 
                                    class="form-control" 
                                    id="new_images" 
                                    name="new_images[]" 
                                    accept=".jpg,.jpeg"
                                    multiple
                                    onchange="ctrlEditImages(this, <?php echo $slots; ?>)"
                                >
                                <div id="error_images" class="text-danger" style="display:none;"></div>
                                <div id="preview"></div>
                            </div>
                        <?php else: ?>
                            <p class="text-muted">You've reached your 10-image limit. Delete some to add new ones</p>
                        <?php endif; ?>

                        <!-- Bottoni -->
                        <div class="buttons">
                            <a class="cancel" href="trip.php?id=<?php echo $trip_id; ?>">Cancel</a>
                            <button class="save" type="submit">Save Changes</button>
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