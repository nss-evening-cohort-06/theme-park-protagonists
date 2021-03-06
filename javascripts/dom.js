"use strict";

const clearLeftDiv = () => {
  $('#div-left-menu').empty('');
};

const printLeftDiv = (attrArray, time) => {
  clearLeftDiv();
  let domString = "";
  for (let i = 0; i < attrArray.length; i++) {
    domString += ` <div class="attraction-item">`;
    domString += `<div id="attaction-${i}" >`;
    if (time === 1) {
      domString += `	<a class="attraction">${attrArray[i].name}</a>&nbsp(${attrArray[i].area_name})`;
    } else {
      if (attrArray[i] != attrArray[i].times) {
        domString += `	<a class="attraction">${attrArray[i].name}</a>&nbsp(${attrArray[i].type_name})`;
      } else {
        domString += `	<a class="attraction">${attrArray[i].name}</a>&nbsp(${attrArray[i].area_name})`;
      }
    }
    domString += `	<div id="description-${i}" class="description">`;
    domString += `		<p>${attrArray[i].description}</p>`;
    domString += `	</div>`;
    domString += `</div>`;
    domString += `</div>`;
  }
  $('#div-left-menu').append(domString);
};

const printToMainDiv = (areaArray) => {
  let domString = "";
  for (let i = 0; i < areaArray.length; i++) {
    if (i === 6) {
      domString += `<div class="col-md-4 area park blank"><h2></h2></div>`;
      domString += `<div class="col-md-4 area park blank"><h2></h2></div>`;
    }
    domString += `<div id="area-${areaArray[i].id}" class="col-md-4 area park text-center">`;
    domString += `	<h2>${areaArray[i].name}</h2>`;
    domString += `	<div id="description-${areaArray[i].id}" class="parkDescription">`;
    domString += `	<p>${areaArray[i].description}</p>`;
    domString += `	</div>`;
    domString += `</div>`;
  }
  $('#theme-park').append(domString);
};

const drawBorder = (borderId) => {
  var areaId = "#area-" + borderId;
  $(`${areaId}`).addClass('border');
};

const goUpsideDown = (upsideDownArray) => {
  clearUpsideDown();
  let areaId = "#area-" + upsideDownArray.area_id;
  $(`${areaId}`).addClass('upside-down');
  $(`${areaId}`).addClass('flipdiv');
};

const clearUpsideDown = () => {
  $(`.area`).removeClass('upside-down');
  $(`.area`).removeClass('flipdiv');
};

const clearBorders = () => {
  $(`.area`).removeClass('border');
};

module.exports = { printLeftDiv, printToMainDiv, drawBorder, clearBorders, goUpsideDown, clearUpsideDown };
