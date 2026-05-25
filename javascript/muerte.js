function reveal(id, delay) {
  setTimeout(() => {
    const el = document.getElementById(id);
    if (!el) return;
    el.classList.remove("hidden");
    requestAnimationFrame(() => el.classList.add("visible"));
  }, delay);
}

document.addEventListener("DOMContentLoaded", () => {
  reveal("m-dot-1", 1000);
  reveal("m-dot-2", 2000);
  reveal("m-dot-3", 3000);
  reveal("m-choices", 4000);

  if (window.InventorySystem) {
    window.InventorySystem.addItemToInventory({
      id: "ruta-muerte",
      name: "Ruta: Muerte",
      description: "Todo se corta en seco; solo quedan dos preguntas para seguir.",
      category: "ruta",
      rarity: 5
    });

    window.InventorySystem.initInventoryUI();
  }
});