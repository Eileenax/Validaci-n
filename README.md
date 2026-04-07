Formulario de Validación de Datos (JavaScript)
Este proyecto consiste en un sistema de validación de formularios en tiempo real utilizando JavaScript vanilla. El objetivo principal es garantizar que los datos ingresados por el usuario cumplan con requisitos de seguridad y formato antes de permitir el envío de la información.

🛠️ Tecnologías Utilizadas
HTML5: Estructura de campos y contenedores de error.

CSS3: Estilos de validación visual (Estados de éxito y error).

JavaScript (ES6+): Lógica de validación, manejo de eventos y manipulación del DOM.

⚙️ Funcionalidades Principales
1. Validación de Formato (Regex)
Utiliza Expresiones Regulares para verificar en tiempo real:

Username: Longitud y caracteres permitidos.

Email: Estructura correcta de correo electrónico.

Password: Requisitos mínimos de seguridad (8 caracteres, mayúsculas y números).

2. Lógica de Sincronización de Contraseñas
Implementa un sistema de validación cruzada que asegura que el campo de confirmación sea idéntico al de la contraseña principal, re-validando automáticamente si el usuario modifica el primer campo.

3. Procesamiento Dinámico de Datos
Limpieza de Strings: Uso del método .split() para procesar listas de países y mostrar solo el nombre del país en la interfaz.

Manejo de Arrays: Implementación del operador de propagación (...) para transformar listas de nodos (NodeLists) en arreglos y facilitar su recorrido con .forEach().

4. Control del Estado del Botón (UX)
El botón de envío se mantiene en estado disabled mediante una lógica booleana que verifica constantemente que todos los campos del formulario sean válidos.

📂 Estructura de Validación
Cada campo cuenta con un escuchador de eventos de tipo "input", el cual dispara una función de validación general que se encarga de:

Ejecutar el test de formato (.test()).

Identificar el elemento padre en el DOM para inyectar clases de estilo.

Mostrar u ocultar mensajes de error específicos según el resultado.

Cómo ejecutar el proyecto:
Clona el repositorio.

Abre el archivo index.html en cualquier navegador moderno.

Los resultados de la captura de datos se pueden visualizar en la consola del desarrollador al completar el formulario.
