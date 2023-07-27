//Selectores
var divsColores = document.querySelectorAll(".divs-colores");
var nivelHTML = document.querySelector("#nivelSpan");
var divBtnComenzar = document.querySelector(".header-div-btn");
var btnComenzar = document.querySelector("#btn-comenzar");
var tiempoHTML = document.querySelector(".contador-tiempo");
var puntajeHTML = document.querySelector("#span-puntuacion");
var modalRegistrarNombre = document.querySelector(".modal-registrar-nombre");
var desactivarModalNombre = document.querySelector(".btn-modal-registrar-nombre");
var modalMensajeError = document.querySelector(".modal-span");

//Variables que no son selectores
var arrayColores = [0, 1, 2, 3]; //Contiene los colores para mostrarlos de forma aleatoria.
var secuenciaColores = [];
var cantidadColores = 2; //Incrementa la cantidad de secuencias.
var intervalo = null; //Contiene el setInterval que genera y muestra los colores aleatorios.
var intervaloTiempo = null; //Intervalo de tiempo restante
var secuenciaReproduciendose = false; // Que no se pueda clickear mientras se esta mostrando la secuencia de colores.
var sinJugar = false; //Comprueba que no se pueda hacer click mientras no se arranco la partida.
var sonidoClick = new Audio();
sonidoClick.src = "./assets/click.mp3";
var audioPerdiste = new Audio();
audioPerdiste.src = "./assets/perdiste.mp3";
var audioSiguienteNivel = new Audio();
audioSiguienteNivel.src = "./assets/siguienteNivel.mp3";

var jugador = {
  colores: [],
  nivel: 1,
  puntaje: 0,
  tiempoRestante: 20,
  acumularTiempo: 0, //Acumula el tiempo y se lo resta al puntaje final

  agregarColor: function(color) {
    this.colores.push(color);
  },

  removerColores: function(){
    this.colores.splice(0);
  },

  subirNivel: function(){
    this.nivel++;
  },

  restaurarNivel: function(){
    this.nivel = 1;
  },

  aumentarPuntaje: function(){
    this.puntaje += 10;
  },

  restaurarPuntaje: function(){
    this.puntaje = 0;
  },

  restarTiempo: function () {
    this.tiempoRestante--;
  },

  actualizarTiempo: function() {
    this.tiempoRestante = 20;
  },

  acumularTiempoMetodo: function () {
    this.acumularTiempo += 1;
  },

  restaurarAcumuladorTiempo: function () {
    this.acumularTiempo = 0;
  },

  calcularPuntajeFinal: function () {
    this.puntaje = this.puntaje - this.acumularTiempo;
  }
};

var modal = {
  modalContenedor: document.querySelector(".modal-contenedor"),
  modalTitulo: document.querySelector(".modal-contenido h3"),
  modalParrafo: document.querySelector(".modal-contenido p"),
  btnModal: document.querySelector(".modal-btn"),

  activarModal: function(){
    this.modalContenedor.classList.add("modalActivar");
  },

  desactivarModal: function(){
    this.modalContenedor.classList.remove("modalActivar");
  },

  modificarTituloYParrafo: function(titulo,parrafo){
    this.modalTitulo.textContent = titulo;
    this.modalParrafo.textContent = parrafo;
  },

  agregarClase: function(clase){
    this.modalTitulo.classList.add(clase);
  },

  removerClase: function(clase){
    this.modalTitulo.classList.remove(clase);
  }
};

nivelHTML.textContent = jugador.nivel;

//Recorre la lista de colores y le asigna un evento a cada div
divsColores.forEach(function (color) {
  color.addEventListener("click", function () {
    var id = color.getAttribute("id");
    feedbackClick(id);
  });
});

