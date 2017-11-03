'use strict';
const apiKey = require('./apiKey');
const themePark = require('./themePark');
const events = require('./events');

//grabs and formats current date and appends to footer
const currentDate = moment().format("MMM DD, YYYY");
$('#footer').append(currentDate);

themePark.getAttractions();
apiKey.retrieveKeys();


