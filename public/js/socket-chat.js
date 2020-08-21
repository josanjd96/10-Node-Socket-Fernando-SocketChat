
// let params = new URLSearchParams(window.location.search);

if (!params.has('nombre') || !params.has('sala')) {
    window.location = 'index.html';
    throw new Error('El nombre y sala son necesarios');
}

let usuario = {
    nombre: params.get('nombre'),
    sala: params.get('sala')
};

// ---------------------------------------------------------------------------------

let socket = io();

// Escuchar conexión -------------------------------------------------------
socket.on('connect', function() {
    console.log('Conectado al servidor');
    socket.emit('entrarChat', usuario, function(resp) {
        // console.log('Usuarios conectados', resp);
        renderizarUsuarios(resp);
    });
});

// Escuchar desconexión --------------------------------------------------------------
socket.on('disconnect', function() {
    console.log('Perdimos conexión con el servidor');
});

// Escuchar información ----------------------------------------------------
socket.on('crearMensaje', function(mensaje) {
    // console.log('Servidor:', mensaje);
    renderizarMensajes(mensaje, false);
    scrollBottom();
});

// Escuchar cuando un usuario entra o sale del chat -----------------------
socket.on('listaPersona', function(personas) {
    renderizarUsuarios(personas);
});

// Mensajes privados ------------------------------------------------------
socket.on('mensajePrivado', function(mensaje) {
    console.log('Mensaje Privado:', mensaje);
});