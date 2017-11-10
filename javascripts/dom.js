"use strict";

const clearLeftDiv = () => {
  $('#div-left-menu').empty('');
};

const printLeftDiv = (attrArray) => { console.log('in printLeftDiv',attrArray.length);
  clearLeftDiv();
  let domString = "";
  for (let i = 0; i < attrArray.length; i++) {
      domString += `<div id="attaction-${i}" >`;
      if (attrArray[i] != attrArray[i].times) {
        domString += `	<a class="attraction">${attrArray[i].name}&nbsp(${attrArray[i].type_name})</a>`;
      } else {
        domString += `	<a class="attraction">${attrArray[i].name}&nbsp(${attrArray[i].area_name})</a>`;
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
    if(i === 6){
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

const clearBorders = () => {
  $(`.area`).removeClass('border');
};


module.exports = { printLeftDiv, printToMainDiv, drawBorder, clearBorders};



