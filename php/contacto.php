<?php
/**
 * contacto.php
 * Recibe el formulario de contactenos.html (llamado vía fetch/AJAX)
 * y guarda el mensaje en la tabla `mensajes_contacto`.
 * Responde en JSON porque el front lo consume con fetch().
 */

header("Content-Type: application/json; charset=UTF-8");
require_once __DIR__ . "/conexion.php";

if ($_SERVER["REQUEST_METHOD"] !== "POST") {
    http_response_code(405);
    echo json_encode(["ok" => false, "error" => "Método no permitido"]);
    exit;
}

$nombre   = trim($_POST["nombre"] ?? "");
$email    = trim($_POST["email"] ?? "");
$telefono = trim($_POST["telefono"] ?? "");
$asunto   = trim($_POST["asunto"] ?? "");
$mensaje  = trim($_POST["mensaje"] ?? "");

if (mb_strlen($nombre) < 3 || !filter_var($email, FILTER_VALIDATE_EMAIL) || $asunto === "" || mb_strlen($mensaje) < 10) {
    http_response_code(422);
    echo json_encode(["ok" => false, "error" => "Datos incompletos o inválidos"]);
    exit;
}

try {
    $pdo = obtenerConexion();
    $stmt = $pdo->prepare("
        INSERT INTO mensajes_contacto (nombre, email, telefono, asunto, mensaje, creado_en)
        VALUES (:nombre, :email, :telefono, :asunto, :mensaje, NOW())
    ");
    $stmt->execute([
        ":nombre"   => $nombre,
        ":email"    => $email,
        ":telefono" => $telefono,
        ":asunto"   => $asunto,
        ":mensaje"  => $mensaje,
    ]);

    echo json_encode(["ok" => true]);
} catch (Throwable $e) {
    http_response_code(500);
    echo json_encode(["ok" => false, "error" => "No se pudo guardar el mensaje"]);
}
