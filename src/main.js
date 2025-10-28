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
    <div class="group relative rounded-xl overflow-hidden cursor-pointer transition-all duration-300 shadow-lg ">
      <img 
        src="/assets/images/servicos/0${servico.id}.webp" 
        alt="${servico.title}" 
        class="w-full h-96 object-cover transition-transform duration-300 group-hover:scale-105 group-active:scale-105"
        loading = "lazy"
      />
      <div class="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent opacity-0 group-hover:opacity-100 group-active:opacity-100 transition-opacity duration-300"></div>

      <div class="absolute inset-0 flex flex-col items-center justify-center px-4 text-white transition-all duration-300">
        <h3 class="text-xl font-semibold mb-3">${servico.title}</h3>
        <p class="opacity-0 group-hover:opacity-100 group-active:opacity-100 text-sm leading-relaxed transition-opacity duration-300 max-w-md">
          ${servico.description}
        </p>
      </div>
    </div>
  `;
  });
});
