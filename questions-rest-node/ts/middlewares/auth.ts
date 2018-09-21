import * as request from 'request'

const authentication = function(req, res, next) {
    let token = req.headers.authorization
    let options = {
        url: `http://localhost:5000/auth/validate/${token}`,
        method: 'GET',
        json: true
    }
    request(options, (_, response, body) => {
        if(response.statusCode >= 400) 
            res.status(403).send({
                error: 'Você não tem permissão para acessar esse recurso'
            })
        else {
            req.user = {id: body.id}
            next()
        }
    })
}

export default {
    authentication
}

