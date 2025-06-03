import os

import mysql.connector
from dotenv import load_dotenv

load_dotenv()


def get_connection():
    return mysql.connector.connect(
        host=os.getenv("DB_HOST"),
        user=os.getenv("DB_USER"),
        password=os.getenv("DB_PASSWORD"),
        database=os.getenv("DB_NAME"),
    )


# Get usuarios
def get_usuarios():
    conn = None
    cursor = None
    try:
        print("Conectando a la base de datos...")
        conn = get_connection()
        cursor = conn.cursor(dictionary=True)
        cursor.execute("SELECT * FROM Usuario")
        resultados = cursor.fetchall()
        return {"data": resultados}
    except mysql.connector.Error as e:
        print("Error al conectar a MySQL:", e)
        return {"error": str(e)}
    finally:
        if cursor:
            cursor.close()
        if conn and conn.is_connected():
            conn.close()
        print("Conexion cerrada")


def insert_usuario(usuario):
    conn = None
    cursor = None
    try:
        print("Conectando a la base de datos para insertar usuario...")
        conn = get_connection()
        cursor = conn.cursor()
        cursor.execute(
            "INSERT INTO Usuario (documento_Identidad, nombre_completo, email, genero, referencia_bancaria, contrasena, rol) VALUES (%s, %s, %s,%s, %s, %s,%s)",
            usuario,
        )
        conn.commit()
        print("Usuario insertado correctamente.")
    except mysql.connector.Error as e:
        print("Error al insertar usuario:", e)
        return {"error": str(e)}
    finally:
        if cursor:
            cursor.close()
        if conn and conn.is_connected():
            conn.close()
        print("Conexion cerrada")


def get_usuario_by_email(email):
    conn = None
    cursor = None
    try:
        print("Conectando a la base de datos para obtener usuario por email...")
        conn = get_connection()
        cursor = conn.cursor(dictionary=True)
        cursor.execute("SELECT * FROM Usuario WHERE email = %s", (email))
        resultado = cursor.fetchone()
        return {"data": resultado} if resultado else {"data": None}
    except mysql.connector.Error as e:
        print("Error al obtener usuario por email:", e)
        return {"error": str(e)}
    finally:
        if cursor:
            cursor.close()
        if conn and conn.is_connected():
            conn.close()
        print("Conexion cerrada")


# Get estudiantes
def get_Estudiantes():
    conn = None
    cursor = None
    try:
        print("Conectando a la base de datos...")
        conn = get_connection()
        cursor = conn.cursor(dictionary=True)
        cursor.execute("SELECT * FROM Estudiante")
        resultados = cursor.fetchall()
        return {"data": resultados}
    except mysql.connector.Error as e:
        print("Error al conectar a MySQL:", e)
        return {"error": str(e)}
    finally:
        if cursor:
            cursor.close()
        if conn and conn.is_connected():
            conn.close()
        print("Conexion cerrada")


# Get Profesores


def get_Profesores():
    conn = None
    cursor = None
    try:
        print("Conectando a la base de datos...")
        conn = get_connection()
        cursor = conn.cursor(dictionary=True)
        cursor.execute("SELECT * FROM Profesor")
        resultados = cursor.fetchall()
        return {"data": resultados}
    except mysql.connector.Error as e:
        print("Error al conectar a MySQL:", e)
        return {"error": str(e)}
    finally:
        if cursor:
            cursor.close()
        if conn and conn.is_connected():
            conn.close()
        print("Conexion cerrada")


def get_Cursos():
    conn = None
    cursor = None
    try:
        print("Conectando a la base de datos...")
        conn = get_connection()
        cursor = conn.cursor(dictionary=True)
        cursor.execute(
            "SELECT * FROM Curso WHERE fecha_inicio > CURDATE() ORDER BY nombre ASC"
        )
        resultados = cursor.fetchall()
        return {"data": resultados}
    except mysql.connector.Error as e:
        print("Error al conectar a MySQL:", e)
        return {"error": str(e)}
    finally:
        if cursor:
            cursor.close()
        if conn and conn.is_connected():
            conn.close()
        print("Conexion cerrada")


def get_Cursos_Completo():
    conn = None
    cursor = None
    try:
        print("Conectando a la base de datos...")
        conn = get_connection()
        cursor = conn.cursor(dictionary=True)
        cursor.execute("SELECT * FROM Curso ORDER BY nombre ASC")
        resultados = cursor.fetchall()
        return {"data": resultados}
    except mysql.connector.Error as e:
        print("Error al conectar a MySQL:", e)
        return {"error": str(e)}
    finally:
        if cursor:
            cursor.close()
        if conn and conn.is_connected():
            conn.close()
        print("Conexion cerrada")


