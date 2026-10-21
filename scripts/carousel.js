(function() {
  let slideAtual = 0;
  const trilho = document.getElementById('trilho-carrossel');
  if (!trilho) return;

  const totalSlides = 3;

  function moverSlide(direcao) {
    slideAtual = (slideAtual + direcao + totalSlides) % totalSlides;
    trilho.style.transform = `translateX(-${slideAtual * 100}%)`;
  }

  document.getElementById('btn-ant')?.addEventListener('click', function() {
    moverSlide(-1);
  });

  document.getElementById('btn-prox')?.addEventListener('click', function() {
    moverSlide(1);
  });
})();

