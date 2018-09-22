import authMiddlewares from './../middlewares/auth'
import { TransactionController } from './../controllers/TransactionController'

export default (app, environment): void => {

    const Transaction = new TransactionController(environment)

    app.get(environment.pathBase+"/transaction",
        authMiddlewares.authentication,
        authMiddlewares.isAdmin,
        (_, res) => Transaction.transaction()
            .then( response => res.status(200).send(response) )
            .catch( error => res.status(error.status).send({errors: error.errors}) ))
            
}