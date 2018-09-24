'use strict'
const merge = require('webpack-merge')
const prodEnv = require('./prod.env')

module.exports = merge(prodEnv, {
  NODE_ENV: '"development"',
  keys: {
    store: '"key-dev"'
  },
  urlQuestions: '"http://localhost:3000"',
  urlAuth: '"http://localhost:5000"'
})
