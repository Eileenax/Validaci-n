console.log("Validación de formulario");

// reglas lógicas para validar. cada una de estas variables es una RegEx (Expresión Regular) que define el formato correcto para cada campo del formulario.
const userNameRegex = /[a-zA-Z][a-zA-Z0-9-_]{6,12}/;
const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
const emailRegex =
  /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
const numeroMovil = /^[0-9]{4,12}$/;

//selectores de los elementos del formulario:
// querySelector busca el ID (#) en el HTML y lo conecta con esta variable de JS.
const form = document.querySelector("#form");
const countries = document.querySelector("#countries");
const usernameInput = document.querySelector("#username");
const emailInput = document.querySelector("#email");
const phoneInput = document.querySelector("#phone");
const passwordInput = document.querySelector("#password");
const confirmPasswordInput = document.querySelector("#confirm-password");
const phoneCodeInput = document.querySelector("#phone-code");
const formbtn = document.querySelector("#form-btn");

// variables del estado de cada input.
// sirven para saber si cada campo pasó la validación, empiezan en false pq empiezan vacias.
let usernameValidation = false;
let emailValidation = false;
let phoneValidation = false;
let passwordValidation = false;
let confirmPasswordValidation = false;
let countryValidation = false;

// bloque de inicializacion para limpiar la visualizacion de la lista de paises.
//y funcion de validacion
// [...countries] es un operador de propagación que toma toda la lista de paises y las convierte en un array para poder usar .forEach() y modificar el texto de cada opción.
[...countries].forEach((options) => {
  options.innerHTML = options.innerHTML.split("(")[0]; // .split("(") corta el texto donde haya un paréntesis.
  // [0] le dice a JS que se quede con la primera parte (el nombre del país).
});

// validacion general pato:
// esta función decide si el input se pone rojo o verde y si el botón se activa.
const validation = (e, validation, element) => {
  const informacion = // la variable informacion es donde guardo el mensaje de error.
    element.id == "phone" // el ID del campo es igual a "phone"?
      ? e.target.parentElement.children[2] // si es True: busca en el contenedor, posición 2.
      : e.target.parentElement.children[1]; // si es False: busca en el contenedor, posición 1.

  // logica del boton de registro yep
  // estará bloqueado (true) si el usuario NO es válido, O si el email NO es válido, O si el teléfono NO es válido... de lo contrario, estará desbloqueado (false)
  formbtn.disabled =
    !usernameValidation ||
    !emailValidation ||
    !phoneValidation ||
    !passwordValidation ||
    !confirmPasswordValidation ||
    !countryValidation
      ? true //bloquea el boton pq algo esta mal
      : false; //desbloquea el boton pq todo esta perfe

  // logica de colores e informacion de error
  // si el .test() fue true, ponemos clase "correct" (verde) y quitamos "incorrect" (rojo).
  if (validation) {
    element.classList.add("correct");
    element.classList.remove("incorrect");
    // ocultamos el texto de error quitando la clase que lo muestra.
    if (informacion) informacion.classList.remove("show-information");
  } else {
    element.classList.add("incorrect");
    element.classList.remove("correct");
    // mostramos el texto de error agregando la clase que le da visibilidad.
    if (informacion) informacion.classList.add("show-information");
  }
};

// eventos (e) escuchar lo que el usuario hace en cada campo y validaciones
//"input" = actua cada vez que el contenido de ese campo cambie
// input el evento/ (e) el objeto del evento que contiene info sobre lo que pasó/ .target.value es lo que el usuario escribió en ese momento.
usernameInput.addEventListener("input", (e) => {
  // .test() revisa si lo escrito (e.target.value) cumple con la RegEx.
  usernameValidation = userNameRegex.test(e.target.value);
  // ejecutamos la función de colores y botón.
  validation(e, usernameValidation, usernameInput);
});

emailInput.addEventListener("input", (e) => {
  emailValidation = emailRegex.test(e.target.value);
  validation(e, emailValidation, emailInput);
});

countries.addEventListener("input", (e) => {
  // se busca entre todos los children (options) cuál es la que el usuario marcó (selected).
  const optionSelected = [...e.target.children].find(
    (option) => option.selected,
    //metodo .find para encontrar cual es el elemtento seleccionado
  );

  // extraemos su value (q es el codigo teelfonico) y lo asignamos con innerhtml al cuadrito del phonecode.
  phoneCodeInput.innerHTML = `+${optionSelected.value}`;

  // si el valor no es un espacio vacío (" " osea que no se selecciono nada), la validación del país es true.
  countryValidation = optionSelected.value === " " ? false : true;

  countries.classList.add("correct"); //estilo de correcto para cada uno
  phoneCodeInput.classList.add("correct");

  //llamado a la función para que revise si ya se puede activar el botón de registro.
  validation(e, countryValidation, countries);
});

phoneInput.addEventListener("input", (e) => {
  phoneValidation = numeroMovil.test(e.target.value);

  //para el teléfono el mensaje de error está un nivel más arriba en el HTML (parentElement.parentElement).
  const informacion = e.target.parentElement.parentElement.children[1];

  if (phoneValidation) {
    phoneInput.classList.add("correct");
    phoneInput.classList.remove("incorrect");
    if (informacion) informacion.classList.remove("show-information");
  } else {
    phoneInput.classList.add("incorrect");
    phoneInput.classList.remove("correct");
    if (informacion) informacion.classList.add("show-information");
  }

  //función de validación one more time para actualizar el estado del botón.
  validation(e, phoneValidation, phoneInput);
});

//contraseñaaaaaaaaa
passwordInput.addEventListener("input", (e) => {
  passwordValidation = passwordRegex.test(e.target.value);
  validation(e, passwordValidation, passwordInput);

  // si el segundo cuadro ya tiene texto, verificamos que sigan siendo iguales y que la primera contraseña sea válida, para actualizar su estado de validación.
  if (confirmPasswordInput.value !== "") {
    confirmPasswordValidation =
      e.target.value === confirmPasswordInput.value && passwordValidation;
    validation(
      { target: confirmPasswordInput },
      confirmPasswordValidation,
      confirmPasswordInput,
    );
  }
});

confirmPasswordInput.addEventListener("input", (e) => {
  // 333triple filtro para validar la confirmación de contraseña
  confirmPasswordValidation =
    e.target.value === passwordInput.value &&
    e.target.value !== "" &&
    passwordValidation;
  //1lo que se escrbio en el segundo cuadro es igual a lo que esta en el primero
  //2 el cuadro no está vacio
  //3la primera contraseña ya es válida
  validation(e, confirmPasswordValidation, confirmPasswordInput);
});

// enviar el formulario:
form.addEventListener("submit", (e) => {
  // .preventDefault() evita que la página se recargue (comportamiento por defecto).
  e.preventDefault();

  // creamos un objeto para organizar los datos capturados y verlos fácil en la consola.
  const user = {
    username: usernameInput.value,
    email: emailInput.value,
    phone: `${phoneCodeInput.innerHTML}${phoneInput.value}`,
    password: passwordInput.value,
  };
  //$ template literal para concatenar el código de país con el número de teléfono.

  console.log(user);
  console.log("Formulario enviado");
});
