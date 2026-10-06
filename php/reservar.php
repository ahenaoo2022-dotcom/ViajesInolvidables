<?php
/**
 * reservar.php
 * Recibe la solicitud de reserva del modal en paquetes.html
 * (llamado vía fetch/AJAX) y la guarda en `reservas`.
 * No procesa ningún pago: solo registra la intención de reserva
 * para que un asesor humano confirme disponibilidad y cobro.
 */

header("Content-Type: application/json; charset=UTF-8");
require_once __DIR__ . "/conexion.php";

if ($_SERVER["REQUEST_METHOD"] !== "POST") {
    http_response_code(405);
    echo json_encode(["ok" => false, "error" => "Método no permitido"]);
    exit;
}

$paqueteId     = trim($_POST["paquete_id"] ?? "");
$paqueteNombre = trim($_POST["paquete_destino"] ?? "");
$paquetePrecio = (int)($_POST["paquete_precio"] ?? 0);
$nombre        = trim($_POST["nombre"] ?? "");
$email         = trim($_POST["email"] ?? "");
$telefono      = trim($_POST["telefono"] ?? "");
$viajeros      = (int)($_POST["viajeros"] ?? 1);
$fecha         = trim($_POST["fecha"] ?? "");
$mensaje       = trim($_POST["mensaje"] ?? "");

if ($paqueteId === "" || mb_strlen($nombre) < 3 || !filter_var($email, FILTER_VALIDATE_EMAIL) || $fecha === "") {
    http_response_code(422);
    echo json_encode(["ok" => false, "error" => "Datos incompletos o inválidos"]);
    exit;
}

session_start();
$usuarioId = $_SESSION["usuario_id"] ?? null;

try {
    $pdo = obtenerConexion();
    $stmt = $pdo->prepare("
        INSERT INTO reservas
            (usuario_id, paquete_id, paquete_destino, paquete_precio, nombre, email, telefono, viajeros, fecha_salida, mensaje, estado, creado_en)
        VALUES
            (:usuario_id, :paquete_id, :paquete_destino, :paquete_precio, :nombre, :email, :telefono, :viajeros, :fecha_salida, :mensaje, 'pendiente', NOW())
    ");
    $stmt->execute([
        ":usuario_id"      => $usuarioId,
        ":paquete_id"      => $paqueteId,
        ":paquete_destino" => $paqueteNombre,
        ":paquete_precio"  => $paquetePrecio,
        ":nombre"          => $nombre,
        ":email"           => $email,
        ":telefono"        => $telefono,
        ":viajeros"        => $viajeros,
        ":fecha_salida"    => $fecha,
        ":mensaje"         => $mensaje,
    ]);

    echo json_encode(["ok" => true]);
} catch (Throwable $e) {
    http_response_code(500);
    echo json_encode(["ok" => false, "error" => "No se pudo registrar la reserva"]);
}
