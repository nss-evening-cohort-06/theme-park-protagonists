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
  const attractionTime = data.getAttractionsBetween(startTime, endTime);
  dom.printLeftDivTimes(attractionTime);
  console.log(attractionTime);
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
	pressEnter();
};

const pressEnter = () => {
  $('body').keypress((e) => {
    if (e.key === 'Enter') {
    	e.preventDefault();
      let attrData = data.getAttractionData();
      let searchText = $('#searchBox').val();
      let query = searchText.toLowerCase();

      let filterArray = attrData.filter(function(el) {
        let lowerCase = el.name.toLowerCase();
        return lowerCase.includes(query);

      });
      data.searchAttractions(query); 
      console.log("lowercase", filterArray);
      }
  });
};

   

      
    

      
      // console.log("attraction data", attractionData);
      // var results = attractionData.filter((searchText) => {
      //   searchText.toLowerCase().indexOf(attractionData.toLowerCase()) > -1;
      //   console.log("results", results);

  //       new Awesomplete('input[attractionData]', {
  // filter: function(searchText, attractionData) {
  //   return Awesomplete.FILTER_CONTAINS(searchText, input.match(/[^,]*$/)[0]);
  // },





module.exports = { initialize };

