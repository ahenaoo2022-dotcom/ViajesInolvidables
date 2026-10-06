<?php
/**
 * conexion.php
 * Conexión centralizada a la base de datos con PDO.
 * Ajusta estas constantes según tu entorno (XAMPP/WAMP/servidor).
 */

const DB_HOST = "localhost";
const DB_NAME = "viajes_inolvidables";
const DB_USER = "root";
const DB_PASS = "";
const DB_CHARSET = "utf8mb4";

function obtenerConexion(): PDO {
    static $pdo = null;

    if ($pdo === null) {
        $dsn = "mysql:host=" . DB_HOST . ";dbname=" . DB_NAME . ";charset=" . DB_CHARSET;
        $opciones = [
            PDO::ATTR_ERRMODE            => PDO::ERRMODE_EXCEPTION,
            PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
            PDO::ATTR_EMULATE_PREPARES   => false,
        ];

        try {
            $pdo = new PDO($dsn, DB_USER, DB_PASS, $opciones);
        } catch (PDOException $e) {
            http_response_code(500);
            die("No fue posible conectar a la base de datos. Verifica que MySQL esté corriendo y que hayas importado sql/script.sql. Detalle: " . $e->getMessage());
        }
    }

    return $pdo;
}