def get_Archivos():
    conn = None
    cursor = None
    try:
        print("Conectando a la base de datos...")
        conn = get_connection()
        cursor = conn.cursor(dictionary=True)
        cursor.execute("SELECT * FROM Archivo")
        resultados = cursor.fetchall()
        return {"data": resultados}
    except mysql.connector.Error as e:
        print("Error al conectar a MySQL:", e)
        return {"error": str(e)}
    finally:
        if cursor:
            cursor.close()
        if conn and conn.is_connected():
            conn.close()
        print("Conexion cerrada")


def get_Materiales():
    conn = None
    cursor = None
    try:
        print("Conectando a la base de datos...")
        conn = get_connection()
        cursor = conn.cursor(dictionary=True)
        cursor.execute("SELECT * FROM Material")
        resultados = cursor.fetchall()
        return {"data": resultados}
    except mysql.connector.Error as e:
        print("Error al conectar a MySQL:", e)
        return {"error": str(e)}
    finally:
        if cursor:
            cursor.close()
        if conn and conn.is_connected():
            conn.close()
        print("Conexion cerrada")


def get_Tareas():
    conn = None
    cursor = None
    try:
        print("Conectando a la base de datos...")
        conn = get_connection()
        cursor = conn.cursor(dictionary=True)
        cursor.execute("SELECT * FROM Tarea")
        resultados = cursor.fetchall()
        return {"data": resultados}
    except mysql.connector.Error as e:
        print("Error al conectar a MySQL:", e)
        return {"error": str(e)}
    finally:
        if cursor:
            cursor.close()
        if conn and conn.is_connected():
            conn.close()
        print("Conexion cerrada")


def get_solicitudes():
    conn = None
    cursor = None
    try:
        print("Conectando a la base de datos...")
        conn = get_connection()
        cursor = conn.cursor(dictionary=True)
        cursor.execute(
            f"SELECT p.area_principal_conocimiento, p.area_alternativa_conocimiento, u.nombre_completo, u.email, u.id_nodo, c.nombre, c.categoria, c.id_curso, s.id_solicitud, s.estado FROM Solicitud_curso as s JOIN Profesor as p ON s.id_profesor = p.id_nodo JOIN Usuario as u ON s.id_profesor = u.id_nodo JOIN Curso as c ON c.id_curso = s.id_curso;"
        )
        resultados = cursor.fetchall()
        return {"data": resultados}
    except mysql.connector.Error as e:
        print("Error al conectar a MySQL:", e)
        return {"error": str(e)}
    finally:
        if cursor:
            cursor.close()
        if conn and conn.is_connected():
            conn.close()
        print("Conexion cerrada")


def get_pagos():
    conn = None
    cursor = None
    try:
        print("Conectando a la base de datos...")
        conn = get_connection()
        cursor = conn.cursor(dictionary=True)
        cursor.execute("SELECT * FROM Pago")
        resultados = cursor.fetchall()
        return {"data": resultados}
    except mysql.connector.Error as e:
        print("Error al conectar a MySQL:", e)
        return {"error": str(e)}
    finally:
        if cursor:
            cursor.close()
        if conn and conn.is_connected():
            conn.close()
        print("Conexion cerrada")


def get_mensajes():
    conn = None
    cursor = None
    try:
        print("Conectando a la base de datos...")
        conn = get_connection()
        cursor = conn.cursor(dictionary=True)
        cursor.execute("SELECT * FROM Mensaje")
        resultados = cursor.fetchall()
        return {"data": resultados}
    except mysql.connector.Error as e:
        print("Error al conectar a MySQL:", e)
        return {"error": str(e)}
    finally:
        if cursor:
            cursor.close()
        if conn and conn.is_connected():
            conn.close()
        print("Conexion cerrada")


def get_inscripciones():
    conn = None
    cursor = None
    try:
        print("Conectando a la base de datos...")
        conn = get_connection()
        cursor = conn.cursor(dictionary=True)
        cursor.execute(
            "SELECT u.nombre_completo, u.email, u.id_nodo, s.estado, c.id_curso, c.nombre FROM Inscripcion_curso as s JOIN Usuario as u ON s.id_usuario = u.id_nodo JOIN Curso as c ON s.id_curso = c.id_curso;"
        )
        resultados = cursor.fetchall()
        return {"data": resultados}
    except mysql.connector.Error as e:
        print("Error al conectar a MySQL:", e)
        return {"error": str(e)}
    finally:
        if cursor:
            cursor.close()
        if conn and conn.is_connected():
            conn.close()
        print("Conexion cerrada")


