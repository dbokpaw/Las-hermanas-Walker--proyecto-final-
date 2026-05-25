function reveal(id, delay) {
  setTimeout(() => {
    const el = document.getElementById(id);
    if (!el) return;
    el.classList.remove("hidden");
    requestAnimationFrame(() => el.classList.add("visible"));
  }, delay);
}

document.addEventListener("DOMContentLoaded", () => {
  reveal("fin-e-1", 12000);
  reveal("fin-e-2", 13000);
  reveal("fin-e-3", 14000);

  if (window.InventorySystem) {
    window.InventorySystem.addItemToInventory({
      id: "ruta-ella-fin",
      name: "Final: Ella",
      description: "Terry sobrevive al ataque y Erik cae al vacío.",
      category: "ruta",
      rarity: 5
    });

    window.InventorySystem.initInventoryUI();
  }
});