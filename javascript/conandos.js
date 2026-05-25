document.addEventListener("DOMContentLoaded", () => {
  if (window.InventorySystem) {
    window.InventorySystem.addItemToInventory({
      id: "ruta-conan-dos",
      name: "Ruta: Conan (decisión)",
      description: "Terry enfrenta una decisión crítica al descubrir la verdad sobre Conan y el bebé.",
      category: "ruta",
      rarity: 5
    });

    window.InventorySystem.initInventoryUI();
  }
});