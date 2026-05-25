document.addEventListener("DOMContentLoaded", () => {
  if (window.InventorySystem) {
    window.InventorySystem.addItemToInventory({
      id: "ruta-apagon-tres-a",
      name: "Ruta: Apagón (sí)",
      description: "Terry afirma que Aurora es su hija, y Hyuk queda impactado por la revelación.",
      category: "ruta",
      rarity: 5
    });

    window.InventorySystem.initInventoryUI();
  }
});