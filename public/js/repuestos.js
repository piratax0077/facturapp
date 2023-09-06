window.onload = function () {
    // mostrar modal para buscar repuestos
    $('#modalBuscarRepuesto').modal('show');
};

function buscarRepuesto(){
    let busqueda = document.getElementById('busqueda').value;
    fetch("https://panchoserver.ddns.net/api/"+busqueda+"/buscadordemo")
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
                    <td><img src="https://panchoserver.ddns.net/storage/${repuesto.urlfoto}" alt="" class="img-fluid"></td>
                    <td>${repuesto.descripcion}</td>
                    <td>${repuesto.marcarepuesto}</td>
                    <td>${repuesto.stock_actual}</td>
                    <td>${precio}</td>
                    <td>
                        <button class="btn btn-success btn-sm" onclick="paciencia()">Agregar </button>
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