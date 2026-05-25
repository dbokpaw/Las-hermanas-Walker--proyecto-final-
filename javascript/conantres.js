// conantres.js
document.addEventListener("DOMContentLoaded", () => {
  if (window.InventorySystem) {
    window.InventorySystem.addItemToInventory({
      id: "ruta-conan-tres",
      name: "Ruta: Conan (mentira)",
      description: "Terry decide mentir y sostener la identidad de Ivy frente a Conan.",
      category: "ruta",
      rarity: 5
    });

    window.InventorySystem.initInventoryUI();
  }
});