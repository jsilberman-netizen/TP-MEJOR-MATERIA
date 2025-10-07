let rutas = [
    {
        id: 1,
        nombre: "Circuito Lagos de Palermo",
        barrio: "Palermo",
        distancia: 6.5,
        superficie: "Asfalto",
        dificultad: "Fácil"
    },
    {
        id: 2,
        nombre: "Costanera Norte Completa",
        barrio: "Costanera",
        distancia: 12,
        superficie: "Asfalto",
        dificultad: "Media"
    },
    {
        id: 3,
        nombre: "Reserva Ecológica",
        barrio: "Puerto Madero",
        distancia: 8,
        superficie: "Tierra",
        dificultad: "Fácil"
    },
    {
        id: 4,
        nombre: "Circuito Recoleta",
        barrio: "Recoleta",
        distancia: 4.5,
        superficie: "Asfalto",
        dificultad: "Fácil"
    },
    {
        id: 5,
        nombre: "Bosques de Palermo - Extenso",
        barrio: "Palermo",
        distancia: 10,
        superficie: "Mixta",
        dificultad: "Media"
    },
    {
        id: 6,
        nombre: "Barrancas de Belgrano",
        barrio: "Belgrano",
        distancia: 5,
        superficie: "Asfalto",
        dificultad: "Fácil"
    }
];

let rutasFiltradas = [...rutas];

function renderizarRutas(rutasParaMostrar) {
    const rutasGrid = document.getElementById('rutasGrid');
    
    if (rutasParaMostrar.length === 0) {
        rutasGrid.innerHTML = '<p style="color: #bbb; text-align: center; grid-column: 1/-1;">No se encontraron rutas con esos filtros.</p>';
        return;
    }
    
    rutasGrid.innerHTML = '';
    
    rutasParaMostrar.forEach(ruta => {
        const rutaCard = document.createElement('div');
        rutaCard.className = 'ruta-card';
        
        rutaCard.innerHTML = `
            <h3>${ruta.nombre}</h3>
            <div class="ruta-info">
                <p><strong>Barrio:</strong> ${ruta.barrio}</p>
                <p><strong>Distancia:</strong> ${ruta.distancia} km</p>
                <p><strong>Superficie:</strong> ${ruta.superficie}</p>
                <p><strong>Dificultad:</strong> ${ruta.dificultad}</p>
            </div>
            <div class="ruta-actions">
                <button class="btn-edit" onclick="editarRuta(${ruta.id})">Editar</button>
                <button class="btn-delete" onclick="eliminarRuta(${ruta.id})">Eliminar</button>
            </div>
        `;
        
        rutasGrid.appendChild(rutaCard);
    });
}

function filtrarRutas() {
    const barrio = document.getElementById('filtroBarrio').value;
    const distancia = document.getElementById('filtroDistancia').value;
    const superficie = document.getElementById('filtroSuperficie').value;
    
    rutasFiltradas = rutas.filter(ruta => {
        let cumpleBarrio = barrio === 'todos' || ruta.barrio === barrio;
        
        let cumpleDistancia = true;
        if (distancia === '0-5') {
            cumpleDistancia = ruta.distancia <= 5;
        } else if (distancia === '5-10') {
            cumpleDistancia = ruta.distancia > 5 && ruta.distancia <= 10;
        } else if (distancia === '10+') {
            cumpleDistancia = ruta.distancia > 10;
        }
        
        let cumpleSuperficie = superficie === 'todas' || ruta.superficie === superficie;
        
        return cumpleBarrio && cumpleDistancia && cumpleSuperficie;
    });
    
    renderizarRutas(rutasFiltradas);
}

function limpiarFiltros() {
    document.getElementById('filtroBarrio').value = 'todos';
    document.getElementById('filtroDistancia').value = 'todas';
    document.getElementById('filtroSuperficie').value = 'todas';
    
    rutasFiltradas = [...rutas];
    renderizarRutas(rutasFiltradas);
}

function eliminarRuta(id) {
    if (confirm('¿Estás seguro de eliminar esta ruta?')) {
        rutas = rutas.filter(ruta => ruta.id !== id);
        filtrarRutas();
    }
}

function editarRuta(id) {
    alert('Función de edición en desarrollo. ID de ruta: ' + id);
}

function agregarRuta() {
    alert('Formulario de agregar ruta en desarrollo');
}

document.getElementById('btnFiltrar').addEventListener('click', filtrarRutas);
document.getElementById('btnLimpiar').addEventListener('click', limpiarFiltros);
document.getElementById('btnAgregarRuta').addEventListener('click', agregarRuta);

renderizarRutas(rutas);