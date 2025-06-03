function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

const btncargar = document.getElementById("btn-cargar");
if (btncargar) {
    document.getElementById("btn-cargar").addEventListener("click", async (e) => {
        e.preventDefault();
        try {
            const response = await fetch("http://localhost:8000/verificar_tablas");
            const data = await response.json();

            const lista = document.getElementById("estado-tablas");
            lista.innerHTML = ""; // Limpiar antes

            for (const tabla in data) {
                const estado = data[tabla];
                const item = document.createElement("li");
                item.textContent = `${tabla}: ${estado}`;
                item.style.color = estado === "Ok" ? "green" : "red";
                lista.appendChild(item);
            }
        } catch (error) {
            console.error("Error al verificar tablas:", error);
        }
    });
}

const btncursos = document.getElementById("btn-cursos");
if (btncursos) {
    document.getElementById("btn-cursos").addEventListener("click", async () => {
        try {
            const response = await fetch("http://127.0.0.1:8000/cursos");
            const data = await response.json();

            const lista = document.getElementById("lista-cursos");
            lista.innerHTML = ""; // limpiar antes de volver a pintar

            if (data.data) {
                data.data.forEach(curso => {
                    const li = document.createElement("li");
                    li.textContent = `${curso.nombre} (${curso.id_curso})`; // ajusta según tus campos
                    lista.appendChild(li);
                });
            } else if (data.error) {
                alert("Error: " + data.error);
            }
        } catch (error) {
            console.error("Error al obtener usuarios:", error);
            alert("Error de red o de conexión con el servidor.");
        }
    });
}

const btnlogin = document.getElementById("btn-login");
if (btnlogin) {
    document.getElementById("btn-login").addEventListener("click", async (e) => {
        e.preventDefault();
        console.log("Intentando logearse...");
        const username = document.getElementById("username").value;
        const password = document.getElementById("password").value;
        console.log("Username:", username);
        console.log("Password:", password);
        if (!username || !password) {
            alert("Por favor, completa ambos campos.");
            return;
        }
        const lista = document.getElementById("estado-tablas");
        const datos = {
            username: username,
            password: password,
        };


        try {
            const response = await fetch("http://127.0.0.1:8000/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(datos)
            });

            const data = await response.json();
            console.log("Respuesta del servidor:", data);
            if (data.usuario) {
                console.log("Login exitoso:", data.usuario);
                lista.innerHTML = ""; // Limpiar antes de mostrar el estado
                const li = document.createElement("li");
                li.textContent = `Bienvenido, ${data.usuario}!`;
                li.style.color = "green";
                lista.appendChild(li);

                id_nodo = data.id_nodo
                localStorage.setItem("id_nodo", id_nodo);
                if (data.rol == "Administrador") {
                    window.location.href = "courses_admin.html";
                }
                else if (data.rol == "Estudiante") {
                    window.location.href = "courses_student.html";
                }
                else if (data.rol == "Profesor") {
                    window.location.href = "courses_teacher.html";
                } else if (data.rol == "Cliente") {
                    window.location.href = "banner-courses-client.html";
                }
            } else {
                alert("Error: " + data);
            }
        } catch (error) {
            console.error("Error al logearse:", error);
            alert("Error de red o de conexión con el servidor.");
        }
    });
}




const btninsertuser = document.getElementById("btn-insert_user");
if (btninsertuser) {
    document.getElementById("btn-insert_user").addEventListener("click", async (e) => {
        e.preventDefault();
        console.log("Intentando Insertar Usuario...");
        const documento_Identidad = document.getElementById("document").value;
        const nombre_completo = document.getElementById("name").value;
        const email = document.getElementById("email").value;
        const genero = document.getElementById("gender").value;
        const referencia_bancaria = document.getElementById("bank").value;
        const contrasena = document.getElementById("password").value;
        const rol = "Cliente"


        console.log(documento_Identidad, nombre_completo, email, genero, referencia_bancaria, contrasena, rol)
        if (!documento_Identidad || !nombre_completo || !email || !genero || !referencia_bancaria || !contrasena) {
            alert("Por favor, completa ambos campos.");
            return;
        }
        const datos = {
            documento_Identidad: documento_Identidad,
            nombre_completo: nombre_completo,
            email: email,
            genero: genero,
            referencia_bancaria: referencia_bancaria,
            contrasena: contrasena,
            rol: rol,
        };

        try {
            const response = await fetch("http://127.0.0.1:8000/insert_user", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(datos)
            });

            const data = await response.json();
            console.log("Respuesta del servidor:", data);

            if (data.estado) {
                console.log("Insercion exitosa:", data.usuario);
            } else {
                alert("Error: " + data);
            }
        } catch (error) {
            console.error("Error al logearse:", error);
            alert("Error de red o de conexión con el servidor.");
        }
    });
}

const btninsertuser2 = document.getElementById("crearUsuario");
if (btninsertuser2) {
    document.getElementById("crearUsuario").addEventListener("click", async () => {
        const { value: formValues } = await Swal.fire({
            title: 'Crear nuevo usuario',
            html: `
        <input id="swal-nombre" class="swal2-input" placeholder="Nombre completo">
        <input id="swal-email" type="email" class="swal2-input" placeholder="Email">
        <input id="swal-documento" type="number" class="swal2-input" placeholder="Documento">
        <input id="swal-referencia" class="swal2-input" placeholder="Referencia bancaria">
        <input id="swal-password" type="password" class="swal2-input" placeholder="Contraseña">
        <select id="swal-rol" class="swal2-input">
            <option disabled selected value="">Seleccione rol</option>
            <option value="Cliente">Cliente</option>
            <option value="Profesor">Profesor</option>
            <option value="Administrador">Administrador</option>
        </select>
        <select id="swal-genero" class="swal2-input">
            <option disabled selected value="">Seleccione género</option>
            <option value="Femenino">Femenino</option>
            <option value="Masculino">Masculino</option>
            <option value="Otro">Otro</option>
        </select>
    `,
            focusConfirm: false,
            showCancelButton: true,
            confirmButtonText: 'Registrar',
            cancelButtonText: 'Cancelar',
            preConfirm: () => {
                const nombre = document.getElementById("swal-nombre").value;
                const email = document.getElementById("swal-email").value;
                const documento = document.getElementById("swal-documento").value;
                const referencia = document.getElementById("swal-referencia").value;
                const password = document.getElementById("swal-password").value;
                const rol = document.getElementById("swal-rol").value;
                const genero = document.getElementById("swal-genero").value;

                if (!nombre || !email || !documento || !referencia || !password || !rol || !genero) {
                    Swal.showValidationMessage("Por favor completa todos los campos.");
                    return;
                }

                return { nombre, email, documento, referencia, password, rol, genero };
            }
        });

        if (formValues) {
            const datos = {
                documento_Identidad: formValues.documento,
                nombre_completo: formValues.nombre,
                email: formValues.email,
                genero: formValues.genero,
                referencia_bancaria: formValues.referencia,
                contrasena: formValues.password,
                rol: formValues.rol
            };

            try {
                const response = await fetch("http://127.0.0.1:8000/insert_user", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify(datos)
                });

                const data = await response.json();
                console.log("Respuesta del servidor:", data);

                if (data.estado) {
                    Swal.fire('¡Usuario creado!', 'El usuario ha sido registrado exitosamente.', 'success');
                } else {
                    Swal.fire('Error', 'No se pudo crear el usuario: ' + (data.mensaje || 'Error desconocido.'), 'error');
                }
            } catch (error) {
                console.error("Error en la creación:", error);
                Swal.fire('Error', 'Problema de red o conexión con el servidor.', 'error');
            }
        }
    });
}

