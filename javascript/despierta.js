const ring1 = document.getElementById("ring-1");
const ring2 = document.getElementById("ring-2");
const ring3 = document.getElementById("ring-3");
const toEntryWrap = document.getElementById("to-entry-wrap");
const toEntryBtn = document.getElementById("to-entry-btn");
const entryScene = document.getElementById("entry-scene");
const backBedWrap = document.getElementById("back-bed-wrap");
const backBedBtn = document.getElementById("back-bed-btn");

let ivyAdded = false;

function showWithDissolve(element) {
  element.classList.remove("hidden");
  requestAnimationFrame(() => {
    element.classList.add("visible");
  });
}

document.addEventListener("DOMContentLoaded", () => {
  if (window.InventorySystem) {
    window.InventorySystem.initInventoryUI();
  }

  setTimeout(() => showWithDissolve(ring1), 1000);
  setTimeout(() => showWithDissolve(ring2), 2000);
  setTimeout(() => {
    showWithDissolve(ring3);
    toEntryWrap.classList.remove("hidden");
  }, 3000);

  toEntryBtn.addEventListener("click", () => {
    entryScene.classList.remove("hidden");
    backBedWrap.classList.remove("hidden");
    toEntryWrap.classList.add("hidden");

    // Añadir a Ivy al inventario de personas solo la primera vez
    if (!ivyAdded && window.InventorySystem) {
        window.InventorySystem.addItemToInventory({
        id: "ivy-walker",
        name: "Ivy Walker",
        description: "Tu ídolo. Su aparición te deja sin aliento.",
        category: "persona",
        rarity: 5,
        icon: "./img/hi-ivy-telefonillo.gif"
        });

      ivyAdded = true;
      // Refresca la UI si el panel ya está abierto/cargado
      window.InventorySystem.initInventoryUI();
    }
  });

  backBedBtn.addEventListener("click", () => {
    entryScene.classList.add("hidden");
    backBedWrap.classList.add("hidden");
    toEntryWrap.classList.remove("hidden");
  });
});