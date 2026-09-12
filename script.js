const projects = {
  oficina: {
    title: "OficinaPro", symbol: "OP", label: "Desktop · Em desenvolvimento",
    text: "Gestão para oficinas e autopeças: clientes, veículos, orçamentos, estoque e financeiro em um só sistema.",
    metrics: ["Estoque", "Orçamentos", "Financeiro"], anchor: "#oficinapro"
  },
  trufas: {
    title: "Trufas Ponta Negra", symbol: "TPN", label: "Web · Comércio local",
    text: "Vitrine comercial com pedidos online, retirada ou delivery, Pix manual, WhatsApp e painel para a operação do negócio.",
    metrics: ["Pedidos online", "Área do cliente", "Gestão"], anchor: "#trufas"
  },
  nailflow: {
    title: "NailFlow", symbol: "NF", label: "Web · Beleza e agendamentos",
    text: "Plataforma para clientes e profissionais de unhas, com vitrine pública, catálogo de serviços, agenda e painel profissional.",
    metrics: ["Agenda online", "Vitrine pública", "Painel"], anchor: "#nailflow"
  }
};

const preview = document.querySelector("#project-preview");
const controls = document.querySelectorAll("[data-project]");

controls.forEach((button) => {
  button.addEventListener("click", () => {
    const key = button.dataset.project;
    const project = projects[key];
    if (!preview || !project) return;

    controls.forEach((item) => {
      item.classList.toggle("active", item === button);
      item.setAttribute("aria-pressed", String(item === button));
    });
    preview.dataset.theme = key;
    preview.querySelector("h2").textContent = project.title;
    preview.querySelector(".preview-kicker").textContent = project.label;
    preview.querySelector(".preview-description").textContent = project.text;
    const symbol = preview.querySelector(".preview-symbol");
    const name = document.createElement("span");
    name.textContent = project.title;
    symbol.replaceChildren(document.createTextNode(project.symbol), name);
    preview.querySelector(".preview-metrics").replaceChildren(...project.metrics.map((metric) => {
      const item = document.createElement("span");
      item.textContent = metric;
      return item;
    }));
    preview.querySelector(".preview-link").setAttribute("href", project.anchor);
  });
});