const btninsertCourse = document.getElementById("btn-insert_course");
if (btninsertCourse) {
    document.getElementById("btn-insert_course").addEventListener("click", async (e) => {
        e.preventDefault();
        console.log("Intentando insertar curso...");
        const id_curso = document.getElementById("id_curso").value;
        const nombre = document.getElementById("name_course").value;
        const categoria = document.getElementById("categoria").value;
        const ruta = document.getElementById("ruta").value;
        const fecha_inicio = document.getElementById("fecha_inicio").value;
        const fecha_fin = document.getElementById("fecha_fin").value;
        const ano = document.getElementById("ano").value;
        const semestre = document.getElementById("semestre").value;
        const precio = document.getElementById("precio").value;
        const id_profesor = document.getElementById("id_profesor").value;

        console.log(id_curso, nombre, categoria, ruta, fecha_inicio, fecha_fin, ano, semestre, precio, id_profesor)
        if (!id_curso || !nombre || !categoria || !ruta || !fecha_inicio || !fecha_fin || !ano || !semestre || !precio) {
            alert("Por favor, completa los campos.");
            return;
        }
        const datos = {
            id_curso: id_curso,
            nombre: nombre,
            categoria: categoria,
            ruta: ruta,
            fecha_inicio: fecha_inicio,
            fecha_fin: fecha_fin,
            ano: ano,
            semestre: semestre,
            precio: precio,
            id_profesor: id_profesor
        };

        try {
            const response = await fetch("http://127.0.0.1:8000/insert_course", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(datos)
            });

            const data = await response.json();
            console.log("Respuesta del servidor:", data);

            if (data.estado) {
                console.log("Insercion exitosa:", data.usuario);
            } else {
                alert("Error: " + data);
            }
        } catch (error) {
            console.error("Error al logearse:", error);
            alert("Error de red o de conexión con el servidor.");
        }
    });
}


const cargarCursos = document.getElementById("cargarCursos");
if (cargarCursos) {
    document.addEventListener("DOMContentLoaded", async () => {
        try {
            const response = await fetch("http://localhost:8000/cursos");
            const data = await response.json();
            console.log("Datos de cursos:", data);
            const courseGrid = document.getElementById("course-grid");
            courseGrid.innerHTML = ""; // Limpia los cursos anteriores
            if (data.data && data.data.length > 0) {
                data.data.forEach(curso => {
                    if (curso.id_profesor == null) {
                        const card = document.createElement("div");
                        card.classList.add("course-card");

                        card.innerHTML = `
                            <div class="card-img">
                                <img src="https://picsum.photos/id/1011/400/200" alt="Imagen del curso ${curso.nombre}">
                            </div>
                            <div class="card-body">
                                <h3>${curso.nombre}</h3>
                                <p><strong>ID:</strong> ${curso.id_curso}</p>
                                <p><strong>Categoría:</strong> ${curso.categoria}</p>
                                <p><strong>Inicio:</strong> ${curso.fecha_inicio}</p>
                                <p><strong>Fin:</strong> ${curso.fecha_fin}</p>
                                <p><strong>Precio:</strong> $${curso.precio}</p>
                                <p><strong>Profesor:</strong> ${curso.id_profesor}</p>
                                <button class="btn-solicitar" id="${curso.id_curso}">Solicitar</button>
                            </div>
                        `;

                        courseGrid.appendChild(card);
                    }
                });
                document.querySelectorAll(".btn-solicitar").forEach(button => {
                    button.addEventListener("click", async (e) => {
                        e.preventDefault();
                        const id_curso = button.id; // Aquí obtienes el ID del curso
                        console.log("Curso solicitado:", id_curso);
                        // Aquí puedes hacer un POST, redireccionar, mostrar un modal, etc.
                        alert(`Has solicitado el curso con ID: ${id_curso}`);
                        console.log("Intentando solicitar curso...");
                        const id_profesor = localStorage.getItem("id_nodo");
                        const datos = {
                            id_curso: id_curso,
                            id_profesor: id_profesor
                        };
                        const response = await fetch("http://localhost:8000/insert_solicitud", {
                            method: "POST",
                            headers: {
                                "Content-Type": "application/json"
                            },
                            body: JSON.stringify(datos)
                        });
                        const data = await response.json();
                        console.log("Respuesta del servidor:", data);
                    });
                });
            } else {
                courseGrid.innerHTML = "<p>No hay cursos disponibles.</p>";
            }

        } catch (error) {
            console.error("Error al verificar tablas:", error);
        }
    });
}

//banner-courses-student
const bannerCoursesStudent = document.getElementById("banner-courses-student");
if (bannerCoursesStudent) {
    document.addEventListener("DOMContentLoaded", async () => {
        try {
            const response = await fetch("http://localhost:8000/cursos");
            const data = await response.json();
            console.log("Datos de cursos:", data);
            const courseGrid = document.getElementById("course-grid");
            courseGrid.innerHTML = ""; // Limpia los cursos anteriores
            if (data.data && data.data.length > 0) {
                data.data.forEach(curso => {

                    const card = document.createElement("div");
                    card.classList.add("course-card");

                    card.innerHTML = `
                            <div class="card-img">
                                <img src="https://picsum.photos/id/1011/400/200" alt="Imagen del curso ${curso.nombre}">
                            </div>
                            <div class="card-body">
                                <h3>${curso.nombre}</h3>
                                <p><strong>ID:</strong> ${curso.id_curso}</p>
                                <p><strong>Categoría:</strong> ${curso.categoria}</p>
                                <p><strong>Inicio:</strong> ${curso.fecha_inicio}</p>
                                <p><strong>Fin:</strong> ${curso.fecha_fin}</p>
                                <p><strong>Precio:</strong> $${curso.precio}</p>
                                <p><strong>Profesor:</strong> ${curso.id_profesor}</p>
                                <button class="btn-inscripcion" id="${curso.id_curso}">Inscribirse</button>
                            </div>
                        `;

                    courseGrid.appendChild(card);

                });
                document.querySelectorAll(".btn-inscripcion").forEach(button => {
                    button.addEventListener("click", async (e) => {
                        e.preventDefault();
                        const id_curso = button.id; // Aquí obtienes el ID del curso
                        console.log("Curso solicitado:", id_curso);
                        // Aquí puedes hacer un POST, redireccionar, mostrar un modal, etc.
                        alert(`Has solicitado el curso con ID: ${id_curso}`);
                        console.log("Intentando solicitar curso...");
                        const id_estudiante = localStorage.getItem("id_nodo");
                        const datos = {
                            id_curso: id_curso,
                            id_nodo: id_estudiante
                        };
                        const response = await fetch("http://localhost:8000/insert_inscripcion", {
                            method: "POST",
                            headers: {
                                "Content-Type": "application/json"
                            },
                            body: JSON.stringify(datos)
                        });
                        const data = await response.json();
                        console.log("Respuesta del servidor:", data);
                    });
                });
            } else {
                courseGrid.innerHTML = "<p>No hay cursos disponibles.</p>";
            }

        } catch (error) {
            console.error("Error al verificar tablas:", error);
        }
    });
}

