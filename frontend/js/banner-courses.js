const courses = [
  { title: "Curso 1: Desarrollo Web", price: "$50", start: "2025-06-01", end: "2025-07-01", img: "https://picsum.photos/id/1011/400/200" },
  { title: "Curso 2: Diseño UI/UX", price: "$60", start: "2025-06-05", end: "2025-07-05", img: "https://picsum.photos/id/1015/400/200" },
  { title: "Curso 3: Python Avanzado", price: "$70", start: "2025-06-10", end: "2025-07-10", img: "https://picsum.photos/id/1016/400/200" },
  { title: "Curso 4: Inteligencia Artificial", price: "$80", start: "2025-06-15", end: "2025-07-15", img: "https://picsum.photos/id/1020/400/200" },
  { title: "Curso 5: Marketing Digital", price: "$55", start: "2025-06-20", end: "2025-07-20", img: "https://picsum.photos/id/1024/400/200" },
  { title: "Curso 6: Ciberseguridad", price: "$65", start: "2025-06-25", end: "2025-07-25", img: "https://picsum.photos/id/1033/400/200" }
];

const grid = document.getElementById("course-grid");

courses.forEach(course => {
  const card = document.createElement("div");
  card.className = "course-card";
  card.innerHTML = `
    <img src="\${course.img}" alt="Imagen Curso">
    <div class="course-content">
      <h3>\${course.title}</h3>
      <p>Precio: \${course.price}</p>
      <p>Inicio: \${course.start}</p>
      <p>Fin: \${course.end}</p>
    </div>
  `;
  grid.appendChild(card);
});
