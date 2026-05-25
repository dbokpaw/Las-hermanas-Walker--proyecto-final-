document.addEventListener("DOMContentLoaded", () => {
  if (window.InventorySystem) {
    window.InventorySystem.addItemToInventory({
      id: "ruta-conan-cuatro",
      name: "Ruta: Conan (verdad)",
      description: "Terry revela su identidad, pero Conan no la cree y la tensión escala.",
      category: "ruta",
      rarity: 5
    });

    window.InventorySystem.initInventoryUI();
  }
});