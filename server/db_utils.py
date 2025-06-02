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
        cursor.execute(
            "SELECT COUNT(*) FROM Estudiante WHERE id_nodo = %s", (id_nodo,)
        )
        (existe,) = cursor.fetchone()

        if existe == 0:
            cursor.execute("SELECT documento_Identidad, contrasena FROM Usuario WHERE id_nodo = %s", (id_nodo,))
            usuario = cursor.fetchone()
            if usuario:
                documento_identidad, contraseña = usuario
                print("Insertando nuevo estudiante...")
                cursor.execute("""
                    INSERT INTO Estudiante (matricula, contrasena, id_nodo)
                    VALUES (%s, %s, %s)
                """, (documento_identidad, contraseña, id_nodo))
            else:
                print("Usuario no encontrado.")
                return {"error": "Usuario no encontrado para crear estudiante."}
        else:
            print("El estudiante ya existe.")
        cursor.execute(
            "UPDATE Inscripcion_curso SET estado = 'pagado' WHERE id_curso = %s AND id_usuario = %s",
            (id_curso, id_nodo),
        )
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
        cursor = conn.cursor()
        cursor.execute(query)
        resultado = cursor.fetchall()
        return {"curso": resultado} if resultado else {"error": "Curso no encontrado"}
    except mysql.connector.Error as e:
        print("Error al encontrar curso:", e)
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
        cursor = conn.cursor(buffered=True)
        cursor.execute(query)
        resultado = cursor.fetchall()
        return (
            {"usuario": resultado} if resultado else {"error": "Usuario no encontrado"}
        )
    except mysql.connector.Error as e:
        print("Error al encontrar curso:", e)
        return {"error": str(e)}
    finally:
        if cursor:
            cursor.close()
        if conn and conn.is_connected():
            conn.close()
        print("Conexion cerrada")
