window.onload = function(){
    dameinfo();
};

var clonando=false;
var existe_factura="NO";
var ampliar_aplicacionez=false;
var cantidad_repuestos_factura=0;

function ir_a_boton_guardaritem(){
    document.getElementById("btnGuardarItem").focus();
}

function dameinfo()
{
    fetch('https://panchoserver.ddns.net/api/dameproveedoresdemo').
    then(response => response.json()).
    then(data => {
        let proveedores = data[0];
        let marcas = data[1];
        let familias = data[2];
        let marcasrepuestos= data[3];
        let paises = data[4];
        console.log(marcas);
        let html = '';
        for (let i = 0; i < proveedores.length; i++) {
            html += `
            <option value="${proveedores[i].id}">${proveedores[i].empresa_nombre_corto}</option>
            `;
        }
        let html2 = '';
        for (let i = 0; i < marcas.length; i++) {
            html2 += `
            <option value="${marcas[i].idmarcavehiculo}">${marcas[i].marcanombre}</option>
            `;
        }

        let html3 = '';
        for (let i = 0; i < familias.length; i++) {
            html3 += `
            <option value="${familias[i].id}">${familias[i].nombrefamilia}</option>
            `;
        }

        let html4 = '';
        for (let i = 0; i < marcasrepuestos.length; i++) {
            html4 += `
            <option value="${marcasrepuestos[i].id}">${marcasrepuestos[i].marcarepuesto}</option>
            `;
        }

        let html5 = '';
        for (let i = 0; i < paises.length; i++) {
            html5 += `
            <option value="${paises[i].id}">${paises[i].nombre_pais}</option>
            `;
        }


        
        document.getElementById('selectProveedores').innerHTML = html;
        document.getElementById('MarcaSim').innerHTML = html2;
        document.getElementById('familia').innerHTML = html3;
        document.getElementById('MarcaRepuesto').innerHTML = html4;
        document.getElementById('Pais').innerHTML = html5;

    }).
    catch(error => console.error(error));
}


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


function cargarModelosSimilares()
    {
        var idMarcaSim=document.getElementById("MarcaSim").value;

        if(idMarcaSim!="")
        {
          document.getElementById("anios_vehiculo_sim").value="";
            //var url='{{url("modelovehiculo/damepormarca")}}'+'/'+idMarcaSim;
            // ir a la ruta ver-producto
            var url = 'https://panchoserver.ddns.net/api/damepormarca_demo/'+idMarcaSim;
            $.ajax({
              type:'GET',
              beforeSend: function () {
                $("#aplicaciones_msje").html("Cargando Marcas de Vehículos...");
                $("#nombre_modelo").html("<b>Modelo: </b>");
                $('#ModeloSim option').remove();
                $('#ModeloSim').append('<option value="">Buscando...</option>');
              },
              url:url,
              success:function(models){ //Viene en formato json
                
                $('#ModeloSim option').remove();
                var modelos=JSON.parse(models);
                $('#ModeloSim').append('<option value="">Elija un modelo</option>');
                modelos.forEach(function(modelo){
                    if(modelo.zofri==1){
                        $('#ModeloSim').append('<option value="'+modelo.id+'">ZOFRI - '+modelo.modelonombre+' \('+modelo.anios_vehiculo.trim()+'\)</option>');
                    }else{
                        $('#ModeloSim').append('<option value="'+modelo.id+'">'+modelo.modelonombre+' \('+modelo.anios_vehiculo.trim()+'\)</option>');
                    }
                });
                document.getElementById("ModeloSim").selectedIndex=0;
                $("#aplicaciones_msje").html("Listo...");
              },
              error: function(error){
                $('#mensajes').html(error.responseText);
                swal({
                    title: 'ERROR',
                    text: error.responseText,
                    icon: 'error',
                });
              }

            });
        }else{
          $('#ModeloSim option').remove();
          $('#ModeloSim').append('<option value="">Elija una Marca</option>');
        }
}

function ubicarse_en_anios()
    {
      var modelito=document.getElementById("ModeloSim");
      var texto=modelito.options[modelito.selectedIndex].text.trim();
      $("#nombre_modelo").html("<b>Modelo: </b>"+texto);
      var ini="(";
      var fin=")";
      var años=texto.substring(texto.indexOf(ini)+1,texto.indexOf(fin));
      document.getElementById("anios_vehiculo_sim").value=años;
      document.getElementById("anios_vehiculo_sim").focus();
      document.getElementById("anios_vehiculo_sim").select();
}

function ampliar()
{
        if(ampliar_aplicacionez==false)
        {

            /* este



                Cuando una propiedad contiene un guión, al acceder a ella con JavaScript se utiliza camel case:



                se quita el guión y la siguiente letra se hace mayúscula.



                Así, en CSS es z-index pero en JS es zIndex, igual ocurre con border-color (borderColor),



                grid-column (gridColumn) o grid-row (gridRow).



                FUENTE: https://es.stackoverflow.com/questions/340390/cambiar-el-valor-de-la-propiedad-grid-column-row-de-css-con-javascript



            */



            document.getElementById("zona_similares").style.gridColumn="2/5"; //este
            document.getElementById("zona_OEMs").style.visibility="hidden";
            document.getElementById("zona_FABs").style.visibility="hidden";

            $("#ampliar").html("<<");

        }else{

            document.getElementById("zona_similares").style.gridColumn="2/3"; //este
            document.getElementById("zona_OEMs").style.visibility="visible";
            document.getElementById("zona_FABs").style.visibility="visible";

            $("#ampliar").html(">>");
        }

        ampliar_aplicacionez=!ampliar_aplicacionez;
}

function mostrarNumeroInput() {
    let inputEfectivo = document.getElementById('inputEfectivo');
    let inputTransferencia = document.getElementById('inputTransferencia');
    let inputCredito = document.getElementById('inputCredito');
    let inputCheque = document.getElementById('inputCheque');
    let checkEfectivo = document.getElementById('checkEfectivo');
    let checkTransferencia = document.getElementById('checkTransferencia');
    let checkCredito = document.getElementById('checkCredito');
    let checkCheque = document.getElementById('checkCheque');
    if(checkEfectivo.checked) {
      // quitar el atributo disabled al input con id inputEfectivo
      inputEfectivo.removeAttribute('disabled');
    }else{
      inputEfectivo.setAttribute('disabled', true);
    }

    if(checkTransferencia.checked) {
      // quitar el atributo disabled al input con id inputTransferencia
      inputTransferencia.removeAttribute('disabled');
    }else{
      // agregar el atributo disabled al input con id inputTransferencia
      inputTransferencia.setAttribute('disabled', true);
    }

    if(checkCredito.checked) {
      inputCredito.removeAttribute('disabled');
    }else{
      inputCredito.setAttribute('disabled', true);
    }


    if(checkCheque.checked) {
      inputCheque.removeAttribute('disabled');
    }else{
      inputCheque.setAttribute('disabled', true);
    }

  }