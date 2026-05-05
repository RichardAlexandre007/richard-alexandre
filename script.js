const projects = {
  trufas: {
    title: "Trufas Ponta Negra",
    text:
      "Vitrine comercial com pedidos online, Pix manual, WhatsApp e painel administrativo para operação do negócio.",
    metrics: ["Full stack", "Pedidos online", "Painel admin"],
    theme:
      "linear-gradient(180deg, rgba(7, 8, 9, 0.05), rgba(7, 8, 9, 0.82)), radial-gradient(circle at 22% 22%, rgba(215, 166, 75, 0.86) 0 12%, transparent 13%), radial-gradient(circle at 76% 24%, rgba(255, 255, 255, 0.16), transparent 18%), linear-gradient(135deg, #21140a, #5f1f31 45%, #0b423f)"
  },
  nailflow: {
    title: "NailFlow",
    text:
      "Plataforma de agendamento para clientes e profissionais de unhas, com vitrine pública, serviços, agenda e painel profissional.",
    metrics: ["Agenda online", "Vitrine pública", "SQLite e admin"],
    theme:
      "linear-gradient(180deg, rgba(7, 8, 9, 0.05), rgba(7, 8, 9, 0.82)), radial-gradient(circle at 72% 20%, rgba(244, 223, 171, 0.72) 0 10%, transparent 11%), radial-gradient(circle at 24% 72%, rgba(61, 214, 177, 0.22), transparent 20%), linear-gradient(135deg, #241125, #7c263d 45%, #422009)"
  }
};

const glow = document.querySelector(".cursor-glow");

window.addEventListener("pointermove", (event) => {
  if (!glow) return;
  glow.style.opacity = "1";
  glow.style.transform = `translate(${event.clientX - 210}px, ${event.clientY - 210}px)`;
});

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
      }
    });
  },
  { threshold: 0.12 }
);

document.querySelectorAll(".reveal").forEach((element) => observer.observe(element));

const preview = document.querySelector("#project-preview");
const controls = document.querySelectorAll("[data-project]");

controls.forEach((button) => {
  button.addEventListener("click", () => {
    const project = projects[button.dataset.project];
    if (!preview || !project) return;

    controls.forEach((item) => item.classList.toggle("active", item === button));
    preview.classList.add("is-changing");

    window.setTimeout(() => {
      preview.style.background = project.theme;
      preview.querySelector("h2").textContent = project.title;
      preview.querySelector("p:not(.preview-kicker)").textContent = project.text;
      preview.querySelector(".preview-metrics").innerHTML = project.metrics
        .map((metric) => {
          const [first, ...rest] = metric.split(" ");
          return `<span><strong>${first}</strong> ${rest.join(" ")}</span>`;
        })
        .join("");
      preview.classList.remove("is-changing");
    }, 150);
  });
});

document.querySelectorAll("[data-tilt]").forEach((card) => {
  card.addEventListener("pointermove", (event) => {
    const rect = card.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;
    const rotateX = ((y / rect.height) - 0.5) * -7;
    const rotateY = ((x / rect.width) - 0.5) * 7;
    card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-4px)`;
  });

  card.addEventListener("pointerleave", () => {
    card.style.transform = "";
  });
});
