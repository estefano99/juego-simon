//Selectores
var divsColores = document.querySelectorAll(".divs-colores");
var nivelHTML = document.querySelector("#nivelSpan");
var divBtnComenzar = document.querySelector(".button-container-1"); //Div que contiene al boton
var btnComenzar = document.querySelector("#comenzar");
var tiempoHTML = document.querySelector(".contador-tiempo");
var puntajeHTML = document.querySelector("#span-puntuacion");

//Variables que no son selectores
var arrayColores = [0, 1, 2, 3]; //Contiene los colores para mostrarlos de forma aleatoria.
var secuenciaColores = []; //Va a contener la secuencia de colores.
var cantidadColores = 2; //Incrementa la cantidad de secuencias.
var intervalo; //Contiene el setInterval que genera y muestra los colores aleatorios.
var intervaloTiempo = null;
var secuenciaReproduciendose = false; // Indica si la secuencia se está reproduciendo
var sinJugar = false; //Hace que no se muestre el cartel de perdiste al seleccionar un color mientras no se arranco el juego.
var sonidoClick = new Audio();
sonidoClick.src = './assets/click.mp3';

var jugador = {
  colores : [],
  nivel: 1,
  puntaje: 0,
  tiempoRestante: 3
};

var modal = {
  modalContenedor: document.querySelector('.modal-contenedor'),
  modalTitulo: document.querySelector('.modal-contenido h3'),
  modalParrafo: document.querySelector('.modal-contenido p'),
  btnModal: document.querySelector(".modal-btn")
}

nivelHTML.textContent = jugador.nivel;

//Recorre la lista de colores y le asigna un evento a cada div
divsColores.forEach(function (color) {
  color.addEventListener("click", function () {
    var id = color.getAttribute("id"); //Extraigo el id para pasarlo como parametro.
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
    divColor.classList.add("verde-click");
    jugador.colores.push(0);
    if (sonidoClick.currentTime != 0) {
      sonidoClick.currentTime = 0; // Reiniciar el tiempo del sonido
    }
    sonidoClick.play();

    setTimeout(() => {
      divColor.classList.remove("verde-click");
    }, 300);
  }

  if (color === "rojo") {
    divColor.classList.add("rojo-click");
    jugador.colores.push(1);
    if (sonidoClick.currentTime != 0) {
      sonidoClick.currentTime = 0; // Reiniciar el tiempo del sonido
    }
    sonidoClick.play();

    setTimeout(() => {
      divColor.classList.remove("rojo-click");
    }, 300);
  }

  if (color === "amarillo") {
    divColor.classList.add("amarillo-click");
    jugador.colores.push(2);
    if (sonidoClick.currentTime != 0) {
      sonidoClick.currentTime = 0; // Reiniciar el tiempo del sonido
    }
    sonidoClick.play();

    setTimeout(() => {
      divColor.classList.remove("amarillo-click");
    }, 300);
  }

  if (color === "azul") {
    divColor.classList.add("azul-click");
    jugador.colores.push(3);
    if (sonidoClick.currentTime != 0) {
      sonidoClick.currentTime = 0; // Reiniciar el tiempo del sonido
    }
    sonidoClick.play();

    setTimeout(() => {
      divColor.classList.remove("azul-click");
    }, 300);
  }
  comprobarSecuencia(jugador);
};

//Comprueba que coincida el color seleccionado del jugador con el del arreglo de colores.
var comprobarSecuencia = function (jugador) {
  for (let i = 0; i < jugador.colores.length; i++) {
    if (jugador.colores[jugador.colores.length - 1] === secuenciaColores[jugador.colores.length - 1]) {
      jugador.puntaje++;
      puntajeHTML.textContent = jugador.puntaje;

      if (jugador.colores.length === secuenciaColores.length) {
        modal.modalTitulo.textContent = '¡Nivel superado!';
        modal.modalParrafo.textContent = 'Sigue así.';
        modal.modalContenedor.style.display = 'flex';
        modal.modalTitulo.classList.remove('modalPerdiste');
        modal.modalTitulo.classList.add('modalNivelSuperado');
        jugador.nivel++;
        nivelHTML.textContent = jugador.nivel;
        jugador.colores.splice(0); //Reinicia el arreglo del jugador para el proximo nivel
        mostrarColorAleatorio();
        clearInterval(intervaloTiempo);
        tiempoHTML.textContent = "";
        jugador.tiempoRestante = 20;
        var audio = new Audio();
        audio.src = './assets/siguienteNivel.mp3';
        audio.play();
        setTimeout(function() {
          modal.modalContenedor.style.display = 'none';
        }, 700);
      }
      return;
    }
    var mensajeTitulo = "Has perdido, color incorrecto.";
    var mensajeParrafo = 'Nivel: ' + jugador.nivel + ' - Puntuación: ' + jugador.puntaje ;
    gameOver(mensajeTitulo, mensajeParrafo);
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

  console.log(secuenciaColores);

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
        removerClase(color);
      }
      
      if (color === 1) {
        divsColores[1].classList.add("rojo-click");
        if (sonidoClick.currentTime != 0) {
          sonidoClick.currentTime = 0; // Reiniciar el tiempo del sonido
        }
        sonidoClick.play();
        removerClase(color);
      }
      
      if (color === 2) {
        divsColores[2].classList.add("amarillo-click");
        if (sonidoClick.currentTime != 0) {
          sonidoClick.currentTime = 0; // Reiniciar el tiempo del sonido
        }
        sonidoClick.play();
        removerClase(color);
      }

      if (color === 3) {
        divsColores[3].classList.add("azul-click");
        if (sonidoClick.currentTime != 0) {
          sonidoClick.currentTime = 0; // Reiniciar el tiempo del sonido
        }
        sonidoClick.play();
        removerClase(color);
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
      var mensajeTitulo = "Has perdido, se acabó el tiempo.";
      var mensajeParrafo = 'Nivel: ' + jugador.nivel + ' - Puntuación: ' + jugador.puntaje ;
      gameOver(mensajeTitulo, mensajeParrafo);
      return;
    }
    tiempoHTML.textContent = jugador.tiempoRestante;
    jugador.tiempoRestante--;
  }, 1000); // Intervalo de 1 segundo
}

//Se llama cuando erras de color o cuando se termina el tiempo.
function gameOver(mensajeTitulo, mensajeParrafo) {
  jugador.nivel = 1;
  nivelHTML.textContent = jugador.nivel;
  divBtnComenzar.classList.remove("disabledBtnComenzar");
  tiempoHTML.textContent = "";
  clearInterval(intervaloTiempo);
  jugador.colores.splice(0); //Reinicia el arreglo del jugador para el proximo nivel
  secuenciaColores.splice(0);
  jugador.tiempoRestante = 20;
  jugador.puntaje = 0;
  puntajeHTML.textContent = jugador.puntaje;
  sinJugar = false;
  modal.modalTitulo.textContent = mensajeTitulo;
  modal.modalParrafo.textContent = mensajeParrafo;
  modal.modalContenedor.style.display = 'flex';
  modal.modalTitulo.classList.remove('modalNivelSuperado');
  modal.modalTitulo.classList.add('modalPerdiste');
  var audioPerdiste = new Audio();
  audioPerdiste.src = './assets/perdiste.mp3';
  audioPerdiste.play();
}

//Remueve el color activado en el HTML
function removerClase(color) {
  setTimeout(() => {
    divsColores[color].classList.remove(
      "verde-click",
      "rojo-click",
      "azul-click",
      "amarillo-click"
    );
  }, 600);
}

modal.btnModal.addEventListener("click", function () {
  modal.modalContenedor.style.display = "none";
});