const products_administrator_teachers = document.getElementById("products_administrator_teachers");
if (products_administrator_teachers) {
    document.addEventListener("DOMContentLoaded", async () => {
        console.log("Intentando cargar solicitudes de profesores...");
        try {
            const response = await fetch("http://localhost:8000/soliciudes_teachers");
            const data = await response.json();
            console.log("Datos de profesores:", data);
            const tbody = document.getElementById("tabla-body");
            data.data.forEach(solicitud => {
                const tr = document.createElement("tr");

                let estadoTexto = solicitud.estado || 'pendiente';
                let claseEstado = "";

                switch (estadoTexto.toLowerCase()) {
                    case 'aprobado':
                        claseEstado = "estado-aprobado";
                        break;
                    case 'rechazado':
                        claseEstado = "estado-rechazado";
                        break;
                    default:
                        claseEstado = "estado-pendiente";
                }
                console.log("Id curso:", solicitud.id_curso, " Id nodo:", solicitud.id_nodo);

                // Define el botón solo si el estado es "pendiente"
                let boton = "";
                if (solicitud.estado == "pendiente" || solicitud.estado == "") {
                    boton = `<button onclick="mostrarAlerta('${solicitud.id_curso}', ${solicitud.id_nodo})">Ver</button>`;
                }
                // } else {
                //     boton =`<button>Ocultar</button>`;
                // }

                tr.innerHTML = `
                    <td>${solicitud.nombre}<br>
                        ${solicitud.id_curso}
                    </td>
                    <td>${solicitud.nombre_completo}<br>
                        ${solicitud.area_principal_conocimiento}<br>
                        ${solicitud.area_alternativa_conocimiento}<br>
                        ${solicitud.email}
                    </td>
                    <td><span class="${claseEstado}">${estadoTexto}</span><br>
                        ${boton}
                    </td>
                `;
                tbody.appendChild(tr);
            });

        } catch (error) {
            console.error("Error al verificar tablas:", error);
        }
    }
    );
}

async function aceptarSolicitud(id_curso, id_nodo) {
    try {
        console.log("Intentando aceptar solicitud...");
        const datos = {
            id_curso: id_curso,
            id_nodo: id_nodo
        };
        console.log("Datos a enviar:", datos);
        const response = await fetch("http://localhost:8000/accept_teachers", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(datos)
        });
        console.log("Respuesta del servidor:", response);
        console.log("Solicitud aceptada:", response);
        Swal.fire("Solicitud aceptada", "", "success");
        window.location.reload();
    } catch (error) {
        console.error("Error al aceptar la solicitud:", error);
        Swal.fire("Error de red o de conexión con el servidor.", "", "error");
    }
};

async function rechazarSolicitud(id_curso, id_nodo) {
    try {
        console.log("Intentando aceptar solicitud...");
        const datos = {
            id_curso: id_curso,
            id_nodo: id_nodo
        };
        console.log("Datos a enviar:", datos);
        const response = await fetch("http://localhost:8000/reject_teachers", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(datos)
        });
        console.log("Respuesta del servidor:", response);
        console.log("Solicitud rechazada:", response);
        Swal.fire("Solicitud rechazada", "", "success");
        window.location.reload();
    } catch (error) {
        console.error("Error al rechazar la solicitud:", error);
        Swal.fire("Error de red o de conexión con el servidor.", "", "error");
    }
};

function mostrarAlerta(id_curso, id_nodo) {
    console.log("ID del curso:", id_curso);
    console.log("ID del nodo:", id_nodo);
    Swal.fire({
        title: "¿Qué desea hacer con la petición?",
        text: `Si aceptas esta petición, el resto de peticiones para el mismo curso se rechazarán. No podrá deshacer esta acción.`,
        icon: "warning",
        showCloseButton: true,
        showConfirmButton: true,
        showDenyButton: true,
        showCancelButton: true,
        confirmButtonText: "Aceptar",
        denyButtonText: "Rechazar"
    }).then((result) => {
        /* Read more about isConfirmed, isDenied below */
        if (result.isConfirmed) {
            aceptarSolicitud(id_curso, id_nodo);
        } else if (result.isDenied) {
            rechazarSolicitud(id_curso, id_nodo)
        }
    });
}

const products_administrator_students = document.getElementById("products_administrator_students");
if (products_administrator_students) {
    document.addEventListener("DOMContentLoaded", async () => {
        console.log("Intentando cargar solicitudes de estudiantes...");
        try {
            const response = await fetch("http://localhost:8000/inscripciones_students");
            const data = await response.json();
            console.log("Datos de estudiantes:", data);
            const tbody = document.getElementById("tabla-body-students");
            data.data.forEach(solicitud => {
                const tr = document.createElement("tr");

                let estadoTexto = solicitud.estado || 'pendiente';
                let claseEstado = "";

                switch (estadoTexto.toLowerCase()) {
                    case 'pagado':
                        claseEstado = "estado-aprobado";
                        break;
                    case 'cancelado':
                        claseEstado = "estado-rechazado";
                        break;
                    default:
                        claseEstado = "estado-pendiente";
                }
                console.log("Id curso:", solicitud.id_curso, " Id nodo:", solicitud.id_nodo);

                // Define el botón solo si el estado es "pendiente"
                let boton = "";
                if (solicitud.estado == "pendiente" || solicitud.estado == "") {
                    boton = `<button onclick="mostrarAlertaStudent('${solicitud.id_curso}', ${solicitud.id_nodo})">Ver</button>`;
                }
                // } else {
                //     boton =`<button>Ocultar</button>`;
                // }

                tr.innerHTML = `
                    <td>${solicitud.nombre}<br>
                        ${solicitud.id_curso}
                    </td>
                    <td>${solicitud.nombre_completo}<br>
                        ${solicitud.email}
                    </td>
                    <td><span class="${claseEstado}">${estadoTexto}</span><br>
                        ${boton}
                    </td>
                `;
                tbody.appendChild(tr);
            });

        } catch (error) {
            console.error("Error al verificar tablas:", error);
        }
    }
    );
}

function mostrarAlertaStudent(id_curso, id_nodo) {
    console.log("ID del curso:", id_curso);
    console.log("ID del nodo:", id_nodo);
    Swal.fire({
        title: "¿Qué desea hacer con la petición?",
        text: `No podrá deshacer esta acción.`,
        icon: "warning",
        showCloseButton: true,
        showConfirmButton: true,
        showDenyButton: true,
        showCancelButton: true,
        confirmButtonText: "Aceptar",
        denyButtonText: "Rechazar"
    }).then((result) => {
        /* Read more about isConfirmed, isDenied below */
        if (result.isConfirmed) {
            aceptarSolicitudStudent(id_curso, id_nodo);
        } else if (result.isDenied) {
            rechazarSolicitudStudent(id_curso, id_nodo)
        }
    });
}
async function aceptarSolicitudStudent(id_curso, id_nodo) {
    try {
        console.log("Intentando aceptar solicitud...");
        const datos = {
            id_curso: id_curso,
            id_nodo: id_nodo
        };
        console.log("Datos a enviar:", datos);
        const response = await fetch("http://localhost:8000/accept_students", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(datos)
        });
        console.log("Respuesta del servidor:", response);
        Swal.fire("Solicitud aceptada", "", "success");
        window.location.reload();
    } catch (error) {
        console.error("Error al aceptar la solicitud:", error);
        Swal.fire("Error de red o de conexión con el servidor.", "", "error");
    }
}
async function rechazarSolicitudStudent(id_curso, id_nodo) {
    try {
        console.log("Intentando aceptar solicitud...");
        const datos = {
            id_curso: id_curso,
            id_nodo: id_nodo
        };
        console.log("Datos a enviar:", datos);
        const response = await fetch("http://localhost:8000/reject_students", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(datos)
        });
        console.log("Respuesta del servidor:", response);
        console.log("Solicitud rechazada:", response);
        Swal.fire("Solicitud rechazada", "", "success");
        window.location.reload();
    } catch (error) {
        console.error("Error al rechazar la solicitud:", error);
        Swal.fire("Error de red o de conexión con el servidor.", "", "error");
    }
}

