document.getElementById("cursoForm").addEventListener("submit", function(event) {
  event.preventDefault();

  const id_curso = document.getElementById("id_curso").value;
  const nombre = document.getElementById("name_course").value;
  const categoria  = document.getElementById("categoria").value;
  const ruta = document.getElementById("ruta").value;
  const fecha_inicio = document.getElementById("fecha_inicio").value;
  const fecha_fin = document.getElementById("fecha_fin").value;
  const ano = document.getElementById("ano").value;
  const semestre = document.getElementById("semestre").value;
  const precio = document.getElementById("precio").value;
  const id_profesor = document.getElementById("id_profesor").value;

  console.log({
    id_curso, nombre, categoria, ruta, fecha_inicio,
    fecha_fin, ano, semestre, precio, id_profesor
  });

  alert("Curso registrado correctamente (simulado).");
});
