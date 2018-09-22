import * as express from 'express'

import Status from './status'
import Punctuation from './punctuation'
import Question from './question'
import Transaction from './transaction'

export class Router {

    app: express.Express
    env: any
    constructor(app, environment){
        this.app = app
        this.env = environment
    }

    init() {
        Status(this.app, this.env)
        Punctuation(this.app, this.env)
        Question(this.app, this.env)
        Transaction(this.app, this.env)
    }
}