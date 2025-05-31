import mysql.connector
from dotenv import load_dotenv
import os

load_dotenv()

# Lee el script SQL
with open(r'server\proyecto_ddl.sql', 'r', encoding='utf-8') as file:
    sql_script = file.read()

with open(r'server\proyecto_dml.sql', 'r', encoding='utf-8') as file:
    sql_script += file.read()

try:
    # Conecta a MySQL sin especificar base de datos
    conn = mysql.connector.connect(
        host=os.getenv("DB_HOST"),
        user=os.getenv("DB_USER"),
        password=os.getenv("DB_PASSWORD"),
        database=os.getenv("DB_NAME")
    )
    cursor = conn.cursor(buffered=True)
    # Dividir en sentencias individuales (por ; )
    for statement in sql_script.strip().split(';'):
        stmt = statement.strip()
        if stmt:
            cursor.execute(stmt)
    
    conn.commit()
    print("Base de datos y tablas creadas correctamente.")



except mysql.connector.Error as err:
    print(f"Error al ejecutar el script SQL: {err}")

finally:
    if conn.is_connected():
        cursor.close()
        conn.close()
