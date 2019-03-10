const { parse } = require('url')
//import moment from 'moment'
const moment = require('moment')
const assetvalue = require('./assetValue.js');

/*
  The endpoint returns current and/or historical close values of the given security 
  for a range of given dates.

  The current version is written for Zeit Now 2.0 lambda spec. The entry file may need
  modification if it is deployed to other serverless / FaaS environments.

  The parameters are

  PARAMETER NAME  ! VALUES                      ! DESCRIPTION
  =============================================================================================
  name            !                             ! a name of security
  resformat       ! JSON | CSV | text (default) ! response format
  startdate       ! <today> (default)           ! the first date that security value is fetched
  enddate         !                             ! the last date that security value is fetched

  the accepted date format is DDMMYYYY.

  if name is missing, the function returns error.
  if startdate is in the future or is missing, the function returns current value.
  if enddate is smaller than startdate, it is set to startdate
  if enddate is in future or missing, it is set set to today

  Google Cloud usage advice:
  Usage: https://a302e3da577e4b882a63e1f13ca57c9b-dot-f0d4dcb9d9a36bd61-tp.appspot.com/?name=<security_name>&resformat=<JSON|CSV|text>&startdate=DDMMYYYY&startdate=DDMMYYYY
  Example 1: https://a302e3da577e4b882a63e1f13ca57c9b-dot-f0d4dcb9d9a36bd61-tp.appspot.com/?name=SAMPO.HE
  Example 2: https://a302e3da577e4b882a63e1f13ca57c9b-dot-f0d4dcb9d9a36bd61-tp.appspot.com/?name=METSO.HE&resformat=CSV&startdate=02012019&startdate=10012019

  POTENTIAL FUTURE EXTENSION
  - Accept several securities to be fetced once - name(s)
  - Accept ISIN number instead of security name

 */

exports.http = async (req, res) => {
  // use URL?name=SAMPO.HE
  //const urlObj = parse(req.url, true)
  const { query } = parse(req.url, true)
  const protocol = 'https:' //req.options.protocol     // PROTOCOL PARAMETER IS NOT CORRECT
  const host = req.headers.host
  const baseurl = protocol + '//' + host
  const { name, resformat, startdate, enddate } = query
  //const { name = 'SAMPO.HE' } = query
  //console.log(protocol, host, query)
  const today = moment()
  const dateformat = ["DMYYYY", "DDMMYYYY"]
  // ?name=nre1v.he&startdate=21122017&enddate=30122017
  console.log(startdate, moment(startdate, dateformat), moment(enddate, dateformat))
  if (!name || (startdate && !moment(startdate, dateformat).isValid()) || (enddate && !moment(enddate, dateformat).isValid())) {
    //res.status = 400
    res.end( // status(400).end(
      `Usage: ${baseurl}/?name=<security_name>&resformat=<JSON|CSV|text>&startdate=DDMMYYYY&startdate=DDMMYYYY\n`+
      `Example 1: ${baseurl}/?name=SAMPO.HE\n`+
      `Example 2: ${baseurl}/?name=METSO.HE&resformat=CSV&startdate=02012019&startdate=10012019`)
  } else if ((!startdate) || (moment(startdate, dateformat) >= today)) {
      try {
        let currentprice = await assetvalue.GetCurrentQuote(name)
        
        res.end(
          `${name}'s current value is ${currentprice.toFixed(2)} on ${new Date()}`)
      }
      catch (err) {
        console.log(`assetvalue.GetCurrentQuote failed with = ${err}.`)
        res.end(`Failed to fetch security '${name}' current value.`)
      }
  }
  else {
    let sday = moment(startdate, dateformat)
    let eday = enddate ? moment(enddate, dateformat) : today
    if (eday < sday) eday = sday
    if (eday > today) eday = today

    console.log(sday, eday)
    try {
      let historicalquotes = await assetvalue.GetQuote(name, sday, eday)
      
      //console.log(`Called assetvalue.GetQuote(${name})`);
      res.write(`${name}'s historical values are \n`)
      Object.keys(historicalquotes).forEach(oneDayQuote => {
        console.log(`${oneDayQuote} ${historicalquotes[oneDayQuote].toFixed(2)}`)
        res.write(`${oneDayQuote} ${historicalquotes[oneDayQuote].toFixed(2)}\n`)
      })
      res.end()
    }
    catch (err) {
      console.log(`assetvalue.GetQuote or GetCurrentQuote failed with '${err}'`)
      res.end(`Failed to fetch security '${name}' value.`)
    }
  }
}

exports.event = (event, callback) => {
  callback()
}