"use strict";



const clearLeftDiv = () => {
  $('#div-left-menu').empty('');
};

const printLeftDivTimes = (timeArray) => {
  clearLeftDiv();
  let domString = "";
  for (let i = 0; i < timeArray.length; i++) {
    domString += `<div class="attraction-time-name"><a href='#'>${timeArray[i].name}</a> (${timeArray[i].area_id})</div>`;
  }
  $('#div-left-menu').append(domString);
};

const printLeftDiv = (attrArray) => {
  clearLeftDiv();
  let domString = "";
  for (let i = 0; i < attrArray.length; i++) {
    let attrObject = attrArray[i];
    domString += `<div id="attaction-${i}" >`;
    domString += `	<a class="attraction">${attrArray[i].name}&nbsp(${attrArray[i].type_id})</a>`;
    domString += `	<div id="description-${i}" class="description">`;
    domString += `		<p>${attrArray[i].description}</p>`;
    domString += `	</div>`;
    domString += `</div>`;
  }
  $('#div-left-menu').append(domString);
};

const printToMainDiv = (areaArray) => {
  let domString = "";
  for (let i = 0; i < areaArray.length; i++) {
    let attrObject = areaArray[i];
    domString += `<a class="area"> <div id="area-${areaArray[i].id}" class="col-md-3 park">`;
    domString += `	<h4>${areaArray[i].name}</h4>`;
    domString += `	<div id="description-${areaArray[i].id}" class="description">`;
    domString += `	<p>${areaArray[i].description}</p>`;
    domString += `	</div>`;
    domString += `</div></a>`;
  }
  $('#theme-park').append(domString);
};


const drawBorder = (borderId) => {
	var areaId = "#area-" + borderId;
	$(`${areaId}`).addClass('border');
};

const clearBorders = () => {
  $(`.area`).removeClass('border');
};


module.exports = { printLeftDiv, printToMainDiv, printLeftDivTimes, drawBorder, clearBorders};


