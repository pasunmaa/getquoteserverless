/*jshint  esversion: 6 */
/*jslint node: true */
'use strict';

const request = require('request')

module.exports.getHistoricalPrices = function(startMonth, startDay, startYear, endMonth, endDay, endYear, ticker, frequency, callback){

	let startDate = Math.floor(Date.UTC(startYear, startMonth-1, startDay, 0, 0, 0)/1000);

	let endDate = Math.floor(Date.UTC(endYear, endMonth-1, endDay, 0, 0, 0)/1000);
	let url = "https://finance.yahoo.com/quote/" + ticker + "/history?period1=" + startDate + "&period2=" + endDate + "&interval=" + frequency + "&filter=history&frequency=" + frequency;
	console.log(`calling  with url: ${url}`);
	request(url, function(err, res, body){
		//console.log(`inside request callback ${err}, ${res}`);
		if (err) {
			callback(err);
		}
		else {
			// If ticker does not exist the response body contains text "No results for &#x27;nosuchticker.he&#x27" => return error
			// If ticker does NOT exist the response body does NOT contain text "HistoricalPriceStore" => return error
			if (body.indexOf("HistoricalPriceStore") == -1) {
				let errorNotExist = new Error("Ticker " + ticker + " was not found from Yahoo.");
				callback(errorNotExist);
			}
			else {
				let prices = JSON.parse(body.split('HistoricalPriceStore":{"prices":')[1].split(",\"isPending")[0]);
				// if historical value array is empty => return error
				if (prices.length > 0)
					callback(null, prices);
				else {
					let errorNotExist = new Error(ticker + " quotes does not exist in Yahoo for a requested period.");
					callback(errorNotExist);
				}
			}
		}
	});
};


module.exports.getCurrentPrice = function(ticker, callback) {

	request("https://finance.yahoo.com/quote/" + ticker + "/", function(err, res, body) {

		if (err) {
			callback(err);
		}
		else {
			if (body.indexOf("currentPrice") == -1) {
				let errorNotExist = new Error("Ticker " + ticker + " was not found from Yahoo.");
				callback(errorNotExist);
			}
			else {
				let price = parseFloat(body.split("currentPrice")[1].split("fmt\":\"")[1].split("\"")[0]);
				callback(null, price);
			}
		}
	});
};