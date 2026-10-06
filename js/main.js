/* ==========================================================
   VIAJES INOLVIDABLES — main.js
   Comportamiento compartido en todas las páginas.
   ========================================================== */

/* ---------- Utilidades ---------- */
function formatCOP(valor) {
  return valor.toLocaleString("es-CO", { style: "currency", currency: "COP", maximumFractionDigits: 0 });
}

function getCookie(name) {
  const match = document.cookie.match(new RegExp("(?:^|; )" + name + "=([^;]*)"));
  return match ? decodeURIComponent(match[1]) : null;
}

function showToast(msg, ms = 3200) {
  const toast = document.getElementById("toast");
  if (!toast) return;
  toast.textContent = msg;
  toast.classList.add("show");
  clearTimeout(showToast._t);
  showToast._t = setTimeout(() => toast.classList.remove("show"), ms);
}

/* Fallback silencioso si una imagen de stock no carga */
document.addEventListener("error", (e) => {
  const el = e.target;
  if (el.tagName === "IMG" && !el.dataset.fallbackApplied) {
    el.dataset.fallbackApplied = "1";
    el.src = "https://images.unsplash.com/photo-1488646953014-85cb44e25828?auto=format&fit=crop&w=900&q=80";
  }
}, true);

/* ---------- Menú móvil ---------- */
(function initNavToggle() {
  const toggle = document.getElementById("navToggle");
  const nav = document.getElementById("mainNav");
  if (!toggle || !nav) return;
  toggle.addEventListener("click", () => {
    const open = nav.classList.toggle("open");
    toggle.setAttribute("aria-expanded", open ? "true" : "false");
  });
  nav.querySelectorAll("a").forEach(a => a.addEventListener("click", () => {
    nav.classList.remove("open");
    toggle.setAttribute("aria-expanded", "false");
  }));
})();

/* ---------- Estado de sesión (cookie establecida por php/login.php) ---------- */
(function initAuthState() {
  const nombre = getCookie("vi_user");
  const guestEls = document.querySelectorAll('[data-auth="guest"]');
  const navAuth = document.getElementById("navAuth");
  if (!navAuth) return;
  if (nombre) {
    guestEls.forEach(el => el.style.display = "none");
    if (!document.getElementById("userChip")) {
      const chip = document.createElement("div");
      chip.id = "userChip";
      chip.className = "user-chip-wrap";
      chip.innerHTML = `
        <span class="user-chip"><i class="fa-solid fa-user"></i> Hola, ${nombre.split(" ")[0]}</span>
        <a href="php/cerrar_sesion.php" class="btn btn-outline">Cerrar sesión</a>
      `;
      chip.style.display = "flex";
      chip.style.gap = "10px";
      chip.style.alignItems = "center";
      navAuth.appendChild(chip);
    }
  }
})();

/* ---------- Año en footer ---------- */
document.querySelectorAll("#year").forEach(el => el.textContent = new Date().getFullYear());

/* ---------- Reveal on scroll ---------- */
(function initReveal() {
  const targets = document.querySelectorAll(".reveal");
  if (!("IntersectionObserver" in window) || targets.length === 0) {
    targets.forEach(t => t.classList.add("is-visible"));
    return;
  }
  const io = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
        io.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15 });
  targets.forEach(t => io.observe(t));
})();

/* ---------- Render de tickets (destinos destacados / catálogo) ---------- */
function ticketHTML(p) {
  const perfilLabels = {
    "solo": "Solo/a", "pareja": "Pareja", "familia": "Familia",
    "grupo": "Grupo", "tercera-edad": "Tercera edad"
  };
  const tags = p.perfiles.map(k => `<span class="tag">${perfilLabels[k] || k}</span>`).join("");
  return `
    <article class="ticket reveal" data-id="${p.id}" data-categoria="${p.categoria}" data-perfiles="${p.perfiles.join(",")}">
      <div class="ticket-main">
        <img class="ticket-photo" src="${p.img}" alt="${p.destino}, ${p.pais}" loading="lazy">
        <div class="ticket-route">
          <span class="code">${p.origenCod}</span>
          <span class="dash"></span>
          <i class="fa-solid fa-plane"></i>
          <span class="dash"></span>
          <span class="code">${p.destinoCod}</span>
        </div>
        <h3 class="ticket-title">${p.destino}, ${p.pais}</h3>
        <p style="font-size:0.9rem;margin-bottom:10px;">${p.resumen}</p>
        <div class="ticket-meta">
          <span><i class="fa-regular fa-moon"></i> ${p.noches} noches</span>
          <span><i class="fa-solid fa-tag"></i> ${p.categoria}</span>
        </div>
        <div class="ticket-tags">${tags}</div>
      </div>
      <div class="ticket-stub">
        <div>
          <span class="price-label">Desde</span>
          <div class="price">${formatCOP(p.precio)}<small>por persona</small></div>
        </div>
        <button class="btn btn-primary" type="button" onclick="window.abrirReserva && window.abrirReserva('${p.id}')">
          Reservar
        </button>
      </div>
    </article>
  `;
}

/* ---------- Home: destinos destacados ---------- */
(function renderDestacados() {
  const grid = document.getElementById("destinosGrid");
  if (!grid || typeof PAQUETES === "undefined") return;
  const destacados = PAQUETES.filter(p => p.destacado).slice(0, 6);
  grid.innerHTML = destacados.map(ticketHTML).join("");
})();

/* ---------- Home: buscador (redirige a paquetes.html con filtros) ---------- */
(function initSearchWidget() {
  const form = document.getElementById("searchWidget");
  if (!form) return;
  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const destino = document.getElementById("sw-destino").value.trim();
    const params = new URLSearchParams();
    if (destino) params.set("q", destino);
    window.location.href = "paquetes.html" + (params.toString() ? "?" + params.toString() : "");
  });
})();

/* ---------- Newsletter (home) ---------- */
(function initNewsletter() {
  const form = document.getElementById("newsletterForm");
  if (!form) return;
  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const input = form.querySelector("input[type=email]");
    showToast(`¡Listo! Te escribiremos ofertas a ${input.value}`);
    form.reset();
  });
})();
