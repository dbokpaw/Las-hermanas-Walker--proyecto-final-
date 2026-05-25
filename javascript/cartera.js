document.addEventListener("DOMContentLoaded", () => {
  // Esperar a que InventorySystem esté disponible
  const waitForInventory = setInterval(() => {
    if (window.InventorySystem) {
      clearInterval(waitForInventory);
      
      console.log("InventorySystem encontrado, añadiendo items...");
      
      // Llave del primer cajón
      window.InventorySystem.addItemToInventory({
        id: "llave-primer-cajon",
        name: "Llave del primer cajón",
        description: "Una llave pequeña guardada en el bolsillo de monedas de la cartera.",
        category: "objeto",
        rarity: 4,
        icon: "img/llave.webp"  
      });

      // Ruta Cartera
      window.InventorySystem.addItemToInventory({
        id: "ruta-cartera",
        name: "Ruta: Cartera",
        description: "Has explorado la cartera y encontrado una pista clave.",
        category: "ruta",
        rarity: 3,
        icon: "img/cartera-400.webp"  
      });

      // Cartera de Ivy
      window.InventorySystem.addItemToInventory({
        id: "cartera-ivy",
        name: "Cartera de Ivy Walker",
        description: "Una cartera gastada por el tiempo, pero valiosa por todo lo que contiene y representa.",
        category: "objeto",
        rarity: 5,
        icon: "img/cartera-400.webp"  
      });
      
      // Inicializar UI del inventario
      if (window.InventorySystem.initInventoryUI) {
        window.InventorySystem.initInventoryUI();
      }
      
      // Mostrar contenido con fade-in
      const fadeLines = document.querySelectorAll('.fade-line');
      fadeLines.forEach((el, index) => {
        setTimeout(() => {
          el.classList.add('visible');
        }, index * 400);
      });
    }
  }, 50);
  
  // Timeout por si inventory.js no carga
  setTimeout(() => {
    clearInterval(waitForInventory);
    console.warn("InventorySystem no encontrado después de 1 segundo");
    // Mostrar contenido de todas formas
    const fadeLines = document.querySelectorAll('.fade-line');
    fadeLines.forEach((el, index) => {
      setTimeout(() => {
        el.classList.add('visible');
      }, index * 400);
    });
  }, 1000);
});