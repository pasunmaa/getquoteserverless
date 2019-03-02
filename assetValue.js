// Asset value module maintains end of day stock quotes in in-memory objects. 
// If the rquested close price is missing from the in-memory object, 
// it fetches closing quotes since 1.1.2005 from Yahoo using yahoo-stock-prices library
// https://www.npmjs.com/package/yahoo-stock-prices
// It requires to install "npm install yahoo-stock-prices"

// LATER it can store in-memory object also to JSON-formatted file to reduce number of ruquests to Yahoo API.

// start month, start day, start year, end month, end day, end year, ticker, frequency
// month [ 0 -> 11 ] = [ January -> December ]
// response priceObject.date = Date of price in milliseconds since January 1, 1970.

/*jshint  esversion: 6 */
/*jslint node: true */
'use strict';

//require('colors');
//let commonmodules = require('../commonmodules/index.js');
const getyahooquotes = require('./yahoo-stock-prices.js')
//let modulename = module.filename.substring(module.filename.lastIndexOf("\\") + 1);
//let debugLoggingOn = false;
const moment = require('moment')

//https://stackoverflow.com/questions/40805349/sinon-stub-not-replacing-function?rq=1

let GetQuote = (ticker, startday, endday) => {
    return new Promise(function(resolve,reject) {
        // Testing callback version of yahooStockPrices
        console.log(`Calling getyahooquotes.getHistoricalPrices for ${ticker} from ${startday} to ${endday}`)
        getyahooquotes.getHistoricalPrices(
            Number(startday.format("M")),
            Number(startday.format("D")),
            Number(startday.format("YYYY")),
            Number(endday.format("M")),
            Number(endday.format("D")),
            Number(endday.format("YYYY")),
            ticker, '1d', function(err, prices) {
            //commonmodules.debugLog(prices);
            //console.log(`Inside getyahooquotes.getHistoricalPrices callback`);
            if (err) {
                console.log(`${ticker}'s historical quote fetch failed with callback version ${err}`)
                //console.error(`${commonmodules.getTime()}: getHistoricalPrices for ${Ticker} failed, ${err}`.red);
                return reject(err)
            }
            else {
                console.log(`${ticker}'s historical quote fetched succesfully with callback version.`)
                /* let quote = {
                    date: new Date(prices[0].date * 1000),
                    price: prices[0].close,
                }
                resolve(quote); */
                let simplePriceObject = {}
                for (let oneDayQuote of prices) {
                    // Yahoo time is in seconds instead of milliseconds, and will therefore be converted to ms
                    let originalDate = new Date(oneDayQuote.date * 1000) // USE MILLISECONDS OR DATE STRING AS KEY ???!
                    simplePriceObject[originalDate] = oneDayQuote.close
                }
                Object.keys(simplePriceObject).forEach(key => {
                    //let value = simplePriceObject[key];
                    //use key and value here
                    console.log(`${key} ${simplePriceObject[key]}`)
                })
                resolve(simplePriceObject)
            }
        })
    })
}     

let GetCurrentQuote = ticker => {
    return new Promise(function(resolve,reject) {
        // Testing callback version of yahooStockPrices
        console.log(`Calling getyahooquotes.getCurrentPrice for ${ticker}`);
        getyahooquotes.getCurrentPrice(ticker,function(err, price) {
            //console.log(`Inside getyahooquotes.getCurrentPrice callback`);
            if (err) {
                console.log(`${ticker}'s current quote fetch failed with callback version ${err}`);
                return reject(err);
            }
            else {
                //let price = prices[0].close;
                console.log(`${ticker}'s current quote fetched succesfully with callback version. Price = ${price}`);
                resolve(price);
            }
        });
    });
}     
module.exports = {
    GetQuote,
    GetCurrentQuote
};
