let carrito = JSON.parse(localStorage.getItem("carrito")) || [];

async function cargarProductos() {
  try {
    const response = await fetch("js/productos.json");
    const productos = await response.json();
    mostrarProductos(productos);
  } catch (error) {
    console.error("Error al cargar productos:", error);
  }
}


function mostrarProductos(productos) {
  const contenedor = document.getElementById("productos-container");

  productos.forEach((producto) => {
    const div = document.createElement("div");
    div.classList.add("producto");

    div.innerHTML = `
      <img src="${producto.imagen}" alt="${producto.nombre}">
      <h3>${producto.nombre}</h3>
      <p>Precio: $${producto.precio}</p>
      <button data-id="${producto.id}">Agregar al carrito</button>
    `;

    contenedor.appendChild(div);
  });

  const botones = document.querySelectorAll("button");
  botones.forEach((boton) => {
    boton.addEventListener("click", () => {
      const id = parseInt(boton.getAttribute("data-id"));
      agregarAlCarrito(id, productos);

      //biblioteca sweetalert2 :)
      Swal.fire({
        title: "Producto Agregado",
        text: "Usted a agregado este vape!",
        icon: "success"
      });

    });
  });
}

function agregarAlCarrito(id, productos) {
  const producto = productos.find((p) => p.id === id);
  const itemCarrito = carrito.find((item) => item.id === id);

  if (itemCarrito) {
    itemCarrito.cantidad++;
  } else {
    carrito.push({ ...producto, cantidad: 1 });
  }

  localStorage.setItem("carrito", JSON.stringify(carrito));
}

cargarProductos();







//================== estilos para el js =====================


document.addEventListener("DOMContentLoaded", () => {
  const estilos = `
    body {
      font-family: 'Playfair Display', serif;
      margin: 0;
      padding: 0;
      background-color: #f7f7f7;
      color: #333333;
    }

    header {
      background-color: #ff8c42;
      color: white;
      text-align: center;
      padding: 1rem;
    }

    header nav a {
      color: white;
      text-decoration: noSne;
      margin: 0 15px;
      font-weight: bold;
    }

    header nav a:hover {
      text-decoration: underline;
    }

    main {
      padding: 2rem;
    }

    #productos-container {
      display: flex;
      flex-wrap: wrap;
      gap: 1.5rem;
      justify-content: center;
    }

    .producto {
      background-color: white;
      border: 1px solid #ccc;
      border-radius: 8px;
      padding: 1rem;
      width: 220px;
      text-align: center;
      box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
      transition: transform 0.3s, box-shadow 0.3s;
    }

    .producto:hover {
      transform: scale(1.05);
      box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2);
    }

    .producto img {
      max-width: 100%;
      border-radius: 8px;
      margin-bottom: 1rem;
    }

    .producto h3 {
      font-size: 1.2rem;
      margin: 0.5rem 0;
      color: #ff8c42; 
    }

    .producto p {
      font-size: 1rem;
      color: #666666;
    }

    .producto button {
      background-color: #ff8c42;
      border: none;
      color: white;
      padding: 0.5rem 1rem;
      border-radius: 5px;
      cursor: pointer;
      transition: background-color 0.3s;
    }

    .producto button:hover {
      background-color: #e67634;
    }

    footer {
      background-color: #333333;
      color: white;
      text-align: center;
      padding: 1rem;
      margin-top: 2rem;
    }
  `


  const styleSheet = document.createElement("style");
  styleSheet.type = "text/css";
  styleSheet.textContent = estilos;
  document.head.appendChild(styleSheet);
});




function mostrarAlerta() {
  Swal.fire({
    position: "top-end",
    icon: "success",
    title: "Your work has been saved",
    showConfirmButton: false,
    timer: 1500
  });
}