def get_foros():
    conn = None
    cursor = None
    try:
        print("Conectando a la base de datos...")
        conn = get_connection()
        cursor = conn.cursor(dictionary=True)
        cursor.execute("SELECT * FROM Foro")
        resultados = cursor.fetchall()
        return {"data": resultados}
    except mysql.connector.Error as e:
        print("Error al conectar a MySQL:", e)
        return {"error": str(e)}
    finally:
        if cursor:
            cursor.close()
        if conn and conn.is_connected():
            conn.close()
        print("Conexion cerrada")


def get_matriculas():
    conn = None
    cursor = None
    try:
        print("Conectando a la base de datos...")
        conn = get_connection()
        cursor = conn.cursor(dictionary=True)
        cursor.execute("SELECT * FROM Estudiante_curso")
        resultados = cursor.fetchall()
        return {"data": resultados}
    except mysql.connector.Error as e:
        print("Error al conectar a MySQL:", e)
        return {"error": str(e)}
    finally:
        if cursor:
            cursor.close()
        if conn and conn.is_connected():
            conn.close()
        print("Conexion cerrada")


def get_entrega_tarea():
    conn = None
    cursor = None
    try:
        print("Conectando a la base de datos...")
        conn = get_connection()
        cursor = conn.cursor(dictionary=True)
        cursor.execute("SELECT * FROM Entrega_tarea")
        resultados = cursor.fetchall()
        return {"data": resultados}
    except mysql.connector.Error as e:
        print("Error al conectar a MySQL:", e)
        return {"error": str(e)}
    finally:
        if cursor:
            cursor.close()
        if conn and conn.is_connected():
            conn.close()
        print("Conexion cerrada")


def queryGeneral(sql, params=None):
    conn = None
    cursor = None
    try:
        print("Conectando a la base de datos para ejecutar consulta...")
        conn = get_connection()
        cursor = conn.cursor(dictionary=True)
        cursor.execute(sql, params or ())
        resultados = cursor.fetchall()
        return {"data": resultados}
    except mysql.connector.Error as e:
        print("Error al ejecutar consulta:", e)
        return {"error": str(e)}
    finally:
        if cursor:
            cursor.close()
        if conn and conn.is_connected():
            conn.close()
        print("Conexion cerrada")


def verificar_usuario(usuario, contrasena):
    conn = None
    cursor = None
    try:
        print("Conectando a la base de datos para verificar usuario...")
        conn = get_connection()
        cursor = conn.cursor()
        cursor.execute(
            "SELECT documento_Identidad,contrasena,id_nodo,rol FROM Usuario WHERE documento_Identidad = %s AND contrasena = %s",
            (usuario, contrasena),
        )
        resultado = cursor.fetchone()
        return (
            {
                "usuario": resultado[0],
                "contrasena": resultado[1],
                "id_nodo": resultado[2],
                "rol": resultado[3],
            }
            if resultado
            else {"error": "Usuario o contraseña incorrectos"}
        )
    except mysql.connector.Error as e:
        print("Error al verificar usuario:", e)
        return {"error": str(e)}
    finally:
        if cursor:
            cursor.close()
        if conn and conn.is_connected():
            conn.close()
        print("Conexion cerrada")


def insert_user(
    documento_Identidad,
    nombre_completo,
    email,
    genero,
    referencia_bancaria,
    contrasena,
    rol,
):
    conn = None
    cursor = None
    try:
        print("Conectando a la base de datos para verificar usuario...")
        conn = get_connection()
        cursor = conn.cursor()
        cursor.execute(
            "INSERT INTO Usuario (documento_Identidad, nombre_completo, email, genero, referencia_bancaria, contrasena, rol) VALUES (%s, %s, %s,%s, %s, %s,%s)",
            (
                documento_Identidad,
                nombre_completo,
                email,
                genero,
                referencia_bancaria,
                contrasena,
                rol,
            ),
        )
        conn.commit()
        resultado = True
        return {"estado": resultado} if resultado else {"error": "Insercion fallida"}
    except mysql.connector.Error as e:
        print("Error al insertar usuario:", e)
        return {"error": str(e)}
    finally:
        if cursor:
            cursor.close()
        if conn and conn.is_connected():
            conn.close()
        print("Conexion cerrada")


