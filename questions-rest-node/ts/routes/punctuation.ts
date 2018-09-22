import * as validate from 'express-validation'

import authMiddlewares from './../middlewares/auth'
import punctuationMiddlewares from './../middlewares/punctuation'
import { PunctuationController } from './../controllers/PunctuationController'

export default (app, environment): void => {

    const Punctuation = new PunctuationController(environment)

    app.get(environment.pathBase+"/punctuation",
        authMiddlewares.authentication,
        (_, res) => Punctuation.punctuationByUser(null)
            .then( response => res.status(200).send(response) )
            .catch( error => res.status(error.status).send({errors: error.errors}) ))

    app.get(environment.pathBase+"/punctuation/:user_id",
        authMiddlewares.authentication,
        validate(punctuationMiddlewares.select),
        (req, res) => Punctuation.punctuationByUser(req.params.user_id)
            .then( response => res.status(200).send(response) )
            .catch( error => res.status(error.status).send({errors: error.errors}) ))
    
    app.post(environment.pathBase+"/punctuation/register",
        authMiddlewares.authentication,
        validate(punctuationMiddlewares.register),
        (req, res) => Punctuation.register(req.body.user_id)
            .then( response => res.status(201).send(response) )
            .catch( error => res.status(error.status).send({errors: error.errors}) ))
}