import 'jest'
import * as request from 'supertest'
import * as mongoose from  'mongoose'

import QuestionModel from '../ts/models/QuestionModel'
import { environment } from './../ts/_config/environment'

let address = 'localhost:3001'+environment.pathBase

describe('question controller', () => {

    test('get /', () => {
        return request(address)
            .get('/question')
            .then( response => {
                expect(response.status).toBe(200)
                expect(response.body.questions).not.toBeUndefined()
            }).catch(fail)
    })

    test('get /:id - success', async () => {
        return request(address)
            .post('/question/register')
            .send({
                question: 'question test ...',
                response: true
            })
            .then( result => {
                return request(address)
                    .get(`/question/${result.body.question._id}`)
                    .then( response => {
                        expect(response.status).toBe(200)
                        expect(response.body.question).not.toBeUndefined()
                        expect(response.body.question._id).toBe(result.body.question._id)
                    }).catch(fail) 
            })
    })

    test('get /:id - error', async () => {
        return request(address)
            .get(`/question/1`)
            .then( response => {
                expect(response.status).toBe(404)
                expect(response.body.question).toBeUndefined()
            }).catch(fail) 
    })

    test('post /register - success', () => {
        return request(address)
            .post('/question/register')
            .send({
                question: 'question test ...',
                response: true
            })
            .then( response => {
                expect(response.status).toBe(201)
                expect(response.body.question).not.toBeUndefined()
                expect(response.body.question.author_id).toBe(1)
            }).catch(fail) 
    })

    test('post /register - error', () => {
        return request(address)
            .post('/question/register')
            .send({
                question: 'question test ...'
            })
            .then( response => {
                expect(response.status).toBe(400)
            }).catch(fail) 
    })

    test('post /register - error', () => {
        return request(address)
            .post('/question/register')
            .send({
                response: false
            })
            .then( response => {
                expect(response.status).toBe(400)
            }).catch(fail) 
    })

    test('delete /delete - success', () => {
        return request(address)
            .post('/question/register')
            .send({
                question: 'question test ...',
                response: true
            })
            .then( result => {
                return request(address)
                    .delete(`/question/delete/${result.body.question._id}`)
                    .then( response => {
                        expect(response.status).toBe(200)
                        expect(response.body).toEqual({ success: true })
                    }).catch(fail) 
                })
    })

    test('delete /delete - error', () => {
        return request(address)
            .delete('/question/delete/1')
            .then( response => {
                expect(response.status).toBe(404)
                expect(response.body.errors).not.toBeUndefined()
            }).catch(fail) 
    })

    test('get /ranking/honesty', () => {
        return request(address)
            .post('/question/register')
            .send({
                question: 'question test ...',
                response: true,
                author_id_test: 2
            })
            //author = 2 (not contabilized)
            .then( _ => {
                return request(address)
                    .post('/question/register')
                    .send({
                        question: 'question test ...',
                        response: false,
                        author_id_test: 2
                    })
            })
            .then( _ => {
                return request(address)
                    .post('/question/register')
                    .send({
                        question: 'question test ...',
                        response: false,
                        author_id_test: 2
                    })
            })
            //author = 3
            .then( _ => {
                return request(address)
                    .post('/question/register')
                    .send({
                        question: 'question test ...',
                        response: true,
                        author_id_test: 3
                    })
            })
            .then( _ => {
                return request(address)
                    .post('/question/register')
                    .send({
                        question: 'question test ...',
                        response: true,
                        author_id_test: 3
                    })
            })
            .then( _ => {
                return request(address)
                    .post('/question/register')
                    .send({
                        question: 'question test ...',
                        response: true,
                        author_id_test: 3
                    })
            })
            //last test
            .then( _ => {
                return request(address)
                    .get('/question/ranking/honesty')
                    .then( response => {
                        expect(response.status).toBe(200)
                        expect(response.body).toEqual({"ranking": [{"_id": 3, "count": 3}, {"_id": 2, "count": 1}, {"_id": 1, "count": 2}]})
                    }).catch(fail)
            })
    })

})