(function() {
  const navMenu = document.getElementById('menu');
  const btnMenu = document.getElementById('btn-menu');
  const listaMenu = document.getElementById('lista-menu');

  if (!navMenu || !btnMenu || !listaMenu) return;

  navMenu.classList.add('menu-js');

  function definirEstadoMenu(aberto) {
    listaMenu.classList.toggle('aberto', aberto);
    btnMenu.setAttribute('aria-expanded', String(aberto));
  }

  btnMenu.addEventListener('click', function() {
    const estaAberto = btnMenu.getAttribute('aria-expanded') === 'true';
    definirEstadoMenu(!estaAberto);
  });

  document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape' && btnMenu.getAttribute('aria-expanded') === 'true') {
      definirEstadoMenu(false);
      btnMenu.focus();
    }
  });

  listaMenu.querySelectorAll('a').forEach(function(link) {
    link.addEventListener('click', function() {
      definirEstadoMenu(false);
    });
  });

  const mediaAcimaMobile = window.matchMedia('(min-width: 601px)');
  mediaAcimaMobile.addEventListener('change', function(e) {
    if (e.matches) {
      definirEstadoMenu(false);
    }
  });
})();
