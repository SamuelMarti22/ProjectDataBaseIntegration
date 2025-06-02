USE gestionnodo;

-- 1. Listar todos los estudiantes (nombre completo, matrícula) de la base de datos ordenados alfabéticamente por nombre para un año y semestre concreto. 

SELECT DISTINCT(e.matricula),u.nombre_completo
FROM Estudiante AS e
JOIN Usuario AS u ON e.id_nodo = u.id_nodo
JOIN Estudiante_curso AS ec ON e.matricula = ec.matricula_estudiante
JOIN Curso AS c ON ec.id_curso = c.id_curso
WHERE c.ano = 2024 AND c.semestre = 1
ORDER BY u.nombre_completo ASC;

-- 2. Listar todos los estudiantes (nombre completo) de la base de datos de un curso determinado para un año y semestre concreto. 

SELECT DISTINCT(u.nombre_completo)
FROM usuario as u
JOIN estudiante as e ON e.id_nodo = u.id_nodo
JOIN estudiante_curso AS ec ON e.matricula = ec.matricula_estudiante
JOIN curso AS c ON c.id_curso = ec.id_curso
WHERE c.ano = 2024 AND c.semestre = 1;
    
-- 3.  Listar todos los cursos que un estudiante ha tenido entre un rango de fechas en la base de datos. 

SELECT DISTINCT(c.id_curso), c.nombre, c.fecha_inicio, c.fecha_fin
FROM Estudiante AS e
JOIN Estudiante_curso AS ec ON e.matricula = ec.matricula_estudiante
JOIN Curso AS c ON ec.id_curso = c.id_curso
WHERE e.matricula = 1001
  AND c.fecha_inicio >= '2024-01-01'
  AND c.fecha_fin <= '2024-12-31';
  
-- 4. Listar los profesores (número de identificación, nombre completo) y los cursos que tiene asignados actualmente. 

SELECT u.documento_Identidad, u.nombre_completo, c.id_curso
FROM usuario AS u
JOIN curso AS c ON c.id_profesor = u.id_nodo
WHERE CURDATE() BETWEEN fecha_inicio AND fecha_fin;

-- 5. Listar todos los cursos ordenados por categoría. (nombre del curso, categoría).  

SELECT c.nombre, c.categoria
FROM curso AS c
ORDER BY c.categoria;

-- 6. Listar los cursos con un rango de precio entre val_minimo y val_máximo (a modo de ejemplo del query coloque 100.000 y 500.000) 

SELECT c.id_curso, c.precio
FROM curso AS c
WHERE c.precio <= 500 AND c.precio > 300;

-- 7. Listar los usuarios que están registrados, pero no están matriculados en ningún curso para un año y semestre específico. 

SELECT u.id_nodo, u.nombre_completo, u.rol
FROM Usuario AS u
WHERE u.id_nodo NOT IN (
    SELECT DISTINCT e.id_nodo
    FROM Estudiante AS e
    JOIN Estudiante_curso AS ec ON e.matricula = ec.matricula_estudiante
    JOIN Curso AS c ON ec.id_curso = c.id_curso
    WHERE c.ano = 2024 AND c.semestre = 1
);

-- 8. Listar los cursos que se encuentran en una categoría (a modo de ejemplo: la categoría Computación.

SELECT *
FROM curso AS c
WHERE c.categoria = 'Matemáticas';

-- 9. Listar las tareas que los estudiantes deben realizar en el curso dado con identificador x (a modo de ejemplo, curso id = 20) 

SELECT *
FROM tarea AS t
WHERE t.id_curso = 'MAT101';

-- 10. Listar los materiales que el profesor ha publicado en un curso dado (a modo de ejemplo especifique id de curso, curso id = 20) 

SELECT *
FROM material AS m
WHERE m.id_curso = 'MAT101';

-- 11. Listar todos los mensajes de un foro en un curso, listando el id y nombre del que envió en mensaje (a modo de ejemplo especifique id de curso/foro o solo id de foro) 

SELECT m.descripcion as mensaje, u.nombre_completo as emisor, m.id_foro as Foro 
FROM mensaje AS m
JOIN usuario AS u ON m.id_emisor = u.id_nodo
JOIN foro AS f ON f.id_foro = m.id_foro
JOIN curso AS c ON c.id_curso = f.id_curso
WHERE c.id_curso = "MAT101";

-- 12. Especifique una consulta que consideraría muy importante en este sistema, y la realiza. 
-- Consulta: Mostrar los cursos activos y cuántos estudiantes tienen

SELECT c.id_curso, c.nombre, COUNT(es.id_matricula) AS estudiantes
FROM curso AS c
JOIN estudiante_curso AS es ON c.id_curso = es.id_curso
WHERE c.ano = 2024
GROUP BY c.id_curso, c.nombre;