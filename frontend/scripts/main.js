// document.getElementById("btn-cargar").addEventListener("click", async (e) => {
//     e.preventDefault();
//     try {
//         const response = await fetch("http://localhost:8000/verificar_tablas");
//         const data = await response.json();

//         const lista = document.getElementById("estado-tablas");
//         lista.innerHTML = ""; // Limpiar antes

//         for (const tabla in data) {
//             const estado = data[tabla];
//             const item = document.createElement("li");
//             item.textContent = `${tabla}: ${estado}`;
//             item.style.color = estado === "Ok" ? "green" : "red";
//             lista.appendChild(item);
//         }
//     } catch (error) {
//         console.error("Error al verificar tablas:", error);
//     }
// });

// document.getElementById("btn-cursos").addEventListener("click", async () => {
//     try {
//         const response = await fetch("http://127.0.0.1:8000/cursos");
//         const data = await response.json();

//         const lista = document.getElementById("lista-cursos");
//         lista.innerHTML = ""; // limpiar antes de volver a pintar

//         if (data.data) {
//             data.data.forEach(curso => {
//                 const li = document.createElement("li");
//                 li.textContent = `${curso.nombre} (${curso.id_curso})`; // ajusta según tus campos
//                 lista.appendChild(li);
//             });
//         } else if (data.error) {
//             alert("Error: " + data.error);
//         }
//     } catch (error) {
//         console.error("Error al obtener usuarios:", error);
//         alert("Error de red o de conexión con el servidor.");
//     }
// });


// document.getElementById("btn-login").addEventListener("click", async (e) => {
//     e.preventDefault();
//     console.log("Intentando logearse...");
//     const username = document.getElementById("username").value;
//     const password = document.getElementById("password").value;
//     console.log("Username:", username);
//     console.log("Password:", password);
//     if (!username || !password) {
//         alert("Por favor, completa ambos campos.");
//         return;
//     }
//     const lista = document.getElementById("estado-tablas");
//     const datos = {
//         username: username,
//         password: password,
//     };


//     try {
//         const response = await fetch("http://127.0.0.1:8000/login", {
//             method: "POST",
//             headers: {
//                 "Content-Type": "application/json"
//             },
//             body: JSON.stringify(datos)
//         });

//         const data = await response.json();
//         console.log("Respuesta del servidor:", data);
//         if (data.usuario) {
//             console.log("Login exitoso:", data.usuario);
//             lista.innerHTML = ""; // Limpiar antes de mostrar el estado
//             const li = document.createElement("li");
//             li.textContent = `Bienvenido, ${data.usuario}!`;
//             li.style.color = "green";
//             lista.appendChild(li);

//             id_nodo=data.id_nodo
//             localStorage.setItem("id_nodo",id_nodo);
//             if (data.rol == "Administrador"){
//                 window.location.href = "products_administrator.html";
//             }
//             else if (data.rol == "Estudiante"){
//                 window.location.href = "courses_student.html";
//             }
//             else if (data.rol == "Profesor"){
//                 window.location.href = "courses_teacher.html";
//             }
//         } else{
//             alert("Error: " + data);
//         }
//     } catch (error) {
//         console.error("Error al logearse:", error);
//         alert("Error de red o de conexión con el servidor.");
//     }
// });



document.getElementById("btn-insert_user").addEventListener("click", async (e) => {
    e.preventDefault();
    console.log("Intentando logearse...");
    const documento_Identidad = document.getElementById("document").value;
    const nombre_completo = document.getElementById("name").value;
    const email = document.getElementById("email").value;
    const genero = document.getElementById("gender").value;
    const referencia_bancaria = document.getElementById("bank").value;
    const contrasena = document.getElementById("password").value;
    const rol = "Cliente"

    console.log(documento_Identidad,nombre_completo,email,genero,referencia_bancaria,contrasena,rol)
    if (!documento_Identidad || !nombre_completo  || !email  || !genero  || !referencia_bancaria  || !contrasena ) {
        alert("Por favor, completa ambos campos.");
        return;
    }
    const lista = document.getElementById("estado-tablas");
    const datos = {
        documento_Identidad: documento_Identidad,
        nombre_completo: nombre_completo,
        email: email,
        genero: genero,
        referencia_bancaria: referencia_bancaria,
        contrasena: contrasena,
        rol: rol,
    };


    // try {
    //     const response = await fetch("http://127.0.0.1:8000/insert_user", {
    //         method: "POST",
    //         headers: {
    //             "Content-Type": "application/json"
    //         },
    //         body: JSON.stringify(datos)
    //     });

    //     const data = await response.json();
    //     console.log("Respuesta del servidor:", data);

    //     if (data.usuario) {
    //         console.log("Login exitoso:", data.usuario);
    //         lista.innerHTML = ""; // Limpiar antes de mostrar el estado
    //         const li = document.createElement("li");
    //         li.textContent = `Bienvenido, ${data.usuario}!`;
    //         li.style.color = "green";
    //         lista.appendChild(li);
    //     } else{
    //         alert("Error: " + data);
    //     }
    // } catch (error) {
    //     console.error("Error al logearse:", error);
    //     alert("Error de red o de conexión con el servidor.");
    // }
});





