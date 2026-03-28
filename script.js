console.log("Validación de formulario");
//expresiones regulares
const userNameRegex = /[a-zA-Z][a-zA-Z0-9-_]{6,8}/; // Define la regla para el nombre de usuario: debe empezar con letra, permitir letras/números/guiones y tener entre 6 y 8 caracteres.
const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/; // Define que la contraseña tenga mínimo 8 caracteres, incluyendo al menos una letra y un número.
const emailRegex =
  /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/; // Define la regla estándar para validar que un correo electrónico tenga un formato válido (ejemplo@dominio.com).
const numeroMovil = /^[0-9]{4,12}$/; // Define la regla para validar números de teléfonos.

// Definicion de Selectores
const countries = document.querySelector("#countries"); // Captura el elemento desplegable de países.
const usernameInput = document.querySelector("#username"); // Captura el campo de entrada donde el usuario escribe su nombre de usuario.
const emailInput = document.querySelector("#email"); // Captura el campo de entrada para el correo electrónico.
const phoneInput = document.querySelector("#phone"); // Captura el campo de entrada para el número de teléfono.
const passwordInput = document.querySelector("#password"); // Captura el campo de entrada para la contraseña.
const confirmPasswordInput = document.querySelector("#confirm-password"); // Captura el campo de entrada para confirmar la contraseña.
const phoneCodeInput = document.querySelector("#phone-code"); // Captura el campo donde se muestra o selecciona el código de área telefónico.

// Función de validación general.
const validation = (e, validation, element) => {
  const informacion =
    element.id == "phone" // Si el ID es "phone", busca el mensaje de error en la posición 2 del contenedor; si no, lo busca en la posición 1.
      ? e.target.parentElement.children[2]
      : e.target.parentElement.children[1];
  // Muestra en la consola el elemento de información encontrado para verificar que sea el correcto.
  //console.log (informacion)

  if (validation) {
    element.classList.add("correct");
    element.classList.remove("incorrect");
    informacion.classList.remove("show-information");
  } else {
    element.classList.add("incorrect");
    element.classList.remove("correct");
    informacion.classList.add("show-information");
  }
};

// Esto se utilizo para separar el nombre del pais de los numeros del codigo de telefono que vienen entre parentesis en el HTML, dejando solo el nombre del pais visible en la lista.
[...countries].forEach((options) => {
  //... operador de propagación convierte la colección de opciones en un arreglo para poder usar forEach.

  options.innerHTML = options.innerHTML.split("(")[0]; // Modifica el texto de la opción para que solo muestre el nombre del país, cortando todo lo que esté después del paréntesis "(".
});

// let usernameValidation = false;
// let emailValidation = false;
// let phoneValidation = false; //NO ES NECESARIO DECLARAR ESTAS VARIABLES DE VALIDACION COMO FALSE, YA QUE SE ASIGNAN DIRECTAMENTE EN LOS EVENTOS DE INPUT, PERO SE PUEDEN DECLARAR PARA MAYOR CLARIDAD O SI SE QUIERE USAR SU VALOR EN OTRA PARTE DEL CÓDIGOS. SI SE DECIDE DECLARARLAS, DEBERÍAN ESTAR INICIALIZADAS COMO FALSE PARA INDICAR QUE INICIALMENTE NO HAY VALIDACIÓN EXITOSA.
// let passwordValidation = false;
// let confirmPasswordValidation = false;

const informacion = document.querySelector(".informacion"); // Selecciona el primer elemento con la clase "informacion" del documento.

usernameInput.addEventListener("input", (e) => {
  // Escucha cada vez que el usuario escribe (evento 'input') en el campo de nombre de usuario.
  usernameValidation = userNameRegex.test(e.target.value); // Evalúa si lo escrito coincide con la RegEx de usuario y guarda el resultado (true o false).
  validation(e, usernameValidation, usernameInput); // Llama a la función de validación general para aplicar los estilos visuales.
  const informacion = e.target.parentElement.children[1]; // Identifica el mensaje de error específico que está al lado de este input en el HTML.
});

// if (usernameValidation) {
//   usernameInput.classList.add('correct');
//   usernameInput.classList.remove('incorrect');
//   informacion.classList.remove('show-information');
// } else {        ESTA PARTE SE PUEDE ELIMINAR YA QUE SE ESTA USANDO LA FUNCION DE VALIDACION GENERAL PARA APLICAR LOS ESTILOS, PERO SE DEJO COMENTADA PARA MOSTRAR COMO QUEDARIA SIN LA FUNCION DE VALIDACION.
//   usernameInput.classList.add('incorrect');
//   usernameInput.classList.remove('correct');
//   informacion.classList.add('show-information');

emailInput.addEventListener("input", (e) => {
  // Escucha cada vez que el usuario escribe (evento 'input') en el campo de email.
  emailValidation = emailRegex.test(e.target.value); // Evalúa si lo escrito coincide con la RegEx de email y guarda el resultado (true o false).
  validation(e, emailValidation, emailInput); // Llama a la función de validación general para aplicar los estilos visuales.
  const informacion = e.target.parentElement.children[1]; // Identifica el mensaje de error específico que está al lado de este input en el HTML.

  //console.log (informacion)
});

countries.addEventListener("input", (e) => {
  //console.log([...e.target.children]);

  const optionSelected = [...e.target.children].find(
    (option) => option.selected,
  );
  // console.log(optionSelected);
  phoneCodeInput.innerHTML = `+${optionSelected.value}`;
  countries.classList.add("correct");
  phoneCodeInput.classList.add("correct");
});

phoneInput.addEventListener("input", (e) => {
  phoneValidation = numeroMovil.test(e.target.value);
  const informacion = e.target.parentElement.parentElement.children[1];

  if (phoneValidation) {
    phoneInput.classList.add("correct");
    phoneInput.classList.remove("incorrect");
    informacion.classList.remove("show-information");
  } else {
    phoneInput.classList.add("incorrect");
    phoneInput.classList.remove("correct");
    informacion.classList.add("show-information");
  }
});

passwordInput.addEventListener("input", (e) => {
  passwordValidation = passwordRegex.test(e.target.value);
  validation(e, passwordValidation, passwordInput);
});

confirmPasswordInput.addEventListener("input", (e) => {
  confirmPasswordValidation = passwordInput.value === e.target.value;
  validation(e, confirmPasswordValidation, confirmPasswordInput);
});
