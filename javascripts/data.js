"use strict";
const dom = require('./dom');
let firebaseKey = "";
let AttrArray = [];
let TypesArray = [];
let AreasArray = [];
let attractionsWithTimes = [];


const setKey = (key) => {
	firebaseKey = key;
};

let getAttractionsJSON = () => {
	return new Promise(function (resolve, reject) {
		$.ajax('./db/attractions.json').done(function (data) {
			resolve(data.attractions);
		}).fail(function (error) {
			reject(error);
		});
	});
};

let getAttraction_TypesJSON = () => {
	return new Promise(function (resolve, reject) {
		$.ajax('./db/attraction_types.json').done(function (data) {
			resolve(data.attraction_types);
		}).fail(function (error) {
			reject(error);
		});
	});
};

let getAreasJSON = () => {
	return new Promise(function (resolve, reject) {
		$.ajax('./db/areas.json').done(function (data) {
			resolve(data.areas);
		}).fail(function (error) {
			reject(error);
		});
	});
};

let getAllData = () => {
	Promise.all([getAttractionsJSON(), getAttraction_TypesJSON(), getAreasJSON()]).then(function (results) {
		AttrArray = results[0];
		TypesArray = results[1];
		AreasArray = results[2];

		// Replace type_id and area_id numbers with actual names
		AttrArray.forEach(function (Attraction) {
			TypesArray.forEach(function (Type) {
				if (Type.id === Attraction.type_id) {
					Attraction.type_id = Type.name;
				}
			});
			AreasArray.forEach(function (Area) {
				if (Area.id === Attraction.area_id) {
					Attraction.area_id = Area.name;
				}
			});
		});
		for (let i = 0; i < AttrArray.length; i++) {
			if (AttrArray[i].times != null) {
				attractionsWithTimes.push(AttrArray[i]);
			}
		}
		//dom.printLeftDiv(AttrArray.slice(0,10));
		// console.log('TypesArray', TypesArray);
		// console.log('AreasArray',AreasArray);
		dom.printToMainDiv(AreasArray);  // initially prints park areas to the DOM
	}).catch(function (error) {
		console.log("error from Promise.all", error);
	});
};

const getAttracts = (parkId) => {
	let tempArray = [];
	let parkName = AreasArray[parkId - 1].name;
	console.log(parkName);


	AttrArray.forEach(function (attr) {
		if (attr.area_id === parkName)
			tempArray.push(attr);
	});
	console.log('getAttracts - parkName', parkName);
	dom.printLeftDiv(tempArray);
};

//takes in start/end time from click event
//filters through the attractions with times
//formats attraction time to moment object, if time falls between start and end (moment method), return
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

const showCurrentAttraction = () => {
	let time = moment().format('HH:mm a');
	let currentTime = moment(time, 'HH:mm a');
	let currentEndTime = currentTime.clone().add(59, 'm').format('H:mm a');
	console.log(currentEndTime);
	for (let i = 0; i < attractionsWithTimes; i++) {

		// if (attractionsWithTimes[i].isBetween(currentTime, currentEndTime)) {
		// 	console.log(attractionsWithTimes[i]);
		// }
	}
};

module.exports = { getAllData, getAttracts, getAttractionsJSON, getAttractionsBetween, showCurrentAttraction };