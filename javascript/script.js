// Datos del inventario 
const inventoryItems = [
  {
    id: "llave-antigua",
    name: "Llave antigua",
    description: "Una llave oxidada con un grabado apenas visible. Parece abrir una puerta importante."
  },
  {
    id: "foto-familiar",
    name: "Foto familiar",
    description: "Una fotografía vieja de las hermanas Walker cuando eran niñas. Detrás hay una fecha escrita."
  },
  {
    id: "carta",
    name: "Carta sin firmar",
    description: "La tinta está corrida en varias líneas. Menciona 'despertar' y una casa en silencio."
  }
];

const inventoryPanel = document.getElementById("inventory-panel");
const inventoryToggle = document.getElementById("inventory-toggle");
const inventoryClose = document.getElementById("inventory-close");
const inventoryList = document.getElementById("inventory-list");
const itemTitle = document.getElementById("item-title");
const itemText = document.getElementById("item-text");
const startLink = document.getElementById("start-link");

function openInventory() {
  inventoryPanel.classList.add("open");
  inventoryPanel.setAttribute("aria-hidden", "false");
  inventoryToggle.setAttribute("aria-expanded", "true");
}

function closeInventory() {
  inventoryPanel.classList.remove("open");
  inventoryPanel.setAttribute("aria-hidden", "true");
  inventoryToggle.setAttribute("aria-expanded", "false");
}

function renderInventory(items) {
  inventoryList.innerHTML = "";

  items.forEach((item, index) => {
    const li = document.createElement("li");
    const button = document.createElement("button");

    button.type = "button";
    button.className = "inventory-item";
    button.textContent = item.name;
    button.dataset.itemId = item.id;

    button.addEventListener("click", () => {
      document.querySelectorAll(".inventory-item").forEach((el) => el.classList.remove("active"));
      button.classList.add("active");
      itemTitle.textContent = item.name;
      itemText.textContent = item.description;
    });

    li.appendChild(button);
    inventoryList.appendChild(li);

    if (index === 0) {
      button.classList.add("active");
      itemTitle.textContent = item.name;
      itemText.textContent = item.description;
    }
  });
}

inventoryToggle.addEventListener("click", openInventory);
inventoryClose.addEventListener("click", closeInventory);

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape" && inventoryPanel.classList.contains("open")) {
    closeInventory();
  }
});

renderInventory(inventoryItems);

document.addEventListener("DOMContentLoaded", () => {
  if (window.InventorySystem) {
    window.InventorySystem.initInventoryUI();
  }
});