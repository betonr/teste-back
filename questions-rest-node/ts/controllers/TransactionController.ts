import TransactionModel from './../models/TransactionModel'

export class TransactionController {

    env: any
    constructor(environment) {
        this.env = environment
    }

    async transaction(): Promise<Object>{
        try {
            let transactions = await TransactionModel.find()
            return { transactions }
        } catch(error) {
            throw {
                status: 500, 
                errors: "Erro interno!"
            }
        }
    }

    async register(infos): Promise<Object>{
        try {
            let insert = new TransactionModel(infos)
            let result = await insert.save()
            return { success: true }

        } catch(_) {
            throw {
                status: 500,
                errors: "Erro interno!"
            }
        }
    }
}