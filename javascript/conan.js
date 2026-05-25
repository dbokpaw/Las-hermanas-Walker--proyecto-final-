document.addEventListener("DOMContentLoaded", () => {
  if (window.InventorySystem) {
    window.InventorySystem.addItemToInventory({
      id: "ruta-conan",
      name: "Ruta: Conan",
      description: "Una acusación inesperada revela un posible secreto de Ivy.",
      category: "ruta",
      rarity: 5,
      icon: "conanybebe.webp"
    });

    window.InventorySystem.addItemToInventory({
      id: "conan",
      name: "Conan",
      description: "Hombre que afirma que Ivy tiene una hija.",
      category: "persona",
      rarity: 4,
      icon: "conanybebe.webp"
    });

    window.InventorySystem.addItemToInventory({
      id: "hija-ivy",
      name: "Hija de Ivy",
      description: "Una bebé de once meses cuya existencia te deja en shock.",
      category: "persona",
      rarity: 5
    });

    window.InventorySystem.initInventoryUI();
  }
});
