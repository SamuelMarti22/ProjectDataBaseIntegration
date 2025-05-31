import mysql.connector
from dotenv import load_dotenv
import os

load_dotenv()

def get_connection():
    return mysql.connector.connect(
        host=os.getenv("DB_HOST"),
        user=os.getenv("DB_USER"),
        password=os.getenv("DB_PASSWORD"),
        database=os.getenv("DB_NAME")
    )

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