const btnfilter = document.getElementById("btn-filter");
console.log(btnfilter)
if (btnfilter) {
    document.addEventListener("DOMContentLoaded", async () => {
        try {
            const response = await fetch("http://localhost:8000/cursosCompleto");
            const data = await response.json();
            console.log("Respuesta del servidor:", data.data);
            const tbody = document.getElementById("tbodyCursos");
            tbody.innerHTML = ""; // Limpiar antes de volver a pintar
            if (data.data && data.data.length > 0) {
                data.data.forEach(curso => {
                    const tr = document.createElement("tr");
                    if (curso.id_profesor == null) {
                        curso.id_profesor = "No asignado";
                    }
                    tr.innerHTML = `
                            <td>${curso.id_curso}</td>
                            <td>${curso.nombre}</td>
                            <td>${curso.categoria}</td>
                            <td>${curso.fecha_inicio}</td>
                            <td>${curso.fecha_fin}</td>
                            <td>${curso.precio}</td>
                            <td>${curso.id_profesor}</td>
                            <td><button onclick='eliminarCursoAlert("${curso.id_curso}")'>Eliminar</button></td>
                        `;

                    tbody.appendChild(tr);

                });
            }
        } catch (error) {
            console.error("Error al logearse:", error);
            alert("Error de red o de conexión con el servidor.");
        }
    });

    document.getElementById("btn-filter").addEventListener("click", async (e) => {
        e.preventDefault();

        console.log("Intentando Filtrar...");
        const categoria = document.getElementById("categoria").value;
        const precio = document.getElementById("precio").value;
        let precioMin = null;
        let precioMax = null;

        if (precio && precio.includes("-")) {
            const [min, max] = precio.split("-").map(Number);
            precioMin = min;
            precioMax = max;
        }

        const ano = document.getElementById("ano").value;
        query = "SELECT * FROM Curso WHERE"
        console.log(categoria, precio, ano)

        if (categoria == "null" && precio == "null" && ano == "null") {
            query = "SELECT * FROM Curso"
        }
        else {
            if (categoria != "null") {
                if (query !== "SELECT * FROM Curso WHERE") {
                    query += " AND";
                }
                query += ` categoria = '${categoria}'`;
            }
            if (precio != "null") {
                if (query !== "SELECT * FROM Curso WHERE") {
                    query += " AND";
                }
                query += ` precio BETWEEN ${parseInt(precioMin)} AND ${parseInt(precioMax)}`;

            }
            if (ano != "null") {
                if (query !== "SELECT * FROM Curso WHERE") {
                    query += " AND";
                }
                query += ` ano = '${parseInt(ano)}'`;
            }
        }
        console.log("Query:", query);
        const datos = {
            query: query,
        };

        console.log("Datos a enviar:", datos);
        try {
            const response = await fetch("http://127.0.0.1:8000/filter", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(datos)
            });

            const data = await response.json();
            console.log("Respuesta del servidor:", data);
            const tbody = document.getElementById("tbodyCursos");
            tbody.innerHTML = ""; // Limpiar antes de volver a pintar
            if (data.data && data.data.length > 0) {
                data.data.forEach(curso => {
                    const tr = document.createElement("tr");
                    if (curso.id_profesor == null) {
                        curso.id_profesor = "No asignado";
                    }
                    tr.innerHTML = `
                            <td>${curso.id_curso}</td>
                            <td>${curso.nombre}</td>
                            <td>${curso.categoria}</td>
                            <td>${curso.fecha_inicio}</td>
                            <td>${curso.fecha_fin}</td>
                            <td>${curso.precio}</td>
                            <td>${curso.id_profesor}</td>
                            <td><button onclick='eliminarCursoAlert("${curso.id_curso}")'>Eliminar</button></td>
                        `;

                    tbody.appendChild(tr);

                });
            }
        }
        catch (error) {
            console.error("Error al logearse:", error);
            alert("Error de red o de conexión con el servidor.");
        }
    });
}

function eliminarCursoAlert(id) {
    Swal.fire({
        title: '¿Estás seguro?',
        text: 'Esta acción eliminará el curso de forma permanente.',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Sí, eliminar',
        cancelButtonText: 'Cancelar'
    }).then((result) => {
        if (result.isConfirmed) {
            eliminarCurso(id);
        }
    });
}

async function eliminarCurso(id) {
    try {
        const datos = {
            id_curso: id
        };
        const response = await fetch("http://127.0.0.1:8000/eliminarCurso", {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(datos)
        });
        console.log("Curso eliminado:", response);
    } catch (error) {
        console.error("Error al eliminar el curso:", error);
        Swal.fire("Error de red o de conexión con el servidor.", "", "error");
    }
    Swal.fire("Curso eliminado", "", "success");
    sleep(3000).then(() => {
        window.location.reload();
    });
}

const btnfilteruser = document.getElementById("btn-filter-user");
console.log(btnfilteruser)
if (btnfilteruser) {
    document.addEventListener("DOMContentLoaded", async () => {
        try {
            const response = await fetch("http://127.0.0.1:8000/usuarios");
            const data = await response.json();
            console.log("Respuesta del servidor:", data.data);
            const tbody = document.getElementById("tbodyUsuarios");
            if (data.data && data.data.length > 0) {
                data.data.forEach(usuario => {
                    const tr = document.createElement("tr");

                    tr.innerHTML = `
                            <td>${usuario.id_nodo}</td>
                            <td>${usuario.nombre_completo}</td>
                            <td>${usuario.documento_Identidad}</td>
                            <td>${usuario.email}</td>
                            <td>${usuario.genero}</td>
                            <td>${usuario.referencia_bancaria}</td>
                            <td>${usuario.rol}</td>
                            <td><button onclick="eliminarUsuario(${usuario.id_nodo})">Eliminar</button></td>
                        `;

                    tbody.appendChild(tr);

                });
            }


        } catch (error) {
            console.error("Error al logearse:", error);
            alert("Error de red o de conexión con el servidor.");
        }
    });

    document.getElementById("btn-filter-user").addEventListener("click", async (e) => {
        e.preventDefault();

        console.log("Intentando Filtrar...");
        const rol = document.getElementById("rol").value;
        const genero = document.getElementById("genero").value;

        query = "SELECT * FROM Usuario WHERE"
        console.log(rol, genero)

        if (rol == "null" && genero == "null") {
            query = "SELECT * FROM Usuario"
        }
        else {
            if (genero != "null") {
                if (query !== "SELECT * FROM Usuario WHERE") {
                    query += " AND";
                }
                query += ` genero = '${genero}'`;
            }
            if (rol != "null") {
                if (query !== "SELECT * FROM Usuario WHERE") {
                    query += " AND";
                }
                query += ` rol = '${rol}'`;
            }

        }
        console.log("Query:", query);
        const datos = {
            query: query,
        };

        console.log("Datos a enviar:", datos);
        try {
            const response = await fetch("http://127.0.0.1:8000/filterUser", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(datos)
            });

            const data = await response.json();
            console.log("Respuesta del servidor:", data);
            const tbody = document.getElementById("tbodyUsuarios");
            tbody.innerHTML = ""; // Limpiar antes de volver a pintar
            if (data.data && data.data.length > 0) {
                data.data.forEach(usuario => {
                    const tr = document.createElement("tr");
                    tr.innerHTML = `
                            <td>${usuario.id_nodo}</td>
                            <td>${usuario.nombre_completo}</td>
                            <td>${usuario.documento_Identidad}</td>
                            <td>${usuario.email}</td>
                            <td>${usuario.genero}</td>
                            <td>${usuario.referencia_bancaria}</td>
                            <td>${usuario.rol}</td>
                            <td><button onclick="eliminarUsuarioAlert(${usuario.id_nodo})">Eliminar</button></td>
                        `;

                    tbody.appendChild(tr);

                });
            }


        } catch (error) {
            console.error("Error al logearse:", error);
            alert("Error de red o de conexión con el servidor.");
        }
    });
}

