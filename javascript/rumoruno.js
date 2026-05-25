document.addEventListener("DOMContentLoaded", () => {
  if (window.InventorySystem) {
    window.InventorySystem.addItemToInventory({
      id: "ruta-rumor-uno",
      name: "Ruta: Rumor Uno",
      description: "Erik revela la plataforma Severance y acusa a Terry de ser una farsante.",
      category: "ruta",
      rarity: 5
    });

    window.InventorySystem.addItemToInventory({
      id: "severance",
      name: "Severance",
      description: "Plataforma clandestina ligada al control, los rumores y la vigilancia.",
      category: "objeto",
      rarity: 5
    });

    window.InventorySystem.initInventoryUI();
  }
});