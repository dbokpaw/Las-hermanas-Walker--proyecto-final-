// audreydosa.js
document.addEventListener("DOMContentLoaded", () => {
  if (window.InventorySystem) {
    window.InventorySystem.addItemToInventory({
      id: "ruta-audrey-dos-a",
      name: "Ruta: Audrey (que se quede)",
      description: "Terry le pide a Audrey que se quede, pero la conversación se ahoga en lo no dicho.",
      category: "ruta",
      rarity: 5
    });

    window.InventorySystem.initInventoryUI();
  }
});