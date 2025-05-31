from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from server import db_utils

app = FastAPI()

# Habilitar CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # En producción, reemplaza * por la URL específica del frontend
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/usuarios")
def leer_usuarios():
    resultado = db_utils.get_usuarios()
    if "error" in resultado:
        raise HTTPException(status_code=500, detail=resultado["error"])
    return resultado

# @app.post("/usuarios")
# def crear_usuario(usuario: dict):
#     try:
#         insert_usuario(tuple(usuario.values()))
#         return {"mensaje": "Usuario creado exitosamente"}
#     except Exception as e:
#         raise HTTPException(status_code=500, detail=str(e))
