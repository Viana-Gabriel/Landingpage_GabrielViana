import data from "./data.json";

document.addEventListener("DOMContentLoaded", function () {
  console.log("DOM carregado!");

  /* Header */

  const toggleButton = document.getElementById("menu-toggle");
  const menu = document.getElementById("menu");

  toggleButton.addEventListener("click", () => {
    menu.classList.toggle("hidden");
  });

  const navbar = document.getElementById("navbar");
  const SCROLL_LIMIT = 20;
  const DESKTOP_WIDTH = 992;

  updateNavbar();
  window.addEventListener("scroll", updateNavbar, { passive: true });
  window.addEventListener("resize", updateNavbar);

  function updateNavbar() {
    const isDesktop = window.innerWidth >= DESKTOP_WIDTH;
    const scrolled = window.scrollY > SCROLL_LIMIT;

    if (!isDesktop) {
      navbar.classList.add("navbar-scrolled");
      return;
    }

    if (scrolled) {
      navbar.classList.add("navbar-scrolled");
    } else {
      navbar.classList.remove("navbar-scrolled");
    }
  }

  const beneficios = data.beneficios;
  const beneficiosContainer = document.getElementById("beneficios_container");

  beneficios.forEach((beneficio) => {
    beneficiosContainer.innerHTML += `
       <div class="bg-white-ice p-6 rounded-lg shadow text-center">
        <div class="bg-blue text-white-ice w-[70px] h-[70px] mx-auto rounded-full flex items-center justify-center mb-4">
          <img src="/assets/icons/beneficios/0${beneficio.id}.svg" alt="Icone ${beneficio.title}" loading = "lazy">
        </div>
        <h3 class="font-semibold text-lg mb-2">${beneficio.title}</h3>
        <p class="text-black-text text-sm">${beneficio.description}</p>
      </div>
    `;
  });

  const tecnologias = data.tecnologias;
  const tecnologiasContainer = document.getElementById("tecnologias_container");

  tecnologias.forEach((tecnologia) => {
    tecnologiasContainer.innerHTML += `
        <div>
          <img src="/assets/icons/tecnologias/0${tecnologia.id}.svg" alt="Icone ${tecnologia.alt}" loading = "lazy">
        </div>
      
    `;
  });

  const servicos = data.servicos;
  const servicosContainer = document.getElementById("servicos_container");

  servicos.forEach((servico) => {
    servicosContainer.innerHTML += `
    <div class="relative bg-white rounded-xl overflow-hidden cursor-pointer border border-transparent transition-all duration-300 ease-in-out card-servico">
      <img src="/assets/images/servicos/0${servico.id}.webp" alt="${servico.title}" loading="lazy">
      <div class="card-overlay"></div>
      <div class="absolute inset-0 flex flex-col justify-center items-center text-white p-6 transition-all duration-400 ease-in-out card-content">
        <h3 class="text-white-ice">${servico.title}</h3>
        <p class="text-white-ice">
          ${servico.description}
        </p>
      </div>
    </div>

  `;
  });
});
