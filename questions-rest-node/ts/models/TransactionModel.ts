import * as mongoose from 'mongoose'

export interface Transaction extends mongoose.Document {
    author_id: number,
    question_id: String,
    type: String,
    points: number,
    created_at: Date
}

const TransactionSchema = new mongoose.Schema({
    author_id: {
        type: Number,
        required: true
    },
    question_id: {
        type: mongoose.Schema.Types.ObjectId,
        required: true
    },
    type: {
        type: String,
        required: true
    },
    points: {
        type: Number,
        required: true
    },
    created_at: Date
})

const saveMiddleware = function (next){
    const transaction: Transaction = this
    transaction.created_at = new Date()
    next()
}

TransactionSchema.pre('save', saveMiddleware)

export default mongoose.model<Transaction>('Transaction', TransactionSchema, 'transactions')
