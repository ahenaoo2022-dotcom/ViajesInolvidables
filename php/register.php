<?php
/**
 * register.php
 * Crea un nuevo usuario con contraseña cifrada (password_hash).
 */

require_once __DIR__ . "/conexion.php";

if ($_SERVER["REQUEST_METHOD"] !== "POST") {
    header("Location: ../register.html");
    exit;
}

$nombre    = trim($_POST["nombre"] ?? "");
$email     = trim($_POST["email"] ?? "");
$telefono  = trim($_POST["telefono"] ?? "");
$password  = $_POST["password"] ?? "";
$password2 = $_POST["password2"] ?? "";
$terminos  = isset($_POST["terminos"]);

// Validación en el servidor (nunca confiar solo en la del navegador)
$errores = [];
if (mb_strlen($nombre) < 3) $errores[] = "nombre";
if (!filter_var($email, FILTER_VALIDATE_EMAIL)) $errores[] = "email";
if (!preg_match('/^[0-9+ ]{7,15}$/', $telefono)) $errores[] = "telefono";
if (mb_strlen($password) < 6) $errores[] = "password";
if ($password !== $password2) $errores[] = "password2";
if (!$terminos) $errores[] = "terminos";

if (!empty($errores)) {
    header("Location: ../register.html?error=1");
    exit;
}

try {
    $pdo = obtenerConexion();

    $check = $pdo->prepare("SELECT id FROM usuarios WHERE email = :email LIMIT 1");
    $check->execute([":email" => $email]);
    if ($check->fetch()) {
        header("Location: ../register.html?error=correo_existente");
        exit;
    }

    $hash = password_hash($password, PASSWORD_DEFAULT);

    $insert = $pdo->prepare("
        INSERT INTO usuarios (nombre, email, telefono, password_hash, creado_en)
        VALUES (:nombre, :email, :telefono, :hash, NOW())
    ");
    $insert->execute([
        ":nombre"   => $nombre,
        ":email"    => $email,
        ":telefono" => $telefono,
        ":hash"     => $hash,
    ]);

    header("Location: ../login.html?registrado=1");
    exit;

} catch (Throwable $e) {
    header("Location: ../register.html?error=1");
    exit;
}
