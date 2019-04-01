'use strict'

exports.helloWorld = (request, response) => {
  response.status(200).send('Hello World!')
}