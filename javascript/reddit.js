document.addEventListener("DOMContentLoaded", () => {
  if (window.InventorySystem) {
    window.InventorySystem.addItemToInventory({
      id: "ruta-reddit",
      name: "Ruta: Reddit",
      description: "Has llegado al hilo de teorías que conecta todas tus sospechas.",
      category: "ruta",
      rarity: 4,
      icon: "./img/teoria.webp"
    });

    window.InventorySystem.initInventoryUI();
  }
});