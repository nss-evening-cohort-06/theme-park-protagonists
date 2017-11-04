'use strict';
const themePark = require('./themePark');
const dom = require('./dom');
const data = require('./data');

$('.time-item').click(function () {
  const timeString = $(this).attr('id');
  const startTime = moment(timeString, 'HH:mm a');
  const endTime = startTime.clone().add(59, 'm');
  const attractionTime = themePark.getAttractionsBetween(startTime, endTime);
  //insert write to dom for left panel
  console.log(attractionTime);
});

const showDescriptions = () => {
	$('body').on('click', '.attraction',function() {
		$('.description').hide();
		$(this).next().slideDown(300).show();
	});
};

const displayAttractions = () => {
	$('body').on('click', '.area', function(e) {
		let target = e.target.closest('.park');
		console.log(e.target, target);
		let parkId = $(target).attr('id').split('-');
		parkId = parkId[1];
		console.log('parkId', parkId);
		data.getAttracts(parkId);
	});
};

const initialize = () => {
	data.getAllData();
	showDescriptions();
	displayAttractions();
};

module.exports = {initialize};

