import * as validate from 'express-validation'

import authMiddlewares from './../middlewares/auth'
import questionMiddlewares from './../middlewares/question'
import { QuestionController } from './../controllers/QuestionController'

export default (app, environment): void => {

    const Question = new QuestionController(environment)

    app.get(environment.pathBase+"/question",
        authMiddlewares.authentication,
        (_, res) => Question.question(null)
            .then( response => res.status(200).send(response) )
            .catch( error => res.status(error.status).send({errors: error.errors}) ))

    app.get(environment.pathBase+"/question/:id",
        authMiddlewares.authentication,
        validate(questionMiddlewares.select),
        (req, res) => Question.question(req.params.id)
            .then( response => res.status(200).send(response) )
            .catch( error => res.status(error.status).send({errors: error.errors}) ))
    
    app.post(environment.pathBase+"/question/register",
        authMiddlewares.authentication,
        validate(questionMiddlewares.register),
        (req, res) => Question.register(req)
            .then( response => res.status(201).send(response) )
            .catch( error => res.status(error.status).send({errors: error.errors}) ))
           
    app.delete(environment.pathBase+"/question/delete/:id",
        authMiddlewares.authentication,
        validate(questionMiddlewares.delete),
        (req, res) => Question.delete(req.params.id)
            .then( response => res.status(200).send(response) )
            .catch( error => res.status(error.status).send({errors: error.errors}) ))
    
    app.get(environment.pathBase+"/question/ranking/honesty",
        authMiddlewares.authentication,
        (_, res) => Question.rankingHonesty()
            .then( response => res.status(200).send(response) )
            .catch( error => res.status(error.status).send({errors: error.errors}) ))

    app.post(environment.pathBase+"/question/vote",
        authMiddlewares.authentication,
        validate(questionMiddlewares.vote),
        (req, res) => Question.vote(req)
            .then( response => res.status(200).send(response) )
            .catch( error => res.status(error.status).send({errors: error.errors}) ))
}