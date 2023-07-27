var form = document.querySelector("form");
var divError = document.querySelector(".div-error");
var pError = document.querySelector(".p-error");

form.addEventListener("submit", function (e) {
  e.preventDefault();
  
  var nombre = document.querySelector("#nombre").value;
  var email = document.querySelector("#email").value;
  var mensaje = document.querySelector("#mensaje").value;
  
  if (nombre.length === 0 || email.length === 0 || mensaje.length === 0) {
    mensajeError("Debe rellenar todos los campos");
    return;
  }

  if (!validarNombre(nombre)) {
    return;
  }
  if (!validarMensaje(mensaje)) {
    return;
  }

  var contenido = "Nombre: " + nombre + " " + mensaje;
  var mailtoLink = "mailto:" + email + "?subject=Contacto&body=" + contenido;

  window.open(mailtoLink);
});

// Expresión regular para validar que el nombre sea alfanumérico
var validarNombre = function (nombre) {
  var alfaNumerico = /^[a-zA-Z0-9]+$/;
  if (!alfaNumerico.test(nombre)) {
    mensajeError("Nombre mal ingresado");
    return false;
  }
  return true;
}

var validarMensaje = function (mensaje) {
  if (mensaje.length < 5) {
    mensajeError("Mensaje muy corto");
    return false;
  }
  return true;
}

var mensajeError = function (mensaje) {
  pError.textContent = mensaje;
  divError.classList.add("div-error-activo")
  divError.classList.remove("div-error")

  setTimeout(function (){
    divError.classList.add("div-error")
    divError.classList.remove("div-error-activo")
  }, 3000);
}



