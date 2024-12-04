let carrito = JSON.parse(localStorage.getItem("carrito")) || [];

function mostrarCarrito() {
  const lista = document.getElementById("carrito-lista");
  const total = document.getElementById("total");

  lista.innerHTML = "";
  let totalCarrito = 0;

  carrito.forEach((item) => {
    const li = document.createElement("li");
    li.innerHTML = `
      ${item.nombre} - $${item.precio} x ${item.cantidad}
      <button data-id="${item.id}" class="sumar">+</button>
      <button data-id="${item.id}" class="restar">-</button>
    `;
    lista.appendChild(li);
    totalCarrito += item.precio * item.cantidad;
  });

  total.textContent = `Total: $${totalCarrito}`;

  const botonesSumar = document.querySelectorAll(".sumar");
  const botonesRestar = document.querySelectorAll(".restar");

  botonesSumar.forEach((boton) => {
    boton.addEventListener("click", () => {
      modificarCantidad(parseInt(boton.getAttribute("data-id")), 1);
    });
  });

  botonesRestar.forEach((boton) => {
    boton.addEventListener("click", () => {
      modificarCantidad(parseInt(boton.getAttribute("data-id")), -1);
    });
  });
}

function modificarCantidad(id, cantidad) {
  const item = carrito.find((item) => item.id === id);
  if (item) {
    item.cantidad += cantidad;
    if (item.cantidad <= 0) {
      carrito = carrito.filter((item) => item.id !== id);
    }
    localStorage.setItem("carrito", JSON.stringify(carrito));
    mostrarCarrito();
  }
}

mostrarCarrito();


document.addEventListener("DOMContentLoaded", () => {
  function mostrarOpcionesDePago() {
    const main = document.querySelector("main");

    const contenedorPago = document.createElement("div");
    contenedorPago.id = "opciones-pago";

    const titulo = document.createElement("h2");
    titulo.textContent = "Opciones de Pago";
    contenedorPago.appendChild(titulo);

    const labelMetodo = document.createElement("label");
    labelMetodo.textContent = "Método de Pago:";
    contenedorPago.appendChild(labelMetodo);

    const selectMetodo = document.createElement("select");
    selectMetodo.id = "metodo-pago";

    const opcionDebito = document.createElement("option");
    opcionDebito.value = "debito";
    opcionDebito.textContent = "Tarjeta de Débito";
    selectMetodo.appendChild(opcionDebito);

    const opcionEfectivo = document.createElement("option");
    opcionEfectivo.value = "efectivo";
    opcionEfectivo.textContent = "Efectivo";
    selectMetodo.appendChild(opcionEfectivo);

    contenedorPago.appendChild(selectMetodo);

    const labelDireccion = document.createElement("label");
    labelDireccion.textContent = "Dirección de Envío:";
    contenedorPago.appendChild(labelDireccion);

    const inputDireccion = document.createElement("input");
    inputDireccion.type = "text";
    inputDireccion.id = "direccion-envio";
    inputDireccion.placeholder = "Ingresa tu dirección...";
    contenedorPago.appendChild(inputDireccion);

    const botonPagar = document.createElement("button");
    botonPagar.textContent = "Pagar";
    contenedorPago.appendChild(botonPagar);

    main.appendChild(contenedorPago);

    botonPagar.addEventListener("click", () => {
      const metodo = selectMetodo.value;
      const direccion = inputDireccion.value;

      if (direccion.trim() === "") {
        Swal.fire("Por favor, agrega tu dirección");
      } else {
        Swal.fire(
          `Gracias por tu compra. Método de pago: ${metodo}. Tu pedido será enviado a: ${direccion}.`
        );
        vaciarCarrito();
      }
    });
  }

  mostrarOpcionesDePago();
});

// Función para vaciar el carrito

function vaciarCarrito() {
  carrito = [];
  localStorage.setItem("carrito", JSON.stringify(carrito));
  mostrarCarrito();
}



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
      font-family: 'Playfair Display', serif;
    }

    header nav a {
      color: white;
      text-decoration: none;
      margin: 0 15px;
      font-weight: bold;
      font-family: 'Playfair Display', serif;
    }

    header nav a:hover {
      text-decoration: underline;
    }

    main {
      padding: 2rem;
      font-family: 'Playfair Display', serif;
    }

    #carrito {
      background-color: white;
      border: 1px solid #ccc;
      border-radius: 8px;
      padding: 1.5rem;
      box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
    }

    #carrito ul {
      list-style: none;
      padding: 0;
    }

    #carrito li {
      margin-bottom: 0.5rem;
      font-size: 1.2rem;
      color: #333;
    }

    #total {
      font-size: 1.5rem;
      font-weight: bold;
      margin-top: 1rem;
    }

    button {
      background-color: #ff8c42;
      border: none;
      color: white;
      padding: 0.5rem 1rem;
      border-radius: 5px;
      cursor: pointer;
      transition: background-color 0.3s;
      font-family: 'Playfair Display', serif;
    }

    button:hover {
      background-color: #e67634;
    }

    footer {
      background-color: #333333;
      color: white;
      text-align: center;
      padding: 1rem;
      margin-top: 2rem;
      font-family: 'Playfair Display', serif;
    }
  `;

  const styleSheet = document.createElement("style");
  styleSheet.type = "text/css";
  styleSheet.textContent = estilos;
  document.head.appendChild(styleSheet);
});



