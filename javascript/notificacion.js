document.addEventListener("DOMContentLoaded", () => {
  if (window.InventorySystem) {
    // Ruta nueva al entrar en esta escena
    window.InventorySystem.addItemToInventory({
      id: "ruta-notificacion",
      name: "Ruta: Notificación",
      description: "Has revisado el móvil y detectado un patrón inquietante en redes.",
      category: "ruta",
      rarity: 4,
      icon: "./img/movil02.jpg"
    });

    // Personas mencionadas
    window.InventorySystem.addItemToInventory({
      id: "san",
      name: "San",
      description: "Nombre que aparece en los comentarios y conecta con tus teorías.",
      category: "persona",
      rarity: 3
    });

    window.InventorySystem.addItemToInventory({
      id: "ash",
      name: "Ash",
      description: "Usuario cuyo 'me gusta' te hizo sospechar aún más.",
      category: "persona",
      rarity: 3
    });

    window.InventorySystem.initInventoryUI();
  }
});