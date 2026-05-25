document.addEventListener("DOMContentLoaded", () => {
  if (window.InventorySystem) {
    window.InventorySystem.addItemToInventory({
      id: "ruta-uno",
      name: "Ruta: Teorías (uno)",
      description: "Te adentras en las teorías y en los recuerdos sobre Ivy y Terry.",
      category: "ruta",
      rarity: 4
    });

    window.InventorySystem.addItemToInventory({
      id: "terry-walker",
      name: "Terry Walker",
      description: "Hermana gemela de Ivy. Su nombre aparece en recuerdos y sospechas.",
      category: "persona",
      rarity: 4,
      icon: "terry-placeholder.png" 
    });

    window.InventorySystem.initInventoryUI();
  }
});