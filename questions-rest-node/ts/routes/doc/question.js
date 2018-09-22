/**
 * @api {get} /question Lista de questões
 * @apiGroup Questoes
 *
 * @apiHeader authentication {String} Token para autenticação
 * 
 * @apiSuccessExample {json} Sucesso
 *    HTTP/1.1 200 OK
 *    {
 *        "questions": [
 *             {
 *                  "_id" : ObjectId("5ba646baa24f1d74889e5782"),
 *                  "answers" : {
 *                      "correct" : [ ],
 *                      "wrong" : [ ]
 *                  },
 *                  "question" : "informação que foi compartilhada - message",
 *                  "response" : false,
 *                  "author_id" : 25,
 *                  "created_at" : ISODate("2018-09-22T13:42:18.505Z"),
 *                  "__v" : 0
 *             },
 *             { ... }
 *        ]
 *    }
 * 
 * @apiErrorExample {json} Autenticação Falhou
 *    HTTP/1.1 401 Unauthorized
 *    {
 *        "error": "Você não tem permissão para acessar esse recurso"
 *    }
 */  

 /**
 * @api {get} /question/:id Ver Informações
 * @apiGroup Questoes
 *
 * @apiHeader authentication {String} Token para autenticação
 * @apiParam { String } id id da questão
 * 
 * @apiSuccessExample {json} Sucesso
 *    HTTP/1.1 200 OK
 *    {
 *        "question": {
 *             "_id" : ObjectId("5ba646baa24f1d74889e5782"),
 *             "answers" : {
 *                 "correct" : [ ],
 *                 "wrong" : [ ]
 *             },
 *             "question" : "informação que foi compartilhada - message",
 *             "response" : false,
 *             "author_id" : 25,
 *             "created_at" : ISODate("2018-09-22T13:42:18.505Z"),
 *             "__v" : 0
 *        }
 *    }
 * 
 * @apiErrorExample {json} Autenticação Falhou
 *    HTTP/1.1 401 Unauthorized
 *    {
 *        "error": "Você não tem permissão para acessar esse recurso"
 *    }
 * @apiErrorExample {json} Parametro incorreto
 *    HTTP/1.1 400 bad request
 *    {
 *        "errors": [{
 *              fields: ["id"],
 *              messages: ["the id parameter is required"]
 *        }]
 *    }
 * @apiErrorExample {json} Pontuação não encontrada
 *    HTTP/1.1 404 not found
 *    {
 *        "error": [{
 *              fields: ["id"],
 *              messages: ["Questão não encontrada"]
 *        }]
 *    }
 */  

 /**
 * @api {post} /question/register Compartilhar uma informação
 * @apiGroup Questoes
 *
 * @apiHeader authentication {String} Token para autenticação
 * @apiParam { String } question informação a ser compartilhada
 * @apiParam { Boolean } response resposta da questão
 * 
 * @apiSuccessExample {json} Sucesso
 *    HTTP/1.1 201 OK
 *    {
 *        "question": {
 *             "_id" : ObjectId("5ba646baa24f1d74889e5782"),
 *             "answers" : {
 *                 "correct" : [ ],
 *                 "wrong" : [ ]
 *             },
 *             "question" : "informação que foi compartilhada - message",
 *             "response" : false,
 *             "author_id" : 25,
 *             "created_at" : ISODate("2018-09-22T13:42:18.505Z"),
 *             "__v" : 0
 *        }
 *    }
 * 
 * @apiErrorExample {json} Autenticação Falhou
 *    HTTP/1.1 401 Unauthorized
 *    {
 *        "error": "Você não tem permissão para acessar esse recurso"
 *    }
 * @apiErrorExample {json} Parametro incorreto
 *    HTTP/1.1 400 bad request
 *    {
 *        "errors": [{
 *              fields: ["question', "response"],
 *              messages: ["the question parameter is required", "the response parameter is required"]
 *        }]
 *    }
 */  

 /**
 * @api {delete} /question/delete/:id deletar uma informação
 * @apiGroup Questoes
 *
 * @apiHeader authentication {String} Token para autenticação
 * @apiParam { String } id id da questão
 * 
 * @apiSuccessExample {json} Sucesso
 *    HTTP/1.1 200 OK
 *    { success: true }
 * 
 * @apiErrorExample {json} Autenticação Falhou
 *    HTTP/1.1 401 Unauthorized
 *    {
 *        "error": "Você não tem permissão para acessar esse recurso"
 *    }
 * @apiErrorExample {json} Parametro incorreto
 *    HTTP/1.1 400 bad request
 *    {
 *        "errors": [{
 *              fields: ["id"],
 *              messages: ["the id parameter is required"]
 *        }]
 *    }
 */  

 /**
 * @api {get} /question/ranking/honesty ranking de usuários por honestidade
 * @apiGroup Questoes
 *
 * @apiHeader authentication {String} Token para autenticação
 * 
 * @apiSuccessExample {json} Sucesso
 *    HTTP/1.1 200 OK
 *    {
 *        "ranking": [
 *            {
 *                "_id": 25,
 *                "count": 1
 *            },
 *            { ... }
 *        ]
 *    }
 * 
 * @apiErrorExample {json} Autenticação Falhou
 *    HTTP/1.1 401 Unauthorized
 *    {
 *        "error": "Você não tem permissão para acessar esse recurso"
 *    }
 */  

 /**
 * @api {post} /question/vote votar em uma questão
 * @apiGroup Questoes
 *
 * @apiHeader authentication {String} Token para autenticação
 * @apiParam { String } id id da questão
 * @apiParam { Boolean } response resposta do voto
 * 
 * @apiSuccessExample {json} Sucesso - voto correto
 *    HTTP/1.1 200 OK
 *    { correct: true }
 * @apiSuccessExample {json} Sucesso - voto errado
 *    HTTP/1.1 200 OK
 *    { correct: false }
 * 
 * @apiErrorExample {json} Autenticação Falhou
 *    HTTP/1.1 401 Unauthorized
 *    {
 *        "error": "Você não tem permissão para acessar esse recurso"
 *    }
 * @apiErrorExample {json} Você é o autor
 *    HTTP/1.1 409 Conflit
 *    {
 *        errors: [{ 
 *            field: ['user_id'],
 *            messages: ['Você não pode votar em uma pergunta que você criou!']
 *        }],
 *    }
 * @apiErrorExample {json} Votação finalizada
 *    HTTP/1.1 409 Conflit
 *    {
 *        errors: [{ 
 *            field: ['created_at'],
 *            messages: ['Essa pergunta está com sua votação finalizada!']
 *        }],
 *    }
 * @apiErrorExample {json} Duplicação de voto
 *    HTTP/1.1 409 Conflit
 *    {
 *        errors: [{ 
 *            field: ['answers'],
 *            messages: ['Você não pode votar mais de uma vez na mesma pergunta/informação!']
 *        }],
 *    }
 */  