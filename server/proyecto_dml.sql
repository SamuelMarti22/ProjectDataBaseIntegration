
INSERT INTO Usuario VALUES (1, 123456789, 'Ana Gómez', 'ana@example.com', 'Femenino', 'REF001', 'pass123', 'Administrador');
INSERT INTO Usuario VALUES (2, 987654321, 'Luis Pérez', 'luis@example.com', 'Masculino', 'REF002', 'pass456', 'Profesor');
INSERT INTO Usuario VALUES (3, 555555555, 'Marta Díaz', 'marta@example.com', 'Femenino', 'REF003', 'pass789', 'Estudiante');
INSERT INTO Usuario VALUES (4, 222333444, 'Carlos Ruiz', 'carlos@example.com', 'Masculino', 'REF004', 'passabc', 'Estudiante');
INSERT INTO Usuario VALUES (5, 333222111, 'Lucía Torres', 'lucia@example.com', 'Femenino', 'REF005', 'passdef', 'Profesor');
INSERT INTO Profesor VALUES (2, '3001234567', 'Matemáticas', 'Estadística');
INSERT INTO Profesor VALUES (5, '3017654321', 'Física', 'Astronomía');
INSERT INTO Estudiante VALUES (1001, 'stud123', 3);
INSERT INTO Estudiante VALUES (1002, 'stud456', 4);
INSERT INTO Curso VALUES ('MAT101', 'Álgebra Lineal', 'Matemáticas', 'ruta/algebra.pdf', '2024-01-10', '2024-06-10', 2024, 1, 500.0, 2);
INSERT INTO Curso VALUES ('FIS201', 'Mecánica Clásica', 'Física', 'ruta/mecanica.pdf', '2024-02-01', '2024-07-01', 2024, 1, 600.0, 5);
INSERT INTO Curso VALUES
('CS101', 'Introducción a la Programación', 'Computación', 'ruta/programacion.pdf', '2025-06-10', '2025-11-10', 2025, 2, 450.0, NULL),
('HIS202', 'Historia del Arte Moderno', 'Humanidades', 'ruta/historia_arte.pdf', '2025-07-01', '2025-12-01', 2025, 2, 400.0, NULL),
('BIO150', 'Biología Marina', 'Biología', 'ruta/biologia_marina.pdf', '2025-06-15', '2025-12-15', 2025, 2, 550.0, NULL),
('PSI301', 'Psicología del Aprendizaje', 'Psicología', 'ruta/psicologia_aprendizaje.pdf', '2025-07-20', '2025-12-20', 2025, 2, 600.0, NULL),
('ECO220', 'Microeconomía Intermedia', 'Economía', 'ruta/microeconomia.pdf', '2025-08-05', '2026-01-05', 2025, 2, 480.0, NULL);

