document.addEventListener("DOMContentLoaded", () => {
  if (window.InventorySystem) {
    window.InventorySystem.addItemToInventory({
      id: "ruta-apagon-cuatro-a",
      name: "Ruta: Apagón (rumores)",
      description: "Erik conduce a Terry hacia Nana y deja caer rumores inquietantes.",
      category: "ruta",
      rarity: 5
    });

    window.InventorySystem.addItemToInventory({
      id: "erik",
      name: "Erik",
      description: "Compañero de piso de Hyuk. Su tono sugiere que sabe más de lo que aparenta.",
      category: "persona",
      rarity: 4,
      icon: "../img/erik-icon.webp" 

    });

    window.InventorySystem.initInventoryUI();
  }
});