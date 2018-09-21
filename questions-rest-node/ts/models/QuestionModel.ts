import * as mongoose from 'mongoose'

export interface Question extends mongoose.Document {
    question: String,
    response: Boolean
    answers: {
        correct: String[],
        wrong: String[]
    },
    author_id: Number,
    created_at: Date
}

const QuestionSchema = new mongoose.Schema({
    question: {
        type: String,
        required: true
    },
    response: {
        type: Boolean,
        required: true
    },
    answers: {
        correct: [ Number ],
        wrong: [ Number ]
    },
    author_id: {
        type: Number,
        required: true
    },
    created_at: Date
})

const saveMiddleware = function (next){
    const question: Question = this
    question.created_at = new Date()
    next()
}

QuestionSchema.pre('save', saveMiddleware)

export default mongoose.model<Question>('Question', QuestionSchema, 'questions')
