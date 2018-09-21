import * as jestCli from 'jest-cli'

import { Server } from './../ts/_config/index'
import { environment } from './../ts/_config/environment'

let server: Server;
const beforeAllTests = () => {
  environment.db.database = 'api-test-dsvale'
  environment.port = 3001
  
  server = new Server()
  return server.start()
            .then( () => true )
}

const afterAllTests = () => {
  return server.shutdown()
}

beforeAllTests()
    .then( () => jestCli.run() )
    .then( () => afterAllTests() )