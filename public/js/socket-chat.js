
let params = new URLSearchParams( window.location.search );

if ( !params.has('nombre') || !params.has('sala') ) {
    window.location = 'index.html';
    throw new Error('El nombre y sala son necesarios');
}

let usuario = {
    nombre: params.get('nombre'),
    sala: params.get('sala')
};

// ---------------------------------------------------------------------------------------------------------------------

let socket = io();

// Escuchar conexión -------------------------------------------------------
socket.on('connect', () => {
    console.log('Conectado al servidor');
    socket.emit('entrarChat', usuario, ( resp ) => {
        console.log( 'Usuarios conectados', resp );
    });
});

// Escuchar desconexión ----------------------------------------------------
socket.on('disconnect', function() {
    console.log('Perdimos conexión con el servidor');
});

// Escuchar información ----------------------------------------------------
socket.on('crearMensaje', (mensaje) => {
    console.log('Servidor:', mensaje);
});

// Escuchar cuando un usuario entra o slae del chat -----------------------
socket.on('listaPersona', (personas) => {
    console.log(personas);
});


// Mensajes privados ------------------------------------------------------
socket.on('mensajePrivado', (mensaje) => {
   console.log('Mensaje Privado: ', mensaje);
});