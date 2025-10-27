import data from './data.json';

document.addEventListener("DOMContentLoaded", function () {
  console.log("DOM carregado!");

  /* Header */

  const toggleButton = document.getElementById('menu-toggle');
  const menu = document.getElementById('menu');

  toggleButton.addEventListener('click', () => {
    menu.classList.toggle('hidden');
  });

  const navbar = document.getElementById('navbar');
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


  const beneficios = data.beneficios

  beneficios.forEach(beneficio =>{
    console.log(beneficio)
  })
});
