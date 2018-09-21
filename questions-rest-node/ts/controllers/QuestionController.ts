import QuestionModel from './../models/QuestionModel'
import PunctuationModel from '../models/PunctuationModel';

export class QuestionController {

    env: any
    constructor(environment) {
        this.env = environment
    }

    async question(id): Promise<Object>{
        if(id)
            try {
                let question = await QuestionModel.findOne({_id: id})
                return { question }

            } catch(_) {
                throw {
                    status: 404,
                    errors: [{ 
                        field: ['_id'],
                        messages: ['Questão não encontrada']
                    }]
                }
            }
        else 
            try {
                let questions = await QuestionModel.find()
                return { questions }
            } catch(error) {
                throw {
                    status: 500, 
                    errors: "Erro interno!"
                }
            }
    }

    async register(req): Promise<Object>{
        try {
            let infosQuestion = {
                question: req.body.question,
                response: req.body.response,
                author_id: req.user.id
            }

            let insert = new QuestionModel(infosQuestion)
            let result = await insert.save()
            return {'question': result}

        } catch(error) {
            throw {
                status: 500,
                errors: "Erro interno!"
            }
        }
    }

    async delete(id): Promise<Object>{
        try {
            let question = await QuestionModel.findOne({ _id: id })
            question.remove()
            return {success:true}
        } catch(_) {
            throw {
                status: 404,
                errors: [{ 
                    field: ['_id'],
                    messages: ['Questão não encontrada']
                }]
            }
        }
    }

    async rankingHonesty(): Promise<Object>{
        try {
            let ranking = await QuestionModel.aggregate([
                { $match: { "response": true } },
                { $group: {
                    _id: "$author_id",
                    count: { $sum: 1 }
                } }
            ])
            return { ranking }
            
        } catch(_) {
            throw {
                status: 500,
                errors: "Erro interno!"
            }
        }
    }    
    