function eliminarUsuarioAlert(id_nodo) {
    console.log("Intentando eliminar usuario con ID:", id_nodo);
    Swal.fire({
        title: "¿Estás seguro?",
        text: "No podrás deshacer esta acción.",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Sí, eliminar",
        cancelButtonText: "Cancelar"
    }).then((result) => {
        if (result.isConfirmed) {
            eliminarUsuario(id_nodo);
            Swal.fire("Usuario eliminado", "", "success");
        }
    });
}

async function eliminarUsuario(id_nodo) {

    datos = {
        id_nodo: id_nodo
    };
    result = await fetch("http://127.0.0.1:8000/eliminarUsuario", {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(datos)
    })
    const data = await result.json();
    console.log(data);
    Swal.fire("Usuario eliminado", "", "success");
    sleep(3000).then(() => {
        window.location.reload();
    });
}

const cargarCursosProfesor = document.getElementById("cargarCursosProfesor");
if (cargarCursosProfesor) {
    document.addEventListener("DOMContentLoaded", async () => {
        try {
            const id_nodo = localStorage.getItem("id_nodo");
            const datos = {
                id_nodo: id_nodo,
            };
            const response = await fetch("http://127.0.0.1:8000/cargarCursosProfesor", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(datos)
            });
            const data = await response.json();
            console.log("Respuesta del servidor:", data);
            const container = document.getElementById("course-container");
            data.data.forEach(course => {
                const card = document.createElement("div");
                card.className = "course-card";
                card.innerHTML = `
                    <img src="https://picsum.photos/300/150?random=1" alt="Curso">
                    <div class="course-content">
                    <h3>${course.nombre}</h3>
                    <div class="course-meta">
                        <span>Categoría: ${course.categoria}</span>
                        <span>Inicio: ${course.fecha_inicio}</span>
                        <span>Fin: ${course.fecha_fin}</span>
                        <button class="btn-inscripcion" onclick="cambiarPaginaCursosProfesor('${course.id_curso}')">Entrar</button>
                    </div>
                    </div>
                `;
                container.appendChild(card);
            });
        } catch (error) {
            console.error("Error al verificar tablas:", error);
        }
    });
}

function cambiarPaginaCursosProfesor(id_curso) {
    localStorage.setItem("id_curso", id_curso);
    window.location.href = "http://127.0.0.1:5500/frontend/html/courses/materials.html"
}


const cargarEstudiantesProfesor = document.getElementById("listaEstudiantesProfesor");
if (cargarEstudiantesProfesor) {
    document.addEventListener("DOMContentLoaded", async () => {
        try {
            const id_curso = localStorage.getItem("id_curso");
            console.log("ID del curso:", id_curso);
            const datos = {
                curso: id_curso,
            };
            try {
                const response = await fetch("http://127.0.0.1:8000/listEstudianteProfesor", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify(datos)
                });
                const data = await response.json();
                console.log("Respuesta del servidor:", data);
                const tabla = document.getElementById("tabla-body");
                tabla.innerHTML = ""; // Limpia los cursos anteriores
                var estudiantesEmail = [];
                if (data.data && data.data.length > 0) {
                    data.data.forEach(estudiante => {
                        if (!estudiantesEmail.includes(estudiante.email)) {
                            const tr = document.createElement("tr");
                            tr.innerHTML = `
                            <td>${estudiante.nombre_completo}</td>
                            <td>${estudiante.email}</td>
                            `;
                            tabla.appendChild(tr);
                            estudiantesEmail.push(estudiante.email); // Agrega el email a la lista para evitar duplicados
                        }
                    });
                } else {
                    tabla.innerHTML = "<p>No hay estudiantes inscritos en tus cursos.</p>";
                }
            } catch (error) {
                console.error("Error al logearse:", error);
                alert("Error de red o de conexión con el servidor.");
            }

        } catch (error) {
            console.error("Error al verificar tablas:", error);
        }
    });
}

//cargarCursosEstudiante
cargarCursosEstudiante = document.getElementById("cargarCursosEstudiante");
if (cargarCursosEstudiante) {
    document.addEventListener("DOMContentLoaded", async () => {
        try {
            const id_nodo = localStorage.getItem("id_nodo");
            const datos = {
                id_nodo: id_nodo,
            };
            const response = await fetch("http://127.0.0.1:8000/cargarCursosEstudiante", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(datos)
            });
            const data = await response.json();
            console.log("Respuesta del servidor:", data);
            const container = document.getElementById("course-container");
            data.data.forEach(course => {
                const card = document.createElement("div");
                card.className = "course-card";
                card.innerHTML = `
                    <img src="https://picsum.photos/300/150?random=1" alt="Curso">
                    <div class="course-content">
                    <h3>${course.nombre}</h3>
                    <div class="course-meta">
                        <span>Categoría: ${course.categoria}</span>
                        <span>Inicio: ${course.fecha_inicio}</span>
                        <span>Fin: ${course.fecha_fin}</span>
                        <button class="btn-inscripcion" onclick="cambiarPaginaCursosEstudiante('${course.id_curso}')">Entrar</button>
                    </div>
                    </div>
                `;
                container.appendChild(card);
            });
        }
        catch (error) {
            console.error("Error al cargar cursos del estudiante:", error);
            alert("Error de red o de conexión con el servidor.");
        }
    });
}

//cambiarPaginaCursosEstudiante
function cambiarPaginaCursosEstudiante(id_curso) {
    localStorage.setItem("id_curso", id_curso);
    window.location.href = "http://127.0.0.1:5500/frontend/html/courses/materials_e.html";
}
//listaMaterialesEstudiantes
const listaMaterialesEstudiantes = document.getElementById("listaMaterialesEstudiantes");
if (listaMaterialesEstudiantes) {
    document.addEventListener("DOMContentLoaded", async () => {
        try {
            const id_curso = localStorage.getItem("id_curso");
            console.log("ID del curso:", id_curso);
            const datos = {
                curso: id_curso,
            };
            const response = await fetch("http://127.0.0.1:8000/listaMaterialesEstudiantes", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(datos)
            });
            const data = await response.json();
            console.log("Respuesta del servidor:", data);
            const tbody = document.getElementById("tabla-body");
            tbody.innerHTML = ""; // Limpiar antes de volver a pintar
            if (data.data && data.data.length > 0) {
                data.data.forEach(material => {
                    const tr = document.createElement("tr");
                    tr.innerHTML = `
                            <td>${material.titulo}</td>
                            <td>${material.descripcion}</td>
                            <td>${material.ruta_titulo}</td>
                        `;
                    tbody.appendChild(tr);
                });
            }
        } catch (error) {
            console.error("Error al logearse:", error);
            alert("Error de red o de conexión con el servidor.");
        }
    });
}

