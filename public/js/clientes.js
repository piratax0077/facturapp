function seleccionarCliente(cliente){
    // esconder el modal de clientes
    $('#modalBusquedaCliente').modal('hide');
    // asignar el nombre del cliente al input
    $('#nombre-cliente').html(cliente.nombre);
    // asignar el telefono del cliente al input
    $('#telefono-cliente').html(cliente.telefono);
    // asignar el email del cliente al input
    $('#email-cliente').html(cliente.email);
}