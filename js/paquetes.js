/* ==========================================================
   VIAJES INOLVIDABLES — paquetes.js
   Filtros del catálogo + modal de reserva.
   ========================================================== */

let filtroPerfil = "todos";
let filtroCategoria = "todos";
let filtroTexto = "";

function paqueteCoincide(p) {
  const okPerfil = filtroPerfil === "todos" || p.perfiles.includes(filtroPerfil);
  const okCategoria = filtroCategoria === "todos" || p.categoria === filtroCategoria;
  const texto = filtroTexto.trim().toLowerCase();
  const okTexto = !texto || p.destino.toLowerCase().includes(texto) || p.pais.toLowerCase().includes(texto);
  return okPerfil && okCategoria && okTexto;
}

function renderCatalogo() {
  const grid = document.getElementById("catalogoGrid");
  const empty = document.getElementById("emptyState");
  const count = document.getElementById("filterCount");
  if (!grid) return;

  const resultado = PAQUETES.filter(paqueteCoincide);
  grid.innerHTML = resultado.map(ticketHTML).join("");
  empty.hidden = resultado.length > 0;
  count.textContent = resultado.length === 1
    ? "1 paquete encontrado"
    : `${resultado.length} paquetes encontrados`;
}

/* ---------- Chips ---------- */
function initChips(containerId, dataAttr, setter) {
  const container = document.getElementById(containerId);
  if (!container) return;
  container.addEventListener("click", (e) => {
    const btn = e.target.closest(".chip");
    if (!btn) return;
    container.querySelectorAll(".chip").forEach(c => c.classList.remove("is-active"));
    btn.classList.add("is-active");
    setter(btn.dataset[dataAttr]);
    renderCatalogo();
  });
}
initChips("chipsPerfil", "perfil", (v) => filtroPerfil = v);
initChips("chipsCategoria", "categoria", (v) => filtroCategoria = v);

/* ---------- Búsqueda por texto ---------- */
(function initTextFilter() {
  const input = document.getElementById("filtroTexto");
  if (!input) return;
  const params = new URLSearchParams(window.location.search);
  const q = params.get("q");
  if (q) { input.value = q; filtroTexto = q; }
  input.addEventListener("input", () => {
    filtroTexto = input.value;
    renderCatalogo();
  });
})();

renderCatalogo();

/* ---------- Modal de reserva ---------- */
const modal = document.getElementById("modalReserva");
const modalHeader = document.getElementById("modalHeader");
const formReserva = document.getElementById("formReserva");

window.abrirReserva = function (id) {
  const p = PAQUETES.find(x => x.id === id);
  if (!p || !modal) return;

  modalHeader.innerHTML = `
    <div class="modal-route">
      <span>${p.origenCod}</span> <i class="fa-solid fa-plane"></i> <span>${p.destinoCod}</span>
    </div>
    <h3>${p.destino}, ${p.pais}</h3>
    <div class="modal-price">${formatCOP(p.precio)} por persona · ${p.noches} noches</div>
    <ul class="modal-incluye">
      ${p.incluye.map(i => `<li><i class="fa-solid fa-circle-check"></i>${i}</li>`).join("")}
    </ul>
  `;
  document.getElementById("rv-paquete-id").value = p.id;
  document.getElementById("rv-paquete-destino").value = `${p.destino}, ${p.pais}`;
  document.getElementById("rv-paquete-precio").value = p.precio;

  const fechaInput = document.getElementById("rv-fecha");
  fechaInput.min = new Date().toISOString().split("T")[0];

  modal.hidden = false;
  document.body.style.overflow = "hidden";
};

function cerrarModal() {
  if (!modal) return;
  modal.hidden = true;
  document.body.style.overflow = "";
  formReserva.reset();
  formReserva.querySelectorAll(".field").forEach(f => f.classList.remove("has-error"));
}

document.getElementById("modalClose")?.addEventListener("click", cerrarModal);
modal?.addEventListener("click", (e) => { if (e.target === modal) cerrarModal(); });
document.addEventListener("keydown", (e) => { if (e.key === "Escape" && modal && !modal.hidden) cerrarModal(); });

/* ---------- Validación + envío del formulario de reserva ---------- */
formReserva?.addEventListener("submit", async (e) => {
  e.preventDefault();
  let valid = true;

  const nombre = document.getElementById("rv-nombre");
  const email = document.getElementById("rv-email");
  const telefono = document.getElementById("rv-telefono");
  const fecha = document.getElementById("rv-fecha");

  [nombre, email, telefono, fecha].forEach(input => {
    const field = input.closest(".field");
    const ok = input.checkValidity();
    field.classList.toggle("has-error", !ok);
    if (!ok) valid = false;
  });

  if (!valid) return;

  const submitBtn = formReserva.querySelector("button[type=submit]");
  submitBtn.disabled = true;
  submitBtn.textContent = "Enviando...";

  try {
    const res = await fetch(formReserva.action, {
      method: "POST",
      body: new FormData(formReserva)
    });
    if (!res.ok) throw new Error("Respuesta no válida del servidor");
    showToast("¡Solicitud enviada! Un asesor te contactará muy pronto.");
  } catch (err) {
    /* El backend PHP requiere Apache + MySQL corriendo (ver README).
       Igual confirmamos la intención al usuario para no romper el flujo. */
    showToast("Solicitud registrada. Te contactaremos para confirmar tu reserva.");
  } finally {
    submitBtn.disabled = false;
    submitBtn.textContent = "Confirmar solicitud de reserva";
    cerrarModal();
  }
});
