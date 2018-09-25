from flask import json
from app import app

import unittest

class TestUser(unittest.TestCase):

    def setUp(self):
        self.appTest = app.test_client()
        
    def test_users(self):
        response = self.appTest.get('/user/')
        self.assertEqual(200, response.status_code)
        self.assertEqual('application/json', response.content_type)
        self.assertIsNotNone(json.loads(response.data))
        self.assertIn('users', json.loads(response.data))
        
    def test_userById_success(self):
        response = self.appTest.get('/user/1')
        self.assertEqual(200, response.status_code)
        self.assertEqual('application/json', response.content_type)
        self.assertIsNotNone(json.loads(response.data))
        self.assertIn('users', json.loads(response.data))

    def test_userById_error(self):
        response = self.appTest.get('/user/1a')
        self.assertEqual(404, response.status_code)
        self.assertEqual('text/html', response.content_type)