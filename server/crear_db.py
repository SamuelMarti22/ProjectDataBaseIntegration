import mysql.connector

# Datos de conexión a tu instancia RDS
host = 'prueba1.cluwgo82u672.us-east-2.rds.amazonaws.com'
user = 'admin'  # o el que hayas definido
password = 'SamuYLau2227'
port=3306

# Lee el script SQL
with open(r'server\proyecto_ddl.sql', 'r', encoding='utf-8') as file:
    sql_script = file.read()

with open(r'server\proyecto_dml.sql', 'r', encoding='utf-8') as file:
    sql_script += file.read()

try:
    # Conecta a MySQL sin especificar base de datos
    conn = mysql.connector.connect(
        host=host,
        user=user,
        password=password,
        port=port
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
