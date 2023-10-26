const guardarProductosLS = (productos) => {
  localStorage.setItem("productos", JSON.stringify(productos));
};

const cargarProductosLS = () => {
  return JSON.parse(localStorage.getItem("productos")) || [];
};

const renderProductos = () => {
  const productos = cargarProductosLS();
  let contenidoHTML = "";

  productos.forEach((producto) => {
    contenidoHTML += `<div class="col-md-7 mb-5 text-center">
        <div class="card">
        <a href="producto.html" onclick="guardarProductoLS(${producto.id})"><img src="${producto.imagen}" class="card-img-top" alt="${producto.nombre}"></a>
        <div class="card-body">
          <h5 class="card-title">${producto.nombre}</h5>
          <p class="card-text">$${producto.precio}</p>
          <a href="#" class="btn btn-danger" onclick="agregarAlCarrito(${producto.id})">Agregar (+)</a>
        </div>
        </div>
        </div>`;
  });

  document.getElementById("contenido").innerHTML = contenidoHTML;
};
// ...funciones para el carrito
const guardarCarritoLS = (carrito) => {
  localStorage.setItem("carrito", JSON.stringify(carrito));
};

const cargarCarritoLS = () => {
  return JSON.parse(localStorage.getItem("carrito")) || [];
};

const agregarAlCarrito = (id) => {
  const carrito = cargarCarritoLS();
  const producto = buscarProducto(id);
  carrito.push(producto);
  guardarCarritoLS(carrito);
    // Después de agregar el producto al carrito, mostrar la notificación SweetAlert
    Swal.fire('Producto Agregado', 'El producto ha sido añadido al carrito', 'success');
  // Después de agregar el producto al carrito, actualiza el número del carrito
  actualizarNumeroCarrito();

  console.log(id);
};

const actualizarNumeroCarrito = () => {
  const carrito = cargarCarritoLS();
  const totalCarrito = document.getElementById("totalCarrito");

  // Actualiza el número en el ícono del carrito con la cantidad de productos en el carrito
  totalCarrito.innerText = carrito.length;
};
const buscarProducto = (id) => {
  const productos = cargarProductosLS();
  let producto = productos.find((item) => item.id === id);

  return producto;
};

const estaEnElCarrito = (id) => {
  const productos = cargarProductosLS();

  return productos.some((item) => item.id === id);
};

const renderCarrito = () => {
  const carrito = cargarCarritoLS();
  let contenidoHTML = `<table class="table">`;

  let total = 0; // Variable para almacenar el total

  carrito.forEach((producto) => {
    contenidoHTML += `<tr>
        <td><img src="${producto.imagen}" alt="${producto.nombre}" width="64"></td>
        <td>${producto.nombre}</td>
        <td>$${producto.precio}</td>
        <td><img src="img/trash.jpeg" alt="Eliminar" width="24" onclick="eliminarDelCarrito(${producto.id})"></td>
        </tr>`;

    total += producto.precio; // Agregar el precio del producto al total
  });

  contenidoHTML += `</table>`;

  // Agregar el total al final de la tabla
  contenidoHTML += `<div>Total: $${total}</div>`;

  document.getElementById("contenido").innerHTML = contenidoHTML;
};

const eliminarDelCarrito = (id) => {
  const carrito = cargarCarritoLS();

  // Encuentra el índice del producto con el ID dado en el carrito
  const index = carrito.findIndex((producto) => producto.id === id);

  if (index !== -1) {
    // Si se encontró el producto, elimínalo del carrito usando splice
    carrito.splice(index, 1);
    // Guarda el carrito actualizado en el almacenamiento local
    guardarCarritoLS(carrito);
    // Vuelve a renderizar el carrito para mostrar los cambios
    renderCarrito();
  }
};
// Obtener productos desde un archivo JSON utilizando AJAX
const cargarProductosDesdeJSON = () => {
    return fetch('productos.json')
      .then((response) => {
        if (!response.ok) {
          throw new Error('Error al cargar los productos');
        }
        return response.json();
      })
      .then((productos) => {
        guardarProductosLS(productos); // Guardar productos en el almacenamiento local
        renderProductos(); // Renderizar los productos
      })
      .catch((error) => {
        console.error(error);
      });
  };
