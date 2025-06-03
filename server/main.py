from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import Optional
from server import db_utils

app = FastAPI()

# Habilitar CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"], 
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

@app.get("/cursosCompleto")
def leer_cursos():
    resultado = db_utils.get_Cursos_Completo()
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

class curso(BaseModel):
    curso: str

class tarea(BaseModel):
    id_tarea: int

class foro(BaseModel):
    id_foro: int

class buscarUsuarioRequest(BaseModel):
    id_nodo: int

class eliminarCursoRequest(BaseModel):
    id_curso: str

class InsertMaterial(BaseModel):
    titulo: str
    descripcion: str
    archivo: str
    id_curso: str

class InsertTarea(BaseModel):
    titulo: str
    descripcion: str
    fecha_maxima: str
    id_curso: str

class EntregarTarea(BaseModel):
    id_tarea: int
    matricula_estudiante: int
    fecha_entrega: str
    archivo: str

class EnviarMensaje(BaseModel):
    id_nodo: int
    id_foro: int
    titulo: str
    descripcion: str
    id_mensaje_replica: Optional[int] = None

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
    resultado = db_utils.filter_user(request.query)
    print(resultado)
    return resultado

@app.post("/listEstudianteProfesor")
def login(request: curso):
    resultado = db_utils.listEstudianteProfesor(request.curso)
    print(resultado)
    return resultado

@app.post("/listaMateriales")
def login(request: curso):
    resultado = db_utils.listaMateriales(request.curso)
    print(resultado)
    return resultado

@app.post("/listaTareas")
def login(request: curso):
    resultado = db_utils.listaTareas(request.curso)
    print(resultado)
    return resultado

@app.delete("/eliminarUsuario")
def eliminar_usuario(request: buscarUsuarioRequest):
    print("Eliminando usuario con ID:", request.id_nodo)
    resultado = db_utils.eliminar_usuario(request.id_nodo)
    if "error" in resultado:
        raise HTTPException(status_code=500, detail=resultado["error"])
    return {"message": "Usuario eliminado correctamente"}

@app.delete("/eliminarCurso")
def eliminar_curso(request: eliminarCursoRequest):
    print("Eliminando curso con ID:", request.id_curso)
    resultado = db_utils.eliminar_curso(request.id_curso)
    if "error" in resultado:
        raise HTTPException(status_code=500, detail=resultado["error"])
    return {"message": "Curso eliminado correctamente"}

@app.post("/verEntregaTareas")
def login(request: tarea):
    resultado = db_utils.verEntregaTareas(request.id_tarea)
    print(resultado)
    return resultado

@app.get("/infoCursos")
def login():
    resultado = db_utils.infoCursos()
    print(resultado)
    return resultado

@app.post("/insertMaterial")
def insertar_material(request: InsertMaterial):
    resultado = db_utils.insertar_material(request.titulo, request.descripcion, request.archivo, request.id_curso)
    print(resultado)
    return resultado

@app.post("/insertTarea")
def insertar_tarea(request: InsertTarea):
    resultado = db_utils.insertar_tarea(request.titulo, request.descripcion,request.fecha_maxima, request.id_curso)
    print(resultado)
    return resultado

@app.post("/crearForo")
def crear_Foro(request: InsertTarea):
    resultado = db_utils.crear_Foro(request.titulo, request.descripcion,request.fecha_maxima, request.id_curso)
    print(resultado)
    return resultado

@app.post("/cargarCursosProfesor")
def login(request: buscarUsuarioRequest):
    resultado = db_utils.cargarCursosProfesor(request.id_nodo)
    print(resultado)
    return resultado

@app.post("/listaForos")
def listaForos(request: curso):
    resultado = db_utils.listaForos(request.curso)
    print(resultado)
    return resultado

@app.post("/entregarTarea")
def entregar_tarea(request: EntregarTarea):
    resultado = db_utils.entregar_tarea(request.id_tarea, request.matricula_estudiante,request.fecha_entrega, request.archivo)
    print(resultado)
    return resultado

@app.post("/cargarCursosEstudiante")
def cargar_cursos_estudiante(request: buscarUsuarioRequest):
    resultado = db_utils.cargarCursosEstudiante(request.id_nodo)
    print(resultado)
    return resultado

@app.post("/listaMaterialesEstudiantes")
def lista_materiales_estudiantes(request: curso):
    resultado = db_utils.listaMaterialesEstudiantes(request.curso)
    print(resultado)
    return resultado


@app.post("/mensajes")
def mensajes(request: foro):
    resultado = db_utils.mensajes(request.id_foro)
    print(resultado)
    return resultado

@app.post("/enviar_mensaje")
def mensajes(request: EnviarMensaje):
    resultado = db_utils.enviar_mensajes(request.id_nodo, request.id_foro, request.titulo, request.descripcion, request.id_mensaje_replica)
    print(resultado)
    return resultado

class CalificarRequest(BaseModel):
    id_entrega: int
    puntaje: float

#/calificar
@app.post("/calificar")
def calificar(request: CalificarRequest):
    resultado = db_utils.calificar(request.id_entrega, request.puntaje)
    print(resultado)
    return resultado