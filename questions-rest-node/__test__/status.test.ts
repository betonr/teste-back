import 'jest'
import * as request from 'supertest'

import { environment } from './../ts/_config/environment'

let address = 'localhost:3001'+environment.pathBase;

describe('system status', () => {
    
    test('get / - status', () => {
        return request(address)
            .get('/')
            .then( response => {
                expect(response.status).toBe(200)
                expect(response.body.status).not.toBeUndefined()
            }).catch(fail)
    })

})