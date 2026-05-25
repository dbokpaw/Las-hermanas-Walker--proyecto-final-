function showWithDissolve(id, delay) {
  setTimeout(() => {
    const el = document.getElementById(id);
    if (!el) return;
    el.classList.remove("hidden");
    requestAnimationFrame(() => el.classList.add("visible"));
  }, delay);
}

document.addEventListener("DOMContentLoaded", () => {
  if (window.InventorySystem) {
    window.InventorySystem.addItemToInventory({
      id: "nana",
      name: "Nana",
      description: "Presidenta y dueña de la corporación EDNA. Te llama para hablar de tu llegada a Hoshigo.",
      category: "persona",
      rarity: 4
    });

    window.InventorySystem.addItemToInventory({
      id: "ruta-dos",
      name: "Ruta: Llamada de Nana",
      description: "Atiendes la llamada y recibes detalles sobre la mudanza y la reunión vecinal.",
      category: "ruta",
      rarity: 3
    });

    window.InventorySystem.initInventoryUI();
  }

  showWithDissolve("d1", 1000);
  showWithDissolve("d2", 2000);
  showWithDissolve("d3", 3000);
  showWithDissolve("d4", 4000);
});