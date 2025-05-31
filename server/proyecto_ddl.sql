DROP DATABASE IF EXISTS gestionnodo;
CREATE DATABASE gestionnodo;
USE gestionnodo;

-- Tabla Usuario
CREATE TABLE Usuario (
    id_nodo INT AUTO_INCREMENT PRIMARY KEY NOT NULL,
    documento_Identidad INT UNIQUE NOT NULL,
    nombre_completo VARCHAR(50) NOT NULL,
    email VARCHAR(50) UNIQUE NOT NULL,
    genero VARCHAR(50) NOT NULL,
    referencia_bancaria VARCHAR(50) UNIQUE NOT NULL,
    contrasena VARCHAR(50) NOT NULL,
    rol VARCHAR(50) NOT NULL
);

-- Tabla Profesor
CREATE TABLE Profesor (
    id_nodo INT NOT NULL,
    telefono VARCHAR(15) NOT NULL,
    area_principal_conocimiento VARCHAR(100) NOT NULL,
    area_alternativa_conocimiento VARCHAR(100) NOT NULL,
    CONSTRAINT pk_profesor PRIMARY KEY (id_nodo),
    FOREIGN KEY (id_nodo) REFERENCES Usuario(id_nodo) ON UPDATE CASCADE ON DELETE CASCADE
);

-- Tabla Estudiante
CREATE TABLE Estudiante (
    matricula INT NOT NULL,
    contrasena VARCHAR(50) NOT NULL,
    id_nodo INT UNIQUE NOT NULL,
    CONSTRAINT pk_estudiante PRIMARY KEY (matricula),
    FOREIGN KEY (id_nodo) REFERENCES Usuario(id_nodo) ON UPDATE CASCADE ON DELETE CASCADE
);

-- Tabla Curso
CREATE TABLE Curso (
    id_curso VARCHAR(30) NOT NULL,
    nombre VARCHAR(70) NOT NULL,
    categoria VARCHAR(70) NOT NULL,
    ruta VARCHAR(100) UNIQUE NOT NULL,
    fecha_inicio DATE NOT NULL,
    fecha_fin DATE NOT NULL,
    ano NUMERIC(4) NOT NULL,
    semestre INT NOT NULL,
    precio DECIMAL(10,2) NOT NULL,
    id_profesor INT,
    CONSTRAINT pk_curso PRIMARY KEY (id_curso),
    CONSTRAINT fk_curso_profesor FOREIGN KEY (id_profesor) REFERENCES Profesor(id_nodo) ON UPDATE CASCADE ON DELETE SET NULL
);

-- Tabla Pago
CREATE TABLE Pago (
    id_pago INTEGER PRIMARY KEY AUTO_INCREMENT NOT NULL,
    monto_pagado DECIMAL(10,2) NOT NULL,
    referencia_bancaria INTEGER NOT NULL UNIQUE
);

-- Tabla Inscripcion_curso
CREATE TABLE Inscripcion_curso (
    id_inscripcion INTEGER PRIMARY KEY AUTO_INCREMENT NOT NULL,
    id_usuario INT NOT NULL,
    id_curso VARCHAR(30) NOT NULL,
    id_pago INT,
    estado ENUM('pendiente', 'pagado', 'cancelado') NOT NULL,
    CONSTRAINT fk_inscripcion_usuario FOREIGN KEY (id_usuario) REFERENCES Usuario(id_nodo) ON UPDATE CASCADE ON DELETE CASCADE,
    CONSTRAINT fk_inscripcion_curso FOREIGN KEY (id_curso) REFERENCES Curso(id_curso) ON UPDATE CASCADE ON DELETE CASCADE,
    CONSTRAINT fk_inscripcion_pago FOREIGN KEY (id_pago) REFERENCES Pago(id_pago) ON UPDATE CASCADE ON DELETE SET NULL
);

-- Tabla Solicitud_curso
CREATE TABLE Solicitud_curso (
    id_solicitud INTEGER PRIMARY KEY AUTO_INCREMENT NOT NULL,
    id_profesor INT NOT NULL,
    id_curso VARCHAR(30) NOT NULL,
    estado ENUM('pendiente', 'aprobado', 'rechazado') NOT NULL,
    CONSTRAINT fk_solicitud_profesor FOREIGN KEY (id_profesor) REFERENCES Profesor(id_nodo) ON UPDATE CASCADE ON DELETE CASCADE,
    CONSTRAINT fk_solicitud_curso FOREIGN KEY (id_curso) REFERENCES Curso(id_curso) ON UPDATE CASCADE ON DELETE CASCADE
);

