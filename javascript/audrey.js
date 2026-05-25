document.addEventListener("DOMContentLoaded", () => {
  if (window.InventorySystem) {
    window.InventorySystem.addItemToInventory({
      id: "ruta-audrey",
      name: "Ruta: Audrey",
      description: "El encuentro con Audrey reabre una herida íntima del pasado.",
      category: "ruta",
      rarity: 5,
      icon: "encuentroconaudrey.webp"  
    });

    window.InventorySystem.addItemToInventory({
      id: "audrey",
      name: "Audrey",
      description: "La única chica capaz de romperle el corazón a Terry.",
      category: "persona",
      rarity: 5,
      icon: "encuentroconaudrey.webp" 
    });

    window.InventorySystem.initInventoryUI();
  }
});
