// inventory.js - Versión con rutas absolutas para imágenes

const INVENTORY_KEY = "walker_inventory_v3";
const SESSION_KEY = "walker_session_id";

const categoryLabels = {
  objeto: "Objeto",
  persona: "Persona",
  ruta: "Ruta"
};

// ==================== FUNCIONES DE RUTAS ====================

// Detectar la ruta base del proyecto automáticamente
function getBasePath() {
  // Caso 1: GitHub Pages (prioritario para tu proyecto)
  if (window.location.hostname.includes('github.io')) {
    // Obtiene el path completo, ej: "/Las-hermanas-Walker--proyecto-final-/"
    let path = window.location.pathname;
    
    // Si la ruta no termina en /, extraer hasta la última carpeta
    if (!path.endsWith('/')) {
      const lastSlash = path.lastIndexOf('/');
      if (lastSlash > 0) {
        path = path.substring(0, lastSlash + 1);
      }
    }
    
    console.log(`[Inventario] Base path detectada (GitHub Pages): ${path}`);
    return path;
  }
  
  // Caso 2: Desarrollo local con servidor (http://localhost)
  if (window.location.protocol.startsWith('http') && !window.location.hostname.includes('github.io')) {
    console.log(`[Inventario] Base path detectada (Localhost): /`);
    return '/';
  }
  
  // Caso 3: Fallback final para file://
  console.log(`[Inventario] Base path detectada (Fallback): /`);
  return '/';
}

