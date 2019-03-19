const Firestore = require('@google-cloud/firestore');

const db = new Firestore({
  projectId: 'platinum-form-233310',
  keyFilename: process.env.GOOGLE_APPLICATION_CREDENTIALS,
})

const docRef = db.collection('assets').doc('FI0009005318');

const setNRE1V = docRef.set({
  isin: "FI0009005318",
  basicinfo: {
    exchange: "XHEL",
    ticker: "NRE1V",
    fullname: "Nokian Renkaat Oyj",
    OMXNordicID: "HEX24312",
    YahooID: "NRE1V.HE",
  }
})
/* 
const setNRE1V = docRef.set({
  isin: "FI0009005318",
  basicinfo: {
    exchange: "XHEL",
    ticker: "NRE1V",
    fullname: "Nokian Renkaat Oyj",
    OMXNordicID: "HEX24312",
    YahooID: "NRE1V.HE",
  }
})
  */ 