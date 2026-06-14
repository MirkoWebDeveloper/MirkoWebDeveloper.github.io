<?php 
    session_start();
    require_once 'db.php';    
    
    $popular_trips = [];

    if (isset($_SESSION['user_id'])) 
    {
        $stmt_pop = mysqli_prepare($connection, "
            SELECT trips.id, trips.title, users.username, users.profile_image,
                COUNT(likes.id) AS total_like,
                (SELECT image_path FROM trip_images WHERE trip_id = trips.id ORDER BY id ASC LIMIT 1) AS copertina
            FROM trips
            JOIN users ON trips.user_id = users.id
            LEFT JOIN likes ON likes.trip_id = trips.id
            GROUP BY trips.id
            ORDER BY total_like DESC
        LIMIT 3
        ");
        mysqli_stmt_execute($stmt_pop);
        $result_pop = mysqli_stmt_get_result($stmt_pop);
        while ($row = mysqli_fetch_assoc($result_pop)) 
        {
            $popular_trips[] = $row;
        }

        // Recupera tutti i viaggi con country e city per la mappa        
        $stmt_map = mysqli_prepare($connection, "
            SELECT trips.id, trips.title, trips.city, trips.country
            FROM trips
            WHERE trips.city IS NOT NULL AND trips.country IS NOT NULL
            AND trips.city != '' AND trips.country != ''
        ");
        mysqli_stmt_execute($stmt_map);
        $result_map = mysqli_stmt_get_result($stmt_map);
        $map_trips = [];
        while ($row = mysqli_fetch_assoc($result_map)) 
        {
            $map_trips[] = $row;
        }
    }

?>

<!DOCTYPE html>
<html>
    <head>
        <meta charset="UTF-8">
        <title>RouteNest - Home</title>
        <link rel="icon" href="immagini/icon.png" sizes="16x16" type="image/png">
        <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.8/dist/css/bootstrap.min.css" rel="stylesheet" 
            integrity="sha384-sRIl4kxILFvY47J16cr9ZwB07vP4J8+LH7qKQnuqkuIAvNWLzeN8tE5YBujZqJLB" 
            crossorigin="anonymous">
        <link rel="preconnect" href="https://fonts.googleapis.com">
        <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
        <link href="https://fonts.googleapis.com/css2?family=Inter:ital,opsz,wght@0,14..32,100..900;1,14..32,100..900&family=Poppins:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap" 
            rel="stylesheet">
        <link rel= "stylesheet" href="css/reset.css">
        <link rel= "stylesheet" href="css/style.css">
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
                            <li><a class="navi" href="#map">Map</a></li> <!--punta alla mappa interattiva sotto-->
                            
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
            <section class="hero-home"><!--Sezione HERO-->
                <h1 class="hero-title">Discover your next adventure, <br>the low-cost way</h1>
                <h2 class="hero-subtitle">Join the RouteNest community and share your journeys</h2>                
            </section>

            <section class="popular-trips"><!--Sezione VIAGGI POPOLARI-->
                <?php if (isset($_SESSION['user_id'])): ?>
                    <div class="container">
                        <h2 class="popular-tit">POPULAR TRIPS</h2>
                        <div class="row">
                            <?php foreach ($popular_trips as $trip): ?>
                                <div class="box col-12 col-md-4">
                                    <a href="trip.php?id=<?php echo $trip['id']; ?>">
                                        <div class="card-trip">
                                            <?php if ($trip['copertina']): ?>
                                                <img
                                                    class="img-trip" 
                                                    src="<?php echo htmlspecialchars($trip['copertina']); ?>"                                                    
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
                                                <h5 class="card-title"><?php echo htmlspecialchars($trip['title']); ?></h5>
                                                <div>
                                                    <img
                                                        class="profile-photo" 
                                                        src="immagini_profilo/<?php echo htmlspecialchars($trip['profile_image']); ?>"
                                                        alt="Foto profilo"                                                        
                                                    >
                                                    <span><?php echo htmlspecialchars($trip['username']); ?></span>
                                                </div>
                                                <p class="vis-like">♥ <?php echo $trip['total_like']; ?> like</p>
                                            </div>
                                        </div>
                                    </a>
                                </div>
                            <?php endforeach; ?>
                        </div>
                    </div>
                <?php endif; ?>                
            </section>          

            <section class="interactive-map"><!--Sezione MAPPA INTERATTIVA-->
                <?php if (isset($_SESSION['user_id'])): ?>
                    <div class="container">
                        <h2 class="map-tit">MAP TRIP</h2>
                        <div id="map"></div>
                    </div>

                    <!-- Leaflet CSS e JS -->
                    <link rel="stylesheet" href="https://unpkg.com/leaflet@1.9.4/dist/leaflet.css" crossorigin=""/>
                    <script src="https://unpkg.com/leaflet@1.9.4/dist/leaflet.js" crossorigin=""></script>

                    <script>
                        // Inizializza la mappa centrata sul mondo
                        var map = L.map('map').setView([20, 10], 2);

                        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
                            attribution: '© OpenStreetMap contributors'
                        }).addTo(map);

                        // Dati dei viaggi passati dal PHP al JavaScript
                        var trips = <?php echo json_encode($map_trips); ?>;

                        // Per ogni viaggio chiama Nominatim per ottenere le coordinate
                        trips.forEach(function(trip) 
                        {
                            var query = trip.city + ', ' + trip.country;

                            fetch('https://nominatim.openstreetmap.org/search?q=' + encodeURIComponent(query) + '&format=json&limit=1')
                                .then(function(response) { return response.json(); })
                                .then(function(data) 
                                {
                                    if (data.length > 0) 
                                    {
                                        var lat = parseFloat(data[0].lat);
                                        var lon = parseFloat(data[0].lon);

                                        var marker = L.marker([lat, lon]).addTo(map);
                                        marker.bindPopup(
                                            '<a href="trip.php?id=' + trip.id + '">' + trip.title + '</a>' +
                                            '<br><small>' + trip.city + ', ' + trip.country + '</small>'
                                        );
                                    }
                                })
                            .catch(function(err) 
                            {
                                console.log('Error geocoding for: ' + query);
                            });
                        });
                    </script>
                <?php endif; ?>                
            </section>            
        </main>

        <div class="modal-overlay" id="modal">
            <div class="modal-box">                
                <button class="btn-close-modal" onclick="closeModal()">✕</button><!--Pulsante chiudi (X)-->
                <h5 class="mb-3">Join RouteNest</h5>

                <div id="form-login"><!--Form per il login-->
                    <div class="mb-3">
                        <label class="form-label">Email</label>
                        <input type="email" id="login-email" class="form-control" placeholder="example@email.com">
                    </div>
                    <div class="mb-3">
                        <label class="form-label">Password</label>
                        <input type="password" id="login-pass" class="form-control" placeholder="••••••••">
                    </div>                     
                    <button onclick="sendLogin()" class="login w-100">Login</button><!--Bottone che chiama la funzione JS per inviare al PHP-->
                    <div class="alert-msg" id="login-msg"></div><!--Messaggio di risposta (vuoto finché il PHP non risponde)-->
                    
                    <hr>
                    <p id="register-switch">Don't have an account? <a onclick="switchTab('register')" href="#">Register</a></p>
                </div>

                <div id="form-reg" style="display:none;"><!--Form per la registrazione-->
                    <div class="mb-3">
                        <label class="form-label">Username</label>
                            <input type="text" id="reg-username" class="form-control" placeholder="Username">
                    </div>
                    <div class="mb-3">
                        <label class="form-label">Email</label>
                        <input type="email" id="reg-email" class="form-control" placeholder="example@email.com">
                    </div>
                    <div class="mb-3">
                        <label class="form-label">Password</label>
                        <input type="password" id="reg-pass" class="form-control" placeholder="••••••••">
                    </div>                    
                    <button onclick="sendReg()" class="register w-100">Crea account</button>
                    <div class="alert-msg" id="reg-msg"></div>
                    
                    <hr>
                    <p id="login-switch">Already have an account? <a onclick="switchTab('login')" href="#">Login</a></p>
                </div>
            </div>
        </div>      

        <footer>
            <h4 class="footer">RouteNest - Web Developer Casula Mirko</h3>
        </footer>        

        <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.8/dist/js/bootstrap.bundle.min.js" 
            integrity="sha384-FKyoEForCGlyvwx9Hj09JcYn3nv7wiPVlz7YYwJrWVcXK/BmnVDxM+D2scQbITxI" 
            crossorigin="anonymous">
        </script>
    </body>
</html>


