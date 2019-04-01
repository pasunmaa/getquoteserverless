const getHistory = require('./quotes/getHistory').getHistory
const helloWorld = require('./helloworld').helloWorld

/*
  Usage: https://us-central1-platinum-form-233310.cloudfunctions.net/helloWorld
  Usage: https://us-central1-platinum-form-233310.cloudfunctions.net/getHistory
*/

module.exports = { getHistory, helloWorld }