document.addEventListener("DOMContentLoaded", () => {
  if (window.InventorySystem) {
    window.InventorySystem.addItemToInventory({
      id: "ruta-tres",
      name: "Ruta: Sueño",
      description: "Te sumerges en un sueño inquietante donde Terry invade tu conciencia.",
      category: "ruta",
      rarity: 5
    });

    window.InventorySystem.initInventoryUI();
  }
});