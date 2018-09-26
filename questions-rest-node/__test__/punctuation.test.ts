import 'jest'
import * as request from 'supertest'

import PunctuationModel from '../ts/models/PunctuationModel'
import { environment } from './../ts/_config/environment'

let address = 'localhost:3001'+environment.pathBase

describe('punctuation controller', () => {

    test('get /punctuation', () => {
        return request(address)
            .get('/punctuation')
            .then( response => {
                expect(response.status).toBe(200)
                expect(response.body.punctuations).not.toBeUndefined()
            }).catch(fail)
    })

    test('get /punctuation/:id - success', () => {
        return request(address)
            .post('/punctuation/register')
            .send({
                user_id: 1,
                points: 0
            })
            .then( _ => {
                return request(address)
                    .get('/punctuation/1')
                    .then( response => {
                        expect(response.status).toBe(200)
                        expect(response.body.punctuation).not.toBeUndefined()
                        expect(response.body.punctuation.user_id).toBe("1")
                    }).catch(fail)
            })
    })

    test('get /punctuation/:id - not found', () => {
        return request(address)
            .get('/punctuation/2')
            .then( response => {
                expect(response.status).toBe(404)
                expect(response.body.punctuation).toBeUndefined()
            }).catch(fail)
    })

    test('post /register', () => {
        return request(address)
            .post('/punctuation/register')
            .send({ user_id: 1 })
            .then( response => {
                expect(response.status).toBe(201)
                expect(response.body.points).not.toBeUndefined()
                expect(response.body.points).not.toBeNull()
            }).catch(fail)
    })

})