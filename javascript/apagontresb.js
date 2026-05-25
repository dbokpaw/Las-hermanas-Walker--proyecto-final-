document.addEventListener("DOMContentLoaded", () => {
  if (window.InventorySystem) {
    window.InventorySystem.addItemToInventory({
      id: "ruta-apagon-tres-b",
      name: "Ruta: Apagón (no)",
      description: "Terry niega ser la madre y trata de sostener la fachada ante Audrey y los vecinos.",
      category: "ruta",
      rarity: 5
    });

    window.InventorySystem.initInventoryUI();
  }
});