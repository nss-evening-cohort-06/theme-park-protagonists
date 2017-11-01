"use strict";

const data = require('./data');


const showDescriptions = () => {
	$('body').on('click', '.attraction',function() {
		$('.description').hide();
		$(this).next().slideDown(300).show();
	});
};


const initialize = () => {
	data.getAllData();
	showDescriptions();
};

module.exports = {initialize};