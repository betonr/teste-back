import * as joi from 'joi'

export default {
    register: {
        body: {
            name: joi.string().required(),
            name_fantasia: joi.string().allow('').optional(),
            email: joi.string().email().regex(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/).required(),
            cnpj: joi.string().regex(/[0-9]{11,11}/).required(),
            password: joi.string().regex(/[a-zA-Z0-9]{8,30}/).options({
                language: {
                  string: {
                    regex: {
                      base: 'A senha precisa ter no mínimo 8 caracteres entre números e letras'
                    }
                  }
                }
            }).required(),
            address: joi.object().keys({
                cep: joi.string().regex(/[0-9]{8}/).required(),
                logradouro: joi.string().required(),
                number: joi.string().required(),
                district: joi.string().required(),
                city: joi.string().required()
            }).required()
        }
    },
    update: {
        body: {
            password: joi.string().regex(/[a-zA-Z0-9]{8,30}/).options({
                language: {
                  string: {
                    regex: {
                      base: 'A senha precisa ter no mínimo 8 caracteres entre números e letras'
                    }
                  }
                }
            }),
            email: joi.string().email().regex(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/).required(),
            address: joi.array().items( joi.object().keys({
                cep: joi.string().regex(/[0-9]{8}/).required(),
                logradouro: joi.string().required(),
                number: joi.string().required(),
                district: joi.string().required(),
                city: joi.string().required()
            }) ).required()
        }
    },
    select: {
        params: {
            id: joi.string().required()
        }
    },
    delete: {
        params: {
            id: joi.string().required()
        }
    },
    active: {
        params: {
            token: joi.string().required()
        }
    },
    resendEmail: {
        body: {
            id: joi.string().required(),
            email: joi.string().email().required()
        }
    }
};