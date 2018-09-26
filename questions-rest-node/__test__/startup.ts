import * as jestCli from 'jest-cli'

import { Server } from './../ts/_config/index'
import { environment } from './../ts/_config/environment'
import QuestionModel from '../ts/models/QuestionModel';
import PunctuationModel from '../ts/models/PunctuationModel';
import TransactionModel from '../ts/models/TransactionModel';

let server: Server;
const beforeAllTests = () => {
  environment.db.database = 'api-test-allgoo-questions'
  environment.port = 3001
  
  server = new Server()
  return server.start()
    .then( () => QuestionModel.remove({}).exec() )
    .then( () => PunctuationModel.remove({}).exec() )
    .then( () => TransactionModel.remove({}).exec() )
}

const afterAllTests = () => {
  return server.shutdown()
}

beforeAllTests()
    .then( () => jestCli.run() )
    .then( () => afterAllTests() )