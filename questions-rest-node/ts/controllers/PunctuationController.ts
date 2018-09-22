import PunctuationModel from './../models/PunctuationModel'

export class PunctuationController {

    env: any
    constructor(environment) {
        this.env = environment
    }

    async punctuationByUser(id: Number): Promise<Object>{
        if(id)
            try {
                let punctuation = await PunctuationModel.findOne({user_id: id})
                if(punctuation==null) throw {}
                else return { punctuation }

            } catch(_) {
                throw {
                    status: 404,
                    errors: [{ 
                        field: ['user_id'],
                        messages: ['Pontuação do usuário não encontrado']
                    }]
                }
            }
        else 
            try {
                let punctuations = await PunctuationModel.find()
                return { punctuations }
            } catch(error) {
                throw {
                    status: 500, 
                    errors: "Erro interno!"
                }
            }
    }

    async register(user_id: Number): Promise<Object>{
        try {
            let userInfo = await PunctuationModel.findOne({ user_id: user_id })
            if(userInfo == null) {
                let insert = new PunctuationModel({
                    user_id: user_id,
                    points: 0
                })
                let result = await insert.save()
                return {'points': 0}
            } else
                return {'points': userInfo.points}

        } catch(_) {
            throw {
                status: 500,
                errors: "Erro interno!"
            }
        }
    }

    async update(user_id: Number, points: Number): Promise<Object>{
        try {
            let userInfo = await PunctuationModel.findOneAndUpdate({ user_id: user_id }, { points })
            return { points: userInfo.points }

        } catch(_) {
            throw {
                status: 500,
                errors: "Erro interno!"
            }
        }
    }
}