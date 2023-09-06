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
        repuestos.forEach(repuesto => {
            html += `
                <div class="col-md-3">
                <div class="card mt-4 text-center">
                    <div class="card-header">
                        <h5>${repuesto.descripcion}</h5>
                    </div>
                    <div class="card-body">
                        <img src="https://panchoserver.ddns.net/storage/${repuesto.urlfoto}" alt="" class="img-fluid">
                    </div>
                    <div class="card-footer">
                        <button class="btn btn-success btn-sm" onclick="paciencia()">Agregar </button>
                    </div>
                </div>
                </div>
            `
        });
        document.getElementById('resultado').innerHTML = html;
    });
}