-- Tabla Estudiante_curso
CREATE TABLE Estudiante_curso (
    id_matricula INTEGER PRIMARY KEY AUTO_INCREMENT NOT NULL,
    matricula_estudiante INT NOT NULL,
    id_curso VARCHAR(30) NOT NULL,
    FOREIGN KEY (id_curso) REFERENCES Curso(id_curso) ON UPDATE CASCADE ON DELETE CASCADE,
    FOREIGN KEY (matricula_estudiante) REFERENCES Estudiante(matricula) ON UPDATE CASCADE ON DELETE CASCADE
);

-- Tabla Archivo
CREATE TABLE Archivo (
    id_archivo INTEGER PRIMARY KEY AUTO_INCREMENT NOT NULL,
    ruta_titulo VARCHAR(100) UNIQUE NOT NULL
);

-- Tabla Material
CREATE TABLE Material (
    id_material INTEGER PRIMARY KEY AUTO_INCREMENT NOT NULL,
    titulo VARCHAR(50) NOT NULL,
    descripcion VARCHAR(200),
    id_archivo INT,
    id_curso VARCHAR(30) NOT NULL,
    CONSTRAINT fk_material_curso FOREIGN KEY (id_curso) REFERENCES Curso(id_curso) ON UPDATE CASCADE ON DELETE CASCADE,
    CONSTRAINT fk_material_archivo FOREIGN KEY (id_archivo) REFERENCES Archivo(id_archivo) ON UPDATE CASCADE ON DELETE SET NULL
);

-- Tabla Tarea
CREATE TABLE Tarea (
    id_tarea INTEGER PRIMARY KEY AUTO_INCREMENT NOT NULL,
    titulo VARCHAR(50) NOT NULL,
    descripcion VARCHAR(200) NOT NULL,
    fecha_creacion DATE NOT NULL,
    fecha_maxima DATE NOT NULL,
    id_curso VARCHAR(30) NOT NULL,
    CONSTRAINT fk_tarea_curso FOREIGN KEY (id_curso) REFERENCES Curso(id_curso) ON UPDATE CASCADE ON DELETE CASCADE
);

-- Tabla Entrega_tarea
CREATE TABLE Entrega_tarea (
    id_entrega INTEGER PRIMARY KEY AUTO_INCREMENT NOT NULL,
    id_archivo INT,
    id_tarea INT NOT NULL,
    puntaje NUMERIC(2,1),
    matricula_estudiante INT NOT NULL,
    CONSTRAINT fk_entrega_archivo FOREIGN KEY (id_archivo) REFERENCES Archivo(id_archivo) ON UPDATE CASCADE ON DELETE SET NULL,
    CONSTRAINT fk_entrega_tarea FOREIGN KEY (id_tarea) REFERENCES Tarea(id_tarea) ON UPDATE CASCADE ON DELETE CASCADE,
    CONSTRAINT fk_entrega_estudiante FOREIGN KEY (matricula_estudiante) REFERENCES Estudiante(matricula) ON UPDATE CASCADE ON DELETE CASCADE
);

-- Tabla Foro
CREATE TABLE Foro (
    id_foro INTEGER PRIMARY KEY AUTO_INCREMENT NOT NULL,
    titulo VARCHAR(50) NOT NULL,
    descripcion VARCHAR(200),
    fecha_creacion DATE NOT NULL,
    fecha_terminacion DATE,
    id_curso VARCHAR(30) NOT NULL,
    CONSTRAINT fk_foro_curso FOREIGN KEY (id_curso) REFERENCES Curso(id_curso) ON UPDATE CASCADE ON DELETE CASCADE
);

-- Tabla Mensaje
CREATE TABLE Mensaje (
    id_mensaje INTEGER PRIMARY KEY AUTO_INCREMENT NOT NULL,
    titulo VARCHAR(50) NOT NULL,
    descripcion VARCHAR(200) NOT NULL,
    id_emisor INT NOT NULL,
    id_mensaje_replica INT,
    id_foro INT NOT NULL,
    CONSTRAINT fk_mensaje_emisor FOREIGN KEY (id_emisor) REFERENCES Usuario(id_nodo) ON UPDATE CASCADE ON DELETE CASCADE,
    CONSTRAINT fk_mensaje_replica FOREIGN KEY (id_mensaje_replica) REFERENCES Mensaje(id_mensaje) ON UPDATE CASCADE ON DELETE SET NULL,
    CONSTRAINT fk_mensaje_foro FOREIGN KEY (id_foro) REFERENCES Foro(id_foro) ON UPDATE CASCADE ON DELETE CASCADE
);