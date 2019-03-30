const readSecretsFromStorage = require('./secrets/readSecretsFromStorage');

/*
  Usage: https://us-central1-platinum-form-233310.cloudfunctions.net/secrets
*/

exports.secrets = async (req, res) => {
    await readSecretsFromStorage.secrets(req, res)     
    res.end() 
}