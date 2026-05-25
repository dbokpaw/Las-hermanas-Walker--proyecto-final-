document.addEventListener("DOMContentLoaded", () => {
  if (window.InventorySystem) {
    window.InventorySystem.addItemToInventory({
      id: "ruta-farsante",
      name: "Ruta: Farsante",
      description: "Erik revela la verdad de Severance y confronta violentamente a Terry.",
      category: "ruta",
      rarity: 5,
      icon: "erik-cliente-severance.webp"  
    });

    window.InventorySystem.addItemToInventory({
      id: "erik-cliente-severance",
      name: "Erik (cliente de Severance)",
      description: "Erik admite haber pagado por encuentros con Ivy y amenaza a Terry.",
      category: "persona",
      rarity: 5,
      icon: "erik-cliente-severance.webp"  
    });

    window.InventorySystem.initInventoryUI();
  }
});