// Normalizar la ruta del icono (convierte cualquier ruta relativa a absoluta)
function normalizeIconPath(iconPath) {
  if (!iconPath) return "";
  
  // Si ya es URL absoluta o data:image, devolver igual
  if (iconPath.startsWith('http') || iconPath.startsWith('data:') || iconPath.startsWith('blob:')) {
    return iconPath;
  }
  
  const basePath = getBasePath();
  
  // Eliminar cualquier prefijo incorrecto
  let cleanPath = iconPath;
  
  // Si la ruta ya contiene la base correcta, no la duplicamos
  if (cleanPath.includes('/Las-hermanas-Walker--proyecto-final-/')) {
    return cleanPath;
  }
  
  // Eliminar prefijos incorrectos como /TFinal/
  cleanPath = cleanPath.replace(/^\/TFinal\//, '');
  cleanPath = cleanPath.replace(/^TFinal\//, '');
  cleanPath = cleanPath.replace(/^\.\.\/img\//, '');
  cleanPath = cleanPath.replace(/^\.\/img\//, '');
  cleanPath = cleanPath.replace(/^img\//, '');
  
  // Si es solo el nombre del archivo (sin carpetas)
  if (!cleanPath.includes('/')) {
    return basePath + 'img/' + cleanPath;
  }
  
  // Si ya tiene img/ al inicio
  if (cleanPath.startsWith('img/')) {
    return basePath + cleanPath;
  }
  
  // Otros casos
  return basePath + 'img/' + cleanPath;
}

// ==================== FUNCIONES DE INVENTARIO ====================

function normalizeCategory(category) {
  if (category === "persona" || category === "ruta" || category === "objeto") return category;
  return "objeto";
}

function clampRarity(value) {
  const n = Number(value);
  if (!Number.isFinite(n)) return 3;
  return Math.max(1, Math.min(5, Math.round(n)));
}

function loadInventory() {
  const saved = localStorage.getItem(INVENTORY_KEY);
  if (!saved) return [];
  try {
    const parsed = JSON.parse(saved);
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

function saveInventory(items) {
  localStorage.setItem(INVENTORY_KEY, JSON.stringify(items));
}

// Función principal para añadir items (AHORA CON NORMALIZACIÓN DE RUTAS)
function addItemToInventory(newItem) {
  const items = loadInventory();
  const exists = items.some((item) => item.id === newItem.id);

  if (!exists) {
    const finalIcon = normalizeIconPath(newItem.icon || "");
    
    items.push({
      id: newItem.id,
      name: newItem.name,
      description: newItem.description || "Sin descripción.",
      category: normalizeCategory(newItem.category),
      rarity: clampRarity(newItem.rarity ?? 3),
      icon: finalIcon
    });
    saveInventory(items);
    console.log(`✅ Añadido: ${newItem.name}`, finalIcon ? `(icono: ${finalIcon})` : '(sin icono)');
  }
}

function makeStars(rarity) {
  const filled = "★".repeat(rarity);
  const empty = "☆".repeat(5 - rarity);
  return `${filled}${empty}`;
}

function categorySymbol(category) {
  if (category === "persona") return "👤";
  if (category === "ruta") return "🧭";
  return "◆";
}

function applyCompactMode(inventoryToggle) {
  const tags = (document.body?.dataset?.tags || "").toLowerCase();
  const isFinalLike = tags.includes("final") || tags.includes("escaleras");

  if (isFinalLike && inventoryToggle) {
    inventoryToggle.classList.add("inventory-toggle-compact");
    inventoryToggle.textContent = "Inv.";
    inventoryToggle.setAttribute("aria-label", "Abrir inventario");
    inventoryToggle.title = "Inventario";

    inventoryToggle.classList.add("inventory-toggle-delayed");
    setTimeout(() => {
      inventoryToggle.classList.add("inventory-toggle-visible");
    }, 8000);
  }
}

// Reiniciar inventario manualmente
function resetInventory(showConfirm = true) {
  let shouldReset = true;
  
  if (showConfirm) {
    shouldReset = confirm("🔄 ¿Comenzar una nueva partida?\n\nSe perderán todos los objetos del inventario actual.");
  }
  
  if (shouldReset) {
    localStorage.removeItem(INVENTORY_KEY);
    
    const inventoryPanel = document.getElementById("inventory-panel");
    const wasOpen = inventoryPanel && inventoryPanel.classList.contains("open");
    
    if (wasOpen) {
      document.getElementById("inventory-close")?.click();
      setTimeout(() => {
        if (typeof renderInventoryAgain === 'function') {
          renderInventoryAgain();
        }
        setTimeout(() => document.getElementById("inventory-toggle")?.click(), 100);
      }, 50);
    } else {
      if (typeof renderInventoryAgain === 'function') {
        renderInventoryAgain();
      }
    }
    
    console.log("✅ Inventario reiniciado correctamente");
    showResetNotification();
    return true;
  }
  return false;
}

function showResetNotification() {
  const notification = document.createElement('div');
  notification.textContent = '🗑️ Inventario reiniciado';
  notification.style.cssText = `
    position: fixed;
    bottom: 80px;
    left: 20px;
    background: #2c3e50;
    color: white;
    padding: 10px 20px;
    border-radius: 8px;
    font-size: 14px;
    z-index: 10000;
    opacity: 0;
    transition: opacity 0.3s;
    pointer-events: none;
    box-shadow: 0 2px 10px rgba(0,0,0,0.2);
  `;
  
  document.body.appendChild(notification);
  
  setTimeout(() => {
    notification.style.opacity = '1';
  }, 10);
  
  setTimeout(() => {
    notification.style.opacity = '0';
    setTimeout(() => notification.remove(), 300);
  }, 2000);
}

function createNewGameButton() {
  if (document.querySelector('.new-game-button')) return;
  
  const button = document.createElement('button');
  button.textContent = '🔄 Nueva Partida';
  button.className = 'new-game-button';
  button.setAttribute('aria-label', 'Reiniciar inventario');
  button.title = 'Reiniciar inventario (comenzar nueva partida)';
  
  button.style.cssText = `
    position: fixed;
    bottom: 20px;
    left: 20px;
    z-index: 9999;
    padding: 8px 16px;
    background: rgba(44, 62, 80, 0.85);
    color: white;
    border: none;
    border-radius: 20px;
    cursor: pointer;
    font-size: 13px;
    font-family: inherit;
    backdrop-filter: blur(4px);
    transition: all 0.3s ease;
    box-shadow: 0 2px 5px rgba(0,0,0,0.2);
  `;
  
  button.onmouseenter = () => {
    button.style.background = 'rgba(44, 62, 80, 0.95)';
    button.style.transform = 'scale(1.05)';
  };
  button.onmouseleave = () => {
    button.style.background = 'rgba(44, 62, 80, 0.85)';
    button.style.transform = 'scale(1)';
  };
  
  button.onclick = (e) => {
    e.stopPropagation();
    resetInventory(true);
  };
  
  document.body.appendChild(button);
}

function initSessionReset() {
  let sessionId = sessionStorage.getItem(SESSION_KEY);
  const currentTimestamp = Date.now();
  
  if (!sessionId) {
    sessionId = `session_${currentTimestamp}_${Math.random()}`;
    sessionStorage.setItem(SESSION_KEY, sessionId);
    localStorage.removeItem(INVENTORY_KEY);
    console.log("🔄 Nueva sesión detectada - Inventario reiniciado");
    
    setTimeout(() => {
      const welcomeMsg = document.createElement('div');
      welcomeMsg.textContent = '🎮 Nueva partida - Inventario vacío';
      welcomeMsg.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: rgba(46, 204, 113, 0.9);
        color: white;
        padding: 8px 16px;
        border-radius: 8px;
        font-size: 13px;
        z-index: 10000;
        opacity: 0;
        transition: opacity 0.5s;
        pointer-events: none;
      `;
      document.body.appendChild(welcomeMsg);
      setTimeout(() => welcomeMsg.style.opacity = '1', 10);
      setTimeout(() => {
        welcomeMsg.style.opacity = '0';
        setTimeout(() => welcomeMsg.remove(), 500);
      }, 3000);
    }, 500);
  }
}

// ==================== UI DEL INVENTARIO ====================

let globalInventoryList = null;
let globalSetSelectedItem = null;

function initInventoryUI() {
  const inventoryPanel = document.getElementById("inventory-panel");
  const inventoryToggle = document.getElementById("inventory-toggle");
  const inventoryClose = document.getElementById("inventory-close");
  const inventoryList = document.getElementById("inventory-list");
  const itemBadge = document.getElementById("item-badge");
  const itemTitle = document.getElementById("item-title");
  const itemText = document.getElementById("item-text");
  const itemStars = document.getElementById("item-stars");
  const itemArt = document.getElementById("item-art");
  const tabButtons = document.querySelectorAll(".inventory-tab");

  if (
    !inventoryPanel || !inventoryToggle || !inventoryClose || !inventoryList ||
    !itemBadge || !itemTitle || !itemText || !itemStars || !itemArt || tabButtons.length === 0
  ) {
    return;
  }

  applyCompactMode(inventoryToggle);

  let activeCategory = "objeto";
  
  globalInventoryList = inventoryList;

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

  function setSelectedItem(item, button) {
    document.querySelectorAll(".inventory-item").forEach((el) => el.classList.remove("active"));
    if (button) button.classList.add("active");

    itemBadge.textContent = categoryLabels[item.category] || "Objeto";
    itemBadge.dataset.category = item.category;
    itemTitle.textContent = item.name;
    itemText.textContent = item.description;
    itemStars.textContent = makeStars(clampRarity(item.rarity));

    if (item.icon) {
      itemArt.style.backgroundImage = `url("${item.icon}")`;
      itemArt.textContent = "";
      itemArt.classList.add("has-image");
      // Debug: verificar si la imagen carga
      const testImg = new Image();
      testImg.onload = () => console.log(`🖼️ Icono cargado: ${item.icon}`);
      testImg.onerror = () => console.warn(`⚠️ Icono NO encontrado: ${item.icon}`);
      testImg.src = item.icon;
    } else {
      itemArt.style.backgroundImage = "";
      itemArt.textContent = categorySymbol(item.category);
      itemArt.classList.remove("has-image");
    }
  }
  
  globalSetSelectedItem = setSelectedItem;

  function renderInventory() {
    const items = loadInventory();
    const filtered = items.filter((item) => normalizeCategory(item.category) === activeCategory);
    inventoryList.innerHTML = "";

    if (filtered.length === 0) {
      itemBadge.textContent = categoryLabels[activeCategory] || "Categoría";
      itemBadge.dataset.category = activeCategory;
      itemTitle.textContent = "Nada por aquí aún";
      itemStars.textContent = "☆☆☆☆☆";
      itemText.textContent = "Todavía no has descubierto elementos en esta categoría.";
      itemArt.style.backgroundImage = "";
      itemArt.textContent = categorySymbol(activeCategory);
      itemArt.classList.remove("has-image");
      return;
    }

    filtered.forEach((item, index) => {
      const li = document.createElement("li");
      const button = document.createElement("button");

      button.type = "button";
      button.className = "inventory-item";
      button.dataset.itemId = item.id;
      button.innerHTML = `
        <span class="inventory-item-name">${item.name}</span>
        <span class="inventory-item-stars">${makeStars(clampRarity(item.rarity))}</span>
      `;

      button.addEventListener("click", () => setSelectedItem(item, button));

      li.appendChild(button);
      inventoryList.appendChild(li);

      if (index === 0) {
        setSelectedItem(item, button);
      }
    });
  }
  
  window.renderInventoryAgain = renderInventory;

  function setActiveTab(category) {
    activeCategory = normalizeCategory(category);

    tabButtons.forEach((tab) => {
      const isActive = tab.dataset.category === activeCategory;
      tab.classList.toggle("active", isActive);
      tab.setAttribute("aria-selected", String(isActive));
    });

    renderInventory();
  }

  tabButtons.forEach((tab) => {
    tab.addEventListener("click", () => setActiveTab(tab.dataset.category));
  });

  inventoryToggle.addEventListener("click", openInventory);
  inventoryClose.addEventListener("click", closeInventory);

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && inventoryPanel.classList.contains("open")) {
      closeInventory();
    }
  });

  setActiveTab(activeCategory);
}

// ==================== INICIALIZACIÓN ====================

function initializeAll() {
  initSessionReset();
  initInventoryUI();
  createNewGameButton();
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initializeAll);
} else {
  initializeAll();
}

// ==================== EXPORTAR FUNCIONES ====================

window.InventorySystem = {
  initInventoryUI,
  loadInventory,
  saveInventory,
  addItemToInventory,
  resetInventory,
  createNewGameButton,
  // Función de debug
  debugIcons: function() {
    const items = loadInventory();
    console.log("📦 ITEMS EN INVENTARIO:");
    items.forEach(item => {
      console.log(`  - ${item.name}: ${item.icon || '(sin icono)'}`);
      if (item.icon) {
        const img = new Image();
        img.onload = () => console.log(`    ✅ ${item.icon} - OK`);
        img.onerror = () => console.log(`    ❌ ${item.icon} - NO ENCONTRADA`);
        img.src = item.icon;
      }
    });
  },
  // Función para ver la ruta base detectada
  getBasePath: getBasePath
};
