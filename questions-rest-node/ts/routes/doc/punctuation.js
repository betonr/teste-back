/**
 * @api {get} /punctuation Lista de pontuações
 * @apiGroup Pontuacoes
 *
 * @apiHeader authentication {String} Token para autenticação
 * 
 * @apiSuccessExample {json} Sucesso
 *    HTTP/1.1 200 OK
 *    {
 *        "punctuations": [
 *             {
 *                  "_id" : ObjectId("5ba635035e568113c3b037cb"),
 *                  "points" : -3.7000000000000006,
 *                  "user_id" : "25",
 *                  "created_at" : ISODate("2018-09-22T12:26:43.596Z"),
 *                  "updated_at" : ISODate("2018-09-22T12:26:43.596Z"),
 *                  "__v" : 0
 *              
 *             },
 *             { ... }
 *        ]
 *    }
 * 
 * @apiErrorExample {json} Autenticação Falhou
 *    HTTP/1.1 401 Unauthorized
 *    {
 *        "errors": [{
 *              field: ['authorization'],
 *              message: "Você não tem permissão para acessar esse recurso"
 *        }]
 *    }
 */  

 /**
 * @api {get} /punctuation/:user_id Pontuação de um usuário
 * @apiGroup Pontuacoes
 *
 * @apiHeader authentication {String} Token para autenticação
 * @apiParam { Integer } id id do usuário
 * 
 * @apiSuccessExample {json} Sucesso
 *    HTTP/1.1 200 OK
 *    {
 *        "punctuation": {
 *             "_id" : ObjectId("8ba635035e568113c3b03j6d"),
 *             "points" : 4.5,
 *             "user_id" : "22",
 *             "created_at" : ISODate("2018-09-22T12:26:43.596Z"),
 *             "updated_at" : ISODate("2018-09-22T12:26:43.596Z"),
 *             "__v" : 0 
 *        }
 *    }
 * 
 * @apiErrorExample {json} Autenticação Falhou
 *    HTTP/1.1 401 Unauthorized
 *    {
 *        "errors": [{
 *              field: ['authorization'],
 *              message: "Você não tem permissão para acessar esse recurso"
 *        }]
 *    }
 * @apiErrorExample {json} Parametro incorreto
 *    HTTP/1.1 400 bad request
 *    {
 *        "errors": [{
 *              field: ['user_id'],
 *              message: "the user_id parameter is required"
 *        }]
 *    }
 * @apiErrorExample {json} Pontuação não encontrada
 *    HTTP/1.1 404 not found
 *    {
 *        "error": [{
 *              field: ['user_id'],
 *              message: "Pontuação do usuário não encontrada"
 *        }]
 *    }
 */  

 /**
 * @api {post} /punctuation/register Registrando um pontuação nula
 * @apiGroup Pontuacoes
 *
 * @apiHeader authentication {String} Token para autenticação
 * @apiParam { Integer } id id do usuário
 * 
 * @apiSuccessExample {json} Sucesso
 *    HTTP/1.1 201 OK
 *    {
 *        "points": 0
 *    }
 * 
 * @apiErrorExample {json} Autenticação Falhou
 *    HTTP/1.1 401 Unauthorized
 *    {
 *        "errors": [{
 *              field: ['authorization'],
 *              message: "Você não tem permissão para acessar esse recurso"
 *        }]
 *    }
 * @apiErrorExample {json} Parametro incorreto
 *    HTTP/1.1 400 bad request
 *    {
 *        "errors": [{
 *              field: ['user_id'],
 *              message: "the user_id parameter is required"
 *        }]
 *    }
 */  