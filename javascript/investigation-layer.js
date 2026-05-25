// ===== CAPA DE INVESTIGACIÓN - VERSIÓN LUPA =====
// Funciona en local (file://) sin necesidad de servidor
(function() {
    'use strict';
    
    // Evitar múltiples instancias
    if (window.investigationLayerLoaded) return;
    window.investigationLayerLoaded = true;
    
    console.log("🔍 Capa de investigación (lupa) cargada");
    
    // ===== CONFIGURACIÓN =====
    const STORAGE_KEY = "dreamers_investigation";
    
    // Cargar o inicializar datos
    let investigationData = {
        hours: 47,
        cluesFound: 0,
        foundClues: []
    };
    
    try {
        const saved = localStorage.getItem(STORAGE_KEY);
        if (saved) {
            const parsed = JSON.parse(saved);
            investigationData = { ...investigationData, ...parsed };
        }
    } catch(e) {}
    
    // Guardar datos
    function saveData() {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(investigationData));
    }
    
    // ===== FUNCIONES PÚBLICAS =====
    window.investigation = {
        addClue: function(clueId, clueText) {
            if (investigationData.foundClues.includes(clueId)) return false;
            
            investigationData.foundClues.push(clueId);
            investigationData.cluesFound++;
            saveData();
            
            const statusSpan = document.getElementById(`clue-${clueId}`);
            if (statusSpan) {
                statusSpan.textContent = '✓';
                statusSpan.style.color = '#66ff66';
            }
            
            const cluesSpan = document.getElementById('investClues');
            if (cluesSpan) cluesSpan.textContent = investigationData.cluesFound;
            
            showNotification('🔍 EVIDENCIA REGISTRADA', clueText);
            return true;
        },
        
        addHours: function(hours) {
            investigationData.hours += hours;
            saveData();
            const hoursSpan = document.getElementById('investHours');
            if (hoursSpan) hoursSpan.textContent = investigationData.hours.toFixed(1);
        }
    };
    
    // ===== CREAR ELEMENTOS VISUALES =====
    function createInvestigationUI() {
        // Botón lupa - Ahora más arriba (bottom: 90px) para estar ENCIMA del botón Nueva Partida
        const lupaBtn = document.createElement('div');
        lupaBtn.id = 'lupa-investigation';
        lupaBtn.innerHTML = `
            <img src="img/lupa.png" alt="Investigar" class="lupa-icon" onerror="this.src='data:image/svg+xml,%3Csvg xmlns=\\'http://www.w3.org/2000/svg\\' width=\\'30\\' height=\\'30\\' viewBox=\\'0 0 24 24\\' fill=\\'none\\' stroke=\\'%23ff4444\\' stroke-width=\\'2\\'%3E%3Ccircle cx=\\'10\\' cy=\\'10\\' r=\\'7\\'/%3E%3Cline x1=\\'15\\' y1=\\'15\\' x2=\\'21\\' y2=\\'21\\'/%3E%3C/svg%3E'">
            <span class="lupa-tooltip">CUADERNO DE INVESTIGACIÓN</span>
            <span class="lupa-badge" id="lupaBadge">${investigationData.cluesFound}</span>
        `;
        document.body.appendChild(lupaBtn);
        
        // Panel desplegable
        const panel = document.createElement('div');
        panel.id = 'investigation-panel';
        panel.innerHTML = `
            <div class="invest-header">
                <span class="invest-icon">🔍</span>
                <span class="invest-title">CUADERNO DE INVESTIGACIÓN</span>
                <button class="invest-pin" id="investPinBtn" title="Mantener abierto">📌</button>
                <span class="invest-close">✕</span>
            </div>
            <div class="invest-content">
                <div class="invest-stats">
                    <div class="stat">
                        <span class="stat-label">⏱️ HORAS INVESTIGANDO</span>
                        <span class="stat-value" id="investHours">${investigationData.hours.toFixed(1)}</span>
                    </div>
                    <div class="stat">
                        <span class="stat-label">🔍 PISTAS ENCONTRADAS</span>
                        <span class="stat-value" id="investClues">${investigationData.cluesFound}</span>
                    </div>
                </div>
                
                <div class="invest-section">
                    <div class="section-title">📸 COMPARATIVA FOTOGRÁFICA</div>
                    <div class="photo-comparison" id="photoComparison">
                        <div class="photo-card">
                            <img src="img/ivy-placeholder.png" alt="Ivy Walker" class="comparison-photo" id="ivyPhoto" onerror="this.src='data:image/svg+xml,%3Csvg xmlns=\\'http://www.w3.org/2000/svg\\' width=\\'80\\' height=\\'80\\' viewBox=\\'0 0 80 80\\'%3E%3Crect width=\\'80\\' height=\\'80\\' fill=\\'%234a4a6a\\'/%3E%3Ctext x=\\'40\\' y=\\'45\\' text-anchor=\\'middle\\' fill=\\'%23fff\\' font-size=\\'10\\'%3EIvy%3C/text%3E%3C/svg%3E'">
                            <div class="photo-label">Ivy Walker<br><span>2023</span></div>
                        </div>
                        <div class="vs-icon">VS</div>
                        <div class="photo-card">
                            <img src="img/terry-placeholder.png" alt="Terry Walker" class="comparison-photo" id="terryPhoto" onerror="this.src='data:image/svg+xml,%3Csvg xmlns=\\'http://www.w3.org/2000/svg\\' width=\\'80\\' height=\\'80\\' viewBox=\\'0 0 80 80\\'%3E%3Crect width=\\'80\\' height=\\'80\\' fill=\\'%238b0000\\'/%3E%3Ctext x=\\'40\\' y=\\'45\\' text-anchor=\\'middle\\' fill=\\'%23fff\\' font-size=\\'10\\'%3ETerry%3C/text%3E%3C/svg%3E'">
                            <div class="photo-label">"Ivy"<br><span>2024</span></div>
                        </div>
                    </div>
                    <button class="compare-btn" id="compareBtn">🔍 MARCAR INCONSISTENCIAS</button>
                </div>
                
                <div class="invest-section">
                    <div class="section-title">📌 HALLAZGOS</div>
                    <div class="clue-list" id="clueList">
                        <div class="clue-item" data-clue="gemelas" data-text="Nadie ha visto a Ivy y Terry juntas">
                            <span class="clue-status" id="clue-gemelas">${investigationData.foundClues.includes('gemelas') ? '✓' : '◌'}</span>
                            <span class="clue-text">Nadie ha visto a Ivy y Terry juntas</span>
                        </div>
                        <div class="clue-item" data-clue="entrevista" data-text="La entrevista tiene cortes sospechosos">
                            <span class="clue-status" id="clue-entrevista">${investigationData.foundClues.includes('entrevista') ? '✓' : '◌'}</span>
                            <span class="clue-text">La entrevista tiene cortes sospechosos</span>
                        </div>
                        <div class="clue-item" data-clue="fiestas" data-text="Ivy odiaba fiestas / Terry las organiza">
                            <span class="clue-status" id="clue-fiestas">${investigationData.foundClues.includes('fiestas') ? '✓' : '◌'}</span>
                            <span class="clue-text">Ivy odiaba fiestas / Terry las organiza</span>
                        </div>
                        <div class="clue-item" data-clue="gafas" data-text="Ivy NUNCA usaba gafas de sol">
                            <span class="clue-status" id="clue-gafas">${investigationData.foundClues.includes('gafas') ? '✓' : '◌'}</span>
                            <span class="clue-text">Ivy NUNCA usaba gafas de sol</span>
                        </div>
                        <div class="clue-item" data-clue="sonrisa" data-text="La sonrisa no coincide con Ivy">
                            <span class="clue-status" id="clue-sonrisa">${investigationData.foundClues.includes('sonrisa') ? '✓' : '◌'}</span>
                            <span class="clue-text">La sonrisa no coincide con Ivy</span>
                        </div>
                        <div class="clue-item" data-clue="mano" data-text="Mano dominante parece diferente">
                            <span class="clue-status" id="clue-mano">${investigationData.foundClues.includes('mano') ? '✓' : '◌'}</span>
                            <span class="clue-text">Mano dominante parece diferente</span>
                        </div>
                    </div>
                </div>
                
                <div class="invest-section">
                    <div class="section-title">📝 NOTAS DEL CASO</div>
                    <div class="notes-container">
                        <div class="invest-note">
                            <span class="note-emoji">⚠️</span>
                            <span class="note-text">¿Por qué Terry se hace pasar por Ivy?</span>
                        </div>
                        <div class="invest-note yellow">
                            <span class="note-emoji">📍</span>
                            <span class="note-text">¿Dónde está la verdadera Ivy?</span>
                        </div>
                        <div class="invest-note">
                            <span class="note-emoji">🎭</span>
                            <span class="note-text">El comportamiento NO coincide</span>
                        </div>
                    </div>
                </div>
            </div>
        `;
        document.body.appendChild(panel);
        
        // Esquinas decorativas
        createCrimeCorners();
        
        // Configurar eventos
        setupEvents(panel);
        
        // Actualizar badge
        updateLupaBadge();
    }
    
    function updateLupaBadge() {
        const badge = document.getElementById('lupaBadge');
        if (badge && investigationData.cluesFound > 0) {
            badge.classList.add('has-clues');
        }
    }
    
    function createCrimeCorners() {
        const corners = [
            { pos: 'tl' }, { pos: 'tr' }, { pos: 'bl' }, { pos: 'br' }
        ];
        corners.forEach(corner => {
            const cornerDiv = document.createElement('div');
            cornerDiv.className = `invest-corner corner-${corner.pos}`;
            document.body.appendChild(cornerDiv);
        });
    }
    
    let panelPinned = false;
    
    function showNotification(title, message) {
        const notif = document.createElement('div');
        notif.className = 'invest-notification';
        notif.innerHTML = `<strong>${title}</strong><br>${message}`;
        document.body.appendChild(notif);
        
        setTimeout(() => {
            notif.classList.add('fade-out');
            setTimeout(() => notif.remove(), 500);
        }, 3000);
    }
    
    function setupEvents(panel) {
        const lupa = document.getElementById('lupa-investigation');
        const pinBtn = document.getElementById('investPinBtn');
        
        if (lupa && panel) {
            lupa.addEventListener('mouseenter', () => {
                if (!panelPinned) panel.classList.add('visible');
            });
            
            panel.addEventListener('mouseenter', () => {
                if (!panelPinned) panel.classList.add('visible');
            });
            
            lupa.addEventListener('mouseleave', () => {
                if (!panelPinned && !panel.matches(':hover')) {
                    panel.classList.remove('visible');
                }
            });
            
            panel.addEventListener('mouseleave', () => {
                if (!panelPinned && !lupa.matches(':hover')) {
                    panel.classList.remove('visible');
                }
            });
            
            if (pinBtn) {
                pinBtn.addEventListener('click', (e) => {
                    e.stopPropagation();
                    panelPinned = !panelPinned;
                    pinBtn.classList.toggle('active');
                    panel.classList.toggle('pinned');
                    
                    if (panelPinned) {
                        panel.classList.add('visible');
                        pinBtn.textContent = '📍';
                    } else {
                        pinBtn.textContent = '📌';
                    }
                });
            }
        }
        
        const closeBtn = panel.querySelector('.invest-close');
        if (closeBtn) {
            closeBtn.addEventListener('click', () => {
                panel.classList.remove('visible');
                if (panelPinned) {
                    panelPinned = false;
                    if (pinBtn) {
                        pinBtn.classList.remove('active');
                        pinBtn.textContent = '📌';
                    }
                }
            });
        }
        
        const compareBtn = document.getElementById('compareBtn');
        if (compareBtn) {
            compareBtn.addEventListener('click', () => {
                window.investigation.addClue('gemelas', 'Las fotos muestran diferencias en el rostro');
            });
        }
        
        document.querySelectorAll('.clue-item').forEach(item => {
            item.addEventListener('click', () => {
                const clueId = item.dataset.clue;
                const clueText = item.dataset.text;
                if (clueId && !investigationData.foundClues.includes(clueId)) {
                    window.investigation.addClue(clueId, clueText);
                    updateLupaBadge();
                }
            });
        });
    }
    
    // ===== INYECTAR ESTILOS =====
    function injectStyles() {
        const style = document.createElement('style');
        style.textContent = `
            /* ===== BOTÓN LUPA - MÁS ARRIBA ===== */
            #lupa-investigation {
                position: fixed;
                left: 20px;
                bottom: 90px;
                width: 55px;
                height: 55px;
                background: linear-gradient(135deg, #0d1117 0%, #161b22 100%);
                border-radius: 50%;
                display: flex;
                align-items: center;
                justify-content: center;
                cursor: pointer;
                z-index: 9999;
                transition: all 0.3s ease;
                box-shadow: 0 4px 15px rgba(0,0,0,0.4);
                border: 2px solid rgba(255,68,68,0.6);
            }
            
            #lupa-investigation:hover {
                transform: scale(1.1);
                border-color: #ff4444;
                box-shadow: 0 0 20px rgba(255,68,68,0.5);
            }
            
            .lupa-icon {
                width: 32px;
                height: 32px;
                object-fit: contain;
            }
            
            .lupa-tooltip {
                position: absolute;
                left: 65px;
                background: #ff4444;
                color: white;
                padding: 5px 12px;
                border-radius: 20px;
                font-size: 10px;
                font-family: monospace;
                white-space: nowrap;
                opacity: 0;
                transition: opacity 0.3s;
                pointer-events: none;
                font-weight: bold;
            }
            
            #lupa-investigation:hover .lupa-tooltip {
                opacity: 1;
            }
            
            .lupa-badge {
                position: absolute;
                top: -5px;
                right: -5px;
                background: #ff4444;
                color: white;
                border-radius: 50%;
                width: 20px;
                height: 20px;
                font-size: 10px;
                display: flex;
                align-items: center;
                justify-content: center;
                font-weight: bold;
                font-family: monospace;
                opacity: 0;
            }
            
            .lupa-badge.has-clues {
                opacity: 1;
                animation: pulse 1s infinite;
            }
            
            @keyframes pulse {
                0%, 100% { transform: scale(1); }
                50% { transform: scale(1.1); }
            }
            
            /* ===== PANEL DE INVESTIGACIÓN ===== */
            #investigation-panel {
                position: fixed;
                left: 20px;
                bottom: 160px;
                width: 350px;
                background: linear-gradient(135deg, #0d1117 0%, #161b22 100%);
                border: 1px solid #ff4444;
                border-radius: 12px;
                font-family: 'Courier New', monospace;
                z-index: 9998;
                box-shadow: 0 10px 30px rgba(0,0,0,0.5);
                opacity: 0;
                visibility: hidden;
                transform: translateY(10px);
                transition: all 0.3s ease;
                color: #c9d1d9;
                pointer-events: none;
            }
            
            #investigation-panel.visible {
                opacity: 1;
                visibility: visible;
                transform: translateY(0);
                pointer-events: auto;
            }
            
            #investigation-panel.pinned {
                border-color: #ff8888;
                box-shadow: 0 0 15px rgba(255,68,68,0.3);
            }
            
            .invest-header {
                display: flex;
                align-items: center;
                justify-content: space-between;
                padding: 12px 15px;
                background: rgba(255,68,68,0.1);
                border-bottom: 1px solid #ff4444;
                border-radius: 12px 12px 0 0;
            }
            
            .invest-icon { font-size: 16px; }
            .invest-title { font-weight: bold; letter-spacing: 1px; font-size: 11px; flex: 1; margin-left: 8px; }
            .invest-pin {
                background: none;
                border: none;
                color: #8b949e;
                cursor: pointer;
                font-size: 14px;
                padding: 4px;
                margin-right: 8px;
            }
            .invest-pin.active { color: #ff8888; transform: rotate(45deg); }
            .invest-close { 
                cursor: pointer; 
                font-size: 16px;
                color: #ff8888;
            }
            .invest-close:hover { color: #ff4444; transform: scale(1.1); }
            
            .invest-content {
                padding: 15px;
                max-height: 60vh;
                overflow-y: auto;
            }
            
            .invest-stats {
                display: flex;
                justify-content: space-between;
                margin-bottom: 15px;
                padding: 10px;
                background: rgba(0,0,0,0.3);
                border-radius: 8px;
            }
            
            .stat { text-align: center; flex: 1; }
            .stat-label { display: block; font-size: 9px; color: #8b949e; margin-bottom: 5px; }
            .stat-value { font-size: 18px; font-weight: bold; color: #ff8888; }
            
            .invest-section { margin: 15px 0; }
            .section-title {
                font-size: 10px;
                color: #ff8888;
                border-bottom: 1px solid #30363d;
                padding-bottom: 6px;
                margin-bottom: 12px;
            }
            
            .photo-comparison {
                display: flex;
                align-items: center;
                justify-content: center;
                gap: 15px;
                margin: 10px 0;
            }
            
            .photo-card { text-align: center; }
            .comparison-photo {
                width: 80px;
                height: 80px;
                border-radius: 8px;
                object-fit: cover;
                border: 2px solid;
            }
            .photo-card:first-child .comparison-photo { border-color: #4c9aff; }
            .photo-card:last-child .comparison-photo { border-color: #ff4444; }
            .photo-label { font-size: 8px; margin-top: 5px; color: #8b949e; }
            .vs-icon { font-size: 12px; color: #ff8888; font-weight: bold; }
            
            .compare-btn {
                width: 100%;
                background: rgba(255,68,68,0.15);
                border: 1px solid #ff4444;
                color: #ff8888;
                padding: 6px;
                border-radius: 6px;
                cursor: pointer;
                font-size: 9px;
                font-family: monospace;
                margin-top: 10px;
            }
            .compare-btn:hover { background: rgba(255,68,68,0.3); }
            
            .clue-list {
                display: flex;
                flex-direction: column;
                gap: 8px;
            }
            
            .clue-item {
                display: flex;
                align-items: center;
                gap: 10px;
                padding: 6px 8px;
                background: rgba(255,255,255,0.03);
                border-radius: 6px;
                cursor: pointer;
                font-size: 10px;
            }
            .clue-item:hover {
                background: rgba(255,68,68,0.1);
                transform: translateX(3px);
            }
            .clue-status { font-weight: bold; font-size: 12px; width: 18px; }
            .clue-text { flex: 1; }
            
            .notes-container {
                display: flex;
                flex-direction: column;
                gap: 8px;
            }
            
            .invest-note {
                display: flex;
                align-items: center;
                gap: 10px;
                padding: 8px;
                background: rgba(255,255,255,0.05);
                border-radius: 6px;
                font-size: 10px;
                border-left: 2px solid #ff4444;
            }
            .invest-note.yellow {
                background: rgba(255,200,0,0.1);
                border-left-color: #ffcc00;
            }
            .note-emoji { font-size: 12px; }
            .note-text { flex: 1; }
            
            .invest-corner {
                position: fixed;
                width: 30px;
                height: 30px;
                z-index: 9997;
                pointer-events: none;
                opacity: 0.7;
            }
            .corner-tl { top: 10px; left: 10px; border-top: 2px solid #ff4444; border-left: 2px solid #ff4444; }
            .corner-tr { top: 10px; right: 10px; border-top: 2px solid #ff4444; border-right: 2px solid #ff4444; }
            .corner-bl { bottom: 10px; left: 10px; border-bottom: 2px solid #ff4444; border-left: 2px solid #ff4444; }
            .corner-br { bottom: 10px; right: 10px; border-bottom: 2px solid #ff4444; border-right: 2px solid #ff4444; }
            
            .invest-notification {
                position: fixed;
                bottom: 170px;
                left: 90px;
                background: #0d1117;
                color: #ffccaa;
                padding: 8px 15px;
                border-radius: 8px;
                font-family: monospace;
                font-size: 10px;
                z-index: 10000;
                border-left: 3px solid #ff4444;
                animation: slideInLeft 0.3s ease;
            }
            .invest-notification.fade-out {
                animation: fadeOutLeft 0.5s ease forwards;
            }
            
            @keyframes slideInLeft {
                from { transform: translateX(-50px); opacity: 0; }
                to { transform: translateX(0); opacity: 1; }
            }
            @keyframes fadeOutLeft {
                to { opacity: 0; transform: translateX(-30px); }
            }
            
            .invest-content::-webkit-scrollbar { width: 4px; }
            .invest-content::-webkit-scrollbar-track { background: #1a1a2e; }
            .invest-content::-webkit-scrollbar-thumb { background: #ff4444; border-radius: 4px; }
            
            @media (max-width: 600px) {
                #investigation-panel {
                    left: 10px;
                    right: 10px;
                    width: auto;
                    bottom: 140px;
                }
                .photo-comparison { gap: 8px; }
                .comparison-photo { width: 60px; height: 60px; }
                .invest-corner { display: none; }
                #lupa-investigation { bottom: 70px; }
            }
        `;
        document.head.appendChild(style);
    }
    
    function startHourCounter() {
        setInterval(() => {
            investigationData.hours += 0.1;
            saveData();
            const hoursSpan = document.getElementById('investHours');
            if (hoursSpan) hoursSpan.textContent = investigationData.hours.toFixed(1);
        }, 60000);
    }
    
    function init() {
        if (!document.body) return;
        injectStyles();
        createInvestigationUI();
        startHourCounter();
        console.log("✅ Lupa de investigación activada");
    }
    
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
})();