window.onload = function() {
    dameMarcas();
};

function dameMarcas(){
    // usar fetch para obtener las marcas de vehiculos
  fetch('https://panchoserver.ddns.net/api/ruta_prueba')
  .then(res => res.json())
  .then(data => {
    let marcas = data;
    // mostrar el nombre de la marca y la imagen en el html
    let html = '';
    marcas.forEach(marca => {
        html += `
            <div class="col-md-3">
            <div class="card mt-4 text-center">
                <div class="card-header">
                    <h5>${marca.marcanombre}</h5>
                </div>
                <div class="card-body">
                    <img src="https://panchoserver.ddns.net/storage/${marca.urlfoto}" alt="" class="img-fluid">
                </div>
                <div class="card-footer">
                    <button class="btn btn-danger btn-sm" onclick="paciencia()">Eliminar </button>
                    <button class="btn btn-warning btn-sm" onclick="paciencia()">Editar </button>
                </div>
            </div>
            </div>
        `
        });
        document.getElementById('marcas').innerHTML = html;
  });
}

