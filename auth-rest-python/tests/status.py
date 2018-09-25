from flask import json
from app import app

import unittest

class TestStatus(unittest.TestCase):

    def setUp(self):
        self.appTest = app.test_client()
        
    def test_status(self):
        response = self.appTest.get('/')
        self.assertEqual(200, response.status_code)
        self.assertEqual('application/json', response.content_type)
        self.assertEqual(json.loads(response.data)['status'], 'API AUTH - RODANDO COM SUCESSO')