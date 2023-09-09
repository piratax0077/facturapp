window.onload = function () {
    // mostrar modal para buscar repuestos
    $('#modalBuscarRepuesto').modal('show');
};

function buscarRepuesto(){
    let busqueda = document.getElementById('busqueda').value;
    if(busqueda == ''){
        return swal({
            title: "Error",
            text: "Debe ingresar un repuesto para buscar",
            icon: "error",
            button: "Aceptar"
        });
    }
    fetch("https://panchoserver.ddns.net/api/dameproveedoresdemo")
    .then(res => res.json())
    .then(data => {
        let repuestos = data[0];
        console.log(repuestos);
        // mostrar la cantidad de repuestos en el array
        let cantidadResultado = repuestos.length;

        let html = '<p class="text-center">Mostrando '+cantidadResultado+' resultados. </p>';
        // repuestos.forEach(repuesto => {
        //     html += `
        //         <div class="col-md-3">
        //         <div class="card mt-4 text-center">
        //             <div class="card-header">
        //                 <h5>${repuesto.descripcion}</h5>
        //             </div>
        //             <div class="card-body">
        //                 <img src="https://panchoserver.ddns.net/storage/${repuesto.urlfoto}" alt="" class="img-fluid">
        //             </div>
        //             <div class="card-footer">
        //                 <button class="btn btn-success btn-sm" onclick="paciencia()">Agregar </button>
        //             </div>
        //         </div>
        //         </div>
        //     `
        // });

        // crear tabla con los resultados
        html += `
            <table class="table table-hover">
                <thead>
                    <tr>
                        <th>Imagen </th>
                        <th>Descripcion</th>
                        <th>Marca</th>
                        <th width="6%">Cantidad</th>
                        <th>Stock</th>
                        <th>Precio</th>
                        <th>Acciones</th>
                    </tr>
                </thead>
                <tbody>
        `;
        repuestos.forEach(repuesto => {
            // formatear el precio de cada repuesto
            let precio = new Intl.NumberFormat('es-AR', { style: 'currency', currency: 'ARS' }).format(repuesto.precio_venta);
          
            html += `
                <tr>
                    <td><a href="javascript:void(0)" onclick="verImagen('`+repuesto.urlfoto+`')"><img src="https://panchoserver.ddns.net/storage/${repuesto.urlfoto}" alt="" class="img-fluid"> </a> </td>
                    <td>${repuesto.descripcion}</td>
                    <td>${repuesto.marcarepuesto}</td>
                    <td><input type="number" id="cod-${repuesto.id}" class="form-control" /></td>
                    <td>${repuesto.stock_actual}</td>
                    <td>${precio}</td>
                    <td>
                        <button class="btn btn-success btn-sm" onclick="agregar('`+repuesto.id+`','`+repuesto.descripcion+`','`+repuesto.precio_venta+`','`+repuesto.stock_actual+`')">Agregar </button>
                        <button class="btn btn-warning btn-sm" onclick="paciencia()">Detalle </button>
                        <button class="btn btn-danger btn-sm" onclick="paciencia()">CB </button>
                    </td>
                </tr>
            `
        });
        html += `
                </tbody>
            </table>
        `;

        document.getElementById('resultado').innerHTML = html;
    });
}

function agregar(codigo_interno, descripcion,precio, stock_actual){

    let cantidad_vendida = document.getElementById('cod-'+codigo_interno).value;
    let subtotal_vendida = cantidad_vendida * precio;
    // validar que la cantidad no sea mayor al total en stock
    if(cantidad_vendida > stock_actual){
        return swal({
            title: "Error",
            text: "La cantidad ingresada es mayor al stock disponible",
            icon: "error",
            button: "Aceptar"
        });
    }
    // preparar repuesto como reqbody
    let repuesto = {
        codigo_interno: codigo_interno,
        nombre: descripcion,
        precio: precio,
        cantidad: cantidad_vendida,
        subtotal: subtotal_vendida
    };

    var producto = repuesto;

    fetch('/agregar-carrito', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body:JSON.stringify({producto}),
    }).then(response => {
        console.log(response);
        if (response.ok) {
            return response.json();
        } else {
            throw new Error('Error al agregar el producto al carrito');
        }
    }).then(data => {
      
        if (data.success) {
            // Actualizar la vista con el nuevo arreglo de productos
            window.location.href = '/facturar';
        } else {
            console.error('Error al agregar el producto al carrito');
        }
    }).catch(error => {
        console.error('Error al agregar el producto al carrito', error);
    });
}

function verImagen(url){
    // mostrar modal con la imagen
    console.log(url);
    $('#modalImagen').modal('show');
    document.getElementById('imagen').src = "https://panchoserver.ddns.net/storage/"+url;
}