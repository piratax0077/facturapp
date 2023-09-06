const express = require('express');
const bodyParser = require('body-parser');
const { Sequelize } = require('sequelize');

var productos = [
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
// arreglo de productos que estan en el carrito
var carrito = [];
// arreglo de ventas
var ventas = [];
// arreglo de carritos
var carritos = [];
var numeroCarrito = 0;

// arreglo de clientes
var clientes = [
  {nombre: 'Francisco Rojo', email: 'francisco.rojo.gallardo@gmail.com', telefono: '1234567890'}, 
  {nombre: 'Belen Toledo', email:'belen@gmail.com', telefono: '1234567890'},
  {nombre: 'Juan Perez', email:'juanperez@gmail.com', telefono: '1234567890'},
  {nombre: 'Maria Perez', email:'maria@gmail.com', telefono: '1234567890'},
];

var usuarios = [
  {nombre: 'Francisco', email: 'francisco@gmail.com', urlimage:"https://static1.personality-database.com/profile_images/cc489f72056644ce9d093730555a8327.png"},
  {nombre: 'Mauricio', email:'mauricio@gmail.com', urlimage:"https://pbs.twimg.com/profile_images/1627693548064632834/uoIslBmc_400x400.jpg"},
  {nombre: 'Maria José', email:'mariajose@gmail.com', urlimage:"https://i.pinimg.com/originals/8b/88/02/8b88025dbeb2fece9ba7bb08515c5449.png"},
  {nombre: 'Carlos', email:'carlos@gmail.com', urlimage:"https://static1.personality-database.com/profile_images/809fe209adce43e1ad9973e58772828e.png"},
  {nombre: 'Daniela', email:'daniela@gmail.com', urlimage:"https://smoda.elpais.com/wp-content/uploads/2021/10/sen10-620x470.jpg"}
];

var formasPago = [
  {idFormaPago:1, nombreFormaPago: 'Efectivo'},
  {idFormaPago:2, nombreFormaPago: 'Transferencia'},
  {idFormaPago:3, nombreFormaPago: 'Credito'},
  {idFormaPago:4, nombreFormaPago: 'Cheque'},
];

var nombreCliente = "Sin Cliente";
// fecha actual en formato dd/mm/yyyy
const fecha = new Date();
const dia = fecha.getDate();
const mes = fecha.getMonth() + 1;
const anio = fecha.getFullYear();
const fechaActual = `${dia}/${mes}/${anio}`;

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Configuración de EJS
app.set('view engine', 'ejs');

// configuracion de las vistas
app.set('views', __dirname + '/views');

// Configurar la conexión a la base de datos
// const sequelize = new Sequelize('nodejs', 'root', '', {
//   host: 'localhost',
//   dialect: 'mysql'
// });

// Configurar el middleware para servir archivos estáticos desde la carpeta 'public'
app.use(express.static('public'));

app.get('/', (req, res) => {
  // retornar la vista index.ejs
 // renderizar la vista pages/index.ejs y pasarle el arreglo de productos y el arreglo de carrito

 let total = 0;

 carrito.forEach(producto => total += producto.cantidad * producto.precio);
  
  res.render('pages/index', {
    productos: productos,
    carrito: carrito, 
    cliente: nombreCliente, 
    fechaActual: fechaActual, 
    total: total});
  
});

app.get('/about', (req, res) => {
  // retornar la vista about.ejs
  // renderizar la vista pages/about.ejs y pasarle el arreglo de ventas, la fecha actual, el arreglo de usuarios y el arreglo de formas de pago
  console.log(ventas);
  res.render('pages/about',{ventas: ventas, fechaActual: fechaActual, usuarios: usuarios, formasPago: formasPago});
});

app.post('/agregar-producto', (req, res) => {
  try {
    const { nombre, precio, cantidad } = req.body;
    const subtotal = precio * cantidad;
    const producto = { nombre, precio, cantidad, subtotal };
    productos.push(producto);
    res.render('pages/index', {
      productos: productos, 
      carrito: carrito, 
      cliente: nombreCliente, 
      fechaActual: fechaActual,
      total: total
    });
  } catch (error) {
    res.json({ success: false, error: error.message });
  }
});

app.post('/agregar-carrito',(req,res) => {
  try {
    console.log(req.body);
    // recuperar el producto del body
    const { producto } = req.body;
    
    // agregar el numero de carrito al pro
    // agregar el producto al arreglo de carrito
    carrito.push(producto);
    res.json({ success: true });
  } catch (error) {
    res.json({ success: false, error });
  }
  
});


app.delete('/eliminar-producto/:index', (req, res) => {
  try {
    const index = parseInt(req.params.index);
    productos.splice(index, 1); // Eliminar el producto del arreglo
    
    res.render('pages/index', {
      productos: productos, 
      carrito: carrito, 
      cliente: nombreCliente, 
      fechaActual: fechaActual,
      total: total
    });
  } catch (error) {
    res.json({ success: false, error });
  }
  
});

app.post('/agregar-cliente', (req, res) => {
  try {
    const { cliente } = req.body;
    // recuperar el producto del body
    // agregar el producto al arreglo de carrito
    
    nombreCliente = cliente.nombre;
    res.json({ success: true });
  } catch (error) {
    res.json({ success: false, error });
  }
});

app.delete('/limpiar-carrito', (req, res) => {
  try {
    if(carrito.length == 0){
      return res.json({ success: false, error: 'No hay productos en el carrito desde backend' });
    }
    // eliminar todos los productos del carrito
    carrito = [];
    nombreCliente = "Sin Cliente";
    res.json({ success: true });
  } catch (error) {
    res.json({ success: false, error });
  }
});

app.get('/eliminar-producto/:index', (req, res) => {
  try {
    const index = parseInt(req.params.index);
    console.log(index);
    carrito.splice(index, 1); // Eliminar el producto del arreglo
    res.json({ success: true });
  } catch (error) {
    res.json({ success: false, error });
  }
});

app.post('/procesar-venta', (req, res) => {
  try {
    const { nombreCliente, metodoPagoSeleccionado, total } = req.body;
    // guardar el req.body en el array ventas
    const venta = { nombreCliente, metodoPagoSeleccionado, total };
    
    // a cada producto del carrito le agregamos el numero de carrito
    carrito.forEach(p => {
      p.numeroCarrito = numeroCarrito;
    });

    // guardamos el array de carrito en el array carritos
    carritos.push(carrito);
    // agregar el numero de carrito al objeto venta
    venta.numeroCarrito = numeroCarrito;
    ventas.push(venta);
    // le sumamos 1 al numero de carrito
    numeroCarrito++;
    
    res.json({ success: true });
  } catch (error) {
    res.json({ success: false, error });
  }
});

app.get('/verProducto/:codigo_interno', (req, res) => {
  try {
    const codigo_interno = req.params.codigo_interno;
   
    // buscar el producto en el arreglo productos
    const producto = productos.find(producto => producto.codigo_interno == codigo_interno);
    
    res.json({ success: true, producto });
  } catch (error) {
    res.json({ success: false, error });
  }
});

app.get('/detalle-venta/:numeroCarrito', (req, res) => {
  try {
    var productosArray = [];
    const numeroCarrito = parseInt(req.params.numeroCarrito);
    let carritosArray = carritos;
    carritosArray.forEach(carritos => {
      carritos.forEach(carrito => {
        // buscar todos los productos que tengan el numero de carrito igual al numeroCarrito
        if(carrito.numeroCarrito == numeroCarrito){
          productosArray.push(carrito);
        }

      })
    });

    
    // console.log(productos);
    res.json({ success: true, productosArray});
  } catch (error) {
    res.json({ success: false, error });
  }
});

app.get('/productos', (req, res) => {
  var proveedores = [
    {idProveedor:1,nombreProveedor: 'Proveedor 1', direccion: 'Direccion 1', telefono: 'Telefono 1'},
    {idProveedor:2,nombreProveedor: 'Proveedor 2', direccion: 'Direccion 2', telefono: 'Telefono 2'},
    {idProveedor:3,nombreProveedor: 'Proveedor 3', direccion: 'Direccion 3', telefono: 'Telefono 3'}];

    var familias = [
      {idFamilia:1,nombreFamilia: 'Familia 1'},
      {idFamilia:2,nombreFamilia: 'Familia 2'},
      {idFamilia:3,nombreFamilia: 'Familia 3'}
    ];

   res.render('pages/productos', { productos: productos, proveedores: proveedores, familias: familias});
});

app.get('/clientes', (req, res) => {
  
  res.render('pages/clientes', { clientes: clientes});
});

app.get('/facturar', (req, res) => {
    let total = 0;
    carrito.forEach(producto => total += producto.cantidad * producto.precio);
    res.render('pages/facturar',{
      productos: productos,
      carrito: carrito, 
      cliente: nombreCliente, 
      fechaActual: fechaActual, 
      total: total});
});

app.get('/usuarios', (req, res) => {
  res.render('pages/usuarios', { usuarios: usuarios});
});

app.get('/marcas-vehiculos', (req, res) => {
  
  res.render('pages/marcas-vehiculos');
});

app.get('/repuestos', (req, res) => {
  res.render('pages/repuestos');
});

app.listen(3000, () => {
  console.log('Servidor en funcionamiento en el puerto 3000');
});

module.exports = productos;

