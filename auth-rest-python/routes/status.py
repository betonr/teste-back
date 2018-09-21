from flask import jsonify

from app import app

@app.route('/status')
def status():
    return jsonify({'status': True})
