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

