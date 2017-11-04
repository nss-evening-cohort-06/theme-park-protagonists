"use strict";

const data = require('./data');
const dom = require('./dom');


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