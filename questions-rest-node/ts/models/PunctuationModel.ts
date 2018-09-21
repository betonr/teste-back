import * as mongoose from 'mongoose'

export interface Punctuation extends mongoose.Document {
    user_id: string,
    points: number,
    created_at: Date,
    updated_at: Date
} 

const PunctuationSchema = new mongoose.Schema({
    user_id: {
        type: String,
        required: true,
        unique: true
    },
    points: {
        type: Number,
        default: 0
    },
    created_at: Date,
    updated_at: Date
})

const saveMiddleware = function (next){
    const punctuation: Punctuation = this
    punctuation.created_at = new Date()
    punctuation.updated_at = new Date()
    next()
}

const updateMiddleware = function (next){
    const punctuation: Punctuation = this
    punctuation.updated_at = new Date()
    next()
}

PunctuationSchema.pre('save', saveMiddleware)
PunctuationSchema.pre('findOneAndUpdate', updateMiddleware)

export default mongoose.model<Punctuation>('Punctuation', PunctuationSchema, 'punctuations')
