document.addEventListener("DOMContentLoaded", () => {
  if (window.InventorySystem) {
    window.InventorySystem.addItemToInventory({
      id: "ruta-apagon-dos",
      name: "Ruta: Apagón (pregunta)",
      description: "En medio del caos de los apagones, Terry debe decidir qué responder sobre Aurora.",
      category: "ruta",
      rarity: 5,
      icon: "../img/tweet-ivy.jpg"  
    });

    window.InventorySystem.initInventoryUI();
  }
});