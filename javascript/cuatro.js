document.addEventListener("DOMContentLoaded", () => {
  const showContractBtn = document.getElementById("show-contract-btn");
  const contractBox = document.getElementById("contract-box");

  if (showContractBtn && contractBox) {
    showContractBtn.addEventListener("click", () => {
      contractBox.classList.remove("hidden");
      requestAnimationFrame(() => contractBox.classList.add("visible"));
      showContractBtn.style.display = "none";
    });
  }

  if (window.InventorySystem) {
    window.InventorySystem.addItemToInventory({
      id: "ruta-cuatro",
      name: "Ruta: Confesión",
      description: "Aparece una confesión oscura sobre Ivy, Terry y el contrato.",
      category: "ruta",
      rarity: 5
    });

    window.InventorySystem.addItemToInventory({
      id: "contrato",
      name: "Contrato",
      description: "Documento que simboliza una renuncia: honor y estima a cambio de otra cosa.",
      category: "objeto",
      rarity: 5,
      icon: "./img/contrato.webp"
    });

    window.InventorySystem.initInventoryUI();
  }
});