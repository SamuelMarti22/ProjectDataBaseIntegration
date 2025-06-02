from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel

from server import db_utils

app = FastAPI()

# Habilitar CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # En producción, reemplaza * por la URL específica del frontend
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"]
)

@app.get("/usuarios")
def leer_usuarios():
    resultado = db_utils.get_usuarios()
    if "error" in resultado:
        raise HTTPException(status_code=500, detail=resultado["error"])
    return resultado

@app.get("/cursos")
def leer_cursos():
    resultado = db_utils.get_Cursos()
    if "error" in resultado:
        raise HTTPException(status_code=500, detail=resultado["error"])
    return resultado

@app.get("/verificar_tablas")
def verificar_tablas():
    tablas = {
        "usuarios": db_utils.get_usuarios,
        "estudiantes": db_utils.get_Estudiantes,
        "profesores": db_utils.get_Profesores,
        "cursos": db_utils.get_Cursos,
        "inscripciones": db_utils.get_inscripciones,
        "tareas": db_utils.get_Tareas,
        "foros": db_utils.get_foros,
        "archivos": db_utils.get_Archivos,
        "entrega-tareas": db_utils.get_entrega_tarea,
        "estdiantes-cursos": db_utils.get_matriculas,
        "materiales": db_utils.get_Materiales,
        "Mensajes": db_utils.get_mensajes,
        "pagos": db_utils.get_pagos,
        "solicitudes": db_utils.get_solicitudes,
    }

    resultados = {}

    for nombre, funcion in tablas.items():
        resultado = funcion()
        if "data" in resultado and resultado["data"]:
            resultados[nombre] = "Ok"
        else:
            resultados[nombre] = "Malo"

    return resultados


class LoginRequest(BaseModel):
    username: str
    password: str

class InsertRequest(BaseModel):
    documento_Identidad: str
    nombre_completo: str
    email: str
    genero: str
    referencia_bancaria: str
    contrasena:str
    rol: str

class InsertCourseRequest(BaseModel):
    id_curso: str
    nombre: str
    categoria: str
    ruta: str
    fecha_inicio: str
    fecha_fin: str
    ano: str
    semestre: str
    precio: str
    id_profesor: str

class InsertSolicitudRequest(BaseModel):
    id_curso: str
    id_profesor: int

class AcceptRequest(BaseModel):
    id_curso: str
    id_nodo: int

class query(BaseModel):
    query: str

@app.post("/login")
def login(request: LoginRequest):
    # Simulación de verificación de usuario (aquí iría tu lógica real)
    resultado = db_utils.verificar_usuario(request.username,request.password)
    print(resultado)
    print(request.username, request.password)
    print("Usuario:", resultado["usuario"])
    usuario = str(resultado["usuario"]).strip() == str(request.username).strip()
    contrasena = str(resultado["contrasena"]).strip() == str(request.password).strip()
    if usuario and contrasena:
        return resultado
    else:
        return {"error": "Usuario o contraseña incorrectos"}

@app.post("/insert_user")
def login(request: InsertRequest):
    # Simulación de verificación de usuario (aquí iría tu lógica real)
    resultado = db_utils.insert_user(request.documento_Identidad,request.nombre_completo,request.email,request.genero,request.referencia_bancaria,request.contrasena,request.rol)
    print(resultado)
    return resultado

@app.post("/insert_course")
def login(request: InsertCourseRequest):
    # Simulación de verificación de usuario (aquí iría tu lógica real)
    resultado = db_utils.insert_course(request.id_curso,request.nombre,request.categoria,request.ruta,request.fecha_inicio,request.fecha_fin,request.ano,request.semestre,request.precio,request.id_profesor)
    print(resultado)
    return resultado

@app.post("/insert_solicitud")
def insert_solicitud(request: InsertSolicitudRequest):
    resultado = db_utils.insert_solicitud(request.id_curso, request.id_profesor)
    print(resultado)
    return resultado

@app.get("/soliciudes_teachers")
def get_solicitudes_teachers():
    resultado = db_utils.get_solicitudes()
    if "error" in resultado:
        raise HTTPException(status_code=500, detail=resultado["error"])
    return resultado

@app.post("/accept_teachers")
def accept_teachers(request: AcceptRequest):
    resultado = db_utils.accept_solicitud(request.id_curso, request.id_nodo)
    if "error" in resultado:
        raise HTTPException(status_code=500, detail=resultado["error"])
    return resultado

@app.post("/reject_teachers")
def accept_teachers(request: AcceptRequest):
    resultado = db_utils.reject_solicitud(request.id_curso, request.id_nodo)
    if "error" in resultado:
        raise HTTPException(status_code=500, detail=resultado["error"])
    return resultado

@app.get("/inscripciones_students")
def inscripciones_students():
    resultado = db_utils.get_inscripciones()
    if "error" in resultado:
        raise HTTPException(status_code=500, detail=resultado["error"])
    return resultado

@app.post("/accept_students")
def accept_students(request: AcceptRequest):
    resultado = db_utils.accept_inscripcion(request.id_curso, request.id_nodo)
    if "error" in resultado:
        raise HTTPException(status_code=500, detail=resultado["error"])
    return resultado

#/reject_students
@app.post("/reject_students")
def reject_students(request: AcceptRequest):
    resultado = db_utils.reject_inscripcion(request.id_curso, request.id_nodo)
    if "error" in resultado:
        raise HTTPException(status_code=500, detail=resultado["error"])
    return resultado

@app.post("/insert_inscripcion")
def insert_inscripcion(request: AcceptRequest):
    resultado = db_utils.insert_inscripcion(request.id_curso, request.id_nodo)
    if "error" in resultado:
        raise HTTPException(status_code=500, detail=resultado["error"])
    return resultado

@app.post("/filter")
def login(request: query):
    # Simulación de verificación de usuario (aquí iría tu lógica real)
    resultado = db_utils.filter(request.query)
    print(resultado)
    return resultado

@app.post("/filterUser")
def login(request: query):
    # Simulación de verificación de usuario (aquí iría tu lógica real)
    resultado = db_utils.filter_user(request.query)
    print(resultado)
    return resultado