def insert_course(
    id_curso,
    nombre,
    categoria,
    ruta,
    fecha_inicio,
    fecha_fin,
    ano,
    semestre,
    precio,
    id_profesor,
):
    conn = None
    cursor = None
    try:
        print("Conectando a la base de datos para verificar usuario...")
        conn = get_connection()
        cursor = conn.cursor()
        cursor.execute(
            "INSERT INTO Curso (id_curso,nombre,categoria,ruta,fecha_inicio,fecha_fin,ano,semestre,precio,id_profesor) VALUES (%s, %s, %s,%s, %s, %s,%s,%s, %s,%s)",
            (
                id_curso,
                nombre,
                categoria,
                ruta,
                fecha_inicio,
                fecha_fin,
                ano,
                semestre,
                precio,
                id_profesor,
            ),
        )
        conn.commit()
        resultado = True
        return {"estado": resultado} if resultado else {"error": "Insercion fallida"}
    except mysql.connector.Error as e:
        print("Error al insertar usuario:", e)
        return {"error": str(e)}
    finally:
        if cursor:
            cursor.close()
        if conn and conn.is_connected():
            conn.close()
        print("Conexion cerrada")


def insert_solicitud(id_curso, id_profesor):
    conn = None
    cursor = None
    try:
        print("Conectando a la base de datos para insertar solicitud...")
        conn = get_connection()
        cursor = conn.cursor()
        # Aquí deberías definir los valores que quieres insertar
        cursor.execute(
            "INSERT INTO Solicitud_curso (id_curso, id_profesor) VALUES (%s, %s)",
            (id_curso, id_profesor),
        )
        conn.commit()
        print("Solicitud insertada correctamente.")
    except mysql.connector.Error as e:
        print("Error al insertar solicitud:", e)
        return {"error": str(e)}
    finally:
        if cursor:
            cursor.close()
        if conn and conn.is_connected():
            conn.close()
        print("Conexion cerrada")


def accept_solicitud(id_curso, id_nodo):
    conn = None
    cursor = None
    try:
        print("Conectando a la base de datos para aceptar solicitud...")
        conn = get_connection()
        cursor = conn.cursor()
        cursor.execute(
            "UPDATE Solicitud_curso SET estado = 'aprobado' WHERE id_curso = %s AND id_profesor = %s",
            (id_curso, id_nodo),
        )
        cursor.execute(
            "UPDATE Solicitud_curso SET estado = 'rechazado' WHERE id_curso = %s AND id_profesor != %s ",
            (id_curso, id_nodo),
        )
        cursor.execute(
            "UPDATE Curso SET id_profesor = %s WHERE id_curso = %s ",
            (id_nodo, id_curso),
        )
        conn.commit()
        print("Solicitud aceptada correctamente.")
        return {"estado": "Solicitud aceptada correctamente"}
    except mysql.connector.Error as e:
        print("Error al aceptar solicitud:", e)
        return {"error": str(e)}
    finally:
        if cursor:
            cursor.close()
        if conn and conn.is_connected():
            conn.close()
        print("Conexion cerrada")


def reject_solicitud(id_curso, id_nodo):
    conn = None
    cursor = None
    try:
        print("Conectando a la base de datos para rechazar solicitud...")
        conn = get_connection()
        cursor = conn.cursor()
        cursor.execute(
            "UPDATE Solicitud_curso SET estado = 'rechazado' WHERE id_curso = %s AND id_profesor = %s ",
            (id_curso, id_nodo),
        )
        conn.commit()
        print("Solicitud rechazada correctamente.")
        return {"estado": "Solicitud rechazada correctamente"}
    except mysql.connector.Error as e:
        print("Error al rechazar solicitud:", e)
        return {"error": str(e)}
    finally:
        if cursor:
            cursor.close()
        if conn and conn.is_connected():
            conn.close()
        print("Conexion cerrada")


def accept_inscripcion(id_curso, id_nodo):
    conn = None
    cursor = None
    try:
        print("Conectando a la base de datos para aceptar inscripcion...")
        conn = get_connection()
        cursor = conn.cursor()
        # 1. Verificar si el id_nodo ya existe en la tabla Estudiantes
        cursor.execute("SELECT COUNT(*) FROM Estudiante WHERE id_nodo = %s", (id_nodo,))
        (existe,) = cursor.fetchone()

        if existe == 0:
            cursor.execute(
                "SELECT documento_Identidad, contrasena FROM Usuario WHERE id_nodo = %s",
                (id_nodo,),
            )
            usuario = cursor.fetchone()
            if usuario:
                documento_identidad, contraseña = usuario
                print("Insertando nuevo estudiante...")
                cursor.execute(
                    """
                    INSERT INTO Estudiante (matricula, contrasena, id_nodo)
                    VALUES (%s, %s, %s)
                """,
                    (documento_identidad, contraseña, id_nodo),
                )
                
            else:
                print("Usuario no encontrado.")
                return {"error": "Usuario no encontrado para crear estudiante."}
        else:
            print("El estudiante ya existe.")
        cursor.execute(
            "UPDATE Inscripcion_curso SET estado = 'pagado' WHERE id_curso = %s AND id_usuario = %s",
            (id_curso, id_nodo),
        )
        cursor.execute("UPDATE Usuario SET rol = 'Estudiante' WHERE id_nodo = %s", (id_nodo,))
        conn.commit()
        print("Inscripcion aceptada correctamente.")
        return {"estado": "Inscripcion aceptada correctamente"}
    except mysql.connector.Error as e:
        print("Error al aceptar inscripcion:", e)
        return {"error": str(e)}
    finally:
        if cursor:
            cursor.close()
        if conn and conn.is_connected():
            conn.close()
        print("Conexion cerrada")


