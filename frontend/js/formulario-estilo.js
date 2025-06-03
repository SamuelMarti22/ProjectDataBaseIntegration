document.addEventListener("DOMContentLoaded", () => {
  const toggleBtn = document.getElementById("toggleFormBtn");
  const formDiv = document.getElementById("formularioDiv");

  toggleBtn.addEventListener("click", () => {
    formDiv.classList.toggle("hidden");
  });

  const form = document.getElementById("formulario");
  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const titulo = document.getElementById("titulo").value;
    const descripcion = document.getElementById("descripcion").value;
    const extra = document.getElementById("extra").value;
    console.log("Enviado:", { titulo, descripcion, extra });
    alert("Formulario enviado (simulado).");
    form.reset();
  });
});