//listaTareasEstudiantes

const cargarMateriales = document.getElementById("listaMateriales");
if (cargarMateriales) {
    document.addEventListener("DOMContentLoaded", async () => {
        try {
            const id_curso = localStorage.getItem("id_curso");
            console.log("ID del curso:", id_curso);
            const datos = {
                curso: id_curso,
            };
            const response = await fetch("http://127.0.0.1:8000/listaMateriales", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(datos)
            });
            const data = await response.json();
            console.log("Respuesta del servidor:", data);
            const tbody = document.getElementById("tabla-body");
            tbody.innerHTML = ""; // Limpiar antes de volver a pintar
            if (data.data && data.data.length > 0) {
                data.data.forEach(material => {
                    const tr = document.createElement("tr");
                    tr.innerHTML = `
                            <td>${material.titulo}</td>
                            <td>${material.descripcion}</td>
                            <td>${material.ruta_titulo}</td>
                        `;
                    tbody.appendChild(tr);
                });
            }

        } catch (error) {
            console.error("Error al verificar tablas:", error);
        }
    });
}

const cargarTareas = document.getElementById("listaTareas");
if (cargarTareas) {
    document.addEventListener("DOMContentLoaded", async () => {
        try {
            const id_curso = localStorage.getItem("id_curso");
            const datos = {
                curso: id_curso,
            };
            console.log("ID del curso:", id_curso);
            const response = await fetch("http://127.0.0.1:8000/listaTareas", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(datos)
            });
            const data = await response.json();
            console.log("Respuesta del servidor:", data);
            const tbody = document.getElementById("tabla-body");
            tbody.innerHTML = ""; // Limpiar antes de volver a pintar
            if (data.data && data.data.length > 0) {
                data.data.forEach(tarea => {
                    const tr = document.createElement("tr");
                    tr.innerHTML = `
                            <td>${tarea.titulo}</td>
                            <td>${tarea.descripcion}</td>
                            <td>${tarea.fecha_maxima}</td>
                            <td><button onclick="entregarTareaAlert(${tarea.id_tarea})">Entrega Tarea</button></td>
                        `;
                    tbody.appendChild(tr);
                });
            }

        } catch (error) {
            console.error("Error al verificar tablas:", error);
        }
    });
}

const cargarTareasProfes = document.getElementById("listaTareasProfes");
if (cargarTareasProfes) {
    document.addEventListener("DOMContentLoaded", async () => {
        try {
            const id_curso = localStorage.getItem("id_curso");
            const datos = {
                curso: id_curso,
            };
            console.log("ID del curso:", id_curso);
            const response = await fetch("http://127.0.0.1:8000/listaTareas", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(datos)
            });
            const data = await response.json();
            console.log("Respuesta del servidor:", data);
            const tbody = document.getElementById("tabla-body");
            tbody.innerHTML = ""; // Limpiar antes de volver a pintar
            if (data.data && data.data.length > 0) {
                data.data.forEach(tarea => {
                    const tr = document.createElement("tr");
                    tr.innerHTML = `
                            <td>${tarea.titulo}</td>
                            <td>${tarea.descripcion}</td>
                            <td>${tarea.fecha_maxima}</td>
                            <td><button onclick="verEntregaTareas('${tarea.id_tarea}')">Revisar Entregas</button></td>
                        `;
                    tbody.appendChild(tr);
                });
            }

        } catch (error) {
            console.error("Error al verificar tablas:", error);
        }
    });
}

async function entregarTareaAlert(id_tarea) {
    const { value: inputTexto } = await Swal.fire({
        title: 'Entrega de Tarea',
        input: 'text',
        inputLabel: 'Ruta del archivo (o comentario)',
        inputPlaceholder: 'Ejemplo: tareas/ejercicio1.pdf',
        showCancelButton: true,
        confirmButtonText: 'Entregar',
        cancelButtonText: 'Cancelar',
        inputValidator: (value) => {
            if (!value) {
                return '¡Por favor escribe algo antes de continuar!';
            }
        }
    });

    if (inputTexto) {
        entregarTarea(id_tarea, inputTexto);
    }
}

function entregarTarea(id_tarea, ruta) {
    // Aquí va tu lógica, por ejemplo una llamada a la API
    console.log(`Entregando tarea ${id_tarea} con ruta: ${ruta}`);
    Swal.fire('¡Entregada!', 'Tu tarea fue registrada.', 'success');
}

async function verEntregaTareas(id_tarea) {
    try {
        const datos = {
            id_tarea: id_tarea
        };

        const response = await fetch("http://127.0.0.1:8000/verEntregaTareas", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(datos)
        });

        const data = await response.json();
        console.log("Respuesta del servidor entrega tareas:", data);
        const tablaBody = document.getElementById("tabla-body-tareas");
        tablaBody.innerHTML = ""; // Limpiar contenido previo
        if (!data.data || data.data.length === 0) {
            document.getElementById("Titulo_tarea").textContent = "No hay tareas entregadas.";
            return;
        }

        document.getElementById("Titulo_tarea").textContent = data.data[0].titulo;

        data.data.forEach(entrega => {
            const fila = document.createElement("tr");

            fila.innerHTML = `
            <td>${entrega.nombre_completo}</td>
            <td>${entrega.ruta_titulo}</td>
            <td>${entrega.puntaje ?? "Sin calificar"}</td>
            <td>
                <button onclick="console.log('${entrega.id_tarea}')">Calificar</button>
            </td>
    `;

            tablaBody.appendChild(fila);
        });

    } catch (error) {
        console.error("Error al ver una entrega", error);
        Swal.fire("Error de red o de conexión con el servidor.", "", "error");
    }

}

const cargarInformacionCurso = document.getElementById("infoCursos");
if (cargarInformacionCurso) {
    document.addEventListener("DOMContentLoaded", async () => {
        try {
            const response = await fetch("http://127.0.0.1:8000/infoCursos");
            const data = await response.json();
            console.log("Respuesta del servidor:", data.data);
            const cursos = agruparPorCurso(data.data);
            renderizarTabla(cursos);
        } catch (error) {
            console.error("Error al obtener usuarios:", error);
            alert("Error de red o de conexión con el servidor.");
        }
    });
}

function agruparPorCurso(data) {
    const cursosAgrupados = {};

    data.forEach(item => {
        const id = item.id_curso;

        if (!cursosAgrupados[id]) {
            cursosAgrupados[id] = {
                id_curso: item.id_curso,
                nombre: item.nombre,
                categoria: item.categoria,
                fecha_inicio: item.fecha_inicio,
                fecha_fin: item.fecha_fin,
                precio: item.precio,
                integrantes: []
            };
        }
        if (!cursosAgrupados[id].integrantes.some(i => i.email === item.email)) {
            cursosAgrupados[id].integrantes.push({
                nombre: item.nombre_completo,
                email: item.email,
                rol: item.rol
            });
        }
    });

    // Convertir a array
    return Object.values(cursosAgrupados);
}

