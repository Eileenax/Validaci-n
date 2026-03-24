console.log ('HOLA MUNDO')
// VALIDATION
// Define la regla para el nombre de usuario: debe empezar con letra, permitir letras/números/guiones y tener entre 6 y 8 caracteres.
const userNameRegex = /[a-zA-Z][a-zA-Z0-9-_]{6,8}/;
// Define la regla para la contraseña: requiere al menos una mayúscula, una minúscula, un número y entre 8 y 10 caracteres.
const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z0-9]).{8,10}$/;
// Define la regla estándar para validar que un correo electrónico tenga un formato válido (ejemplo@dominio.com).
const emailRegex = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
// Define la regla para validar números de teléfonos.
const numeroMovil = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/;


// Selectores
// Captura el elemento desplegable de países.
const countries = document.querySelector("#countries");
// Captura el campo de entrada donde el usuario escribe su nombre de usuario.
const usernameInput = document.querySelector('#username');
// Captura el campo de entrada para el correo electrónico.
const emailInput = document.querySelector("#email");
// Captura el campo de entrada para el número de teléfono.
const phoneInput = document.querySelector("#phone");
// Captura el campo de entrada para la contraseña.
const passwordInput = document.querySelector("#password");
// Captura el campo de entrada para confirmar la contraseña.
const confirmPasswordInput = document.querySelector("#confirm-password");
// Captura el campo donde se muestra o selecciona el código de área telefónico.
const phoneCodeInput = document.querySelector("#phone-code");


// Función flecha que gestiona visualmente si un campo es válido o no.
const validation = (e, validation, element) => {
    // Si el ID es "phone", busca el mensaje de error en la posición 2 del contenedor; si no, lo busca en la posición 1.
    const informacion = element.id == "phone" ? e.target.parentElement.children[2]: e.target.parentElement.children[1];
    // Muestra en la consola el elemento de información encontrado para verificar que sea el correcto.
    //console.log (informacion)

    // Si la validación es exitosa (true)...
    if(validation){
        // Añade el borde/estilo verde (clase "correct").
        element.classList.add("correct");
        // Quita el borde/estilo rojo (clase "incorrect").
        element.classList.remove("incorrect");
        // Oculta el mensaje de error quitando la clase que lo muestra.
        informacion.classList.remove("show-information");
    }else{
        // Si la validación falla, añade el estilo rojo.
        element.classList.add("incorrect");
        // Quita el estilo verde.
        element.classList.remove("correct");
        // Muestra el mensaje de error al usuario.
        informacion.classList.add("show-information");
    }
}



// Estas lineas de codigo se utilizan para separar el nombre del pais de los numeros del codigo
// Convierte la lista de opciones en un arreglo y recorre cada una de ellas.

[...countries].forEach(options=>{
 // Modifica el texto de la opción para que solo muestre el nombre del país, cortando todo lo que esté después del paréntesis "(".
 options.innerHTML=(options.innerHTML.split("(")[0])

})

// Variable booleana para rastrear si el nombre de usuario es válido actualmente.
let usernameValidation = false;
let emailValidation = false;
let phoneValidation = false;
let passwordValidation = false;
let confirmPasswordValidation = false;

// Selecciona el primer elemento con la clase "informacion" del documento.
const informacion = document.querySelector(".informacion");

// Escucha cada vez que el usuario escribe (evento 'input') en el campo de nombre de usuario.
usernameInput.addEventListener('input',e=> {
  // Evalúa si lo escrito coincide con la RegEx de usuario y guarda el resultado (true o false).
  usernameValidation = userNameRegex.test(e.target.value);
  // Identifica el mensaje de error específico que está al lado de este input en el HTML.
  const informacion = e.target.parentElement.children[1];
  
  // Imprime el mensaje de error en consola para depurar.
  //console.log (informacion)
  
  // Llama a la función de validación general para aplicar los estilos visuales.
  validation (e, usernameValidation, usernameInput)

// if (usernameValidation) {
//   usernameInput.classList.add('correct');
//   usernameInput.classList.remove('incorrect');
//   informacion.classList.remove('show-information');
// } else {
//   usernameInput.classList.add('incorrect');
//   usernameInput.classList.remove('correct');
//   informacion.classList.add('show-information');

// 


});

emailInput.addEventListener('input',e=> { // Escucha cada vez que el usuario escribe (evento 'input') en el campo de email.
  emailValidation = emailRegex.test(e.target.value); // Evalúa si lo escrito coincide con la RegEx de email y guarda el resultado (true o false).
  
  validation (e, emailValidation, emailInput)   // Llama a la función de validación general para aplicar los estilos visuales.


  const informacion = e.target.parentElement.children[1];   // Identifica el mensaje de error específico que está al lado de este input en el HTML.

//console.log (informacion)
})


  countries.addEventListener('input', e => {
    //console.log([...e.target.children]);
    
  const optionSelected = [...e.target.children].find(option => option.selected);
  console.log (optionSelected)
  phoneCodeInput.innerHTML = `+${optionSelected.value}`;

  
  })

  phoneCodeInput.addEventListener('input', e => {
    phoneValidation = numeroMovil.test(e.target.value);
    const informacion = e.target.parentElement.parentElement.children[1]

  })

   if(phoneValidation){

        phoneInput.classList.add("correct");
        phoneInput.classList.remove("incorrect");
        informacion.classList.remove("show-information");
    }else{
        phoneInput.classList.add("incorrect");
        phoneInput.classList.remove("correct");
        informacion.classList.add("show-information");
    }

    passwordInput.addEventListener('input', e => {
    passwordValidation = passwordRegex.test(e.target.value);
    validation (e, passwordValidation, passwordInput)
    })

    confirmPasswordInput.addEventListener('input', e => {
    confirmPasswordValidation = passwordInput.value === e.target.value;
    validation (e, confirmPasswordValidation, confirmPasswordInput);
    })