//Funcion que al hacer click en un boton hace feedback y agrega al arreglo del jugador el indice del jugador
var feedbackClick = function (color) {
  var divColor = document.querySelector("#" + color); //Selecciono cada elemento por su id

  if (secuenciaReproduciendose || !sinJugar) {
    return; // Si la secuencia se está reproduciendo o no se esta jugando, no procesar los clics
  }

  if (color === "verde") {
    divColor.classList.remove("verde");
    divColor.classList.add("verde-click");
    jugador.agregarColor(0);
    if (sonidoClick.currentTime != 0) {
      sonidoClick.currentTime = 0; // Reiniciar el tiempo del sonido
    }
    sonidoClick.play();

    setTimeout(function () {
      divColor.classList.remove("verde-click");
      divColor.classList.add("verde");
    }, 300);
  }

  if (color === "rojo") {
    divColor.classList.remove("rojo");
    divColor.classList.add("rojo-click");
    jugador.agregarColor(1);
    if (sonidoClick.currentTime != 0) {
      sonidoClick.currentTime = 0; // Reiniciar el tiempo del sonido
    }
    sonidoClick.play();

    setTimeout(function () {
      divColor.classList.remove("rojo-click");
      divColor.classList.add("rojo");
    }, 300);
  }

  if (color === "amarillo") {
    divColor.classList.remove("amarillo");
    divColor.classList.add("amarillo-click");
    jugador.agregarColor(2);
    if (sonidoClick.currentTime != 0) {
      sonidoClick.currentTime = 0; // Reiniciar el tiempo del sonido
    }
    sonidoClick.play();

    setTimeout(function () {
      divColor.classList.remove("amarillo-click");
      divColor.classList.add("amarillo");
    }, 300);
  }

  if (color === "azul") {
    divColor.classList.remove("azul");
    divColor.classList.add("azul-click");
    jugador.agregarColor(3);
    if (sonidoClick.currentTime != 0) {
      sonidoClick.currentTime = 0; // Reiniciar el tiempo del sonido
    }
    sonidoClick.play();

    setTimeout(function () {
      divColor.classList.remove("azul-click");
      divColor.classList.add("azul");
    }, 300);
  }
  comprobarSecuencia(jugador);
};
var calcularPuntaje = 0;
//Comprueba que coincida el color seleccionado del jugador con el del arreglo de colores.
var comprobarSecuencia = function (jugador) {
  for (var i = 0; i < jugador.colores.length; i++) {
    if (jugador.colores[jugador.colores.length - 1] === secuenciaColores[jugador.colores.length - 1]) {
      jugador.aumentarPuntaje();
      puntajeHTML.textContent = jugador.puntaje;

      if (jugador.colores.length === secuenciaColores.length) {
        modal.modificarTituloYParrafo('¡Nivel superado!','Sigue así.');
        modal.agregarClase('modalNivelSuperado');
        modal.activarModal();
        jugador.subirNivel();
        nivelHTML.textContent = jugador.nivel;
        jugador.removerColores();
        mostrarColorAleatorio();
        clearInterval(intervaloTiempo);
        tiempoHTML.textContent = "";
        jugador.actualizarTiempo();
        audioSiguienteNivel.play();
        setTimeout(function () {
          modal.removerClase('modalNivelSuperado')
          modal.desactivarModal();
        }, 700);
      }
      return;
    }
    jugador.calcularPuntajeFinal(); //Resta el tiempo al puntaje
    jugador.restaurarAcumuladorTiempo();
    var mensajeTitulo = "Has perdido, color incorrecto.";
    var mensajeParrafo = "Nivel: " + jugador.nivel;
    mensajeParrafo += " - Puntuación final: " + jugador.puntaje;
    modal.modificarTituloYParrafo(mensajeTitulo,mensajeParrafo);
    perdiste();
    return;
  }
};

//Comienza el juego
btnComenzar.addEventListener("click", function () {
  intervalo = setInterval(function () {
    mostrarColorAleatorio();
  }, 2000);
  divBtnComenzar.classList.add("disabledBtnComenzar");
});

