'use strict';

//grabs and formats current date and appends to footer
const currentDate = moment().format("MMM DD, YYYY");
$('#footer').append(currentDate);



