const catalogoProductos = [
    {id: 1, nombre: "Buzo Oversize", precio: 45.99, marca: "Fallen"},
    {id: 2, nombre: "Remera Algodon", precio: 15.50, marca: "Tussi"},
    {id: 3, nombre: "Pantalon Cargo", precio: 59.99, marca: "Montagne"},
]

let carrito = [];

function agregarProducto(productoId){
    const productoBuscado = catalogoProductos.find(producto => producto.id === productoId);
    if (productoBuscado){
        carrito.push(productoBuscado);
        alert(`Agregado: ${productoBuscado.nombre} exitosamente.`);
        actualizarVistaCarrito();
    } else {
        console.log("error");
    }
}

function actualizarVistaCarrito(){
    const listaProducto = document.getElementById('lista-carrito');
    let  nombresProductos = [];
    for (const producto of carrito) {
        nombresProductos.push(producto.nombre);
    }
    listaProducto.textContent = nombresProductos.join(', ');
}

actualizarVistaCarrito()

function eliminarProducto(productoId){
    const carritoActualizado = carrito.filter(producto => producto.id !== productoId);
    if (carritoActualizado.length < carrito.length){
        carrito = carritoActualizado;
        alert(`Producto ${productoId} eliminado correctamente`);

        actualizarVistaCarrito();
    }
}