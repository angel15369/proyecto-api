const apiUrl = "https://localhost:7150/api";


async function listadeusuarios() {
  try {
    const response = await fetch(`${apiUrl}/Usuarios`);
    if (!response.ok) throw new Error("Error al obtener los usuarios");
    const usuarios = await response.json();

    const usuariosDiv = document.getElementById("usuarios");
    usuariosDiv.innerHTML = usuarios.map(usuario => `
      <tr>
        <td>${usuario.id}</td>
        <td>${usuario.nombre}</td>
        <td>${usuario.correo}</td>
        <td>
          <button onclick="llenarFormularioUsuario(${usuario.id}, '${usuario.nombre}', '${usuario.correo}')">Editar</button>
          <button onclick="eliminarUsuario(${usuario.id})">Eliminar</button>
        </td>
      </tr>
    `).join("");
  } catch (error) {
    console.error("Error:", error.message);
  }
}

function llenarFormularioUsuario(id, nombre, correo) {
  document.getElementById("usuarioId").value = id;
  document.getElementById("nombre").value = nombre;
  document.getElementById("correo").value = correo;
}


async function crearOActualizarUsuario() {
  const id = document.getElementById("usuarioId").value;
  const nombre = document.getElementById("nombre").value;
  const correo = document.getElementById("correo").value;
  const clave = document.getElementById("clave").value;

  if (!nombre || !correo || !clave) {
    alert("Todos los campos son obligatorios");
    return;
  }

  const usuario = { id: id || undefined, nombre, correo, clave };
  const method = id ? 'PUT' : 'POST';
  const endpoint = id ? `${apiUrl}/Usuarios/${id}` : `${apiUrl}/Usuarios`;

  try {
    const response = await fetch(endpoint, {
      method,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(usuario),
    });
    if (!response.ok) throw new Error("Error al guardar el usuario");
    alert("Usuario guardado con éxito");
    listadeusuarios();
  } catch (error) {
    console.error("Error:", error.message);
  }
}


async function eliminarUsuario(id) {
  try {
    const response = await fetch(`${apiUrl}/Usuarios/${id}`, { method: 'DELETE' });
    if (!response.ok) throw new Error("Error al eliminar el usuario");
    listadeusuarios();
  } catch (error) {
    console.error("Error:", error.message);
  }
}


async function listadepaises() {
  try {
    const response = await fetch(`${apiUrl}/Paises`);
    if (!response.ok) throw new Error("Error al obtener los países");
    const paises = await response.json();

    const paisesDiv = document.getElementById("paises");
    paisesDiv.innerHTML = paises.map(pais => `
      <tr>
        <td>${pais.id}</td>
        <td>${pais.nombre}</td>
        <td>${pais.gentilicio}</td>
        <td>${pais.capital}</td>
        <td>
          <button onclick="llenarFormularioPais(${pais.id}, '${pais.nombre}', '${pais.gentilicio}', '${pais.capital}')">Editar</button>
          <button onclick="eliminarPais(${pais.id})">Eliminar</button>
        </td>
      </tr>
    `).join("");
  } catch (error) {
    console.error("Error:", error.message);
  }
}


function llenarFormularioPais(id, nombre, gentilicio, capital) {
  document.getElementById("paisId").value = id;
  document.getElementById("nombrePais").value = nombre;
  document.getElementById("gentilicio").value = gentilicio;
  document.getElementById("capital").value = capital;
}


async function crearOActualizarPais() {
  const id = document.getElementById("paisId").value;
  const nombre = document.getElementById("nombrePais").value;
  const gentilicio = document.getElementById("gentilicio").value;
  const capital = document.getElementById("capital").value;

  if (!nombre || !gentilicio || !capital) {
    alert("Todos los campos son obligatorios");
    return;
  }

  const pais = { id: id || undefined, nombre, gentilicio, capital };
  const method = id ? 'PUT' : 'POST';
  const endpoint = id ? `${apiUrl}/Paises/${id}` : `${apiUrl}/Paises`;

  try {
    const response = await fetch(endpoint, {
      method,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(pais),
    });
    if (!response.ok) throw new Error("Error al guardar el país");
    alert("País guardado con éxito");
    listadepaises();
  } catch (error) {
    console.error("Error:", error.message);
  }
}


async function eliminarPais(id) {
  try {
    const response = await fetch(`${apiUrl}/Paises/${id}`, { method: 'DELETE' });
    if (!response.ok) throw new Error("Error al eliminar el país");
    listadepaises();
  } catch (error) {
    console.error("Error:", error.message);
  }
}
