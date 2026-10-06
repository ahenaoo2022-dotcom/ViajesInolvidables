-- =========================================================
-- VIAJES INOLVIDABLES — Esquema de base de datos
-- Importa este archivo en phpMyAdmin o con:
--   mysql -u root -p < script.sql
-- =========================================================

CREATE DATABASE IF NOT EXISTS viajes_inolvidables
  CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

USE viajes_inolvidables;

-- ---------------------------------------------------------
-- Usuarios registrados (login / register)
-- ---------------------------------------------------------
CREATE TABLE IF NOT EXISTS usuarios (
  id             INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  nombre         VARCHAR(120)      NOT NULL,
  email          VARCHAR(160)      NOT NULL UNIQUE,
  telefono       VARCHAR(20)       NULL,
  password_hash  VARCHAR(255)      NOT NULL,
  creado_en      DATETIME          NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB;

-- ---------------------------------------------------------
-- Mensajes del formulario de Contáctenos
-- ---------------------------------------------------------
CREATE TABLE IF NOT EXISTS mensajes_contacto (
  id          INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  nombre      VARCHAR(120)  NOT NULL,
  email       VARCHAR(160)  NOT NULL,
  telefono    VARCHAR(20)   NULL,
  asunto      VARCHAR(120)  NOT NULL,
  mensaje     TEXT          NOT NULL,
  leido       TINYINT(1)    NOT NULL DEFAULT 0,
  creado_en   DATETIME      NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB;

-- ---------------------------------------------------------
-- Solicitudes de reserva generadas desde el modal de paquetes
-- ---------------------------------------------------------
CREATE TABLE IF NOT EXISTS reservas (
  id                INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  usuario_id        INT UNSIGNED  NULL,
  paquete_id        VARCHAR(40)   NOT NULL,
  paquete_destino   VARCHAR(160)  NOT NULL,
  paquete_precio    INT UNSIGNED  NOT NULL DEFAULT 0,
  nombre            VARCHAR(120)  NOT NULL,
  email             VARCHAR(160)  NOT NULL,
  telefono          VARCHAR(20)   NOT NULL,
  viajeros          TINYINT UNSIGNED NOT NULL DEFAULT 1,
  fecha_salida      DATE          NOT NULL,
  mensaje           TEXT          NULL,
  estado            ENUM('pendiente','confirmada','cancelada') NOT NULL DEFAULT 'pendiente',
  creado_en         DATETIME      NOT NULL DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT fk_reservas_usuario
    FOREIGN KEY (usuario_id) REFERENCES usuarios(id)
    ON DELETE SET NULL
) ENGINE=InnoDB;

-- ---------------------------------------------------------
-- No se incluye un usuario "demo" precargado: un hash de
-- contraseña escrito a mano en un script SQL no se puede
-- verificar sin ejecutar PHP. Para probar el login, crea una
-- cuenta real desde register.html — quedará correctamente
-- cifrada con password_hash().
-- ---------------------------------------------------------
