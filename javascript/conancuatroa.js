document.addEventListener("DOMContentLoaded", () => {
  if (window.InventorySystem) {
    window.InventorySystem.addItemToInventory({
      id: "ruta-conan-cuatro-a",
      name: "Ruta: Conan (imposición)",
      description: "Terry impone sus condiciones: mantener la fachada de Ivy ante todos.",
      category: "ruta",
      rarity: 5
    });

    window.InventorySystem.initInventoryUI();
  }
});