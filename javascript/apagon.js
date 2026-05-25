function reveal(id, delay) {
  setTimeout(() => {
    const el = document.getElementById(id);
    if (!el) return;
    el.classList.remove("hidden");
    requestAnimationFrame(() => el.classList.add("visible"));
  }, delay);
}

document.addEventListener("DOMContentLoaded", () => {
  // Efecto Twine: (live: 6s)[(t8n:"dissolve")[...]]
  reveal("cabrona-line", 6000);

  if (window.InventorySystem) {
    window.InventorySystem.addItemToInventory({
      id: "ruta-apagon",
      name: "Ruta: Apagón",
      description: "Terry se atasca con el guion y se cruza con Hyuk durante los apagones intermitentes.",
      category: "ruta",
      rarity: 5,

    });

    window.InventorySystem.initInventoryUI();
  }
});