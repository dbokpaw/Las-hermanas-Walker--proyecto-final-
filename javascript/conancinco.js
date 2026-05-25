function reveal(id, delay) {
  setTimeout(() => {
    const el = document.getElementById(id);
    if (!el) return;
    el.classList.remove("hidden");
    requestAnimationFrame(() => el.classList.add("visible"));
  }, delay);
}

document.addEventListener("DOMContentLoaded", () => {
  // Secuencia tipo Twine live+dissolve
  reveal("dot1", 1000);
  reveal("dot2", 2000);
  reveal("dot3", 3000);
  reveal("c5-block-1", 4000);
  reveal("c5-quote", 8000);
  reveal("c5-block-2", 9000);

  if (window.InventorySystem) {
    window.InventorySystem.addItemToInventory({
      id: "ruta-conan-cinco",
      name: "Ruta: Conan (huida)",
      description: "Terry decide marcharse, incapaz de seguir sosteniendo el peso de la verdad.",
      category: "ruta",
      rarity: 5
    });

    window.InventorySystem.initInventoryUI();
  }
});