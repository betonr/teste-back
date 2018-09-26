import * as request from 'request'

const authentication = function(req, res, next) {
    if(process.env.NODE_ENV == 'test') {
        req.user = req.body.author_id_test != undefined ? { id: req.body.author_id_test, func: '1' } : { id: '1', func: '1' }
        next()

    } else {
        let token = req.headers.authorization
        let options = {
            url: `http://apiauth:5000/auth/validate/${token}`,
            method: 'GET',
            json: true
        }
        request(options, (_, response, body) => {
            if(response == undefined || response.statusCode >= 400) 
                res.status(401).send({
                    error: 'Você não tem permissão para acessar esse recurso'
                })
            else {
                req.user = { id: body.id, func: body.func }
                next()
            }
        })
    }
}

const isAdmin = function(req, res, next) {
    if(process.env.NODE_ENV == 'test') next()
    else {
        if(req.user != null && req.user.func == 2) 
            next()
        else 
            res.status(403).send({
                error: 'Você precisa ser administrador'
            })
    }
}

export default {
    authentication,
    isAdmin
}

