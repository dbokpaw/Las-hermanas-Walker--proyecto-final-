document.addEventListener("DOMContentLoaded", () => {
  if (window.InventorySystem) {
    window.InventorySystem.addItemToInventory({
      id: "ruta-audrey-dos-ab",
      name: "Ruta: Audrey (silencio)",
      description: "La conversación se apaga y Terry decide no forzar lo que ya se rompe.",
      category: "ruta",
      rarity: 5
    });

    window.InventorySystem.initInventoryUI();
  }
});