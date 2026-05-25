document.addEventListener("DOMContentLoaded", () => {
  if (window.InventorySystem) {
    window.InventorySystem.addItemToInventory({
      id: "folio-arrugado",
      name: "Folio arrugado",
      description: "Un papel maltratado con notas ambiguas que solo añaden confusión.",
      category: "objeto",
      rarity: 2,
      icon: "folio_arrugado.webp"  
    });

    window.InventorySystem.initInventoryUI();
  }
});
