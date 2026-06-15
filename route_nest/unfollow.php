// unfollow.php
<?php
session_start();
require 'db.php';

if (!isset($_SESSION['user_id']) || !isset($_GET['id'])) {
    header("Location: index.php");
    exit;
}

$follower_id  = $_SESSION['user_id'];
$following_id = (int) $_GET['id'];

$stmt = mysqli_prepare($connection, "DELETE FROM follows WHERE follower_id = ? AND following_id = ?");
mysqli_stmt_bind_param($stmt, "ii", $follower_id, $following_id);
mysqli_stmt_execute($stmt);

header("Location: profile.php?id=" . $following_id); 
exit;
