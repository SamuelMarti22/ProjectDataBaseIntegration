# Materia: Base de Datos - S2561-0701

## Estudiantes

- Samuel Martínez Arteaga – [smartinea1@eafit.edu.co](mailto:smartinea1@eafit.edu.co)  
- Laura Andrea Castrillón Fajardo – [lacastrilf@eafit.edu.co](mailto:lacastrilf@eafit.edu.co)

## Profesor

- Edwin Montoya – [emontoya@eafit.edu.co](mailto:emontoya@eafit.edu.co)

---

## Tabla de Contenido

1. [Descripción del Sistema de Gestión de Nodo](#1-descripción-del-sistema-de-gestión-de-nodo)
2. [Requerimientos Cumplidos](#2-requerimientos-cumplidos)
3. [Requerimientos No Cumplidos](#3-requerimientos-no-cumplidos)
4. [Información General de Diseño de Alto Nivel, Arquitectura, Patrones y Mejores Prácticas Utilizadas](#4-información-general-de-diseño-de-alto-nivel-arquitectura-patrones-y-mejores-prácticas-utilizadas)
5. [Descripción del Ambiente de Desarrollo y Técnico](#5-descripción-del-ambiente-de-desarrollo-y-técnico)
6. [Cómo se Compila y Ejecuta](#6-cómo-se-compila-y-ejecuta)
7. [Detalles del Desarrollo - Workflow](#7-detalles-del-desarrollo---workflow)
8. [Descripción y Configuración del Proyecto](#8-descripción-y-configuración-del-proyecto)
9. [Descripción del Ambiente de Ejecución](#9-descripción-del-ambiente-de-ejecución)
10. [Guía de Uso para el Usuario Final](#10-guía-de-uso-para-el-usuario-final)
11. [Referencias](#11-referencias)

---

## 1. Descripción del Sistema de Gestión de Nodo

Esta es una aplicación web diseñada para facilitar la gestión de cursos, estudiantes y profesores dentro de un entorno educativo. El sistema implementa funcionalidades CRUD (Crear, Leer, Actualizar, Eliminar) que permiten a los administradores interactuar con la información de manera flexible, ordenada y eficiente.

Entre las operaciones principales se encuentran:

- *Gestión de cursos:* Creación, visualización, edición y eliminación de cursos académicos. Cada curso puede incluir datos como nombre, categoría, fechas, precio y el profesor asignado.
- *Gestión de usuarios:* Registro y administración de estudiantes, profesores y otros roles. Se capturan datos personales y credenciales, permitiendo identificar y clasificar a cada participante.
- *Manejo de tareas y materiales:* Posibilidad de crear foros, subir archivos, asignar tareas y registrar entregas por parte de los estudiantes.
- *Interacción dinámica:* Uso de componentes visuales interactivos como SweetAlert2 para crear formularios emergentes, confirmaciones de acción y mensajes de retroalimentación amigables.

La interfaz está construida con HTML, CSS y JavaScript, conectándose a una API que gestiona la lógica de base de datos en segundo plano. Esto permite que las operaciones sean realizadas en tiempo real con una experiencia fluida para el usuario.

---

## 2. Requerimientos Cumplidos

### Funcionales

- Autenticación y Registro  
  - Login/Logout  
  - Validación de username y password  
  - Registro de usuarios  

- Funcionalidades del Administrador  
  - Matricular usuarios a un curso  
  - Asignar profesor  
  - Agregar y eliminar curso  
  - Eliminar usuario  
  - Visualización de estadísticas  
  - Listar cursos y usuarios con filtros  
  - Ver información general de un curso  

- Funcionalidades del Profesor  
  - Listar sus cursos  
  - Procesar solicitudes  
  - Ingresar a cursos  
  - Ver entregas  
  - Crear tareas y foros  
  - Subir materiales  

- Funcionalidades del Alumno  
  - Listar sus cursos  
  - Solicitudes  
  - Ingresar a cursos  
  - Entregar tareas  

- Funcionalidades dentro del curso  
  - Listar alumnos  
  - Listar materiales  
  - Foros (crear, enviar y responder mensajes)  
  - Ver tareas  
  - Salir del curso y regresar al listado  

### No Funcionales

- Usabilidad  
- Escalabilidad  
- Disponibilidad  

---

## 3. Requerimientos No Cumplidos

### Funcionales

- El administrador solo tiene acceso a su propio rol (no posee funciones de profesor ni estudiante).

### No Funcionales

- Rendimiento: Las búsquedas no están completamente optimizadas.  
- Seguridad: Se requiere una implementación más robusta de control de acceso.  
- Mantenibilidad: Aún no se contemplan filtros dinámicos o ajustes sin modificación de código.

---

## 4. Información General de Diseño de Alto Nivel, Arquitectura, Patrones y Mejores Prácticas Utilizadas

El sistema está construido bajo una arquitectura cliente-servidor, donde el frontend (HTML, CSS, JavaScript) se comunica con un backend a través de una API REST conectada a una instancia de AWS. Esta separación asegura una distribución clara de responsabilidades.

El backend sigue el patrón *Modelo-Vista-Controlador (MVC)*, separando los datos, la lógica de negocio y las respuestas API, lo que permite mejor mantenimiento y escalabilidad.

Las operaciones CRUD están aplicadas a todas las entidades, y se utiliza autenticación por roles. En el frontend se usa JavaScript modular y SweetAlert2 para mejorar la experiencia de usuario.

Buenas prácticas implementadas:

- Validación de datos en cliente y servidor  
- Principios SOLID en el backend  
- Separación de responsabilidades  
- Manejo de errores centralizado  
- Diseño escalable  

---

## 5. Descripción del Ambiente de Desarrollo y Técnico

- *Lenguajes:* JavaScript, Python, SQL  
- *Framework:* FastAPI: pip install fastapi
- *Librerías:*  
  - mysql-connector-python  
  - python-dotenv  
  - pydantic  
- *Base de datos:* MySQL en Amazon RDS (Relational Database Service)  

---

## 6. Cómo se Compila y Ejecuta

1. *Iniciar el servidor FastAPI*  

        ´uvicorn server.main:app --reload´

Esto levantará el backend utilizando Uvicorn, apuntando al archivo principal main.py dentro del módulo server.

2. *Crear la base de datos*

Ejecuta el archivo crear_db.py, el cual se encarga de generar la estructura inicial de la base de datos en la instancia configurada


3. *Cargar los procedimientos almacenados*
Una vez creada la base de datos, corre el archivo procedure.py. Este archivo contiene los procedimientos almacenados que serán utilizados por la aplicación:

python procedure.py

4. *Visualizar el frontend*
Para ejecutar la interfaz gráfica (index_prueba.html), puedes abrir el archivo en el navegador mediante alguna de estas opciones:

- Usando una extensión como Live Server en VS Code.
- Desplegando el archivo en un entorno de hosting estático o integrándolo a un servidor web.

## 7. Detalles del Desarrollo - Workflow
Una vez desplegado y ejecutado el sistema, los usuarios deben autenticarse a través de las opciones de Login o Sign Up, según corresponda. Tras ingresar a la plataforma, cada usuario podrá acceder a funcionalidades específicas basadas en su rol (administrador, profesor o estudiante).

1. *Interacción desde el frontend (JavaScript)*
Cuando el usuario activa alguna acción desde la interfaz —como hacer clic en un botón—, se ejecuta un bloque de código JavaScript que realiza una petición HTTP a la API. Esta acción generalmente se define de la siguiente forma:

    ´
    const btn = document.getElementById("btn");
    if (btn) {
    document.getElementById("btn").addEventListener("click", async () => {
        try {
            const response = await fetch("http://127.0.0.1:8000/action");
            const data = await response.json();
            if (data.data) {
                // lógica para mostrar o procesar el resultado
            } else if (data.error) {
                alert("Error: " + data.error);
            }
        } catch (error) {
            alert("Error de red o de conexión con el servidor.");
        }
    });
}
´

Este fragmento puede enviar datos al servidor por POST (por ejemplo, desde formularios) o realizar una consulta con GET, según sea el caso. Los datos se capturan desde inputs HTML y se convierten en un objeto JSON para ser enviados en el cuerpo de la solicitud.

2. *Comunicación con la API (FastAPI)*
En el backend, FastAPI expone un endpoint que escucha la solicitud. Si se trata de una petición POST, se define una ruta como esta:

    ´ @app.post("/action")
    def function(request: BaseModel):
    resultado = db_utils.function_db(request.propiedad, ...)
    print(resultado)
    return resultado´

Aquí, FastAPI:

- Recibe el JSON enviado desde el frontend, lo convierte automáticamente en un objeto Python (BaseModel).

- Llama a una función que procesa esos datos y consulta la base de datos.
Retorna una respuesta en formato JSON, ya sea con los datos solicitados o con un mensaje de error.

3. *Acceso a la base de datos (db_utils)*
La función llamada desde la API (function_db) se encarga de interactuar directamente con la base de datos. Su estructura general es la siguiente:


    ´def function_db(parametro):
    conn = None
    cursor = None
    try:
        print("Conectando a la base de datos...")
        conn = get_connection()
        cursor = conn.cursor(dictionary=True)
        cursor.execute("SELECT * FROM Usuario WHERE condicion = %s", (parametro,))
        resultado = cursor.fetchone()
        return {"data": resultado} if resultado else {"data": None}
    except mysql.connector.Error as e:
        print("Error al obtener...:", e)
        return {"error": str(e)}
    finally:
        if cursor:
            cursor.close()
        if conn and conn.is_connected():
            conn.close()
        print("Conexión cerrada")´


- Se ejecuta una consulta con parámetros seguros (previniendo inyecciones SQL).

- El resultado se convierte en un diccionario JSON ({"data": ...}), que puede ser fácilmente leído por el frontend.

4. *Retorno y manejo del resultado en el frontend*
El JSON devuelto por la API es procesado por el código JavaScript. Con base en su contenido (data o error), se realizan acciones como:

- Mostrar información al usuario.
- Redirigir a otra vista.
- Actualizar elementos de la interfaz.
- Validar acceso o errores.

## 8. Descripción y Configuración del Proyecto

En este proyecto, se utiliza una instancia de base de datos en AWS (Amazon RDS), cuyas credenciales están almacenadas de forma segura en un archivo .env. Este archivo contiene variables de entorno como el host, usuario, contraseña y nombre de la base de datos.

Cuando se ejecuta el archivo main.py, se carga automáticamente el contenido del .env utilizando la librería python-dotenv. Esta carga inicial permite habilitar el middleware de CORS y establecer la conexión a la base de datos mediante un módulo externo llamado db.utils.

El archivo db.utils contiene una función llamada get_connection, que se encarga de crear una conexión con la base de datos utilizando las credenciales definidas en las variables de entorno. La estructura de dicha función es la siguiente:

    ´def get_connection():
        return mysql.connector.connect(
        host=os.getenv("DB_HOST"),
        user=os.getenv("DB_USER"),
        password=os.getenv("DB_PASSWORD"),
        database=os.getenv("DB_NAME"),
        )´

## 9. como se lanza el servidor.

En este proyecto se inicia el servidor de desarrollo con el siguiente comando: 

    ´uvicorn server.main:app --reload´

Utilizando Uvicorn con recarga automática (--reload), lo que facilita el trabajo durante el desarrollo al aplicar automáticamente los cambios realizados en el código.

Además, este proyecto puede ser desplegado en un entorno remoto, incluyendo plataformas como GitHub con integración a servicios de despliegue continuo (CI/CD) o directamente en servicios como AWS,

## 10. Guía de Uso para el Usuario Final

Después de instalar todas las dependencias necesarias y configurar los parámetros del entorno (incluyendo las credenciales de la instancia AWS RDS), se puede iniciar la API desde la carpeta raíz del proyecto con el siguiente comando:

    ´uvicorn server.main:app --reload´

Una vez el servidor esté corriendo, se debe abrir el archivo index-prueba.html. En nuestro caso se utilizó la extensión Live Server de Visual Studio Code, pero también puede abrirse con cualquier otra herramienta de despliegue local.

Esto cargará la página de inicio de sesión, desde donde el usuario podrá registrarse o autenticarse. Según el rol del usuario, será dirigido automáticamente a una de las siguientes interfaces:

## Interfaces según el rol
### Cliente

- Puede explorar toda la oferta de cursos disponible.

- Puede solicitar inscripción a un curso.

- Una vez su solicitud es aceptada, el cliente se convierte en estudiante, y en futuros inicios de sesión será redirigido a esa interfaz.

### Estudiante

- Puede ver e inscribirse a nuevos cursos.

- Accede a sus cursos inscritos.

- Dentro de cada curso puede:

- Visualizar materiales.

- Ver y entregar tareas.

- Participar en foros.

- Enviar y responder mensajes dentro del foro correspondiente.

### Profesor

- Puede aplicar a cursos disponibles (pendiente de aprobación por un administrador).

- Puede ver los cursos que ya está dictando.

- Dentro de cada curso puede:

- Crear y visualizar materiales.

- Listar estudiantes.

- Crear tareas y visualizar entregas.

- Acceder a foros, crear foros y responder mensajes.

(Nota: El botón de calificar tareas está disponible, pero actualmente no implementado completamente. Puede ser parte de una futura mejora.)

### Administrador

- Visualiza todos los cursos (activos e históricos).

- Puede crear, eliminar y filtrar cursos por categoría, precio y año.

- Gestiona usuarios: puede crearlos, eliminarlos y filtrarlos por rol y género.

- Revisa, acepta o rechaza:

- Solicitudes de inscripción por parte de clientes y estudiantes.

- Solicitudes de dictado de cursos por parte de profesores.

- Tiene acceso a la información completa de cada curso y sus participantes (estudiantes y profesores).

Con esta estructura, cualquier usuario podrá interactuar con la plataforma de acuerdo a su rol, aprovechando sus funcionalidades académicas desde cualquier entorno compatible.

---

## 11. Referencias

- [FastAPI – Documentación oficial](https://fastapi.tiangolo.com/)  
  Framework backend utilizado para construir la API del proyecto.

- [MySQL – Sitio oficial](https://www.mysql.com/)  
  Motor de base de datos relacional utilizado para almacenar la información del sistema.

- [AWS RDS – Amazon Web Services](https://aws.amazon.com/rds/)  
  Servicio utilizado para desplegar la base de datos MySQL en la nube.

- [SweetAlert2 – Documentación oficial](https://sweetalert2.github.io/)  
  Librería JS usada para formularios y alertas interactivas en el frontend.

- [JavaScript – Documentación MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript)  
  Lenguaje de programación utilizado para la lógica en el navegador.

- [HTML – Documentación MDN](https://developer.mozilla.org/en-US/docs/Web/HTML)  
  [CSS – Documentación MDN](https://developer.mozilla.org/en-US/docs/Web/CSS)  
  Tecnologías base para la estructura y el estilo de la interfaz de usuario.

- [Python – Documentación oficial](https://docs.python.org/3/)  
  Lenguaje utilizado para el desarrollo del backend y scripts de base de datos.
