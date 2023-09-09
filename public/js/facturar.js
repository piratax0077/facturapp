window.onload = function(){
    fetch('https://panchoserver.ddns.net/api/dameproveedoresdemo').
    then(response => response.json()).
    then(data => {
        let proveedores = data;
        console.log(proveedores);
        let html = '';
        for (let i = 0; i < proveedores.length; i++) {
            html += `
            <option value="${proveedores[i].id}">${proveedores[i].empresa_nombre_corto}</option>
            `;
        }
        document.getElementById('selectProveedores').innerHTML = html;

    }).
    catch(error => console.error(error));
};


function verProducto(codigo_interno){
    // ir a la ruta ver-producto
    let url = 'https://panchoserver.ddns.net/api/'+codigo_interno+'/repuestodemo';
    fetch(url, {
        method: 'get'
    }).then(response => {
        if (response.ok) {
            return response.json();
        } else {
            throw new Error('Error al ver el producto lalal');
        }
    }).then(data => {
        if(data){
            console.log(data);
            let repuesto = data[0];
            let fotos = data[1];
            // Mostra la informacion del producto en el modal-body con id modalBodyProducto

            // crear un carrusel bootstrap con las fotos del producto y luego una tabla con la informacion del producto
            let html = `
            <div id="carouselExampleControls" class="carousel slide" data-bs-ride="carousel">
            <div class="carousel-inner">`;
            for (let i = 0; i < fotos.length; i++) {
                if(i == 0){
                    html += `
                    <div class="carousel-item active">
                        <img class="d-block w-100" src="https://panchoserver.ddns.net/storage/${fotos[i].urlfoto}" alt="First slide">
                    </div>`;
                }else{
                    html += `
                    <div class="carousel-item">
                        <img class="d-block w-100" src="https://panchoserver.ddns.net/storage/${fotos[i].urlfoto}" alt="First slide">
                    </div>`;
                }
            }
            html += `
            </div>
            <button class="carousel-control-prev" type="button" data-bs-target="#carouselExampleControls" data-bs-slide="prev">
                <span class="carousel-control-prev-icon" aria-hidden="true"></span>
                <span class="visually-hidden">Previous</span>
            </button>
            <button class="carousel-control-next" type="button" data-bs-target="#carouselExampleControls" data-bs-slide="next">
                <span class="carousel-control-next-icon" aria-hidden="true"></span>
                <span class="visually-hidden">Next</span>
            </button>
            </div>
            <table class="table table-striped">
                <tbody>
                    <tr>
                        <th scope="row">Código interno</th>
                        <td>${repuesto.codigo_interno}</td>
                    </tr>
                    <tr>
                        <th scope="row">Descripción</th>
                        <td>${repuesto.descripcion}</td>
                    </tr>
                    <tr>
                        <th scope="row">Marca</th>
                        <td>${repuesto.marcarepuesto}</td>
                    </tr>
                    <tr>
                        <th scope="row">Stock</th>
                        <td>${repuesto.stock_actual}</td>
                    </tr>
                    <tr>
                        <th scope="row">Precio</th>
                        <td>${repuesto.precio_venta}</td>
                    </tr>
                </tbody>
            </table>
            `;
            
            document.getElementById('modalBodyProducto').innerHTML = html;
        }else{
            console.error('Error al ver el producto');
        }
    }).catch(error => {
        console.error('Error al ver el producto', error);
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
            window.location.href = '/facturar';
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
    var totalString = document.getElementById('total').textContent;
    var totalSinPunto = totalString.replace(/\./g,'');

    // validar que el total no sea 0
    if(totalSinPunto == 0){
        return swal({
            title: "Error!",
            text: "No hay productos en el carrito",
            icon: "error",
            button: "Ok!",
          });

    }

    let total = parseInt(totalSinPunto);

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