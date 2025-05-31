document.getElementById("btn-cargar").addEventListener("click", async () => {
    try {
        const response = await fetch("http://127.0.0.1:8000/usuarios");
        const data = await response.json();

        const lista = document.getElementById("lista-usuarios");
        lista.innerHTML = ""; // limpiar antes de volver a pintar

        if (data.data) {
            data.data.forEach(usuario => {
                const li = document.createElement("li");
                li.textContent = `${usuario.nombre_completo} (${usuario.email})`; // ajusta según tus campos
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
