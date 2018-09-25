from flask import json
from app import app

import unittest

class TestAuth(unittest.TestCase):

    def setUp(self):
        self.appTest = app.test_client()
        
    def test_facebook_error(self):
        response = self.appTest.get('/auth/facebook/asdasdas')
        self.assertEqual(403, response.status_code)
        self.assertEqual('application/json', response.content_type)
        self.assertIsNotNone(json.loads(response.data))
        self.assertIn('message', json.loads(response.data))

    def test_admin_sucess(self):
        response = self.appTest.post('/auth/admin', json={
            "email": "admin@admin.com",
            "password": "admin"
        })
        self.assertEqual(200, response.status_code)
        self.assertEqual('application/json', response.content_type)
        self.assertIsNotNone(json.loads(response.data))
        self.assertIn('token', json.loads(response.data))
        self.assertIn('me', json.loads(response.data))

    def test_admin_400(self):
        response = self.appTest.post('/auth/admin', json={
            "name": "a@a.com",
            "password": "admin"
        })
        self.assertEqual(400, response.status_code)
        self.assertEqual('application/json', response.content_type)
        self.assertIsNotNone(json.loads(response.data))
        self.assertIn('message', json.loads(response.data))
    
    def test_admin_401(self):
        response = self.appTest.post('/auth/admin', json={
            "email": "admin@admin.com",
            "password": "adminadmin"
        })
        self.assertEqual(401, response.status_code)
        self.assertEqual('application/json', response.content_type)
        self.assertIsNotNone(json.loads(response.data))
        self.assertIn('message', json.loads(response.data))

    def test_admin_404(self):
        response = self.appTest.post('/auth/admin', json={
            "email": "a@a.com",
            "password": "admin"
        })
        self.assertEqual(404, response.status_code)
        self.assertEqual('application/json', response.content_type)
        self.assertIsNotNone(json.loads(response.data))
        self.assertIn('message', json.loads(response.data))
    
    def test_valide_succes(self):
        token = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpYXQiOjE1Mzc5MDg0MzUsIm5iZiI6MTUzNzkwODQzNSwianRpIjoiZmQ4MWE3OGMtZjk0Yy00NGVkLTlmOWYtZTQyYTVlNzIyNDBjIiwiaWRlbnRpdHkiOiJhZG1pbkBhZG1pbi5jb20iLCJmcmVzaCI6ZmFsc2UsInR5cGUiOiJhY2Nlc3MifQ.vh9VDoU2OFO095MXlSRCkUvPtSBVyQzD_zTr_VrP8-M"
        response = self.appTest.get('/auth/validate/'+token)
        self.assertEqual(200, response.status_code)
        self.assertEqual('application/json', response.content_type)
        self.assertIsNotNone(json.loads(response.data))
        self.assertIn('id', json.loads(response.data))
        self.assertIn('func', json.loads(response.data))

    def test_valide_error(self):
        response = self.appTest.get('/auth/validate/ajsnd')
        self.assertEqual(403, response.status_code)
        self.assertEqual('application/json', response.content_type)
        self.assertIsNotNone(json.loads(response.data))
        self.assertIn('message', json.loads(response.data))