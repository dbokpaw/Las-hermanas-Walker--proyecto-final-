document.addEventListener("DOMContentLoaded", () => {
  if (window.InventorySystem) {
    window.InventorySystem.addItemToInventory({
      id: "ruta-rumor-dos",
      name: "Ruta: Rumor Dos",
      description: "Erik enfrenta a Terry con rumores sobre Audrey y pruebas comprometedoras.",
      category: "ruta",
      rarity: 5
    });

    window.InventorySystem.addItemToInventory({
      id: "fotos-comprometedoras",
      name: "Fotografías comprometedoras",
      description: "Imágenes de Terry y Audrey obtenidas a través de Severance. Muestran a las dos juntas en una cafetería de Nueva York, caminando bajo la lluvia y en momentos íntimos que nunca debieron ser capturados.",
      category: "objeto",
      rarity: 5,
      icon: "fotoscomprometedoras-1200.webp",
      iconSet: {
        srcset: "fotoscomprometedoras-400.webp 400w, fotoscomprometedoras-800.webp 800w, fotoscomprometedoras-1200.webp 1200w",
        sizes: "(max-width: 400px) 400px, 800px"
      }
    });

    window.InventorySystem.initInventoryUI();
  }
});
