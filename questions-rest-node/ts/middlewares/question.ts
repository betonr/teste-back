import * as joi from 'joi'

export default {
    register: {
        body: {
            question: joi.string().required(),
            response: joi.boolean().required()
        }
    },
    delete: {
        params: {
            id: joi.string().required()
        }
    },
    select: {
        params: {
            id: joi.string().required()
        }
    },
    vote: {
        body: {
            question_id: joi.string().required(),
            response: joi.boolean().required()
        }
    }
};