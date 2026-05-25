document.addEventListener("DOMContentLoaded", () => {
  const toggleBtn = document.getElementById("toggle-evento");
  const eventoTexto = document.getElementById("evento-texto");

  if (toggleBtn && eventoTexto) {
    toggleBtn.addEventListener("click", () => {
      eventoTexto.classList.toggle("hidden");
    });
  }

  if (window.InventorySystem) {
    window.InventorySystem.addItemToInventory({
      id: "ruta-conan-tres-a",
      name: "Ruta: Conan (compromiso)",
      description: "Terry acepta implicarse en la vida de Aurora junto a Conan.",
      category: "ruta",
      rarity: 5
    });

    window.InventorySystem.initInventoryUI();
  }
});