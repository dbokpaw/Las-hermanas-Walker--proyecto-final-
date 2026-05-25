document.addEventListener("DOMContentLoaded", () => {
  if (window.InventorySystem) {
    window.InventorySystem.addItemToInventory({
      id: "ruta-audrey-dos-b",
      name: "Ruta: Audrey (despedida)",
      description: "Terry la deja marchar, atrapada entre mentira, miedo y deseo.",
      category: "ruta",
      rarity: 5
    });

    window.InventorySystem.initInventoryUI();
  }
});