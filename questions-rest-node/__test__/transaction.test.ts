import 'jest'
import * as request from 'supertest'

import { environment } from './../ts/_config/environment'

let address = 'localhost:3001'+environment.pathBase

describe('transaction controller', () => {

    test('get /transaction', () => {
        return request(address)
            .get('/transaction')
            .then( response => {
                expect(response.status).toBe(200)
                expect(response.body.transactions).not.toBeUndefined()
            }).catch(fail)
    })

})