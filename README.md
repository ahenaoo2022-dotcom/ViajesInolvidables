# Viajes Inolvidables — Sitio mejorado

## Qué cambió respecto al proyecto original

**Diseño**
- Sistema de diseño unificado (`css/base.css`): una sola paleta, tipografía y componentes en todas las páginas — antes cada página tenía su propio CSS suelto y colores distintos.
- Identidad visual propia: tarjetas de paquete con forma de **pase de abordar** (código de ruta estilo aeropuerto, borde perforado), tipografía Fraunces + Work Sans + IBM Plex Mono.
- Header y footer idénticos y coherentes en todas las páginas (antes tenían enlaces rotos y estructuras distintas).
- Menú responsive con botón hamburguesa en móvil.
- Se quitó el `alert()` molesto al cargar la página y las referencias a video/audio que no existían en el proyecto original.

**Contenido para que se vea como agencia real**
- 8 paquetes turísticos con precio, noches, qué incluye y tipo de viajero (solo, pareja, familia, grupo, tercera edad) — tal como pediste originalmente.
- Sección "Por qué viajar con nosotros", testimonios, estadísticas de la agencia, franja de confianza (asistencia médica, pagos en cuotas, soporte 24/7).
- Página **Nosotros** con historia, valores y equipo (antes tenía contenido de ofertas duplicado con Paquetes).
- Newsletter, botón flotante de WhatsApp conservado y mejorado.

**Funcionalidad nueva (antes no existía)**
- Buscador en el home que lleva al catálogo con el destino ya filtrado.
- Filtros reales en Paquetes: por tipo de viajero, por categoría y por texto.
- Modal de reserva por paquete, con formulario validado (nombre, correo, teléfono, fecha, viajeros).
- Formulario de contacto con validación real en el navegador y envío al servidor.
- Backend PHP + MySQL **funcional** (antes los archivos `php/*.php` y `login.html`/`register.html` estaban completamente vacíos):
  - `php/conexion.php` — conexión PDO.
  - `php/register.php` — crea usuarios con contraseña cifrada (`password_hash`).
  - `php/login.php` — valida credenciales, abre sesión y cookie para mostrar el nombre en el menú.
  - `php/cerrar_sesion.php` — cierra sesión.
  - `php/contacto.php` — guarda los mensajes del formulario de contacto en la base de datos.
  - `php/reservar.php` — guarda las solicitudes de reserva del modal de paquetes.
  - `sql/script.sql` — crea la base de datos y las tablas `usuarios`, `mensajes_contacto`, `reservas`.

## Cómo probarlo (necesitas XAMPP o similar para la parte de login/registro/formularios)

1. Instala [XAMPP](https://www.apachefriends.org/) (incluye Apache + PHP + MySQL).
2. Copia esta carpeta completa dentro de `htdocs` (por ejemplo `C:\xampp\htdocs\viajes-inolvidables`).
3. Abre XAMPP Control Panel y arranca **Apache** y **MySQL**.
4. Entra a `http://localhost/phpmyadmin`, crea una nueva pestaña SQL e importa el archivo `sql/script.sql` (o pégalo y ejecútalo).
5. Abre el sitio en `http://localhost/viajes-inolvidables/index.html`.
6. Para probar login: entra a **Crear cuenta**, regístrate, y luego inicia sesión con ese mismo correo — el menú superior cambiará a "Hola, [tu nombre]".

Si solo quieres ver el diseño y la navegación (sin login/formularios funcionando), puedes abrir `index.html` directamente con doble clic — todo lo visual y los filtros de paquetes funcionan sin servidor. Los formularios de contacto/reserva mostrarán un mensaje de confirmación igual, pero no guardarán nada en base de datos sin PHP corriendo.

## Estructura

```
├── index.html          Inicio
├── paquetes.html        Catálogo con filtros + reserva
├── nosotros.html        Historia, equipo, valores
├── contactenos.html     Formulario de contacto
├── login.html / register.html
├── css/                 base.css (sistema de diseño) + un archivo por página
├── js/                  data.js (paquetes), main.js, paquetes.js, contacto.js, auth.js
├── php/                 backend (conexión, login, registro, contacto, reservas)
├── sql/script.sql       esquema de base de datos
└── img/logo.png
```

## Siguientes pasos sugeridos (si quieres seguir mejorándolo)

- Reemplazar las fotos de stock de `js/data.js` por fotos propias de los destinos/hoteles reales.
- Agregar un panel donde el usuario logueado vea el estado de sus reservas (`SELECT * FROM reservas WHERE usuario_id = ...`).
- Agregar pasarela de pagos real (ej. Wompi o PayU) si van a cobrar en línea.
