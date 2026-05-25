document.addEventListener("DOMContentLoaded", () => {
  if (window.InventorySystem) {
    window.InventorySystem.addItemToInventory({
      id: "ruta-hyuk",
      name: "Ruta: Hyuk",
      description: "Conoces al fan número uno de Ivy y una tensión extraña con Erik.",
      category: "ruta",
      rarity: 4,
      icon: "../img/hyukeivy-400.webp"  // ← Versión optimizada para icono
    });

    window.InventorySystem.addItemToInventory({
      id: "hyuk",
      name: "Hyuk",
      description: "Fan entusiasta de 7*DREAMERS. Vive en el Ático B con Erik.",
      category: "persona",
      rarity: 4,
      icon: "../img/hyuk-icon.webp"  // ← Icono de Hyuk (si existe)
    });

    window.InventorySystem.addItemToInventory({
      id: "erik",
      name: "Erik",
      description: "Amigo de Hyuk. Su actitud fría y burlona despierta sospechas.",
      category: "persona",
      rarity: 3,
      icon: "../img/erik-icon.webp"  // ← Icono de Erik (si existe)
    });

    window.InventorySystem.initInventoryUI();
  }
});