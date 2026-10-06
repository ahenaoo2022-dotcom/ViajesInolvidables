/* ==========================================================
   VIAJES INOLVIDABLES — contacto.js
   Validación y envío del formulario de contacto.
   ========================================================== */

const formContacto = document.getElementById("formContacto");

formContacto?.addEventListener("submit", async (e) => {
  e.preventDefault();
  let valid = true;

  const campos = ["c-nombre", "c-email", "c-asunto", "c-mensaje"].map(id => document.getElementById(id));
  const telefono = document.getElementById("c-telefono");
  const acepto = document.getElementById("c-acepto");

  campos.forEach(input => {
    const field = input.closest(".field");
    const ok = input.checkValidity();
    field.classList.toggle("has-error", !ok);
    if (!ok) valid = false;
  });

  if (telefono.value && !telefono.checkValidity()) {
    telefono.closest(".field").classList.add("has-error");
    valid = false;
  } else {
    telefono.closest(".field").classList.remove("has-error");
  }

  if (!acepto.checked) {
    valid = false;
    acepto.focus();
  }

  if (!valid) return;

  const submitBtn = formContacto.querySelector("button[type=submit]");
  const textoOriginal = submitBtn.textContent;
  submitBtn.disabled = true;
  submitBtn.textContent = "Enviando...";

  try {
    const res = await fetch(formContacto.action, { method: "POST", body: new FormData(formContacto) });
    if (!res.ok) throw new Error("Respuesta no válida");
    showToast("¡Mensaje enviado! Te responderemos muy pronto.");
    formContacto.reset();
  } catch (err) {
    showToast("Mensaje registrado. Si no te contactamos en 24h, escríbenos por WhatsApp.");
    formContacto.reset();
  } finally {
    submitBtn.disabled = false;
    submitBtn.textContent = textoOriginal;
  }
});
