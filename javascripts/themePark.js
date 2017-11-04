"use strict";
let themeParkKey;
let attractionsWithTimes = [];
let firebaseKey = "";

const setKey = (apiKey) => {
  themeParkKey = apiKey;
};

const getAttractions = () => {
  return new Promise((resolve, reject) => {
    $.ajax('./db/theme-park.json').done((data) => {
      resolve(data.attractions);
      let attractions = data.attractions;
      for (let i = 0; i < attractions.length; i++) {
        if (attractions[i].times != null) {
          attractionsWithTimes.push(attractions[i]);
        }
      }
    }).fail((error) => {
      reject(error);
    });
  });
};

const getAttractionsBetween = (startTime, endTime) => {
  return attractionsWithTimes.filter((attraction) => {
    for (let i = 0; i < attraction.times.length; i++) {
      const timeString = attraction.times[i];
      const time = moment(timeString, 'HH:mm a');
      if (time.isBetween(startTime, endTime)) {
        return true;
      }
    }
  });
};


module.exports = { setKey, getAttractions, getAttractionsBetween };