// traer los productos y el carrito de compras de carrito.js
// traer los productos y el carrito de compras de carrito.js

window.onload = function(){
    // acceder a la api https://mindicador.cl/api para obtener el valor del dolar
    fetch('https://mindicador.cl/api')
    .then(response => response.json())
    .then(data => {
       
        const dolar = data.dolar.valor;
        const euro = data.euro.valor;
        const tasaDesempleo = data.tasa_desempleo.valor;
        // mostrar el valor del dolar en la vista
        document.getElementById('dolar').textContent = dolar;
        // mostrar el valor del euro en la vista
        document.getElementById('euro').textContent = euro;
        // mostrar el valor de la tasa de desempleo en la vista
        document.getElementById('tasaDesempleo').textContent = tasaDesempleo;
    })
    .catch(error => console.error(error));

}

function procesar(){
    // saber el nombre del cliente
    const nombreCliente = document.getElementById('cliente').value;
    console.log(nombreCliente);
    // validar que si el checkEfectivo el input efectivo no esté vacío
    const checkEfectivo = document.getElementById('checkEfectivo');
    const efectivo = document.getElementById('inputEfectivo');

    // validar que si el checkTransferencia el input transferencia no esté vacío
    const checkTransferencia = document.getElementById('checkTransferencia');
    const transferencia = document.getElementById('inputTransferencia');
    
    // validar que si el checkCredito el input credito no esté vacío
    const checkCredito = document.getElementById('checkCredito');
    const credito = document.getElementById('inputCredito');

    // validar que si el checkCheque el input cheque no esté vacío
    const checkCheque = document.getElementById('checkCheque');
    const cheque = document.getElementById('inputCheque');
    
    var metodoPagoSeleccionado = "";

    if(checkEfectivo.checked){
        metodoPagoSeleccionado = "Efectivo";
        if(efectivo.value == ''){
            return swal({
                title: "Error!",
                text: "Debes ingresar el monto en efectivo",
                icon: "error",
                button: "Ok!",
                });
        }
    }

    if(checkTransferencia.checked){
        metodoPagoSeleccionado = "Transferencia";
        if(transferencia.value == ''){
            return swal({
                title: "Error!",
                text: "Debes ingresar el monto en transferencia",
                icon: "error",
                button: "Ok!",
                });
            }
    }

    if(checkCredito.checked){
        metodoPagoSeleccionado = "Credito";
        if(credito.value == ''){
        return swal({
            title: "Error!",
            text: "Debes ingresar el monto en credito",
            icon: "error",
            button: "Ok!",
            });
        }
    }

    if(checkCheque.checked){
        metodoPagoSeleccionado = "Cheque";
        if(cheque.value == ''){
        return swal({
            title: "Error!",
            text: "Debes ingresar el monto en cheque",
            icon: "error",
            button: "Ok!",
            });
        }   
    }

    // obtener el valor del total
    const total = document.getElementById('total').textContent;
    if(total == 0){
        return swal({
            title: "Error!",
            text: "No hay productos en el carrito",
            icon: "error",
            button: "Ok!",
          });

    }

    // validar que la suma de los inputs sea igual al total
    if(checkEfectivo.checked){
        if(efectivo.value > total){
            return swal({
                title: "Error!",
                text: "El monto en efectivo debe ser menor o igual al total",
                icon: "error",
                button: "Ok!",
                });
        }
    }

    if(checkTransferencia.checked){
        if(transferencia.value > total){
            return swal({
                title: "Error!",
                text: "El monto en transferencia debe ser menor o igual al total",
                icon: "error",
                button: "Ok!",
                });
        }
    }

    if(checkCredito.checked){
        if(credito.value > total){
            return swal({
                title: "Error!",
                text: "El monto en credito debe ser menor o igual al total",
                icon: "error",
                button: "Ok!",
                });
        }
    }

    if(checkCheque.checked){
        if(cheque.value > total){
            return swal({
                title: "Error!",
                text: "El monto en cheque debe ser menor o igual al total",
                icon: "error",
                button: "Ok!",
                });
        }
    }

    let totalPagado = 0;

    // si inputEfectivo no esta disabled se debe sumar a la variable totalPagado
    if(!efectivo.disabled){
        totalPagado += parseInt(efectivo.value);
    }
    // si inputTransferencia no esta disabled se debe sumar a la variable totalPagado
    if(!transferencia.disabled){
        totalPagado += parseInt(transferencia.value);
    }

    // si inputCredito no esta disabled se debe sumar a la variable totalPagado
    if(!credito.disabled){
        totalPagado += parseInt(credito.value);
    }

    // si inputCheque no esta disabled se debe sumar a la variable totalPagado
    if(!cheque.disabled){
        totalPagado += parseInt(cheque.value);
    }

    if(totalPagado < total){
        return swal({
            title: "Error!",
            text: "El monto pagado debe ser igual o mayor al total",
            icon: "error",
            button: "Ok!",
            });
    }

    // mostrar un mensaje de éxito
    swal({
        title: "Good job!",
        text: nombreCliente+" tu compra de $"+total+" con "+metodoPagoSeleccionado+" ha sido procesada con éxito",
        icon: "success",
        button: "Aww yiss!",
      });
    
      setTimeout(() => {
        limpiarCarrito();
        procesarVenta(nombreCliente, metodoPagoSeleccionado, total);
      }, 2000);
}

