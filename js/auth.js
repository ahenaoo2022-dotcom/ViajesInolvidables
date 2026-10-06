/* ==========================================================
   VIAJES INOLVIDABLES — auth.js
   Mostrar/ocultar contraseña + validación de login/registro.
   Los formularios SÍ se envían al servidor (php/login.php,
   php/register.php) para que la sesión/cookie quede activa.
   ========================================================== */

/* ---------- Mostrar / ocultar contraseña ---------- */
document.querySelectorAll(".pw-toggle").forEach(btn => {
  btn.addEventListener("click", () => {
    const target = document.getElementById(btn.dataset.target);
    if (!target) return;
    const isPwd = target.type === "password";
    target.type = isPwd ? "text" : "password";
    btn.innerHTML = isPwd ? '<i class="fa-solid fa-eye-slash"></i>' : '<i class="fa-solid fa-eye"></i>';
  });
});

/* ---------- Mensaje contextual en login según ?registered= / ?error= ---------- */
(function loginNotice() {
  const notice = document.getElementById("loginNotice");
  if (!notice) return;
  const params = new URLSearchParams(window.location.search);
  if (params.get("registrado") === "1") {
    notice.textContent = "Cuenta creada. Ya puedes ingresar con tu correo y contraseña.";
    notice.style.color = "var(--ok)";
  } else if (params.get("error") === "1") {
    notice.textContent = "Correo o contraseña incorrectos. Intenta de nuevo.";
    notice.style.color = "var(--brick)";
  }
})();

/* ---------- Validación de login ---------- */
document.getElementById("formLogin")?.addEventListener("submit", (e) => {
  let valid = true;
  const email = document.getElementById("li-email");
  const pass = document.getElementById("li-password");

  [email, pass].forEach(input => {
    const field = input.closest(".field");
    const ok = input.checkValidity();
    field.classList.toggle("has-error", !ok);
    if (!ok) valid = false;
  });

  if (!valid) e.preventDefault();
});

/* ---------- Validación de registro ---------- */
document.getElementById("formRegister")?.addEventListener("submit", (e) => {
  let valid = true;
  const nombre = document.getElementById("rg-nombre");
  const email = document.getElementById("rg-email");
  const telefono = document.getElementById("rg-telefono");
  const pass = document.getElementById("rg-password");
  const pass2 = document.getElementById("rg-password2");
  const terminos = document.getElementById("rg-terminos");

  [nombre, email, telefono, pass].forEach(input => {
    const field = input.closest(".field");
    const ok = input.checkValidity();
    field.classList.toggle("has-error", !ok);
    if (!ok) valid = false;
  });

  const pass2Field = pass2.closest(".field");
  const pass2Ok = pass2.checkValidity() && pass2.value === pass.value;
  pass2Field.classList.toggle("has-error", !pass2Ok);
  if (!pass2Ok) valid = false;

  if (!terminos.checked) {
    valid = false;
    terminos.focus();
  }

  if (!valid) e.preventDefault();
});
