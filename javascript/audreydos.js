document.addEventListener("DOMContentLoaded", () => {
  if (window.InventorySystem) {
    window.InventorySystem.addItemToInventory({
      id: "ruta-audrey-dos",
      name: "Ruta: Audrey (decisión)",
      description: "Audrey duda y Terry debe decidir si dejarla marchar o pedirle que se quede.",
      category: "ruta",
      rarity: 4
    });

    window.InventorySystem.initInventoryUI();
  }
});