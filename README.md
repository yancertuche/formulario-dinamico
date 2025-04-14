# Formulario Dinámico Con React 19 Usando Formik y Yup

Este proyecto se inició utilizando [Create React App](https://github.com/facebook/create-react-app).


## Funcionalidades

La aplicación consta de dos páneles. Del lado izquierdo está el configurador de formularios, con el cual se pueden realizar las siguientes acciones :

- Asignar el nombre al formulario
- Crear los campos que desee el usuario asignando un nombre, el tipo de entrada y definir validaciones como obligatoriedad
- Visualizar un resumen de los campos agregados al formulario en la sección Configuración Actual. En este apartado también:
    - Puede eliminar un campo del formulario
    - puede editar un campo del formulario

y del lado derecho:

- Un Pre Visualizador que muestra el formulario que vería el usuario final y que cumple con lo definido por el configurador. 

## Instalación y Configuracion local

1. Clona el repositorio y ubicarse en la raiz del proyecto:

   ```bash
   git clone https://github.com/yancertuche/formulario-dinamico.git
   cd formulario-dinamico
2. Instala las dependencias:
    ```bash
    npm install
3. Inicia la aplicación:
    ```bash
    npm start
4. Abre [http://localhost:3000](http://localhost:3000) para visualizarla en tu navegador y empieza a interactuar

## Estructura del Proyecto

el proyecto se compone de las siguientes carpetas y archivos relevantes:
- **src**
    - **Components**: Directorio donde se implementan los componentes reutilizables para la aplicación.
        - **DynamicForm**: Componente encargado de interpretar y renderizar los formularios configurados desde el configurador.
        - **FieldConfigForm**: Componente encargado de crear los distintos campos y sus parámetros para un formulario definidos por un usuario.
        - **FormConfigManager**: Componente que orquesta el `FieldConfigForm` para crear una interfaz completa donde se configuren los campos y se gestiones la edición y/o eliminación.
        - **webComponents**: Componente donde se crea el webComponent del `DynamicForm` para que pueda ser reusable en otros proyectos.
    - **Styles**: Estilos globales.
    - **App.js**: Archivo del componente raíz