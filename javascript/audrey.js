document.addEventListener("DOMContentLoaded", () => {
  if (window.InventorySystem) {
    // Ruta relativa desde cualquier HTML de la carpeta rutas_personas/audrey/
    // Funciona localmente y en cualquier servidor
    const audreyIcon = "../../img/encuentroconaudrey.webp";
    
    window.InventorySystem.addItemToInventory({
      id: "ruta-audrey",
      name: "Ruta: Audrey",
      description: "El encuentro con Audrey reabre una herida íntima del pasado.",
      category: "ruta",
      rarity: 5,
      icon: audreyIcon
    });

    window.InventorySystem.addItemToInventory({
      id: "audrey",
      name: "Audrey",
      description: "La única chica capaz de romperle el corazón a Terry.",
      category: "persona",
      rarity: 5,
      icon: audreyIcon
    });

    window.InventorySystem.initInventoryUI();
  }
});