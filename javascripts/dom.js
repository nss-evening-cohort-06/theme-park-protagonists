"use strict";



const printLeftDiv = (attrArray) => {
	let domString = "";
	for(let i = 0; i < attrArray.length; i++)  {
		let attrObject = attrArray[i];
		domString +=   `<div id="attaction-${i}" >`;
	    domString +=	`	<a class="attraction">${attrArray[i].name}</a>`;
	    domString +=	`	<div id="description-${i}" class="description">`;
	    domString +=	`	<p>${attrArray[i].description}</p>`;
	    domString +=	`</div>`;
	}
	$('#div-left-menu').append(domString);
};

module.exports = {printLeftDiv};