import { allProduct, productCategoria } from "../api/product.api.js";

document.addEventListener('DOMContentLoaded', () => {
    cargarProductos(); // Cargar todos los productos por defecto

    const abrigosButton = document.getElementById('abrigos');
    const camisetasButton = document.getElementById('camisetas');
    const pantalonesButton = document.getElementById('pantalones');
    const todosButton = document.getElementById('todos');

    // Cambiar la categoría para que coincida con el archivo product.json
    todosButton.addEventListener('click', function() {
        cargarProductos();
        resaltarBoton(todosButton);
    });

    abrigosButton.addEventListener('click', function() {
        cargarProductosPorCategoria('Abrigos'); // Mayúscula inicial
        resaltarBoton(abrigosButton);
    });

    camisetasButton.addEventListener('click', function() {
        cargarProductosPorCategoria('Camisetas'); // Mayúscula inicial
        resaltarBoton(camisetasButton);
    });

    pantalonesButton.addEventListener('click', function() {
        cargarProductosPorCategoria('Pantalones'); // Mayúscula inicial
        resaltarBoton(pantalonesButton);
    });
});

// Función para resaltar el botón seleccionado
function resaltarBoton(botonSeleccionado) {
    const botones = document.querySelectorAll('.boton-menu');

    botones.forEach(boton => {
        boton.classList.remove('active'); // Quitar la clase 'active' de todos los botones
    });

    botonSeleccionado.classList.add('active'); // Añadir la clase 'active' al botón seleccionado
}


function cargarProductos() {
    // Llama a la función allProduct desde product.api.js
    allProduct()
        .then(productos => {
            if (productos.length > 0) {
                mostrarProductos(productos);
            } else {
                console.error('No se encontraron productos.');
            }
        })
        .catch(error => console.error('Error al cargar los productos:', error));
}

function cargarProductosPorCategoria(categoria) {
    // Llama a la función productCategoria desde product.api.js
    productCategoria(categoria)
        .then(productos => {
            if (productos.length > 0) {
                mostrarProductos(productos);
            } else {
                console.log(`No hay productos en la categoría ${categoria}`);
            }
        })
        .catch(error => console.error('Error al cargar productos por categoría:', error));
}

function mostrarProductos(productos) {
    const contenedorProductos = document.getElementById('contenedor-productos');
    contenedorProductos.innerHTML = ''; // Limpia el contenedor antes de agregar productos

    productos.forEach(producto => {
        const productoElemento = crearProductoElemento(producto);
        contenedorProductos.appendChild(productoElemento);
    });
}

function crearProductoElemento(producto) {
    const div = document.createElement('div');
    div.classList.add('producto');
    div.innerHTML = `
        <img src="../img/${producto.imagen}" alt="${producto.titulo}" class="producto-imagen">
        <div class="producto-info">
            <h3>${producto.titulo}</h3>
            <p>Precio: $${producto.precio}</p>
            <button class="boton-agregar" data-id="${producto.id}">Agregar al carrito</button>
        </div>
    `;

    // Añadir evento al botón "Agregar al carrito"
    const botonAgregar = div.querySelector('.boton-agregar');
    botonAgregar.addEventListener('click', () => {
        agregarAlCarrito(producto);
    });

    return div;
}

function agregarAlCarrito(producto) {
    // Obtener productos del carrito
    let productosEnCarrito = JSON.parse(localStorage.getItem("productos-en-carrito")) || [];

    // Verificar si el producto ya está en el carrito
    const existe = productosEnCarrito.find(p => p.id === producto.id);
    if (existe) {
        // Si existe, incrementar la cantidad
        existe.cantidad++;
    } else {
        // Si no existe, agregarlo al carrito con cantidad 1
        producto.cantidad = 1;
        productosEnCarrito.push(producto);
    }

    // Actualizar localStorage
    localStorage.setItem("productos-en-carrito", JSON.stringify(productosEnCarrito));

    // Actualizar el contador en el carrito
    actualizarContadorCarrito();
}

function actualizarContadorCarrito() {
    const contadorElement = document.getElementById('numerito');
    let productosEnCarrito = JSON.parse(localStorage.getItem("productos-en-carrito")) || [];
    const totalProductos = productosEnCarrito.reduce((acc, producto) => acc + producto.cantidad, 0);
    contadorElement.innerText = totalProductos;
}





