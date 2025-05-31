import mysql.connector

def get_connection():
    return mysql.connector.connect(
        host="prueba1.cluwgo82u672.us-east-2.rds.amazonaws.com",
        user="admin",
        password="SamuYLau2227",
        database="gestionnodo"
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
