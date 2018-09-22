from flask import jsonify

from app import app

@app.route('/')
def status():
    return jsonify({'status': 'API AUTH - RODANDO COM SUCESSO'})
