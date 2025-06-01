import os

import mysql.connector
from dotenv import load_dotenv

load_dotenv()

def get_connection():
    return mysql.connector.connect(
        host=os.getenv("DB_HOST"),
        user=os.getenv("DB_USER"),
        password=os.getenv("DB_PASSWORD"),
        database=os.getenv("DB_NAME")
    )

#Get usuarios
def get_usuarios():
    conn = None
    cursor = None
    try:
        print("Conectando a la base de datos...")
        conn = get_connection()
        cursor = conn.cursor(dictionary=True)
        cursor.execute("SELECT * FROM Usuario")
        resultados = cursor.fetchall()
        return {"data" : resultados}
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
        cursor.execute("INSERT INTO Usuario (documento_Identidad, nombre_completo, email, genero, referencia_bancaria, contrasena, rol) VALUES (%s, %s, %s,%s, %s, %s,%s)", usuario)
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

#Get Profesores

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
        cursor.execute("SELECT * FROM Curso")
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
        cursor.execute("SELECT * FROM Solicitud_curso")
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
        cursor.execute("SELECT * FROM Inscripcion_curso")
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
        cursor.execute("SELECT documento_Identidad,contrasena,id_nodo,rol FROM Usuario WHERE documento_Identidad = %s AND contrasena = %s", (usuario, contrasena))
        resultado = cursor.fetchone()
        return {"usuario": resultado[0],"constrasena":resultado[1],"id_nodo":resultado[2],"rol":resultado[3]} if resultado else {"error": "Usuario o contraseña incorrectos"}
    except mysql.connector.Error as e:
        print("Error al verificar usuario:", e)
        return {"error": str(e)}
    finally:
        if cursor:
            cursor.close()
        if conn and conn.is_connected():
            conn.close()
        print("Conexion cerrada")