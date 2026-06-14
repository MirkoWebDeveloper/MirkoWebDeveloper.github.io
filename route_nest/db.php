<?php
    //credenziali di accesso al server
    $host = 'nome host';
    $user = 'username';
    $pass = 'password';
    $db = 'nome database';

    //connnessione al server
    $connection = mysqli_connect($host, $user, $pass, $db);
    if (!$connection)
    {
        die ('<br>Connection failed: ' .mysqli_connect_error());
    }
?>