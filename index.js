var divsColores = document.querySelectorAll(".divs-colores");
var bordeBlanco = "white 2px solid"; //Se agrega al hacer click en un boton.
var arrayColores = []; //Contiene los colores para mostrarlos de forma aleatoria.

divsColores.forEach(function (color) {
  color.addEventListener("click", function () {
    var id = color.getAttribute("id"); //Extraigo el id para pasarlo como parametro.
    feedbackClick(id);
  });
  arrayColores.push(color);
});

//Funcion que al hacer click en un boton hace feedback
var feedbackClick = function (color) {
  var divColor = document.querySelector("#" + color); //Selecciono cada elemento por su id

  if (color === "verde") {
    divColor.classList.add("verde-click");

    setTimeout(() => {
      divColor.classList.remove("verde-click");
    }, 300);
    return;
  }

  if (color === "rojo") {
    divColor.classList.add("rojo-click");

    setTimeout(() => {
      divColor.classList.remove("rojo-click");
    }, 300);
    return;
  }

  if (color === "azul") {
    divColor.classList.add("azul-click");

    setTimeout(() => {
      divColor.classList.remove("azul-click");
    }, 300);
    return;
  }

  if (color === "amarillo") {
    divColor.classList.add("amarillo-click");

    setTimeout(() => {
      divColor.classList.remove("amarillo-click");
    }, 300);
    return;
  }
};

setInterval(() => {
  colorAleatorio();
}, 3000);

var colorAleatorio = function () {
  var aleatorio = Math.floor(Math.random() * arrayColores.length); //Contiene la posicion aleatoria entre 0 y 3
  var idColor = divsColores[aleatorio].getAttribute("id"); //Contiene el id - azul - amarillo, etc
  
  idColor === "verde"
    ? divsColores[aleatorio].classList.add("verde-click")
    : idColor === "rojo"
    ? divsColores[aleatorio].classList.add("rojo-click")
    : idColor === "amarillo"
    ? divsColores[aleatorio].classList.add("amarillo-click")
    : divsColores[aleatorio].classList.add("azul-click");

    setTimeout(() => {
      divsColores[aleatorio].classList.remove("verde-click", "rojo-click", "azul-click", "amarillo-click");
    }, 500);
};
