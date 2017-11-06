'use strict';

const apiKey = require('./apiKey');
const themePark = require('./themePark');
const events = require('./events');
const data = require('./data');

events.initialize();

//grabs and formats current date and appends to footer
const currentDate = moment().format("MMM DD, YYYY");
$('#footer').append(currentDate);

apiKey.retrieveKeys();
events.initialize();
data.getAttractionsJSON();


