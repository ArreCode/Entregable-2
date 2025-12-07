const productos = [
    {id: 1, nombre: "Buzo Oversize", precio: 50000, marca: "Fallen"},
    {id: 2, nombre: "Remera Algodon", precio: 20000, marca: "Tussi"},
    {id: 3, nombre: "Pantalon Cargo", precio: 35000 , marca: "Montagne"},
];

let carrito = [];

function ItemCarrito(producto, cantidad) {
    this.id = producto.id;
    this.nombre = producto.nombre;
    this.precio = producto.precio;
    this.cantidad = cantidad;
}

function guardarCarrito() {
    localStorage.setItem('carritoEcom', JSON.stringify(carrito));
}

function cargarCarrito() {
    const carritoGuardado = localStorage.getItem('carritoEcom');
    if (carritoGuardado) {
        carrito = JSON.parse(carritoGuardado);
        actualizarVistaCarrito();
    }
}

function buscarProducto(idProducto) {
    return productos.find(producto => producto.id === idProducto);
}

function calcularTotal() {
    return carrito.reduce((acumulado, item) => {
        return acumulado + (item.precio * item.cantidad);
    }, 0);
}

function actualizarVistaCarrito() {
    const totalItems = carrito.reduce((acc, item) => acc + item.cantidad, 0);
    const btnCarrito = document.getElementById('btn-ver-carrito');
    if(btnCarrito) {
        btnCarrito.textContent = `Ver Carrito (${totalItems})`;
    }
}

function anadirAlCarrito(e) {
    const idProducto = parseInt(e.target.getAttribute('data-id')); 
    const productoEncontrado = buscarProducto(idProducto);

    if (productoEncontrado) {
        const itemExistente = carrito.find(item => item.id === idProducto);
        
        if (itemExistente) {
            itemExistente.cantidad++;
        } else {
            carrito.push(new ItemCarrito(productoEncontrado, 1)); 
        }

        guardarCarrito();
        actualizarVistaCarrito();
    }
}

function finalizarCompra() {
    if (carrito.length === 0) {
        return;
    }

    const productosAdquiridos = [];
    
    for (const item of carrito) {
        const detalleProducto = {
            nombre: item.nombre,
            cantidad: item.cantidad,
            subtotal: item.precio * item.cantidad,
        };
        productosAdquiridos.push(detalleProducto);
    }
    
    const compra = {
        id: Date.now(),
        fecha: new Date().toLocaleDateString('es-AR'),
        productosAdquiridos: productosAdquiridos,
        total: calcularTotal()
    }

    const historialActual = JSON.parse(localStorage.getItem('historialCompras') || '[]');
    historialActual.push(compra);
    localStorage.setItem('historialCompras', JSON.stringify(historialActual));
    
    carrito = [];
    guardarCarrito();
    actualizarVistaCarrito();
}

function mostrarCarrito() {
    const carritoHTML = carrito.length > 0
        ? carrito.map(item => 
            `<li>${item.nombre} x ${item.cantidad} - $${(item.precio * item.cantidad).toLocaleString('es-AR')}</li>`
        ).join('') + `<hr>Total: $${calcularTotal().toLocaleString('es-AR')}`
        : 'El carrito está vacío.';

    const nuevaVentana = window.open("", "Carrito de Compras", "width=600,height=400");
    nuevaVentana.document.write(`
        <html>
        <head>
            <title>Mi Carrito</title>
        </head>
        <body>
            <h1>🛒 Productos en Carrito</h1>
            <ul>${carritoHTML}</ul>
            <button id="btn-comprar">Finalizar Compra</button>
            <button onclick="window.close()">Cerrar</button>
            <script>
                document.getElementById('btn-comprar').addEventListener('click', function() {
                    // Llama a la función de la ventana padre (main.js)
                    window.opener.finalizarCompra(); 
                    window.close(); 
                });
            </script>
        </body>
        </html>
    `);
}

document.addEventListener('DOMContentLoaded', () => {
    
    cargarCarrito();
    
    const btnVerCarrito = document.getElementById('btn-ver-carrito');
    if (btnVerCarrito) {
        btnVerCarrito.addEventListener('click', mostrarCarrito);
    }
    
    const botonesAnadir = document.querySelectorAll('.btn-anadir');

    botonesAnadir.forEach(boton => {
        boton.addEventListener('click', anadirAlCarrito);
    });
});