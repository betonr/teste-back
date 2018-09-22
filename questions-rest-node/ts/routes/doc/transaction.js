/**
 * @api {get} /transaction lista de transações
 * @apiGroup Transacoes
 * @apiPermission admin
 *
 * @apiHeader authentication {String} Token para autenticação
 * 
 * @apiSuccessExample {json} Sucesso
 *    HTTP/1.1 200 OK
 *    {
 *        "transactions": [
 *             {
 *                 "_id" : ObjectId("5ba642a09ef8a1525b0301af"),
 *                 "author_id" : 25,
 *                 "question_id" : ObjectId("5ba635365e568113c3b037cc"),
 *                 "type" : "add",
 *                 "points" : 0.5,
 *                 "created_at" : ISODate("2018-09-22T13:24:48.387Z"),
 *                 "__v" : 0
 *             },
 *             { ... }
 *        ]
 *    }
 * 
 * @apiErrorExample {json} Autenticação Falhou
 *    HTTP/1.1 401 Unauthorized
 *    {
 *        "error": [{
 *              fields: ["authorization"],
 *              message: ["Você não tem permissão para acessar esse recurso"]
 *        }]
 *    }
 * @apiErrorExample {json} Autenticação Falhou
 *    HTTP/1.1 403 Forbidden (apenas para administradores)
 *    {
 *        "error": [{
 *              fields: ["authorization"],
 *              message: ["Você precisa ser administrador"]
 *        }]
 *    }
 */  