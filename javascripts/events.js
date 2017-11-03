'use strict';
const themePark = require('./themePark');
const dom = require('./dom');

$('.time-item').click(function () {
  const timeString = $(this).attr('id');
  const startTime = moment(timeString, 'HH:mm a');
  const endTime = startTime.clone().add(59, 'm');
  const attractionTime = themePark.getAttractionsBetween(startTime, endTime);
  //insert write to dom for left panel
  console.log(attractionTime);
});


