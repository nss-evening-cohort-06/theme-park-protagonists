'use strict';

const outputDiv = $('#theme-park');

const areaString = (areasArray) => {
	console.log("areasArray", areasArray);
	let areaStrang = "";
	for (let i = 0; i < areasArray.length; i ++){
		areaStrang += `<div class="row">`;
		areaStrang += 	`<div class="col-md-4">`;
		areaStrang += 		`<h3 class="title">${areasArray[i].name}</h3>`;
		areaStrang += 		`<p class="description">${areasArray[i].description}</p>`;
		areaStrang += 	`</div>`;
		areaStrang += `</div>`;
	}
	printToDom(areaStrang);
};

const printToDom = (strang) => {
	outputDiv.append(strang);
};

const clearDom = () => {
outputDiv.empty();
};

module.exports = {areaString, clearDom};