    async vote(req): Promise<Object>{
        try {
            let user_id = req.user
            let infos = req.body

            let questionInfo = await QuestionModel.findOne({ _id: infos.question_id })
            let date_question = new Date(questionInfo.created_at)
            date_question.setDate(date_question.getDate()+1)

            // if(questionInfo.author_id == user_id.id) 
            if(questionInfo.author_id != user_id.id) 
                throw {
                    errors: [{ 
                        field: ['user_id'],
                        messages: ['Você não pode votar em uma pergunta que você fez!']
                    }],
                    status: 409
                }
            
            else if(date_question < new Date()) 
                throw {
                    errors: [{ 
                        field: ['created_at'],
                        messages: ['Essa pergunta está com sua votação finalizada!']
                    }],
                    status: 409
                }

            else if(questionInfo.answers.correct.some( id => user_id.id == id) || questionInfo.answers.wrong.some( id => user_id.id == id)) 
                throw {
                    errors: [{ 
                        field: ['answers'],
                        messages: ['Você não pode votar mais de uma vez na mesma pergunta/informação!']
                    }],
                    status: 409
                }

            else {
                //response correct
                if(questionInfo.response == infos.response) {
                    if(questionInfo.answers.correct.length == 2) {
                        let punctuation = await PunctuationModel.findOne({ user_id: questionInfo.author_id })
                        let newPoints = punctuation.points - 1
                        let resultUpdPoint = await PunctuationModel.findOneAndUpdate({ user_id: questionInfo.author_id }, { points: newPoints })
                        
                        let answers = questionInfo.answers
                        answers.correct.push(user_id.id)
                        let resultUpdQuestion = await QuestionModel.findOneAndUpdate({ _id: infos.question_id }, { answers })
                        
                        await resultUpdQuestion.answers.correct.forEach( async id => {
                            let punctuation = await PunctuationModel.findOne({ user_id: id })
                            let newPoints = punctuation.points + (3/1)
                            let result = await PunctuationModel.findOneAndUpdate({ user_id: id }, { points: newPoints })
                        })
                        return { correct: true }
                        
                    } else if(questionInfo.answers.correct.length >= 3) {
                        let count = questionInfo.answers.correct.length+1
                        let allPoints = Math.pow(2, count-3)
                        let lastSumPoints = Math.pow(2, count-1-3) 
                        
                        let answers = questionInfo.answers
                        answers.correct.push(user_id.id)
                        let resultUpdQuestion = await QuestionModel.findOneAndUpdate({ _id: infos.question_id }, { answers })
                        
                        await resultUpdQuestion.answers.correct.forEach( async id => {
                            let punctuation = await PunctuationModel.findOne({ user_id: id })
                            let newPoints = id != user_id ? punctuation.points - lastSumPoints : punctuation.points
                            newPoints += (allPoints/count)
                            let result = await PunctuationModel.findOneAndUpdate({ user_id: id }, { points: newPoints })
                        })

                        let punctuation = await PunctuationModel.findOne({ user_id: questionInfo.author_id })
                        let newPoints = punctuation.points - (allPoints-lastSumPoints)
                        let resultUpdPoint = await PunctuationModel.findOneAndUpdate({ user_id: questionInfo.author_id }, { points: newPoints })
                        return { correct: true }
                        
                    } else {
                        let answers = questionInfo.answers
                        answers.correct.push(user_id.id)
                        let result = await QuestionModel.findOneAndUpdate({ _id: infos.question_id }, { answers })
                        return { correct: true }
                    }

                //response wrong
                } else {
                    if(questionInfo.answers.wrong.length == 2) {
                        let punctuation = await PunctuationModel.findOne({ user_id: questionInfo.author_id })
                        let newPoints = punctuation.points + 1
                        let resultUpdPoint = await PunctuationModel.findOneAndUpdate({ user_id: questionInfo.author_id }, { points: newPoints })
                        
                        let answers = questionInfo.answers
                        answers.wrong.push(user_id.id)
                        let resultUpdQuestion = await QuestionModel.findOneAndUpdate({ _id: infos.question_id }, { answers })
                        
                        await resultUpdQuestion.answers.wrong.forEach( async id => {
                            let punctuation = await PunctuationModel.findOne({ user_id: id })
                            let newPoints = punctuation.points - (3/1)
                            let result = await PunctuationModel.findOneAndUpdate({ user_id: id }, { points: newPoints })
                        })
                        return { correct: false }
                        
                    } else if(questionInfo.answers.wrong.length >= 3) {
                        let count = questionInfo.answers.wrong.length+1
                        let allPoints = Math.pow(2, count-3)
                        let lastSumPoints = Math.pow(2, count-1-3) 
                        
                        let answers = questionInfo.answers
                        answers.wrong.push(user_id.id)
                        let resultUpdQuestion = await QuestionModel.findOneAndUpdate({ _id: infos.question_id }, { answers })
                        
                        await resultUpdQuestion.answers.wrong.forEach( async id => {
                            let punctuation = await PunctuationModel.findOne({ user_id: id })
                            let newPoints = id != user_id ? punctuation.points + lastSumPoints : punctuation.points
                            newPoints -= (allPoints/count)
                            let result = await PunctuationModel.findOneAndUpdate({ user_id: id }, { points: newPoints })
                        })

                        let punctuation = await PunctuationModel.findOne({ user_id: questionInfo.author_id })
                        let newPoints = punctuation.points + (allPoints-lastSumPoints)
                        let resultUpdPoint = await PunctuationModel.findOneAndUpdate({ user_id: questionInfo.author_id }, { points: newPoints })
                        return { correct: false }
                        
                    } else {
                        let answers = questionInfo.answers
                        answers.wrong.push(user_id.id)
                        let result = await QuestionModel.findOneAndUpdate({ _id: infos.question_id }, { answers })
                        return { correct: false }
                    }
                }
            
            }
            
        } catch(error) {
            if(error.errors == undefined)
                throw {
                    errors: [{
                        field: [''],
                        messages: ['Erro interno!']
                    }], 
                    status: 500
                }
            else throw error
        }
    }    
}