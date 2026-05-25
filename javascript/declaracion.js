function toggleDeclaracion() {
  var contenido = document.getElementById('declaracionContent');
  var btn = document.getElementById('toggleBtn');
  
  if (contenido.classList.contains('abierto')) {
    contenido.classList.remove('abierto');
    btn.innerHTML = 'Leer más ▼';
  } else {
    contenido.classList.add('abierto');
    btn.innerHTML = 'Leer menos ▲';
  }
}