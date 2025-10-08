const params = new URLSearchParams(window.location.search);
const rutaId = parseInt(params.get('id'));

const ruta = rutas.find(r => r.id === rutaId);

if (!ruta) {
    window.location.href = 'rutas.html';
}

const detalleHero = document.getElementById('detalleHero');
detalleHero.style.backgroundImage = `linear-gradient(rgba(0,0,0,0.6), rgba(0,0,0,0.6)), url('${ruta.imagen}')`;
detalleHero.innerHTML = `
    <div class="detalle-hero-content">
        <h1>${ruta.nombre}</h1>
        <p>${ruta.barrio} - ${ruta.distancia} km</p>
        ${ruta.realizada ? '<span class="badge-realizada-big">✓ Ruta Completada</span>' : ''}
    </div>
`;

const detalleInfo = document.getElementById('detalleInfo');
detalleInfo.innerHTML = `
    <h2>Descripción del Recorrido</h2>
    <p class="recorrido-detalle">${ruta.recorrido}</p>
    
    <h3>Características de la Ruta</h3>
    <div class="caracteristicas-grid">
        <div class="caracteristica-item">
            <span class="caracteristica-icon">📍</span>
            <div>
                <strong>Barrio</strong>
                <p>${ruta.barrio}</p>
            </div>
        </div>
        
        <div class="caracteristica-item">
            <span class="caracteristica-icon">📏</span>
            <div>
                <strong>Distancia</strong>
                <p>${ruta.distancia} km</p>
            </div>
        </div>
        
        <div class="caracteristica-item">
            <span class="caracteristica-icon">🛤️</span>
            <div>
                <strong>Superficie</strong>
                <p>${ruta.superficie}</p>
            </div>
        </div>
        
        <div class="caracteristica-item">
            <span class="caracteristica-icon">⚡</span>
            <div>
                <strong>Dificultad</strong>
                <p>${ruta.dificultad}</p>
            </div>
        </div>
    </div>
    
    <h3>Puntos Clave</h3>
    <ul class="puntos-clave">
        <li>Terreno: ${ruta.superficie}</li>
        <li>Ideal para: Runners de nivel ${ruta.dificultad.toLowerCase()}</li>
        <li>Tiempo estimado: ${calcularTiempo(ruta.distancia)} minutos</li>
        <li>Mejor horario: Temprano en la mañana o al atardecer</li>
    </ul>
`;

const infoRapida = document.getElementById('infoRapida');
infoRapida.innerHTML = `
    <div class="info-item">
        <strong>Distancia:</strong>
        <span>${ruta.distancia} km</span>
    </div>
    <div class="info-item">
        <strong>Dificultad:</strong>
        <span>${ruta.dificultad}</span>
    </div>
    <div class="info-item">
        <strong>Superficie:</strong>
        <span>${ruta.superficie}</span>
    </div>
    <div class="info-item">
        <strong>Tiempo aprox:</strong>
        <span>${calcularTiempo(ruta.distancia)} min</span>
    </div>
`;

function calcularTiempo(distancia) {
    return Math.round(distancia * 6);
}

const btnMarcarRealizada = document.getElementById('btnMarcarRealizada');
btnMarcarRealizada.textContent = ruta.realizada ? '✓ Realizada' : 'Marcar como realizada';
btnMarcarRealizada.className = ruta.realizada ? 'btn-action-full btn-realizada-active' : 'btn-action-full';

btnMarcarRealizada.addEventListener('click', function() {
    ruta.realizada = !ruta.realizada;
    btnMarcarRealizada.textContent = ruta.realizada ? '✓ Realizada' : 'Marcar como realizada';
    btnMarcarRealizada.className = ruta.realizada ? 'btn-action-full btn-realizada-active' : 'btn-action-full';
    
    location.reload();
});

document.getElementById('btnEditarRuta').addEventListener('click', function() {
    alert('Función de edición en desarrollo. ID: ' + rutaId);
});

document.getElementById('btnEliminarRuta').addEventListener('click', function() {
    if (confirm('¿Estás seguro de eliminar esta ruta?')) {
        const index = rutas.findIndex(r => r.id === rutaId);
        if (index !== -1) {
            rutas.splice(index, 1);
            alert('Ruta eliminada correctamente');
            window.location.href = 'rutas.html';
        }
    }
});