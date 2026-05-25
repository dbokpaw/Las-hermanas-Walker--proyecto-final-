function reveal(id, delay) {
  setTimeout(() => {
    const el = document.getElementById(id);
    if (!el) return;
    el.classList.remove("hidden");
    requestAnimationFrame(() => el.classList.add("visible"));
  }, delay);
}

document.addEventListener("DOMContentLoaded", () => {
  // Mostrar F, I, N
  reveal("fin-l-1", 8000);
  reveal("fin-l-2", 9000);
  reveal("fin-l-3", 10000);
  
  // Mostrar el signo de interrogación después de la N
  reveal("fin-question", 11500);

  // Añadir evento de clic al signo de interrogación
  const questionMark = document.getElementById("fin-question");
  if (questionMark) {
    questionMark.addEventListener("click", () => {
      window.location.href = "podcast.html";
    });
    
    // Añadir cursor de puntero para indicar que es clickeable
    questionMark.style.cursor = "pointer";
  }

  if (window.InventorySystem) {
    window.InventorySystem.addItemToInventory({
      id: "ruta-el-fin",
      name: "Final: Él",
      description: "Erik hiere mortalmente a Terry.",
      category: "ruta",
      rarity: 5
    });

    window.InventorySystem.initInventoryUI();
  }
});