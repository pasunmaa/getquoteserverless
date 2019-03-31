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

const docRef2 = db.collection('assets').doc('FI0009000681');

docRef2.set({
  isin: "FI0009000681",
  basicinfo: {
    exchange: "XHEL",
    ticker: "NOKIA",
    fullname: "Nokia Oyj",
    OMXNordicID: "HEX24311",
    YahooID: "NOKIA.HE",
  }
})

const docRef3 = db.collection('assets').doc('FI123456789');

docRef3.set({
  isin: "FI123456789",
  basicinfo: {
    exchange: "XHEL",
    ticker: "TESTI",
    fullname: "Testi Oy",
    OMXNordicID: "HEX12345",
    YahooID: "TESTI.HE",
  }
})

db.collection('assets').get()
  .then((snapshot) => {
    snapshot.forEach((doc) => {
      console.log(doc.id, '=>', doc.data());
    });
  })
  .catch((err) => {
    console.log('Error getting documents', err);
  })