def reject_inscripcion(id_curso, id_nodo):
    conn = None
    cursor = None
    try:
        print("Conectando a la base de datos para rechazar inscripcion...")
        conn = get_connection()
        cursor = conn.cursor()
        cursor.execute(
            "UPDATE Inscripcion_curso SET estado = 'cancelado' WHERE id_curso = %s AND id_usuario = %s",
            (id_curso, id_nodo),
        )
        conn.commit()
        print("Inscripcion rechazada correctamente.")
        return {"estado": "Inscripcion rechazada correctamente"}
    except mysql.connector.Error as e:
        print("Error al rechazar inscripcion:", e)
        return {"error": str(e)}
    finally:
        if cursor:
            cursor.close()
        if conn and conn.is_connected():
            conn.close()
        print("Conexion cerrada")


def insert_inscripcion(id_curso, id_usuario):
    conn = None
    cursor = None
    try:
        print("Conectando a la base de datos para insertar inscripcion...")
        conn = get_connection()
        cursor = conn.cursor()
        cursor.execute(
            "INSERT INTO Inscripcion_curso (id_curso, id_usuario, estado) VALUES (%s, %s, 'pendiente')",
            (id_curso, id_usuario),
        )
        conn.commit()
        print("Inscripcion insertada correctamente.")
        return {"estado": "Inscripcion insertada correctamente"}
    except mysql.connector.Error as e:
        print("Error al insertar inscripcion:", e)
        return {"error": str(e)}
    finally:
        if cursor:
            cursor.close()
        if conn and conn.is_connected():
            conn.close()
        print("Conexion cerrada")


def filter(query):
    conn = None
    cursor = None
    try:
        print("Conectando a la base de datos para filtrar...")
        conn = get_connection()
        cursor = conn.cursor(dictionary=True)
        cursor.execute(query)
        resultado = cursor.fetchall()
        return {"data": resultado} if resultado else {"error": "Curso no encontrado"}
    except mysql.connector.Error as e:
        print("Error al encontrar curso:", e)
        return {"error": str(e)}
    finally:
        if cursor:
            cursor.close()
        if conn and conn.is_connected():
            conn.close()
        print("Conexion cerrada")


def eliminar_curso(id_nodo):
    conn = None
    cursor = None
    try:
        print("Conectando a la base de datos para eliminar curso...")
        conn = get_connection()
        cursor = conn.cursor()
        cursor.execute("DELETE FROM Curso WHERE id_curso = %s", (id_nodo,))
        conn.commit()
        print("Curso eliminado correctamente.")
        return {"estado": "Curso eliminado correctamente"}
    except mysql.connector.Error as e:
        print("Error al eliminar curso:", e)
        return {"error": str(e)}
    finally:
        if cursor:
            cursor.close()
        if conn and conn.is_connected():
            conn.close()
        print("Conexion cerrada")


def filter_user(query):
    conn = None
    cursor = None
    try:
        print("Conectando a la base de datos para filtrar...")
        conn = get_connection()
        cursor = conn.cursor(buffered=True, dictionary=True)
        cursor.execute(query)
        resultado = cursor.fetchall()
        return {"data": resultado} if resultado else {"error": "Usuario no encontrado"}
    except mysql.connector.Error as e:
        print("Error al encontrar curso:", e)
        return {"error": str(e)}
    finally:
        if cursor:
            cursor.close()
        if conn and conn.is_connected():
            conn.close()
        print("Conexion cerrada")


def eliminar_usuario(id_nodo):
    conn = None
    cursor = None
    try:
        print("Conectando a la base de datos para eliminar usuario...")
        conn = get_connection()
        cursor = conn.cursor()
        cursor.execute("DELETE FROM Usuario WHERE id_nodo = %s", (id_nodo,))
        conn.commit()
        print("Usuario eliminado correctamente.")
        return {"estado": "Usuario eliminado correctamente"}
    except mysql.connector.Error as e:
        print("Error al eliminar usuario:", e)
        return {"error": str(e)}
    finally:
        if cursor:
            cursor.close()
        if conn and conn.is_connected():
            conn.close()
        print("Conexion cerrada")