function procesarVenta(nombreCliente, metodoPagoSeleccionado, total){
    // ir a la ruta procesar venta y enviar el nombre del cliente, el método de pago y el total
    // ir a la ruta procesar venta y enviar el nombre del cliente, el método de pago y el total
    fetch('/procesar-venta', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ nombreCliente, metodoPagoSeleccionado, total })
    }).then(response => {
        if (response.ok) {
            return response.json();
        } else {
            throw new Error('Error al procesar la venta');
        }
    }).then(data => {
        if(data.success){
            // Actualizar la vista con el nuevo arreglo de productos
            window.location.href = '/';
        }else{
            console.error('Error al procesar la venta');
        }
    }).catch(error => {
        console.error('Error al procesar la venta', error);
    }
    );
}

function aplicarDescuento(option){
    if(option == 'c'){
        swal({
            title: "PRONTO",
            text: "Descuento al cliente estará disponible en la próxima versión",
            icon: "info",
            button: "Ok!",
            });
    }else if(option == 'f'){
        swal({
            title: "PRONTO",
            text: "Descuento a la familia estará disponible en la próxima versión",
            icon: "info",
            button: "Ok!",
            });
    }else{
        swal({
            title: "PRONTO",
            text: "Descuento porque sí estará disponible en la próxima versión",
            icon: "info",
            button: "Ok!",
            });
    }
    
    }


function limpiarCarrito(){
    // ir a la ruta limpiar-carrito 
    fetch('/limpiar-carrito', {
        method: 'DELETE'
    }).then(response => {
        if (response.ok) {
            return response.json();
        } else {
            throw new Error('Error al limpiar el carrito');
        }
    }).then(data => {
        if(data.success){
            // Actualizar la vista con el nuevo arreglo de productos
            window.location.href = '/';
        }else{
            console.error('Error al limpiar el carrito');
            swal({
                title: "Error!",
                text: data.error,
                icon: "error",
                button: "Ok!",
            });
                
        }
    }).catch(error => {
        console.error('Error al limpiar el carrito', error);
    }
    );
}

function eliminarProductoCarro(index){
    
    // ir a la ruta eliminar-producto
    fetch('/eliminar-producto/'+index, {
        method: 'get'
    }).then(response => {
        if (response.ok) {
            return response.json();
        } else {
            throw new Error('Error al eliminar el producto');
        }
    }).then(data => {
        if(data.success){
            // Actualizar la vista con el nuevo arreglo de productos
            window.location.href = '/facturar';
        }else{
            console.error('Error al eliminar el producto');
        }
    }).catch(error => {
        console.error('Error al eliminar el producto', error);
    }
    );
}

function verProducto(codigo_interno){
    // ir a la ruta ver-producto
    let url = '/verProducto/'+codigo_interno;
    fetch(url, {
        method: 'get'
    }).then(response => {
        if (response.ok) {
            return response.json();
        } else {
            throw new Error('Error al ver el producto lalal');
        }
    }).then(data => {
       
        if(data.success){
            console.log(data.producto);
            // Mostra la informacion del producto en el modal-body con id modalBodyProducto

            // crear variable html que contenga un div con clase row y dentro de ese div un div con clase col-12 contenga la informacion del producto
            let html = `<div class="row">
            <div class="col-12">
                <p>Código Interno: ${data.producto.codigo_interno}</p>
                <p>Nombre: ${data.producto.nombre}</p>
                <p>Precio: $${data.producto.precio}</p>
                <p>Stock: ${data.producto.cantidad}</p>
                
            </div>`;
            document.getElementById('modalBodyProducto').innerHTML = html;
        }else{
            console.error('Error al ver el producto');
        }
    }).catch(error => {
        console.error('Error al ver el producto', error);
    }
    );
}

function paciencia(){
    // mostrar mensaje de paciencia con swal
    swal({
        title: 'Paciencia',
        text: 'Esta versión es solo una prueba, por lo que no se pueden agregar marcas de vehículos',
        icon: 'info',
        confirmButtonText: 'Ok'
    });
}