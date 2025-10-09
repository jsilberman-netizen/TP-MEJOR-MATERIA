let misRutas = [];
let editandoId = null;

function cargarRutas() {
    const rutasGuardadas = localStorage.getItem('misRutasDeseadas');
    if (rutasGuardadas) {
        misRutas = JSON.parse(rutasGuardadas);
    }
    renderizarMisRutas();
}

function guardarEnStorage() {
    localStorage.setItem('misRutasDeseadas', JSON.stringify(misRutas));
}

function renderizarMisRutas() {
    const grid = document.getElementById('misRutasGrid');
    const contador = document.getElementById('contadorRutas');
    
    contador.textContent = `${misRutas.length} ruta${misRutas.length !== 1 ? 's' : ''} en tu lista`;
    
    if (misRutas.length === 0) {
        grid.innerHTML = '<p class="empty-state">Aún no tenés rutas en tu lista. ¡Agregá la primera!</p>';
        return;
    }
    
    grid.innerHTML = '';
    
    misRutas.forEach(ruta => {
        const card = document.createElement('div');
        card.className = 'mi-ruta-card';
        
        card.innerHTML = `
            <div class="mi-ruta-imagen">
                <img src="${ruta.imagen}" alt="${ruta.nombre}">
            </div>
            <div class="mi-ruta-info">
                <h3>${ruta.nombre}</h3>
                <p class="ruta-desc">${ruta.recorrido}</p>
                <div class="ruta-detalles">
                    <span>📍 ${ruta.barrio}</span>
                    <span>📏 ${ruta.distancia} km</span>
                    <span>🛤️ ${ruta.superficie}</span>
                    <span>⚡ ${ruta.dificultad}</span>
                </div>
            </div>
            <div class="mi-ruta-actions">
                <button class="btn-editar-mini" onclick="editarRuta(${ruta.id})">Editar</button>
                <button class="btn-eliminar-mini" onclick="eliminarRuta(${ruta.id})">Eliminar</button>
            </div>
        `;
        
        grid.appendChild(card);
    });
}

document.getElementById('formRuta').addEventListener('submit', function(e) {
    e.preventDefault();
    
    const nombre = document.getElementById('nombre').value;
    const barrio = document.getElementById('barrio').value;
    const distancia = parseFloat(document.getElementById('distancia').value);
    const superficie = document.getElementById('superficie').value;
    const dificultad = document.getElementById('dificultad').value;
    const recorrido = document.getElementById('recorrido').value;
    const imagen = document.getElementById('imagen').value;
    
    if (editandoId !== null) {
        const index = misRutas.findIndex(r => r.id === editandoId);
        if (index !== -1) {
            misRutas[index] = {
                id: editandoId,
                nombre,
                barrio,
                distancia,
                superficie,
                dificultad,
                recorrido,
                imagen,
                realizada: misRutas[index].realizada
            };
        }
        editandoId = null;
        document.getElementById('formTitle').textContent = 'Agregar Nueva Ruta';
        document.getElementById('btnGuardar').textContent = 'Guardar Ruta';
    } else {
        const nuevoId = misRutas.length > 0 ? Math.max(...misRutas.map(r => r.id)) + 1 : 1;
        
        const nuevaRuta = {
            id: nuevoId,
            nombre,
            barrio,
            distancia,
            superficie,
            dificultad,
            recorrido,
            imagen,
            realizada: false
        };
        
        misRutas.push(nuevaRuta);
    }
    
    guardarEnStorage();
    renderizarMisRutas();
    limpiarFormulario();
});

function editarRuta(id) {
    const ruta = misRutas.find(r => r.id === id);
    if (!ruta) return;
    
    editandoId = id;
    
    document.getElementById('nombre').value = ruta.nombre;
    document.getElementById('barrio').value = ruta.barrio;
    document.getElementById('distancia').value = ruta.distancia;
    document.getElementById('superficie').value = ruta.superficie;
    document.getElementById('dificultad').value = ruta.dificultad;
    document.getElementById('recorrido').value = ruta.recorrido;
    document.getElementById('imagen').value = ruta.imagen;
    
    document.getElementById('formTitle').textContent = 'Editar Ruta';
    document.getElementById('btnGuardar').textContent = 'Actualizar Ruta';
    
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

function eliminarRuta(id) {
    if (confirm('¿Estás seguro de eliminar esta ruta de tu lista?')) {
        misRutas = misRutas.filter(r => r.id !== id);
        guardarEnStorage();
        renderizarMisRutas();
    }
}

function limpiarFormulario() {
    document.getElementById('formRuta').reset();
    editandoId = null;
    document.getElementById('formTitle').textContent = 'Agregar Nueva Ruta';
    document.getElementById('btnGuardar').textContent = 'Guardar Ruta';
}

document.getElementById('btnCancelar').addEventListener('click', limpiarFormulario);

cargarRutas();