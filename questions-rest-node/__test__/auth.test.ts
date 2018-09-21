import 'jest'
import * as request from 'supertest'
import * as mongoose from 'mongoose'

import { environment } from './../ts/_config/environment'

let address = 'localhost:3001'+environment.pathBase

describe('auth controller', () => {

    test('post /auth/login - not found', () => {
        return request(address)
            .post('/auth/login')
            .send({
                email: 'usuario@email.com',
                password: 'teste1515'
            })
            .then( response => {
                expect(response.status).toBe(404)
                expect(response.body.errors[0].field).toEqual(['email'])
            }).catch(fail)
    })

    test('post /auth/login - error password', () => {
        return request(address)
            .post('/auth/login')
            .send({
                email: 'usuario1@email.com',
                password: 'teste1515'
            })
            .then( response => {
                expect(response.status).toBe(401)
                expect(response.body.errors[0].field).toEqual(['password'])
            }).catch(fail)
    })

    test('post /auth/login - success', () => {
        return request(address)
            .post('/auth/login')
            .send({
                email: 'usuario1@email.com',
                password: 'betonr1411'
            })
            .then( response => {
                expect(response.status).toBe(202)
                expect(response.body.me).toBeInstanceOf(Object)
                expect(response.body.token).toBeDefined()
            }).catch(fail) 
    })

});