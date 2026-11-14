const projects = {
  oficina: {
    title: "OficinaPro",
    symbol: "OP",
    label: "Desktop · Gestão automotiva",
    text: "Gestão para oficinas e autopeças: clientes, veículos, orçamentos, estoque e financeiro em um só sistema.",
    metrics: ["Estoque", "Orçamentos", "Financeiro"],
    anchor: "#oficinapro"
  },
  trufas: {
    title: "Trufas Ponta Negra",
    symbol: "TPN",
    label: "Web · Comércio local",
    text: "Vitrine comercial com pedidos online, retirada ou delivery, Pix manual, WhatsApp e painel para a operação do negócio.",
    metrics: ["Pedidos online", "Área do cliente", "Gestão"],
    anchor: "#trufas"
  },
  nailflow: {
    title: "NailFlow",
    symbol: "NF",
    label: "Web · Beleza e agendamentos",
    text: "Plataforma para clientes e profissionais de unhas, com vitrine pública, catálogo de serviços, agenda e painel profissional.",
    metrics: ["Agenda online", "Vitrine pública", "Painel"],
    anchor: "#nailflow"
  }
};

const preview = document.querySelector("#project-preview");
const controls = document.querySelectorAll("[data-project]");
const header = document.querySelector("#site-header");
const progressBar = document.querySelector("#scroll-progress-bar");
const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
const finePointer = window.matchMedia("(pointer: fine)").matches;

controls.forEach((button) => {
  button.addEventListener("click", () => {
    const project = projects[button.dataset.project];
    if (!preview || !project) return;

    controls.forEach((item) => {
      const selected = item === button;
      item.classList.toggle("active", selected);
      item.setAttribute("aria-pressed", String(selected));
    });

    if (!reducedMotion && preview.animate) {
      preview.animate(
        [{ opacity: 1, transform: "translateY(0)" }, { opacity: .78, transform: "translateY(4px)" }, { opacity: 1, transform: "translateY(0)" }],
        { duration: 360, easing: "cubic-bezier(.22, 1, .36, 1)" }
      );
    }

    preview.dataset.theme = button.dataset.project;
    preview.querySelector("h2").textContent = project.title;
    preview.querySelector(".preview-kicker").textContent = project.label;
    preview.querySelector(".preview-description").textContent = project.text;

    const symbol = preview.querySelector(".preview-symbol");
    const name = document.createElement("span");
    name.textContent = project.title;
    symbol.replaceChildren(document.createTextNode(project.symbol), name);

    const metrics = project.metrics.map((metric) => {
      const item = document.createElement("span");
      item.textContent = metric;
      return item;
    });
    preview.querySelector(".preview-metrics").replaceChildren(...metrics);
    preview.querySelector(".preview-link").setAttribute("href", project.anchor);
  });
});

let scrollScheduled = false;
const updateScrollState = () => {
  if (scrollScheduled) return;
  scrollScheduled = true;
  window.requestAnimationFrame(() => {
    const scrollable = document.documentElement.scrollHeight - window.innerHeight;
    const progress = scrollable > 0 ? Math.min(window.scrollY / scrollable, 1) : 0;
    if (progressBar) progressBar.style.width = `${progress * 100}%`;
    if (header) header.classList.toggle("is-scrolled", window.scrollY > 18);
    scrollScheduled = false;
  });
};
window.addEventListener("scroll", updateScrollState, { passive: true });
window.addEventListener("resize", updateScrollState, { passive: true });
updateScrollState();

const revealItems = document.querySelectorAll(".reveal");
if (!reducedMotion && "IntersectionObserver" in window && revealItems.length) {
  document.documentElement.classList.add("motion-ready");
  const revealObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      entry.target.classList.add("is-visible");
      observer.unobserve(entry.target);
    });
  }, { threshold: .14, rootMargin: "0px 0px -35px 0px" });
  revealItems.forEach((item) => revealObserver.observe(item));
} else {
  revealItems.forEach((item) => item.classList.add("is-visible"));
}

const showcase = document.querySelector(".showcase-panel");
if (showcase && finePointer && !reducedMotion) {
  showcase.addEventListener("pointermove", (event) => {
    const bounds = showcase.getBoundingClientRect();
    const x = (event.clientX - bounds.left) / bounds.width - .5;
    const y = (event.clientY - bounds.top) / bounds.height - .5;
    showcase.style.setProperty("--tilt-x", `${(-y * 2.2).toFixed(2)}deg`);
    showcase.style.setProperty("--tilt-y", `${(x * 2.2).toFixed(2)}deg`);
  });
  showcase.addEventListener("pointerleave", () => {
    showcase.style.setProperty("--tilt-x", "0deg");
    showcase.style.setProperty("--tilt-y", "0deg");
  });
}

if (finePointer && !reducedMotion) {
  document.querySelectorAll(".magnetic").forEach((element) => {
    element.addEventListener("pointermove", (event) => {
      const bounds = element.getBoundingClientRect();
      const x = Math.max(-5, Math.min(5, (event.clientX - bounds.left - bounds.width / 2) * .08));
      const y = Math.max(-4, Math.min(4, (event.clientY - bounds.top - bounds.height / 2) * .08));
      element.style.setProperty("--mag-x", `${x.toFixed(1)}px`);
      element.style.setProperty("--mag-y", `${y.toFixed(1)}px`);
    });
    element.addEventListener("pointerleave", () => {
      element.style.setProperty("--mag-x", "0px");
      element.style.setProperty("--mag-y", "0px");
    });
  });
}
