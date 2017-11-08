'use strict';
const themePark = require('./themePark');
const dom = require('./dom');
const data = require('./data');

//if element with .time-item has and id, id is formatted to a moment object
//start time is cloned and 59 mins added to declare end time (within the hour)
//start and end time are passed through getAttractonsBetween()
$('.time-item').click(function () {
  const timeString = $(this).attr('id');
  const startTime = moment(timeString, 'HH:mm a');
  const endTime = startTime.clone().add(59, 'm');
  const attractionTime = data.getAttractionsBetween(startTime, endTime, null, '[]');
  dom.printLeftDiv(attractionTime);
});

const showDescriptions = () => {
  $('body').on('click', '.attraction', function () {
    $('.description').hide();
    $(this).next().slideDown(300).show();
  });
};

const displayAttractions = () => {
  $('body').on('click', '.area', function (e) {
    let target = e.target.closest('.park');
    let parkId = $(target).attr('id').split('-');
    parkId = parkId[1];
    data.getAttracts(parkId);
  });
};

const pressEnter = () => {
  $('body').keypress((e) => {
    dom.clearUpsideDown();
    let query = "";
    if (e.key === 'Enter') {
      e.preventDefault();
      let attrData = data.getAttractionData();
      let searchText = $('#searchBox').val();
      query = searchText.toLowerCase();

      let filterArray = attrData.filter(function (el) {
        let lowerCase = el.name.toLowerCase();
        return lowerCase.includes(query);
      });
      for (let i = 0; i < filterArray.length; i++) {
        for (let j = 0; j < data.upsideDown.length; j++) {
          if (filterArray[i].description.includes(data.upsideDown[j])) {
            dom.goUpsideDown(filterArray[i]);
            console.log(filterArray[i]);
          }
        }
      }
      data.getAttractionAreas(filterArray);
    }
  });
};

const initialize = () => {
  showDescriptions();
  displayAttractions();
  pressEnter();
  data.getAttractionsJSON();
};

module.exports = { initialize };

