function reveal(id, delay) {
  setTimeout(() => {
    const el = document.getElementById(id);
    if (!el) return;
    el.classList.remove("hidden");
    requestAnimationFrame(() => el.classList.add("visible"));
  }, delay);
}

document.addEventListener("DOMContentLoaded", () => {
  if (window.InventorySystem) {
    // Objeto encontrado en primer cajón
    window.InventorySystem.addItemToInventory({
    id: "movil-ivy",
    name: "Móvil de Ivy Walker",
    description: "El teléfono personal de Ivy Walker, oculto en el primer cajón.",
    category: "objeto",
    rarity: 5,
    icon: "movil01.jpg"
    });

    // Ruta desbloqueada automáticamente al pasar por primer cajón
    window.InventorySystem.addItemToInventory({
    id: "ruta-primer-cajon",
    name: "Ruta: Primer cajón",
    description: "Has abierto el primer cajón y descubierto el secreto que guarda.",
    category: "ruta",
    rarity: 4,
    icon: "movil01.jpg"
    });

    window.InventorySystem.initInventoryUI();
  }

  reveal("p2", 5000);
  reveal("p3", 6000);
  reveal("p4", 7000);
});
