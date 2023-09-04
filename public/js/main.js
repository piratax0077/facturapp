
    document.addEventListener('DOMContentLoaded', function() {
        const productos = [
            {codigo_interno:'AD1', nombre: 'Amortiguador delantero', precio: 100, cantidad: 10, subtotal: 1000},
            {codigo_interno:'CG3',nombre: 'Cigueñal', precio: 200, cantidad: 20, subtotal: 4000},
            {codigo_interno:'ACM1',nombre: 'Aceite 20 lts', precio: 300, cantidad: 30, subtotal: 9000},
            {codigo_interno:'RAM43',nombre: 'Radiador Motor', precio: 400, cantidad: 40, subtotal: 16000},
            {codigo_interno:'TRB1',nombre: 'Turbo', precio: 500, cantidad: 50, subtotal: 25000},
            {codigo_interno:'BA3',nombre: 'Bomba de agua', precio: 600, cantidad: 60, subtotal: 36000},
            {codigo_interno:'BC4',nombre: 'Bomba de aceite', precio: 700, cantidad: 70, subtotal: 49000},
            {codigo_interno:'BF9',nombre: 'Bomba de frenos', precio: 800, cantidad: 80, subtotal: 64000},
            {codigo_interno:'BG3',nombre: 'Bomba de gasolina', precio: 900, cantidad: 90, subtotal: 81000},
            {codigo_interno:'BD4',nombre: 'Bomba de direccion', precio: 1000, cantidad: 100, subtotal: 100000},
            {codigo_interno:'BEM65',nombre: 'Bomba de embrague', precio: 1100, cantidad: 110, subtotal: 121000},
            {codigo_interno:'BMV33',nombre: 'Bomba de vacio', precio: 1200, cantidad: 120, subtotal: 144000},
            {codigo_interno:'BRZ9',nombre: 'Brazo axial', precio: 1300, cantidad: 130, subtotal: 169000},
            {codigo_interno:'PASF4',nombre: 'Pastillas de freno', precio: 1400, cantidad: 140, subtotal: 196000},
          ];
        const botonesEliminar = document.querySelectorAll('.eliminar-producto');
        
        botonesEliminar.forEach(function(boton) {
            boton.addEventListener('click', function(event) {
             
                const index = event.target.getAttribute('data-index');
                fetch(`/eliminar-producto/${index}`, { method: 'DELETE' })
                .then(response => {
                    if (response.ok) {
                        window.location.href = '/facturar';
                    } else {
                        throw new Error('Error al eliminar el producto');
                    }
                })
                .then(data => {
                    if (data.success) {
                        // Actualizar la vista con el nuevo arreglo de productos
                    } else {
                        console.error('Error al eliminar el producto');
                    }
                })
                .catch(error => {
                    console.error('Error al eliminar el producto', error);
                });

            });
        });

        const inputBusqueda = document.getElementById('busqueda-productos');
        const listaProductos = document.getElementById('lista-productos');
    
    
        inputBusqueda.addEventListener('input', function(event) {
            const textoBusqueda = event.target.value.trim().toLowerCase();
            const productosFiltrados = productos.filter(producto => producto.nombre.toLowerCase().includes(textoBusqueda));
    
            // Limpiar la lista
            listaProductos.innerHTML = '';
    
            // Mostrar productos filtrados
            productosFiltrados.forEach((producto,index) => {
                // crear elemento tr y que contenta un td con el nombre del producto

                const tr = document.createElement('tr');
                const td = document.createElement('td');
                
                // crear un elemento a con tenga el atributo onclick que llame a la funcion seleccionarProducto
                td.textContent = producto.nombre;
                // crear otro td con el codigo interno del producto
                const tdCodigo = document.createElement('td');
                tdCodigo.textContent = producto.codigo_interno;

                // crear otro td con el precio del producto
                const tdPrecio = document.createElement('td');
                tdPrecio.textContent = producto.precio;
                // crear otro td con el stock del producto
                const tdStock = document.createElement('td');
                tdStock.textContent = producto.cantidad;
                // crear otro td con un boton que tenga el atributo onclick que llame a la funcion seleccionarProducto
                const tdBoton = document.createElement('td');
                const boton = document.createElement('button');
                // al boton agregarle la clase btn y btn-success y la clase btn-sm
                boton.classList.add('btn', 'btn-success', 'btn-sm');
                boton.textContent = 'Seleccionar';
                boton.setAttribute('onclick', 'seleccionarProducto('+JSON.stringify(producto) +')');
                tdBoton.appendChild(boton);

                // crear un td con un input de tipo number
                const tdCantidad = document.createElement('td');
                const inputCantidad = document.createElement('input');
                // el id de inputCantidad debe ser cantidad-producto.codigo_interno
                inputCantidad.setAttribute('id', 'cantidad-'+producto.codigo_interno);
                // calcular el subtotal del producto
                const subtotal = producto.precio * producto.cantidad;
                // agregar el subtotal al producto
                producto.subtotal = subtotal;
                // agregar la clase form-control al input
                inputCantidad.classList.add('form-control');
                inputCantidad.setAttribute('type', 'number');
                inputCantidad.setAttribute('min', '1');
                // inputCantidad.setAttribute('value', '1');
                // inputCantidad.setAttribute('onchange', 'actualizarSubtotal(this,'+JSON.stringify(producto) +')');
                tdCantidad.appendChild(inputCantidad);
                // agregar el td al tr

                // agregar los td al tr
                tr.appendChild(tdCodigo);
                tr.appendChild(td);
                tr.appendChild(tdPrecio);
                tr.appendChild(tdCantidad);
                tr.appendChild(tdBoton);
                
                // agregar el tr a la lista
                listaProductos.appendChild(tr);
                
                // Agregar atributo onclick
                // li.setAttribute('onclick', 'seleccionarProducto('+JSON.stringify(producto) +')');
                // listaProductos.appendChild(li);
            });
        });

        const inputBusquedaCliente = document.getElementById('busqueda-clientes');
        const listaClientes = document.getElementById('lista-clientes');
    
        var clientes = [
            {nombre: 'Francisco Rojo', email: 'francisco.rojo.gallardo@gmail.com', telefono: '1234567890'}, 
            {nombre: 'Belen Toledo', email:'belen@gmail.com', telefono: '1234567890'},
            {nombre: 'Juan Perez', email:'juanperez@gmail.com', telefono: '1234567890'},
            {nombre: 'Maria Perez', email:'maria@gmail.com', telefono: '1234567890'},
          ];
    
          inputBusquedaCliente.addEventListener('input', function(event) {
            const textoBusqueda = event.target.value.trim().toLowerCase();
            const clientesFiltrados = clientes.filter(cliente => cliente.nombre.toLowerCase().includes(textoBusqueda));
    
            // Limpiar la lista
            listaClientes.innerHTML = '';
    
            // Mostrar Clientes filtrados
            clientesFiltrados.forEach( cliente => {
                const li = document.createElement('li');
                // Agregar atributo onclick
                li.setAttribute('onclick', 'seleccionarCliente(this,'+JSON.stringify(cliente)+')');

                li.textContent =  cliente.nombre;
                listaClientes.appendChild(li);
            });
        });

    });

    // Función para manejar la selección de productos
    function seleccionarProducto(producto) {
        let codigo_interno = producto.codigo_interno;
        // validar que el input con id cantidad-producto.codigo_interno no sea null o undefined
        let cantidad = document.getElementById('cantidad-'+codigo_interno).value;
        if(cantidad == null || cantidad == undefined || cantidad == 0 || cantidad == ''){
            return swal({
                title: "Error!",
                text: "Debe ingresar una cantidad",
                icon: "error",
                button: "Ok!",
                });
        }
        // agregar al producto la cantidad seleccionada
        producto.cantidad = cantidad;
        // enviar el producto por post a la ruta /agregar-carrito
        fetch('/agregar-carrito', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ producto })
        }).then(response => {
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



        // cerrar modal de búsqueda de productos
        $('#modalBuscarProducto').modal('hide');
    }

    function seleccionarCliente(elemento,cliente){
        const nombreCliente = elemento.textContent;
        // Hacer algo con el nombre del producto seleccionado
        console.log('Cliente seleccionado:', nombreCliente);
    
        // enviar el cliente por post a la ruta /agregar-cliente
        fetch('/agregar-cliente', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ cliente })
        }).then(response => {
            if (response.ok) {
                return response.json();
            } else {
                throw new Error('Error al agregar el cliente');
            }
        }).then(data => {
            if(data.success){
                // Actualizar la vista con el nuevo arreglo de productos
                window.location.href = '/facturar';
            }else{
                console.error('Error al agregar el cliente');
            }
        }).catch(error => {
            console.error('Error al agregar el cliente', error);
        });
        
    }
    
    