def listEstudianteProfesor(curso):
    conn = None
    cursor = None
    try:
        print("Conectando a la base de datos para obtener usuario por email...")
        conn = get_connection()
        cursor = conn.cursor(buffered=True, dictionary=True)
        cursor.execute(
            """
                    SELECT u.nombre_completo, u.email
                    FROM Curso AS c
                    JOIN Estudiante_curso AS ec ON ec.id_curso = c.id_curso
                    JOIN Estudiante AS e ON ec.matricula_estudiante = e.matricula
                    JOIN Usuario AS u ON e.id_nodo = u.id_nodo
                    WHERE c.id_curso = %s;""",
            (curso,),
        )
        resultado = cursor.fetchall()
        return {"data": resultado} if resultado else {"data": None}
    except mysql.connector.Error as e:
        print("Error al obtener usuario por email:", e)
        return {"error": str(e)}
    finally:
        if cursor:
            cursor.close()
        if conn and conn.is_connected():
            conn.close()
        print("Conexion cerrada")


def listaMateriales(curso):
    conn = None
    cursor = None
    try:
        print("Conectando a la base de datos para obtener usuario por email...")
        conn = get_connection()
        cursor = conn.cursor(buffered=True, dictionary=True)
        cursor.execute(
            """
                SELECT m.titulo, m.descripcion, a.ruta_titulo
                FROM Curso AS c
                JOIN Material AS m ON m.id_curso = c.id_curso
                JOIN Archivo AS a ON a.id_archivo = m.id_archivo
                WHERE c.id_curso = %s;""",
            (curso,),
        )
        resultado = cursor.fetchall()
        return {"data": resultado} if resultado else {"data": None}
    except mysql.connector.Error as e:
        print("Error al obtener usuario por email:", e)
        return {"error": str(e)}
    finally:
        if cursor:
            cursor.close()
        if conn and conn.is_connected():
            conn.close()
        print("Conexion cerrada")


def listaTareas(curso):
    conn = None
    cursor = None
    try:
        print("Conectando a la base de datos para obtener usuario por email...")
        conn = get_connection()
        cursor = conn.cursor(buffered=True, dictionary=True)
        cursor.execute(
            """
                SELECT t.id_tarea,t.titulo,t.descripcion,t.fecha_creacion,t.fecha_maxima, c.id_curso
                FROM Curso AS c
                JOIN Tarea AS t ON t.id_curso = c.id_curso
                WHERE c.id_curso = %s;""",
            (curso,),
        )
        resultado = cursor.fetchall()
        return {"data": resultado} if resultado else {"data": None}
    except mysql.connector.Error as e:
        print("Error al obtener usuario por email:", e)
        return {"error": str(e)}
    finally:
        if cursor:
            cursor.close()
        if conn and conn.is_connected():
            conn.close()
        print("Conexion cerrada")


def infoCursos():
    conn = None
    cursor = None
    try:
        print("Conectando a la base de datos para obtener usuario por email...")
        conn = get_connection()
        cursor = conn.cursor(buffered=True, dictionary=True)
        cursor.execute(
            """
                SELECT u.nombre_completo, u.email,c.id_curso, c.nombre, c.categoria, c.fecha_inicio, c.fecha_fin, c.precio, u.rol
                FROM Curso AS c
                JOIN Estudiante_curso AS ec ON ec.id_curso = c.id_curso
                JOIN Estudiante AS e ON ec.matricula_estudiante = e.matricula
                JOIN Usuario AS u ON e.id_nodo = u.id_nodo OR c.id_profesor = u.id_nodo;"""
        )
        resultado = cursor.fetchall()
        return {"data": resultado} if resultado else {"data": None}
    except mysql.connector.Error as e:
        print("Error al obtener usuario por email:", e)
        return {"error": str(e)}
    finally:
        if cursor:
            cursor.close()
        if conn and conn.is_connected():
            conn.close()
        print("Conexion cerrada")

def insertar_material(titulo, descripcion, archivo, id_curso):
    conn = None
    cursor = None
    try:
        print("Conectando a la base de datos para insertar material...")
        conn = get_connection()
        cursor = conn.cursor()
        cursor.callproc("insertar_material", [titulo, descripcion, archivo, id_curso])
        conn.commit()
        print("Material insertado correctamente.")
        resultado = True
        return {"estado": resultado} if resultado else {"data": None}
    except mysql.connector.Error as e:
        print("Error al insertar usuario:", e)
        return {"error": str(e)}
    finally:
        if cursor:
            cursor.close()
        if conn and conn.is_connected():
            conn.close()
        print("Conexion cerrada")

