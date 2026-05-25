document.addEventListener("DOMContentLoaded", () => {
  // ===== REPRODUCIR AUDIO =====
  const audio = new Audio();
  audio.loop = true;
  audio.volume = 0.5;
  
  // Probar diferentes rutas hasta que funcione
  // Desde escaleras/justicia.html, subimos un nivel a TFinal/
  audio.src = "../audio/justicia.wav";  // O .mp3, según tengas
  
  // Botón manual (obligatorio por políticas del navegador)
  const audioBtn = document.createElement('button');
  audioBtn.innerHTML = '🔊 Activar audio';
  audioBtn.style.cssText = `
    position: fixed;
    bottom: 20px;
    right: 20px;
    z-index: 10000;
    padding: 10px 20px;
    background: #1a1a2e;
    color: #eebd53;
    border: 2px solid #eebd53;
    border-radius: 30px;
    cursor: pointer;
    font-family: inherit;
    font-size: 14px;
  `;
  audioBtn.onclick = () => {
    audio.play();
    audioBtn.remove();
  };
  document.body.appendChild(audioBtn);
  
  // ===== INVENTARIO =====
  if (window.InventorySystem) {
    window.InventorySystem.addItemToInventory({
      id: "ruta-justicia",
      name: "Ruta: Justicia",
      description: "Erik acorrala a Terry y la confrontación escala hasta una amenaza mortal.",
      category: "ruta",
      rarity: 5
    });

    window.InventorySystem.addItemToInventory({
      id: "navaja-erik",
      name: "Navaja de Erik",
      description: "Arma con la que Erik intenta someter a Terry en el rellano.",
      category: "objeto",
      rarity: 5,
      icon: "../img/navaja.webp"
    });

    window.InventorySystem.initInventoryUI();
  }
});