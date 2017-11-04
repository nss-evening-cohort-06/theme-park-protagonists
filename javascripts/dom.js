"use strict";

const clearLeftDiv = () => {
  $('#div-left-menu').empty('');
};

const printLeftDiv = (attrArray) => {
  clearLeftDiv();
  let domString = "";
  for (let i = 0; i < attrArray.length; i++) {
    let attrObject = attrArray[i];
    domString += `<div id="attaction-${i}" >`;
    if (attrArray[i] != attrArray[i].times) {
      domString += `	<a class="attraction">${attrArray[i].name}&nbsp(${attrArray[i].area_id})</a>`;
    } else {
      domString += `	<a class="attraction">${attrArray[i].name}&nbsp(${attrArray[i].type_id})</a>`;
    }
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

module.exports = { printLeftDiv, printToMainDiv };