INSERT INTO Pago VALUES (1, 500.0, 111111);
INSERT INTO Pago VALUES (2, 600.0, 222222);
INSERT INTO Pago VALUES (3, 500.0, 333333);
INSERT INTO Pago VALUES (4, 600.0, 444444);
INSERT INTO Pago VALUES (5, 500.0, 555555);
INSERT INTO Inscripcion_curso (id_usuario, id_curso, id_pago, estado) VALUES (1, 'MAT101', 1, 'pendiente');
INSERT INTO Inscripcion_curso (id_usuario, id_curso, id_pago, estado) VALUES (3, 'MAT101', 2, 'pagado');
INSERT INTO Inscripcion_curso (id_usuario, id_curso, id_pago, estado) VALUES (4, 'FIS201', 3, 'pagado');
INSERT INTO Inscripcion_curso (id_usuario, id_curso, id_pago, estado) VALUES (3, 'FIS201', 4, 'cancelado');
INSERT INTO Inscripcion_curso (id_usuario, id_curso, id_pago, estado) VALUES (4, 'MAT101', 5, 'pendiente');
INSERT INTO Solicitud_curso (id_profesor, id_curso, estado) VALUES (2, 'MAT101', 'abrobado');
INSERT INTO Solicitud_curso (id_profesor, id_curso, estado) VALUES (5, 'FIS201', 'aprobado');
INSERT INTO Solicitud_curso (id_profesor, id_curso, estado) VALUES (2, 'FIS201', 'rechazado');
INSERT INTO Solicitud_curso (id_profesor, id_curso, estado) VALUES (5, 'MAT101', 'pendiente');
INSERT INTO Estudiante_curso (matricula_estudiante, id_curso) VALUES (1001, 'MAT101');
INSERT INTO Estudiante_curso (matricula_estudiante, id_curso) VALUES (1001, 'FIS201');
INSERT INTO Estudiante_curso (matricula_estudiante, id_curso) VALUES (1002, 'FIS201');
INSERT INTO Estudiante_curso (matricula_estudiante, id_curso) VALUES (1002, 'MAT101');
INSERT INTO Estudiante_curso (matricula_estudiante, id_curso) VALUES (1001, 'MAT101');
INSERT INTO Archivo (ruta_titulo) VALUES ('material1.pdf');
INSERT INTO Archivo (ruta_titulo) VALUES ('tarea1.docx');
INSERT INTO Archivo (ruta_titulo) VALUES ('guia_algebra.pdf');
INSERT INTO Archivo (ruta_titulo) VALUES ('video1.mp4');
INSERT INTO Archivo (ruta_titulo) VALUES ('resumen_clase.txt');
INSERT INTO Material (titulo, descripcion, id_archivo, id_curso) VALUES ('Teoría Matrices', 'Explicación de matrices', 1, 'MAT101');
INSERT INTO Material (titulo, descripcion, id_archivo, id_curso) VALUES ('Vectores', 'Operaciones con vectores', 3, 'MAT101');
INSERT INTO Material (titulo, descripcion, id_archivo, id_curso) VALUES ('Fuerzas', 'Física de movimiento', 4, 'FIS201');
INSERT INTO Material (titulo, descripcion, id_archivo, id_curso) VALUES ('Integrales', 'Teoría de integrales', NULL, 'MAT101');
INSERT INTO Material (titulo, descripcion, id_archivo, id_curso) VALUES ('Óptica', 'Lentes y espejos', 5, 'FIS201');
INSERT INTO Tarea (titulo, descripcion, fecha_creacion, fecha_maxima, id_curso) VALUES ('Tarea 1', 'Resolver ejercicios de matriz', '2024-01-15', '2024-01-30', 'MAT101');
INSERT INTO Tarea (titulo, descripcion, fecha_creacion, fecha_maxima, id_curso) VALUES ('Tarea 2', 'Movimiento rectilíneo', '2024-02-01', '2024-02-15', 'FIS201');
INSERT INTO Tarea (titulo, descripcion, fecha_creacion, fecha_maxima, id_curso) VALUES ('Tarea 3', 'Trabajo y energía', '2024-02-20', '2024-03-05', 'FIS201');
INSERT INTO Tarea (titulo, descripcion, fecha_creacion, fecha_maxima, id_curso) VALUES ('Tarea 4', 'Integrales dobles', '2024-03-01', '2024-03-15', 'MAT101');
INSERT INTO Tarea (titulo, descripcion, fecha_creacion, fecha_maxima, id_curso) VALUES ('Tarea 5', 'Revisión óptica', '2024-03-10', '2024-03-25', 'FIS201');
INSERT INTO Entrega_tarea (id_archivo, id_tarea, puntaje, matricula_estudiante) VALUES (1, 1, 9.5, 1001);
INSERT INTO Entrega_tarea (id_archivo, id_tarea, puntaje, matricula_estudiante) VALUES (2, 2, 8.0, 1002);
INSERT INTO Entrega_tarea (id_archivo, id_tarea, puntaje, matricula_estudiante) VALUES (3, 3, 7.5, 1001);
INSERT INTO Entrega_tarea (id_archivo, id_tarea, puntaje, matricula_estudiante) VALUES (NULL, 4, 9.0, 1002);
INSERT INTO Entrega_tarea (id_archivo, id_tarea, puntaje, matricula_estudiante) VALUES (5, 5, 10.0, 1001);
INSERT INTO Foro (titulo, descripcion, fecha_creacion, fecha_terminacion, id_curso) VALUES ('Bienvenida', 'Presentación del curso', '2024-01-10', '2024-01-20', 'MAT101');
INSERT INTO Foro (titulo, descripcion, fecha_creacion, fecha_terminacion, id_curso) VALUES ('Dudas', 'Resolvemos dudas frecuentes', '2024-01-15', NULL, 'MAT101');
INSERT INTO Foro (titulo, descripcion, fecha_creacion, fecha_terminacion, id_curso) VALUES ('Introducción', 'Sobre física clásica', '2024-02-01', '2024-02-15', 'FIS201');
INSERT INTO Foro (titulo, descripcion, fecha_creacion, fecha_terminacion, id_curso) VALUES ('Examen parcial', 'Discusión examen', '2024-03-01', NULL, 'MAT101');
INSERT INTO Foro (titulo, descripcion, fecha_creacion, fecha_terminacion, id_curso) VALUES ('Experimentos', 'Ideas de laboratorio', '2024-03-10', '2024-03-20', 'FIS201');
INSERT INTO Mensaje (titulo, descripcion, id_emisor, id_mensaje_replica, id_foro) VALUES ('Hola a todos', 'Bienvenidos al curso', 1, NULL, 1);
INSERT INTO Mensaje (titulo, descripcion, id_emisor, id_mensaje_replica, id_foro) VALUES ('Pregunta', '¿Cuándo es el parcial?', 3, NULL, 4);
INSERT INTO Mensaje (titulo, descripcion, id_emisor, id_mensaje_replica, id_foro) VALUES ('Respuesta', 'La próxima semana', 2, 2, 4);
INSERT INTO Mensaje (titulo, descripcion, id_emisor, id_mensaje_replica, id_foro) VALUES ('Consulta', '¿Hay material extra?', 4,  NULL, 2);
INSERT INTO Mensaje (titulo, descripcion, id_emisor, id_mensaje_replica, id_foro) VALUES ('Anuncio', 'Laboratorio obligatorio', 5,NULL, 5);