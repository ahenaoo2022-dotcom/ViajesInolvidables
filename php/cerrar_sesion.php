<?php
/**
 * cerrar_sesion.php
 * Destruye la sesión PHP y la cookie visible para el front.
 */

session_start();
$_SESSION = [];
session_destroy();

setcookie("vi_user", "", [
    "expires"  => time() - 3600,
    "path"     => "/",
    "samesite" => "Lax",
]);

header("Location: ../index.html");
exit;
