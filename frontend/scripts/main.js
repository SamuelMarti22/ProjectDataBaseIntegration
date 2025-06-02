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


            if (data.data && data.data.length > 0) {
                data.data.forEach(curso => {
                    if (curso.id_nodo == null) {
                        const card = document.createElement("div");
                        card.classList.add("course-card");
                    }
                });
            }

        } catch (error) {
            console.error("Error al logearse:", error);
            alert("Error de red o de conexión con el servidor.");
        }
    });
}

const btnfilteruser = document.getElementById("btn-filter-user");
console.log(btnfilteruser)
if (btnfilteruser) {
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

            if (data.data && data.data.length > 0) {
                data.data.forEach(usuario => {
                    if (usuario.id_nodo == null) {
                        const card = document.createElement("div");
                        card.classList.add("course-card");
                    }
                });
            }


        } catch (error) {
            console.error("Error al logearse:", error);
            alert("Error de red o de conexión con el servidor.");
        }
    });
}