//Muestra la secuencia de colores en el HTML
var mostrarColorAleatorio = function () {
  generarColorAleatorio();

  clearInterval(intervalo);

  secuenciaReproduciendose = true;
  sinJugar = true;

  //Recorre el array de colores y agrega al callstack los colores a pintar en el html
  secuenciaColores.forEach(function (color, index) {
    setTimeout(function () {
      if (color === 0) {
        divsColores[0].classList.add("verde-click");
        if (sonidoClick.currentTime != 0) {
          sonidoClick.currentTime = 0; // Reiniciar el tiempo del sonido
        }
        sonidoClick.play();
        setTimeout(function () {
          divsColores[color].classList.remove("verde-click");
        }, 600);
      }

      if (color === 1) {
        divsColores[1].classList.add("rojo-click");
        if (sonidoClick.currentTime != 0) {
          sonidoClick.currentTime = 0; // Reiniciar el tiempo del sonido
        }
        sonidoClick.play();
        setTimeout(function () {
          divsColores[color].classList.remove("rojo-click");
        }, 600);
      }

      if (color === 2) {
        divsColores[2].classList.add("amarillo-click");
        if (sonidoClick.currentTime != 0) {
          sonidoClick.currentTime = 0; // Reiniciar el tiempo del sonido
        }
        sonidoClick.play();
        setTimeout(function () {
          divsColores[color].classList.remove("amarillo-click");
        }, 600);
      }

      if (color === 3) {
        divsColores[3].classList.add("azul-click");
        if (sonidoClick.currentTime != 0) {
          sonidoClick.currentTime = 0; // Reiniciar el tiempo del sonido
        }
        sonidoClick.play();
        setTimeout(function () {
          divsColores[color].classList.remove("azul-click");
        }, 600);
      }

      // Iniciar el contador de tiempo después de mostrar los colores
      if (index === secuenciaColores.length - 1) {
        iniciarContadorTiempo();
        secuenciaReproduciendose = false; // Si es el último color de la secuencia, establecer secuenciaReproduciendose en false para permitir los clics
      }
    }, (index + 1) * 1000);
  });
};

//Genera los colores aleatorios
function generarColorAleatorio() {
  for (var i = 0; i < cantidadColores; i++) {
    var aleatorio = Math.floor(Math.random() * arrayColores.length); //Contiene la posicion aleatoria entre 0 y 3
    secuenciaColores.push(arrayColores[aleatorio]);
  }
}

function iniciarContadorTiempo() {
  intervaloTiempo = setInterval(function () {
    if (jugador.tiempoRestante <= 0) {
      clearInterval(intervaloTiempo);
      jugador.calcularPuntajeFinal(); //Resta el tiempo al puntaje
      jugador.restaurarAcumuladorTiempo();
      var mensajeTitulo = "Has perdido, se acabó el tiempo.";
      var mensajeParrafo = "Nivel: " + jugador.nivel + " - Puntuación final: " + jugador.puntaje;
      modal.modificarTituloYParrafo(mensajeTitulo,mensajeParrafo);
      perdiste();
      return;
    }
    tiempoHTML.textContent = jugador.tiempoRestante;
    jugador.restarTiempo();
    jugador.acumularTiempoMetodo();
  }, 1000); // Intervalo de 1 segundo
}

//Se llama cuando erras de color o cuando se termina el tiempo.
function perdiste() {
  jugador.restaurarNivel();
  nivelHTML.textContent = jugador.nivel;
  divBtnComenzar.classList.remove("disabledBtnComenzar");
  tiempoHTML.textContent = "";
  clearInterval(intervaloTiempo);
  jugador.removerColores();
  secuenciaColores.splice(0);
  jugador.actualizarTiempo();
  jugador.restaurarPuntaje();
  puntajeHTML.textContent = jugador.puntaje;
  sinJugar = false;
  modal.activarModal();
  modal.agregarClase('modalPerdiste');
  audioPerdiste.play();
}

//Modal perdiste y ganaste
modal.btnModal.addEventListener("click", function () {
  modal.removerClase("modalPerdiste");
  modal.desactivarModal();
});

//Modal para tomar el nombre
desactivarModalNombre.addEventListener("click", function () {
  var nombre = document.querySelector("#nombre").value;

  if (nombre.length < 3) {
    modalMensajeError.classList.add("modal-span-activado");
    modalMensajeError.classList.remove("modal-span");
    setTimeout(function () {
      modalMensajeError.classList.add("modal-span");
      modalMensajeError.classList.remove("modal-span-activado");
    }, 2000);
    return;
  }
  modalRegistrarNombre.classList.remove("modal-registrar-nombre");
  modalRegistrarNombre.classList.add("modalDesactivar");
})