function renderizarTabla(cursos) {
    const tabla = document.getElementById("tabla-cursos");
    tabla.innerHTML = ""; // limpiar

    cursos.forEach(curso => {
        curso.integrantes.forEach((persona, index) => {
            const fila = document.createElement("tr");

            if (index === 0) {
                const celdaCurso = document.createElement("td");
                celdaCurso.rowSpan = curso.integrantes.length;
                celdaCurso.innerHTML = `
            <strong>Id curso: ${curso.id_curso}</strong><br>
            Nombre: ${curso.nombre}<br>
            Categoría: ${curso.categoria}<br>
            Fecha inicio: ${curso.fecha_inicio}<br>
            Fecha fin: ${curso.fecha_fin}<br>
            Precio: $${curso.precio}
        `;
                fila.appendChild(celdaCurso);
            }

            fila.innerHTML += `
        <td>${persona.nombre}</td>
        <td>${persona.email}</td>
        <td>${persona.rol}</td>
        `;

            tabla.appendChild(fila);
        });
    });
}



const btninsertMaterial = document.getElementById("btn-insertMaterial");
if (btninsertMaterial) {
    document.getElementById("btn-insertMaterial").addEventListener("click", async (e) => {
        e.preventDefault();
        console.log("Intentando Insertar Material...");
        const { value: formValues } = await Swal.fire({
            title: 'Nuevo Material',
            html:
                '<input id="swal-input1" class="swal2-input" placeholder="Título">' +
                '<input id="swal-input2" class="swal2-input" placeholder="Descripción">' +
                '<input id="swal-input3" class="swal2-input" placeholder="Ruta del archivo">',
            focusConfirm: false,
            showCancelButton: true,
            confirmButtonText: 'Crear',
            cancelButtonText: 'Cancelar',
            preConfirm: () => {
                const titulo = document.getElementById('swal-input1').value;
                const descripcion = document.getElementById('swal-input2').value;
                const ruta = document.getElementById('swal-input3').value;

                if (!titulo || !descripcion || !ruta) {
                    Swal.showValidationMessage('Todos los campos son obligatorios');
                    return;
                }
                return { titulo, descripcion, ruta };
            }
        });

        if (formValues) {
            crearMaterial(formValues);
        }
    });
}

async function crearMaterial({ titulo, descripcion, ruta }) {
    // Lógica para guardar el material (API, fetch, etc.)
    console.log('Creando material:', titulo, descripcion, ruta);
    const id_curso = localStorage.getItem("id_curso");
    const archivo = ruta;
    const datos = {
        titulo: titulo,
        descripcion: descripcion,
        archivo: archivo,
        id_curso: id_curso
    };

    console.log("Datos a enviar:", datos);

    try {
        const response = await fetch("http://127.0.0.1:8000/insertMaterial", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(datos)
        });

        const data = await response.json();
        console.log("Respuesta del servidor:", data);

        if (data.estado) {
            console.log("Insercion exitosa:", data.usuario);
        } else {
            alert("Error: " + data);
        }
    } catch (error) {
        console.error("Error al logearse:", error);
        alert("Error de red o de conexión con el servidor.");
    }
    Swal.fire('¡Material creado!', 'Se ha registrado exitosamente.', 'success');
}

const btninsertTarea = document.getElementById("btn-insertTarea");

if (btninsertTarea) {
    btninsertTarea.addEventListener("click", async (e) => {
        e.preventDefault();
        const id_curso = localStorage.getItem("id_curso");
        const { value: formValues } = await Swal.fire({
            title: 'Crear Nueva Tarea',
            html:
                '<input id="swal-titulo" class="swal2-input" placeholder="Título">' +
                '<input id="swal-descripcion" class="swal2-input" placeholder="Descripción">' +
                '<input id="swal-fecha" type="date" class="swal2-input" placeholder="Fecha máxima">',
            focusConfirm: false,
            showCancelButton: true,
            confirmButtonText: 'Crear',
            cancelButtonText: 'Cancelar',
            preConfirm: () => {
                const titulo = document.getElementById("swal-titulo").value;
                const descripcion = document.getElementById("swal-descripcion").value;
                const fecha_maxima = document.getElementById("swal-fecha").value;

                if (!titulo || !descripcion || !fecha_maxima) {
                    Swal.showValidationMessage("Por favor, completa todos los campos.");
                    return;
                }

                return { titulo, descripcion, fecha_maxima };
            }
        });

        if (formValues) {
            const datos = {
                titulo: formValues.titulo,
                descripcion: formValues.descripcion,
                fecha_maxima: formValues.fecha_maxima,
                id_curso: id_curso
            };

            try {
                const response = await fetch("http://127.0.0.1:8000/insertTarea", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify(datos)
                });

                const data = await response.json();
                console.log("Respuesta del servidor:", data);

                if (data.estado) {
                    Swal.fire('¡Tarea creada!', 'La tarea se insertó correctamente.', 'success');
                } else {
                    Swal.fire('Error', 'No se pudo crear la tarea: ' + (data.mensaje || 'Error desconocido.'), 'error');
                }
            } catch (error) {
                console.error("Error al crear la tarea:", error);
                Swal.fire('Error', 'Hubo un problema de red o servidor.', 'error');
            }
        }
    });
}

const btnCrearForo = document.getElementById("btn-crearForo");
if (btnCrearForo) {
    btnCrearForo.addEventListener("click", async (e) => {
        e.preventDefault();
        console.log("Intentando crear Foro...");

        const id_curso = localStorage.getItem("id_curso"); // fallback si no hay curso

        const { value: formValues } = await Swal.fire({
            title: 'Crear Foro',
            html:
                '<input id="swal-titulo" class="swal2-input" placeholder="Título del foro">' +
                '<input id="swal-descripcion" class="swal2-input" placeholder="Descripción">' +
                '<input id="swal-fecha" type="date" class="swal2-input" placeholder="Fecha de cierre">',
            showCancelButton: true,
            confirmButtonText: 'Crear',
            cancelButtonText: 'Cancelar',
            preConfirm: () => {
                const titulo = document.getElementById("swal-titulo").value;
                const descripcion = document.getElementById("swal-descripcion").value;
                const fecha_maxima = document.getElementById("swal-fecha").value;

                if (!titulo || !descripcion || !fecha_maxima) {
                    Swal.showValidationMessage("Por favor completa todos los campos.");
                    return;
                }

                return { titulo, descripcion, fecha_maxima };
            }
        });

        if (formValues) {
            const datos = {
                titulo: formValues.titulo,
                descripcion: formValues.descripcion,
                fecha_maxima: formValues.fecha_maxima,
                id_curso: id_curso
            };

            try {
                const response = await fetch("http://127.0.0.1:8000/crearForo", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify(datos)
                });

                const data = await response.json();
                console.log("Respuesta del servidor:", data);

                if (data.estado) {
                    Swal.fire('¡Foro creado!', 'El foro se ha registrado exitosamente.', 'success');
                } else {
                    Swal.fire('Error', 'No se pudo crear el foro: ' + (data.mensaje || 'Error desconocido.'), 'error');
                }
            } catch (error) {
                console.error("Error al crear foro:", error);
                Swal.fire('Error', 'Problema de red o conexión con el servidor.', 'error');
            }
        }
    });
}

