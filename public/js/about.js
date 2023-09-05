function detalleVenta(numeroCarrito){
    console.log(numeroCarrito);
    fetch('/detalle-venta/' + numeroCarrito).then(response => {
        if (response.ok) {
            return response.json();
        } else {
            throw new Error('Error al obtener el detalle de la venta');
        }
    }).then(data => {
        
        if(data.success){
            console.log(data);
            // guardar los productos en una variable
            const productos = data.productosArray;

            // imprimir los productos en la tabla
            let html = '';
            if(productos.length > 0){
            productos.forEach(producto => {
                let total = producto.cantidad * producto.precio;
                html += `
                    <tr>
                        <td>${producto.nombre}</td>
                        <td>${producto.cantidad}</td>
                        <td>${producto.precio}</td>
                        
                        <td>${total}</td>
                    </tr>
                `;
            });
        }else{
            html += `
                    <tr>
                        <td colspan="4">No hay productos en el carrito</td>
                    </tr>
                `;
        }

            document.getElementById('detalleVentaBody').innerHTML = html;
        }else{

            console.error('Error al obtener el detalle de la venta');
        }
    }).catch(error => {
        console.error('Error al obtener el detalle de la venta', error);
    }
    );
}


    