(function() {
  let slideAtual = 0;
  const trilho = document.getElementById('trilho-carrossel');
  if (!trilho) return;

  const indicador = document.getElementById('indicador-carrossel');
  const totalSlides = trilho.querySelectorAll('.slide').length || 3;

  function moverSlide(direcao) {
    slideAtual = (slideAtual + direcao + totalSlides) % totalSlides;
    trilho.style.transform = `translateX(-${slideAtual * 100}%)`;
    if (indicador) {
      indicador.textContent = (slideAtual + 1) + ' / ' + totalSlides;
    }
  }

  document.getElementById('btn-ant')?.addEventListener('click', function() {
    moverSlide(-1);
  });

  document.getElementById('btn-prox')?.addEventListener('click', function() {
    moverSlide(1);
  });
})();

