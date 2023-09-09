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


function paciencia(){
    // mostrar mensaje de paciencia con swal
    swal({
        title: 'Paciencia',
        text: 'Esta versión es solo una prueba',
        icon: 'info',
        confirmButtonText: 'Ok'
    });
}