def cargarCursosProfesor(id_nodo):
    conn = None
    cursor = None
    try:
        print("Conectando a la base de datos para obtener cursos del profesor...")
        conn = get_connection()
        cursor = conn.cursor(buffered=True, dictionary=True)
        cursor.execute(
            """
                SELECT c.id_curso, c.nombre, c.categoria, c.fecha_inicio, c.fecha_fin
                FROM Curso AS c
                WHERE c.id_profesor = %s;""",
            (id_nodo,),
        )
        resultado = cursor.fetchall()
        return {"data": resultado} if resultado else {"data": None}
    except mysql.connector.Error as e:
        print("Error al obtener cursos del profesor:", e)
        return {"error": str(e)}
    finally:
        if cursor:
            cursor.close()
        if conn and conn.is_connected():
            conn.close()
        print("Conexion cerrada")

#cargarCursosEstudiante
def cargarCursosEstudiante(id_nodo):
    conn = None
    cursor = None
    try:
        print("Conectando a la base de datos para obtener cursos del estudiante...")
        conn = get_connection()
        cursor = conn.cursor(buffered=True, dictionary=True)
        cursor.execute(
            """
                SELECT c.id_curso, c.nombre, c.categoria, c.fecha_inicio, c.fecha_fin
                FROM Curso AS c
                JOIN Estudiante_curso AS ec ON ec.id_curso = c.id_curso
                JOIN Estudiante AS e ON ec.matricula_estudiante = e.matricula
                JOIN Usuario AS u ON e.id_nodo = u.id_nodo
                WHERE u.id_nodo = %s;""",
            (id_nodo,),
        )
        resultado = cursor.fetchall()
        return {"data": resultado} if resultado else {"data": None}
    except mysql.connector.Error as e:
        print("Error al obtener cursos del estudiante:", e)
        return {"error": str(e)}
    finally:
        if cursor:
            cursor.close()
        if conn and conn.is_connected():
            conn.close()
        print("Conexion cerrada")

#listaMaterialesEstudiantes
def listaMaterialesEstudiantes(curso):
    conn = None
    cursor = None
    try:
        print("Conectando a la base de datos para obtener materiales del estudiante...")
        conn = get_connection()
        cursor = conn.cursor(buffered=True, dictionary=True)
        cursor.execute(
            """
                SELECT m.titulo, m.descripcion, a.ruta_titulo
                FROM Curso AS c
                JOIN Material AS m ON m.id_curso = c.id_curso
                JOIN Archivo AS a ON a.id_archivo = m.id_archivo
                WHERE c.id_curso = %s;""",
            (curso,),
        )
        resultado = cursor.fetchall()
        return {"data": resultado} if resultado else {"data": None}
    except mysql.connector.Error as e:
        print("Error al obtener materiales del estudiante:", e)
        return {"error": str(e)}
    finally:
        if cursor:
            cursor.close()
        if conn and conn.is_connected():
            conn.close()
        print("Conexion cerrada")

def insertar_tarea(titulo,descripcion,fecha_maxima,id_curso):
    conn = None
    cursor = None
    try:
        print("Conectando a la base de datos para insertar inscripcion...")
        conn = get_connection()
        cursor = conn.cursor()
        cursor.execute(
            "INSERT INTO Tarea (titulo, descripcion, fecha_creacion, fecha_maxima, id_curso) VALUES (%s, %s, CURDATE(), %s, %s)",(titulo, descripcion, fecha_maxima,id_curso),
        )
        conn.commit()
        print("Tarea insertada correctamente.")
        return {"estado": "Inscripcion insertada correctamente"}
    except mysql.connector.Error as e:
        print("Error al insertar inscripcion:", e)
        return {"error": str(e)}
    finally:
        if cursor:
            cursor.close()
        if conn and conn.is_connected():
            conn.close()
        print("Conexion cerrada")

def crear_Foro(titulo,descripcion,fecha_maxima,id_curso):
    conn = None
    cursor = None
    try:
        print("Conectando a la base de datos para insertar inscripcion...")
        conn = get_connection()
        cursor = conn.cursor()
        cursor.execute(
            "INSERT INTO Foro (titulo, descripcion, fecha_creacion, fecha_terminacion, id_curso) VALUES (%s, %s, CURDATE(), %s, %s)",(titulo, descripcion, fecha_maxima,id_curso),
        )
        conn.commit()
        print("Tarea insertada correctamente.")
        return {"estado": "Inscripcion insertada correctamente"}
    except mysql.connector.Error as e:
        print("Error al insertar inscripcion:", e)
        return {"error": str(e)}
    finally:
        if cursor:
            cursor.close()
        if conn and conn.is_connected():
            conn.close()
        print("Conexion cerrada")

