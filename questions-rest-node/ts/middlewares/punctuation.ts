import * as joi from 'joi'

export default {
    register: {
        body: {
            user_id: joi.number().integer().required()
        }
    },
    select: {
        params: {
            user_id: joi.number().integer().required()
        }
    },
    delete: {
        params: {
            user_id: joi.number().integer().required()
        }
    }
};