const cargarForos = document.getElementById("listaForos");
if (cargarForos) {
    document.addEventListener("DOMContentLoaded", async () => {
        try {
            id_curso = localStorage.getItem("id_curso");
            const datos = {
                curso: id_curso,
            };

            try {
                const response = await fetch("http://127.0.0.1:8000/listaForos", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify(datos)
                });
                const data = await response.json();
                console.log("Respuesta del servidor:", data);
                const container = document.getElementById("course-container");
                container.innerHTML = "";
                if (data.data && data.data.length > 0) {
                    data.data.forEach(foro => {
                        const card = document.createElement("div");
                        card.classList.add("course-card");

                        card.innerHTML = `
                                <img src="https://picsum.photos/300/150?random=1" alt="Curso">
                                <div class="course-content">
                                <h3>${foro.titulo}</h3>
                                <div class="course-meta">
                                    <span>${foro.descripcion}</span>
                                    <span>Hasta: ${foro.fecha_terminacion}</span>
                                    <button class="btn-inscripcion" onclick="cambiarPaginaForosProfesor('${foro.id_foro}')">Entrar</button>
                                </div>
                                </div>
                            `;

                        container.appendChild(card);
                    });
                } else {
                    container.innerHTML = "<p>No hay estudiantes inscritos en tus cursos.</p>";
                }
            } catch (error) {
                console.error("Error al logearse:", error);
                alert("Error de red o de conexión con el servidor.");
            }

        } catch (error) {
            console.error("Error al verificar tablas:", error);
        }
    });
}

function cambiarPaginaForosProfesor(id_foro) {
    localStorage.setItem("id_foro", id_foro);
    window.location.href = "http://127.0.0.1:5500/frontend/html/courses/chat_foro.html"
}

const btnentregarTarea = document.getElementById("btn-entregarTarea");
if (btnentregarTarea) {
    document.getElementById("btn-entregarTarea").addEventListener("click", async (e) => {
        e.preventDefault();
        console.log("Intentando Entregar Tarea...");
        id_tarea = 7
        //const id_curso = localStorage.getItem("matricula_estudiante");
        matricula_estudiante = 1001
        fecha_entrega = new Date().toISOString().slice(0, 10);
        const archivo = document.getElementById("ruta").value;

        console.log(archivo);
        if (!archivo) {
            alert("Por favor, completa los campos.");
            return;
        }
        const datos = {
            id_tarea: id_tarea,
            matricula_estudiante: matricula_estudiante,
            fecha_entrega: fecha_entrega,
            archivo: archivo
        };

        try {
            const response = await fetch("http://127.0.0.1:8000/entregarTarea", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(datos)
            });

            const data = await response.json();
            console.log("Respuesta del servidor:", data);

            if (data.estado) {
                console.log("Insercion exitosa:", data.usuario);
            } else {
                alert("Error: " + data);
            }
        } catch (error) {
            console.error("Error al logearse:", error);
            alert("Error de red o de conexión con el servidor.");
        }
    });
}


const cargarMensajes = document.getElementById("mensajes-foro");

if (cargarMensajes) {
    document.addEventListener("DOMContentLoaded", async () => {
        try {
            const id_foro = localStorage.getItem("id_foro");
            const datos = { id_foro };

            const response = await fetch("http://127.0.0.1:8000/mensajes", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(datos)
            });

            const data = await response.json();
            console.log("Respuesta del servidor:", data);

            const jerarquizados = agruparMensajes(data.data);
            renderMensajesJerarquicos(jerarquizados);

        } catch (error) {
            console.error("Error al cargar mensajes:", error);
            alert("Error de red o de conexión con el servidor.");
        }
    });
}

function agruparMensajes(mensajes) {
    const mapa = {};
    const jerarquía = [];

    mensajes.forEach(m => mapa[m.id_mensaje] = { ...m, replicas: [] });

    mensajes.forEach(m => {
        if (m.id_mensaje_replica) {
            mapa[m.id_mensaje_replica]?.replicas.push(mapa[m.id_mensaje]);
        } else {
            jerarquía.push(mapa[m.id_mensaje]);
        }
    });

    return jerarquía;
}

function renderMensajesJerarquicos(mensajes) {
    const contenedor = document.getElementById("mensajes");
    contenedor.innerHTML = "";

    mensajes.forEach(m => {
        const msgDiv = document.createElement("div");
        msgDiv.classList.add("mensaje");
        msgDiv.innerHTML = `
            <button onclick="responderMensaje(${m.id_mensaje})">
                <img class="icono" src="flecha-hacia-abajo-para-navegar.png" alt="responder">
            </button>
            <strong>${m.nombre_completo}</strong> - <em>${m.titulo}</em>
            <p>${m.descripcion}</p>
            `;
        contenedor.appendChild(msgDiv);

        // Añadir réplicas
        m.replicas.forEach(rep => {
            const repDiv = document.createElement("div");
            repDiv.classList.add("mensaje-replica");
            repDiv.style.marginLeft = "30px";
            repDiv.style.borderLeft = "2px solid #ccc";
            repDiv.style.paddingLeft = "10px";
            repDiv.innerHTML = `
                <strong>${rep.nombre_completo}</strong> - <em>${rep.titulo}</em>
                <p>${rep.descripcion}</p>
            `;
            contenedor.appendChild(repDiv);
        });
    });
}

function volverPaginaAnterior() { window.history.back(); }

localStorage.setItem("id_mensaje_replica", null);

async function responderMensaje(id_mensaje) {
    localStorage.setItem("id_mensaje_replica", id_mensaje);
    console.log("ID del mensaje seleccionado:", id_mensaje);
}

const btnenviar_mensaje = document.getElementById("enviar_mensaje");
if (btnenviar_mensaje) {
    document.getElementById("enviar_mensaje").addEventListener("click", async (e) => {
        e.preventDefault();
        console.log("Intentando Enviando Mensaje...");
        const id_mensaje_raw = localStorage.getItem("id_mensaje_replica");
        const id_mensaje_replica = id_mensaje_raw === "null" ? null : parseInt(id_mensaje_raw);
        console.log("ID del mensaje de replica:", id_mensaje_replica);
        const id_foro = localStorage.getItem("id_foro");
        const id_nodo = localStorage.getItem("id_nodo");
        const titulo = document.getElementById("titulo").value;
        const descripcion = document.getElementById("descripcion").value;

        console.log(id_nodo, id_foro, titulo, descripcion, id_mensaje_replica);
        if (!id_nodo || !id_foro || !titulo || !descripcion) {
            alert("Por favor, completa los campos.");
            return;
        }
        const datos = {
            id_nodo: id_nodo,
            id_foro: id_foro,
            titulo: titulo,
            descripcion: descripcion,
            id_mensaje_replica: id_mensaje_replica
        };

        try {
            const response = await fetch("http://127.0.0.1:8000/enviar_mensaje", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(datos)
            });

            const data = await response.json();
            console.log("Respuesta del servidor:", data);

            if (data.estado) {
                console.log("Insercion exitosa:", data.usuario);
            } else {
                alert("Error: " + data);
            }
        } catch (error) {
            console.error("Error al logearse:", error);
            alert("Error de red o de conexión con el servidor.");
        }
    });
}