<?php
/**
 * login.php
 * Valida el correo y la contraseña contra la tabla `usuarios`.
 * Si son correctos: abre sesión PHP + cookie legible por JS (vi_user)
 * para que el front muestre el nombre del usuario en el menú.
 */

session_start();
require_once __DIR__ . "/conexion.php";

if ($_SERVER["REQUEST_METHOD"] !== "POST") {
    header("Location: ../login.html");
    exit;
}

$email    = trim($_POST["email"] ?? "");
$password = $_POST["password"] ?? "";

if ($email === "" || $password === "") {
    header("Location: ../login.html?error=1");
    exit;
}

try {
    $pdo = obtenerConexion();
    $stmt = $pdo->prepare("SELECT id, nombre, email, password_hash FROM usuarios WHERE email = :email LIMIT 1");
    $stmt->execute([":email" => $email]);
    $usuario = $stmt->fetch();

    if (!$usuario || !password_verify($password, $usuario["password_hash"])) {
        header("Location: ../login.html?error=1");
        exit;
    }

    // Sesión del lado del servidor
    $_SESSION["usuario_id"]     = $usuario["id"];
    $_SESSION["usuario_nombre"] = $usuario["nombre"];
    $_SESSION["usuario_email"]  = $usuario["email"];

    // Cookie legible por JS solo para mostrar el nombre en el nav (no es el mecanismo de autenticación real)
    $recordarDias = isset($_POST["recordar"]) ? 30 : 0;
    setcookie("vi_user", $usuario["nombre"], [
        "expires"  => $recordarDias ? time() + ($recordarDias * 86400) : 0,
        "path"     => "/",
        "samesite" => "Lax",
    ]);

    header("Location: ../index.html");
    exit;

} catch (Throwable $e) {
    header("Location: ../login.html?error=1");
    exit;
}
