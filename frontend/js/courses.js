const courses = [
  { title: "Curso 1: Desarrollo Web", category: "Social", img: "https://picsum.photos/300/150?random=1", price: "$50", start: "2025-06-01", end: "2025-07-01" },
  { title: "Curso 2: Diseño UI/UX", category: "Gadget", img: "https://picsum.photos/300/150?random=2", price: "$60", start: "2025-06-05", end: "2025-07-05" },
  { title: "Curso 3: Python Avanzado", category: "Health", img: "https://picsum.photos/300/150?random=3", price: "$70", start: "2025-06-10", end: "2025-07-10" },
  { title: "Curso 4: Inteligencia Artificial", category: "Tech", img: "https://picsum.photos/300/150?random=4", price: "$80", start: "2025-06-15", end: "2025-07-15" },
  { title: "Curso 5: Marketing Digital", category: "Business", img: "https://picsum.photos/300/150?random=5", price: "$55", start: "2025-06-20", end: "2025-07-20" },
  { title: "Curso 6: Ciberseguridad", category: "Security", img: "https://picsum.photos/300/150?random=6", price: "$65", start: "2025-06-25", end: "2025-07-25" }
];

const container = document.getElementById("course-container");

courses.forEach(course => {
  const card = document.createElement("div");
  card.className = "course-card";
  card.innerHTML = `
    <img src="${course.img}" alt="Curso">
    <div class="course-content">
      <h3>${course.title}</h3>
      <div class="course-meta">
        <span>Precio: ${course.price}</span>
        <span>Inicio: ${course.start}</span>
        <span>Fin: ${course.end}</span>
      </div>
    </div>
  `;
  container.appendChild(card);
});
