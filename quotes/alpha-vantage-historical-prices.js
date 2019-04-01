// This module fetches historical values from Alpha Vantage service
// https://www.alphavantage.co/documentation/
// Daily
// Daily Adjustested

/*
SAMPLES

https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=MSFT&apikey=demo
https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=MSFT&outputsize=full&apikey=demo

/*

/*jshint  esversion: 6 */
/*jslint node: true */
'use strict';

const moment = require('moment')
const request = require('request')
const assetvalue = require('../secrets/readSecretsFromStorage.js')

// require fetch http require ...

// https://www.alphavantage.co/documentation/
// outputsize=compact (default) returns the latest 100 data points
// https://www.alphavantage.co/query?function=TIME_SERIES_DAILY_ADJUSTED&symbol=MSFT&apikey=demo
// outputsize=full returns 20 year history
// https://www.alphavantage.co/query?function=TIME_SERIES_DAILY_ADJUSTED&symbol=MSFT&outputsize=full&apikey=demo

module.exports.getAlphaVantageHistoricalQuotes = async (startMonth, startDay, startYear, endMonth, endDay, endYear, ticker, frequency, callback) => {

	let startDate = Math.floor(Date.UTC(startYear, startMonth-1, startDay, 0, 0, 0)/1000);

	let endDate = Math.floor(Date.UTC(endYear, endMonth-1, endDay, 0, 0, 0)/1000);
/* 	let url = "https://finance.yahoo.com/quote/" + ticker + "/history?period1=" + startDate + "&period2=" + endDate + "&interval=" + frequency + "&filter=history&frequency=" + frequency;
	console.log(`calling  with url: ${url}`);
	request(url, function(err, res, body){ = function(startMonth, startDay, startYear, endMonth, endDay, endYear, ticker, frequency, callback){

	let startDate = Math.floor(Date.UTC(startYear, startMonth-1, startDay, 0, 0, 0)/1000);

	let endDate = Math.floor(Date.UTC(endYear, endMonth-1, endDay, 0, 0, 0)/1000);
	let url = "https://finance.yahoo.com/quote/" + ticker + "/history?period1=" + startDate + "&period2=" + endDate + "&interval=" + frequency + "&filter=history&frequency=" + frequency;
	console.log(`calling  with url: ${url}`);
	request(url, function(err, res, body) {
    } */
}