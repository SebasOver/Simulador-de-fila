// Array de URLs de imágenes
const imagenesClientes = [
  'https://thefreakhunterhome.files.wordpress.com/2021/03/imagen_2021-03-30_174717.png?w=689',
  'src/Hombre_2.png',
  'src/Hombre_1.png',
  'src/Hombre_3.png',
  'src/Hombre_4.png',
  'src/Hombre_5.png',
  'src/Mujer_1.png',
  'src/Mujer_2.png',
  'src/Mujer_3.png',
  'src/Mujer_4.png',
  'src/Mujer_5.png',
  'src/Yuji.png',
];

let colaClientes = [];
let clienteActual = null;

function actualizarCola() {
  const listaClientes = document.getElementById('listaClientes');
  listaClientes.innerHTML = '';
  colaClientes.forEach((cliente, index) => {
    const divCliente = document.createElement('div');
    divCliente.classList.add('cliente');

    const imgCliente = document.createElement('img');
    imgCliente.src = cliente.imagen;
    imgCliente.alt = `Imagen de ${cliente.nombre}`;
    imgCliente.style.width = '100px';
    imgCliente.style.marginRight = '10px';

    const textoCliente = document.createElement('span');
    let texto = `Cliente ${cliente.numero} (${cliente.nombre}) - Registrado a las ${cliente.horaRegistro}`;
    if (cliente === clienteActual && cliente.horaAtencion) {
      texto += ` - Atendido a las ${cliente.horaAtencion}`;
    }
    textoCliente.textContent = texto;

    divCliente.appendChild(imgCliente);
    divCliente.appendChild(textoCliente);
    listaClientes.appendChild(divCliente);
  });

  const eliminarClienteDiv = document.getElementById('eliminarClienteDiv');
  if (colaClientes.length > 0) {
    eliminarClienteDiv.style.display = 'block';
  } else {
    eliminarClienteDiv.style.display = 'none';
  }

  const eliminarClienteSelect = document.getElementById('eliminarClienteSelect');
  eliminarClienteSelect.innerHTML = '';
  colaClientes.forEach((cliente, index) => {
    const option = document.createElement('option');
    option.value = index;
    option.textContent = `Cliente ${cliente.numero} (${cliente.nombre})`;
    eliminarClienteSelect.appendChild(option);
  });
}

function actualizarNumerosTurno() {
  colaClientes.forEach((cliente, index) => {
    cliente.numero = index + 1;
  });
}

function actualizarCajero() {
  const clienteActualP = document.getElementById('clienteActual');
  if (clienteActual) {
    clienteActualP.textContent = `Cliente actual: ${clienteActual.nombre} - Atendido a las ${clienteActual.horaAtencion}`;
  } else {
    clienteActualP.textContent = 'No hay cliente siendo atendido';
  }
}

function mostrarFormulario() {
  const formularioCliente = document.getElementById('formularioCliente');
  formularioCliente.style.display = 'block';
  document.getElementById('nombreClienteInput').value = '';
  document.getElementById('generoClienteInput').selectedIndex = 0;
  document.getElementById('nombreClienteInput').focus();
}

function agregarCliente() {
  const nombreCliente = document.getElementById('nombreClienteInput').value;
  const generoClienteSelect = document.getElementById('generoClienteInput');
  const generoCliente = generoClienteSelect.value;

  if (nombreCliente && generoCliente) {
    const numeroCliente = colaClientes.length + 1;
    const horaRegistro = new Date().toLocaleTimeString();
    const imagenesGenero = imagenesClientes.filter(imagen => imagen.includes(generoCliente.charAt(0).toUpperCase() + generoCliente.slice(1)));
    const imagenCliente = imagenesGenero[Math.floor(Math.random() * imagenesGenero.length)];

    colaClientes.push({ numero: numeroCliente, nombre: nombreCliente, imagen: imagenCliente, horaRegistro: horaRegistro });
    actualizarCola();
    document.getElementById('formularioCliente').style.display = 'none';
    generoClienteSelect.selectedIndex = 0; // Restablecer la selección del menú
    return false;
  } else
    alert('Por favor, ingrese un nombre y un género válido (hombre o mujer)');
    return false;
  }


function atenderCliente() {
  const infoCliente = document.getElementById('primerCliente');
  if (colaClientes.length > 0) {
    clienteActual = colaClientes.shift();
    clienteActual.horaAtencion = new Date().toLocaleTimeString();
    infoCliente.innerHTML = '';
    const imgCliente = document.createElement('img');
    imgCliente.src = clienteActual.imagen;
    imgCliente.alt = `Imagen de ${clienteActual.nombre}`;
    imgCliente.style.width = '100px';

    infoCliente.appendChild(imgCliente);
    actualizarCola();
    actualizarCajero();
  } else {
    clienteActual = null;
    infoCliente.innerHTML = '';
    actualizarCajero();
  }
}

function eliminarCliente() {
  const eliminarClienteSelect = document.getElementById('eliminarClienteSelect');
  const indicesAEliminar = Array.from(eliminarClienteSelect.selectedOptions).map(option => parseInt(option.value));
  indicesAEliminar.sort((a, b) => b - a);
  indicesAEliminar.forEach(index => colaClientes.splice(index, 1));
  actualizarNumerosTurno();
  actualizarCola();
}

// Inicializar la cola y cajero
actualizarCola();
actualizarCajero();