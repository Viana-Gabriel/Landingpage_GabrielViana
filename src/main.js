import data from "./data.json";

document.addEventListener("DOMContentLoaded", function () {
  console.log("DOM carregado!");

  // Seleciona a seção do carousel
  const carouselSection = document.getElementById("depoimentos");

  // Cria um observer para detectar quando a seção entra na viewport
  const observer = new IntersectionObserver(
    (entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          // Cria a tag <link> do CSS dinamicamente
          const link = document.createElement("link");
          link.rel = "stylesheet";
          link.href =
            "https://cdn.jsdelivr.net/npm/swiper@10/swiper-bundle.min.css";
          document.head.appendChild(link);

          // Carrega o JS do swiper
          const script = document.createElement("script");
          script.src =
            "https://cdn.jsdelivr.net/npm/swiper@10/swiper-bundle.min.js";
          script.defer = true;

          // Inicializa o Swiper só quando o script terminar de carregar
          script.onload = () => {
            const swiperTerapia = new Swiper(".swiper-depoimentos", {
              slidesPerView: 3,
              spaceBetween: 50,
              centeredSlides: true,
              loop: true,
              loopedSlides: 2,
              speed: 1000,
              autoplay: {
                delay: 3000,
                disableOnInteraction: false,
              },
              breakpoints: {
                0: { slidesPerView: 1, centeredSlides: false },
                768: { slidesPerView: 2, centeredSlides: true },
                992: { slidesPerView: 3, centeredSlides: true },
              },
            });
          };

          document.body.appendChild(script);

          // Para de observar depois que carregou
          observer.unobserve(carouselSection);
        }
      });
    },
    { threshold: 0.1 }
  );

  observer.observe(carouselSection);

  /* Header */
  const toggleButton = document.getElementById("menu-toggle");
  const menu = document.getElementById("menu");
  const itemMenu = menu.querySelectorAll("li");
  const overlay = document.getElementById("menu-overlay");
  const navbar = document.getElementById("navbar");

  const SCROLL_LIMIT = 20;
  const DESKTOP_WIDTH = 992;

  /* --- MENU MOBILE --- */
  toggleButton.addEventListener("click", () => {
    const isOpen = !menu.classList.contains("hidden");

    if (isOpen) {
      closeMenu();
    } else {
      openMenu();
    }
  });

  overlay.addEventListener("click", closeMenu);

  itemMenu.forEach((item) => {
    item.addEventListener("click", closeMenu);
  });

  function openMenu() {
    menu.classList.remove("hidden");
    overlay.classList.remove("hidden");
    overlay.classList.remove("opacity-0");
    document.body.classList.add("overflow-hidden");
  }

  function closeMenu() {
    menu.classList.add("hidden");
    overlay.classList.add("opacity-0");
    setTimeout(() => overlay.classList.add("hidden"), 300);
    document.body.classList.remove("overflow-hidden");
  }

  /* --- NAVBAR SCROLL --- */
  updateNavbar();

  window.addEventListener("scroll", updateNavbar, { passive: true });
  window.addEventListener("resize", () => {
    updateNavbar();

    if (window.innerWidth >= DESKTOP_WIDTH) {
      closeMenu();
    }
  });

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
    <div class="group bg-white-ice p-6 rounded-lg shadow text-center transition-all duration-300 hover:bg-blue cursor-pointer">
      <div class="bg-blue text-white-ice w-[70px] h-[70px] mx-auto rounded-full flex items-center justify-center mb-4 transition-all duration-300 group-hover:bg-white-ice">
        <img 
          src="/assets/icons/beneficios/0${beneficio.id}.svg"
          alt="Ícone padrão ${beneficio.title}"
          class="block group-hover:hidden transition-all duration-500"
          loading="lazy"
        >
        <img 
          src="/assets/icons/beneficios/0${beneficio.id}-destaque.svg"
          alt="Ícone destaque ${beneficio.title}"
          class="hidden group-hover:block transition-all duration-500"
          loading="lazy"
        >
      </div>
      <h3 class="font-semibold text-lg mb-2 text-black-text transition-all duration-300 group-hover:text-white-ice">
        ${beneficio.title}
      </h3>
      <p class="text-black-text text-sm transition-all duration-300 group-hover:text-white-ice">
        ${beneficio.description}
      </p>
    </div>
  `;
  });

  const tecnologias = data.tecnologias;
  const tecnologiasContainer = document.getElementById("tecnologias_container");

  tecnologias.forEach((tecnologia) => {
    tecnologiasContainer.innerHTML += `
        <div>
          <img src="/assets/icons/tecnologias/0${tecnologia.id}.svg" alt="Icone ${tecnologia.alt}" loading="lazy">
        </div>
      
    `;
  });

  const servicos = data.servicos;
  const servicosContainer = document.getElementById("servicos_container");

  servicos.forEach((servico) => {
    servicosContainer.innerHTML += `
    <div class="relative bg-white rounded-xl overflow-hidden cursor-pointer border border-transparent transition-all duration-300 ease-in-out card-servico">
      <img src="#" alt="${servico.title}" loading="lazy">
      <div class="card-overlay"></div>
      <div class="absolute inset-0 flex flex-col justify-center items-center text-white p-6 transition-all duration-400 ease-in-out card-content">
        <h3 class="text-white-ice text-outline">${servico.title}</h3>
        <p class="text-white-ice">
          ${servico.description}
        </p>
      </div>
    </div>
  `;
  });

  const depoimentos = data.depoimentos;
  const depoimentosContainer = document.getElementById("depoimentos_container");

  depoimentos.forEach((depoimento) => {
    depoimentosContainer.innerHTML += `
        <div class="swiper-slide">
          <div class="bg-white rounded-2xl shadow-lg p-6 max-w-md mx-auto">
            <div class="flex items-center">
              <div class="w-12 h-12 bg-purple-100 rounded-full mr-4"></div>
              <div class="text-left">
                <h4 class="font-semibold text-gray-800">${depoimento.name}</h4>
                <div class="text-yellow-400 text-lg">
                  ${"★".repeat(depoimento.avaliation)}
                </div>
              </div>
            </div>
            <p class="text-gray-600 text-sm leading-relaxed whitespace-pre-line">
              ${depoimento.comentario}
            </p>
          </div>
        </div>
      `;
  });

  const perguntas = data.perguntas;
  const perguntasContainer = document.getElementById("perguntas_container");

  perguntas.forEach((pergunta) => {
    perguntasContainer.innerHTML += `
        <div class="accordion border border-[#0056B3] rounded-lg overflow-hidden">
                  <button
                    class="accordion-header w-full flex justify-between items-center bg-blue hover:bg-blue-destaque cursor-pointer text-white font-medium px-4 py-3 transition-colors duration-300"
                  >
                    <span>${pergunta.question}</span>
                    <svg
                      class="w-5 h-5 transform transition-transform duration-300"
                      fill="none"
                      stroke="currentColor"
                      stroke-width="2"
                      viewBox="0 0 24 24"
                    >
                      <path stroke-linecap="round" stroke-linejoin="round" d="M19 9l-7 7-7-7" />
                    </svg>
                  </button>

                  <div
                    class="accordion-content bg-white max-h-0 overflow-hidden transition-all duration-300 ease-in-out px-4"
                  >
                    <p class="py-3">
                      ${pergunta.response}
                    </p>
                  </div>
          </div>
      `;
  });

  const accordions = document.querySelectorAll(".accordion");

  accordions.forEach((accordion) => {
    const header = accordion.querySelector(".accordion-header");
    const content = accordion.querySelector(".accordion-content");
    const icon = header.querySelector("svg");

    header.addEventListener("click", () => {
      const isOpen = accordion.classList.contains("open");

      // Fecha todos os outros
      accordions.forEach((acc) => {
        acc.classList.remove("open");
        acc.querySelector(".accordion-content").style.maxHeight = null;
        acc.querySelector("svg").classList.remove("rotate-180");
        acc
          .querySelector(".accordion-header")
          .classList.remove("bg-blue-destaque");
      });

      // Se este não estava aberto, abre agora
      if (!isOpen) {
        accordion.classList.add("open");
        content.style.maxHeight = content.scrollHeight + "px";
        icon.classList.add("rotate-180");
        header.classList.add("bg-blue-destaque");
      } else {
        accordion.classList.remove("open");
        content.style.maxHeight = null;
        icon.classList.remove("rotate-180");
        header.classList.remove("bg-blue-destaque");
      }
    });
  });

  // Serve para deixar o ano dinamico no rodapé

  const labelAno = document.querySelector("#ano");
  const anoAtual = new Date().getFullYear();

  labelAno.innerText = anoAtual;
});