def listaForos(curso):
    conn = None
    cursor = None
    try:
        print("Conectando a la base de datos para obtener usuario por email...")
        conn = get_connection()
        cursor = conn.cursor(buffered=True, dictionary=True)
        cursor.execute(
            """
                SELECT *
                FROM Foro AS f
                WHERE f.id_curso = %s;""",
            (curso,),
        )
        resultado = cursor.fetchall()
        return {"data": resultado} if resultado else {"data": None}
    except mysql.connector.Error as e:
        print("Error al obtener usuario por email:", e)
        return {"error": str(e)}
    finally:
        if cursor:
            cursor.close()
        if conn and conn.is_connected():
            conn.close()
        print("Conexion cerrada")

def entregar_tarea(id_tarea, matricula_estudiante,fecha_entrega,archivo):
    conn = None
    cursor = None
    print(id_tarea,matricula_estudiante,fecha_entrega,archivo)
    try:
        
        print("Conectando a la base de datos para entregar tarea...")
        conn = get_connection()
        cursor = conn.cursor()
        cursor.callproc("entregar_tarea", [id_tarea,matricula_estudiante,fecha_entrega,archivo])
        conn.commit()
        print("Material insertado correctamente.")
    except mysql.connector.Error as e:
        print("Error al insertar usuario:", e)
        return {"error": str(e)}
    finally:
        if cursor:
            cursor.close()
        if conn and conn.is_connected():
            conn.close()
        print("Conexion cerrada")

def verEntregaTareas(id_tarea):
    conn = None
    cursor = None
    try:
        print("Conectando a la base de datos para obtener cursos del estudiante...")
        conn = get_connection()
        cursor = conn.cursor(buffered=True, dictionary=True)
        cursor.execute(
            """
                SELECT t.id_tarea,t.titulo,u.nombre_completo,a.ruta_titulo, et.puntaje, et.id_entrega
                FROM Tarea AS t
                JOIN Entrega_tarea AS et ON et.id_tarea = t.id_tarea
                JOIN Archivo AS a ON a.id_archivo = et.id_archivo
                JOIN Estudiante AS e ON et.matricula_estudiante = e.matricula
                JOIN Usuario AS u ON e.id_nodo = u.id_nodo
                WHERE t.id_tarea = %s;""",
            (id_tarea,),
        )
        resultado = cursor.fetchall()
        return {"data": resultado} if resultado else {"data": None}
    except mysql.connector.Error as e:
        print("Error al obtener cursos del estudiante:", e)
        return {"error": str(e)}
    finally:
        if cursor:
            cursor.close()
        if conn and conn.is_connected():
            conn.close()
        print("Conexion cerrada")


def mensajes(id_foro):
    conn = None
    cursor = None
    try:
        print("Conectando a la base de datos para obtener usuario por email...")
        conn = get_connection()
        cursor = conn.cursor(buffered=True, dictionary=True)
        cursor.execute(
            """
                SELECT f.id_foro, m.titulo, m.id_mensaje,m.descripcion, m.id_emisor,m.id_mensaje_replica,u.email, u.nombre_completo
                FROM Foro AS f
                JOIN Mensaje AS m ON m.id_foro = f.id_foro
                JOIN Usuario AS u ON u.id_nodo = m.id_emisor
                WHERE f.id_foro = %s;""",
            (id_foro,),
        )
        resultado = cursor.fetchall()
        return {"data": resultado} if resultado else {"data": None}
    except mysql.connector.Error as e:
        print("Error al obtener usuario por email:", e)
        return {"error": str(e)}
    finally:
        if cursor:
            cursor.close()
        if conn and conn.is_connected():
            conn.close()
        print("Conexion cerrada")

def enviar_mensajes(id_nodo,id_foro,titulo,descripcion, id_mensaje_replica):
    conn = None
    cursor = None
    try:
        print("Conectando a la base de datos para insertar inscripcion...")
        conn = get_connection()
        cursor = conn.cursor()
        cursor.execute(
            "INSERT INTO Mensaje (titulo,descripcion,id_emisor,id_mensaje_replica,id_foro) VALUES (%s, %s, %s,%s, %s)",(titulo, descripcion,id_nodo,id_mensaje_replica,id_foro),
        )
        conn.commit()
        print("Tarea insertada correctamente.")
        resultado = True
        return {"estado":resultado} if resultado else {"data": None}
    except mysql.connector.Error as e:
        print("Error al insertar inscripcion:", e)
        return {"error": str(e)}
    finally:
        if cursor:
            cursor.close()
        if conn and conn.is_connected():
            conn.close()
        print("Conexion cerrada")