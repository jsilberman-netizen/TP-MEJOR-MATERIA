let rutas = [
    {
        id: 1,
        nombre: "Reserva Ecológica",
        barrio: "Puerto Madero",
        distancia: 8,
        superficie: "Tierra",
        dificultad: "Fácil",
        imagen: "reserva.jpeg",
        recorrido: "Circuito por senderos de tierra dentro de la reserva. Rodeado de naturaleza.",
        realizada: false
    },
    {
        id: 2,
        nombre: "Circuito Recoleta",
        barrio: "Recoleta",
        distancia: 4.5,
        superficie: "Asfalto",
        dificultad: "Fácil",
        imagen: "francia.jpg",
        recorrido: "Plaza Francia, Biblioteca Nacional y vuelta. Perfecto para entrenamientos cortos.",
        realizada: false
    },
    {
        id: 3,
        nombre: "Bosques de Palermo - Extenso",
        barrio: "Palermo",
        distancia: 10,
        superficie: "Mixta",
        dificultad: "Media",
        imagen: "planetario.jpeg",
        recorrido: "Combina asfalto y tierra. Recorre Rosedal, Planetario y lagos completos.",
        realizada: false
    },
    {
        id: 4,
        nombre: "Barrancas de Belgrano",
        barrio: "Belgrano",
        distancia: 5,
        superficie: "Asfalto",
        dificultad: "Fácil",
        imagen: "barrancas.jpeg",
        recorrido: "Circuito por las históricas barrancas. Incluye subidas y bajadas moderadas.",
        realizada: false
    },
    {
        id: 5,
        nombre: "Puerto Madero - Puente de la Mujer",
        barrio: "Puerto Madero",
        distancia: 7,
        superficie: "Asfalto",
        dificultad: "Fácil",
        imagen: "madero.jpeg",
        recorrido: "Diques 1, 2, 3 y 4. Terreno completamente llano con excelente vista.",
        realizada: false
    },
    {
        id: 6,
        nombre: "Parque Centenario",
        barrio: "Caballito",
        distancia: 3.5,
        superficie: "Asfalto",
        dificultad: "Fácil",
        imagen: "centenario.jpeg",
        recorrido: "Vueltas al parque. Ideal para intervalos y entrenamientos de velocidad.",
        realizada: false
    },
    {
        id: 7,
        nombre: "Circuito Lagos de Palermo",
        barrio: "Palermo",
        distancia: 6.5,
        superficie: "Asfalto",
        dificultad: "Fácil",
        imagen: "palermo.jpeg",
        recorrido: "Recorrido circular alrededor de los 3 lagos de Palermo. Ideal para principiantes.",
        realizada: false
    },
    {
        id: 8,
        nombre: "Costanera Norte Completa",
        barrio: "Costanera",
        distancia: 12,
        superficie: "Asfalto",
        dificultad: "Media",
        imagen: "norte.jpeg",
        recorrido: "Ida y vuelta por toda la Costanera Norte. Vista al río, terreno llano.",
        realizada: false
    },
    {
        id: 9,
        nombre: "Avenida Figueroa Alcorta",
        barrio: "Recoleta",
        distancia: 9,
        superficie: "Asfalto",
        dificultad: "Media",
        imagen: "alcorta.jpeg",
        recorrido: "Ida y vuelta desde Recoleta hasta Palermo por la avenida principal.",
        realizada: false
    },
    {
        id: 10,
        nombre: "Ciudad Universitaria",
        barrio: "Belgrano",
        distancia: 5.5,
        superficie: "Asfalto",
        dificultad: "Fácil",
        imagen: "fadu.jpeg",
        recorrido: "Circuito universitario junto al río. Terreno llano y tranquilo.",
        realizada: false
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
        
        const estadoRealizada = ruta.realizada ? '✓ Realizada' : 'Marcar como realizada';
        const claseBoton = ruta.realizada ? 'btn-realizada-active' : 'btn-realizada';
        
        rutaCard.innerHTML = `
            <div class="ruta-imagen" onclick="verDetalleRuta(${ruta.id})" style="cursor: pointer;">
                <img src="${ruta.imagen}" alt="${ruta.nombre}">
                ${ruta.realizada ? '<span class="badge-realizada">✓ Completada</span>' : ''}
            </div>
            <div class="ruta-content">
                <h3 onclick="verDetalleRuta(${ruta.id})" style="cursor: pointer;">${ruta.nombre}</h3>
                <p class="ruta-recorrido">${ruta.recorrido}</p>
                <div class="ruta-info">
                    <p><strong>Barrio:</strong> ${ruta.barrio}</p>
                    <p><strong>Distancia:</strong> ${ruta.distancia} km</p>
                    <p><strong>Superficie:</strong> ${ruta.superficie}</p>
                    <p><strong>Dificultad:</strong> ${ruta.dificultad}</p>
                </div>
                <button class="btn-ver-detalle" onclick="verDetalleRuta(${ruta.id})">Ver Detalles</button>
                <button class="${claseBoton}" onclick="marcarRealizada(${ruta.id})">${estadoRealizada}</button>
                <div class="ruta-actions">
                    <button class="btn-edit" onclick="editarRuta(${ruta.id})">Editar</button>
                    <button class="btn-delete" onclick="eliminarRuta(${ruta.id})">Eliminar</button>
                </div>
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
    window.location.href = 'agregar-ruta.html';
}

function marcarRealizada(id) {
    const ruta = rutas.find(r => r.id === id);
    if (ruta) {
        ruta.realizada = !ruta.realizada;
        filtrarRutas();
    }
}

function verDetalleRuta(id) {
    window.location.href = `detalle-ruta.html?id=${id}`;
}

document.getElementById('btnFiltrar').addEventListener('click', filtrarRutas);
document.getElementById('btnLimpiar').addEventListener('click', limpiarFiltros);
document.getElementById('btnAgregarRuta').addEventListener('click', agregarRuta);

renderizarRutas(rutas);