const getHistory = require('./quotes/getHistory')

/*
  Usage: https://us-central1-platinum-form-233310.cloudfunctions.net/secrets
*/

exports.getHistory = async (req, res) => {
    await getHistory.getHistory(req, res)     
    res.end() 
}