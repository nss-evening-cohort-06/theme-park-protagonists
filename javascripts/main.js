'use strict';

let events = require('./events');
let apiKey = require('./apiKey');

events.initialize();

//grabs and formats current date and appends to footer
const currentDate = moment().format("MMM DD, YYYY");
$('#footer').append(currentDate);

apiKey.retrieveKeys();
