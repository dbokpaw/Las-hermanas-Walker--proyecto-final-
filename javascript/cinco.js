document.addEventListener("DOMContentLoaded", () => {
  // Rutas relativas al HTML (cinco.html está en la raíz de TFinal)
  const imgPath = "./img/";
  const comicsPath = "./img/comics/";
  
  console.log("Buscando imágenes en:", comicsPath);
  
  const btnAoi = document.getElementById("btn-aoi");
  const btnHeizou = document.getElementById("btn-heizou");
  const sceneAoi = document.getElementById("scene-aoi");
  const sceneHeizou = document.getElementById("scene-heizou");
  
  // Crear contenedores
  const aoiImageContainer = document.createElement("div");
  aoiImageContainer.id = "aoi-image-container";
  aoiImageContainer.className = "comic-container hidden";
  
  const heizouImageContainer = document.createElement("div");
  heizouImageContainer.id = "heizou-image-container";
  heizouImageContainer.className = "comic-container hidden";
  
  const choicesLine = document.querySelector(".choices-line");
  if (choicesLine && choicesLine.parentNode) {
    choicesLine.insertAdjacentElement("afterend", aoiImageContainer);
    aoiImageContainer.insertAdjacentElement("afterend", heizouImageContainer);
  }
  
  function showAoi() {
    aoiImageContainer.classList.add("hidden");
    heizouImageContainer.classList.add("hidden");
    if (sceneAoi) sceneAoi.classList.add("hidden");
    if (sceneHeizou) sceneHeizou.classList.add("hidden");
    
    aoiImageContainer.innerHTML = '';
    const img = document.createElement("img");
    img.src = comicsPath + "aoicomic.webp";
    img.alt = "Tira cómica: Aoi Miyazaki conversando con el protagonista en el rellano durante el apagón. Aoi muestra sus bocetos mientras la linterna ilumina sus dibujos.";
    img.className = "comic-image";
    img.loading = "lazy";
    
    img.onerror = () => console.error("❌ No se pudo cargar:", img.src);
    img.onload = () => console.log("✅ Imagen cargada:", img.src);
    
    aoiImageContainer.appendChild(img);
    aoiImageContainer.classList.remove("hidden");
    aoiImageContainer.classList.add("visible");
    
    setTimeout(() => {
      aoiImageContainer.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 100);
  }
  
  function showHeizou() {
    aoiImageContainer.classList.add("hidden");
    heizouImageContainer.classList.add("hidden");
    if (sceneAoi) sceneAoi.classList.add("hidden");
    if (sceneHeizou) sceneHeizou.classList.add("hidden");
    
    heizouImageContainer.innerHTML = '';
    const img = document.createElement("img");
    img.src = comicsPath + "heizoucomic.webp";
    img.alt = "Tira cómica: Heizou con su característica sonrisa burlona enseñándole al protagonista un baile. El apagón de fondo crea un ambiente íntimo mientras otros vecinos observan divertidos.";
    img.className = "comic-image";
    img.loading = "lazy";
    
    img.onerror = () => console.error("❌ No se pudo cargar:", img.src);
    img.onload = () => console.log("✅ Imagen cargada:", img.src);
    
    heizouImageContainer.appendChild(img);
    heizouImageContainer.classList.remove("hidden");
    heizouImageContainer.classList.add("visible");
    
    setTimeout(() => {
      heizouImageContainer.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 100);
  }
  
  if (btnAoi) btnAoi.addEventListener("click", showAoi);
  if (btnHeizou) btnHeizou.addEventListener("click", showHeizou);
  
  if (sceneAoi) sceneAoi.classList.add("hidden");
  if (sceneHeizou) sceneHeizou.classList.add("hidden");
  aoiImageContainer.classList.add("hidden");
  heizouImageContainer.classList.add("hidden");
  
  // Inventory System - CORREGIDO: solo el nombre del archivo
  if (window.InventorySystem) {
    window.InventorySystem.addItemToInventory({
      id: "ruta-cinco",
      name: "Ruta: Reunión vecinal",
      description: "Asistes a la reunión en el rellano y conoces a varios vecinos.",
      category: "ruta",
      rarity: 4,
      icon: "reunion-vecinal.webp"  
    });

    window.InventorySystem.addItemToInventory({
      id: "aoi-miyazaki",
      name: "Aoi Miyazaki",
      description: "Nuevo vecino del 9ºB. Ilustrador profesional.",
      category: "persona",
      rarity: 3,
      icon: "aoi.webp"  
    });

    window.InventorySystem.addItemToInventory({
      id: "heizou",
      name: "Heizou",
      description: "Vecino de humor burlón; prefiere coreografías antes que cocinar.",
      category: "persona",
      rarity: 3,
      icon: "heizou.webp"  
    });

    window.InventorySystem.addItemToInventory({
      id: "akio",
      name: "Akio",
      description: "Otro de los vecinos presentes en la reunión.",
      category: "persona",
      rarity: 2,
      icon: "akio.webp"  
    });

    window.InventorySystem.addItemToInventory({
      id: "youra",
      name: "Youra",
      description: "Vecino lacónico; se presenta con un escueto 'eh'.",
      category: "persona",
      rarity: 2,
      icon: "youra.webp"  
    });

    window.InventorySystem.initInventoryUI();
  }
});
