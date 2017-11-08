"use strict";
const dom = require('./dom');
let firebaseKey = "";
let AttrArray = [];
let TypesArray = [];
let AreasArray = [];
let attractionsWithTimes = [];
let currentAttractons = [];
let MaintenanceTickets = [];
let upsideDown = ["away", "beneath", "blinking", "broken", "camera", "christmasclaws", "cruiser", "darkness", "enchanted", "evil", "film", "forgotten", "friend", "gasoline", "ghost", "gloomy", "hawkins", "hidden", "hungry", "indiana", "invisible", "labyrinth", "lights", "merlin", "mike", "monsters", "neon", "nighttime", "party", "portal", "pulsate", "school", " sheriff", "spellbinding", "supernatural", "thunder", "underground", "vintage", "waffle"];

const setKey = (key) => {
	firebaseKey = key;
};

const getAttractionsJSON = () => {
	return new Promise(function (resolve, reject) {
		$.ajax(`${firebaseKey.databaseURL}/attractions.json`).done(function (data) {
			resolve(data);
		}).fail(function (error) {
			reject(error);
		});
	});
};

const getAttractionData = () => {
	return AttrArray;
};

const getAreaData = () => {
	return AreasArray;
};

const getAttraction_TypesJSON = () => {
	return new Promise(function (resolve, reject) {
		$.ajax(`${firebaseKey.databaseURL}/attraction_types.json`).done(function (data) {
			resolve(data);
		}).fail(function (error) {
			reject(error);
		});
	});
};

const getAreasJSON = () => {
	return new Promise(function (resolve, reject) {
		$.ajax(`${firebaseKey.databaseURL}/areas.json`).done(function (data) {
			resolve(data);
		}).fail(function (error) {
			reject(error);
		});
	});
};

const getMaintenanceTicketsJSON = () => {
	return new Promise(function (resolve, reject) {
		$.ajax(`${firebaseKey.databaseURL}/maintenance_tickets.json`).done(function (data) {
			resolve(data);
		}).fail(function (error) {
			reject(error);
		});
	});
};

const getAllData = () => {
	Promise.all([getAttractionsJSON(), getAttraction_TypesJSON(), getAreasJSON(), getMaintenanceTicketsJSON()]).then(function (results) {
		AttrArray = results[0];
		TypesArray = results[1];
		AreasArray = results[2];
		MaintenanceTickets = results[3];
		// Replace type_id and area_id numbers with actual names
		AttrArray.forEach(function (Attraction) {
			TypesArray.forEach(function (Type) {
				if (Type.id === Attraction.type_id) {
					Attraction.type_name = Type.name;
				}
			});
			AreasArray.forEach(function (Area) {
				if (Area.id === Attraction.area_id) {
					Attraction.area_name = Area.name;
				}
			});
		});
		for (let i = 0; i < AttrArray.length; i++) {
			if (AttrArray[i].times != null) {
				attractionsWithTimes.push(AttrArray[i]);
			}
		}
		showCurrentAttraction();
		dom.printToMainDiv(AreasArray);
	}).catch(function (error) {
		console.log("error from Promise.all", error);
	});
};

const getAttracts = (parkId) => {
	let tempArray = [];
	let parkName = AreasArray[parkId - 1].name;
	// Only pushes attractions that are not out-of-order
	AttrArray.forEach(function (attr) {
		if (attr.area_name === parkName) {
			if (!attr.out_of_order || attr.out_of_order === false) {
				tempArray.push(attr);
			}
		}
	});
	dom.printLeftDiv(tempArray);
};

const getAttractionAreas = (attractionArray) => {
	dom.clearBorders();
	attractionArray.forEach((attraction) => {
		dom.drawBorder(attraction.area_id);
	});
};

//takes in start/end time from click event
//filters through the attractions with times
//formats attraction time to moment object, if time falls between start and end (moment method), return
const getAttractionsBetween = (startTime, endTime) => {
	return attractionsWithTimes.filter((attraction) => {
		for (let i = 0; i < attraction.times.length; i++) {
			const timeString = attraction.times[i];
			const time = moment(timeString, 'HH:mm a');
			if (time.isBetween(startTime, endTime, null, '[]')) {
				return true;
			}
		}
	});
};

//show times are formatted to momentjs object
//on page load if show times fall between current time end of the hour, print to left div
const showCurrentAttraction = () => {
	const currentTime = moment();
	const endTime = moment().endOf('hour');
	for (let i = 0; i < attractionsWithTimes.length; i++) {
		const times = attractionsWithTimes[i].times;
		for (let j = 0; j < times.length; j++) {
			const showTimes = moment(times[j], 'HH:mmA');
			if (showTimes.isBetween(currentTime, endTime)) {
				currentAttractons.push(attractionsWithTimes[i]);
			}
		}
	}
	dom.printLeftDiv(currentAttractons);
};

module.exports = { setKey, getAllData, getAttracts, getAttractionsJSON, getAttractionsBetween, showCurrentAttraction, getAttractionAreas, getAttractionData, getAreaData, upsideDown };

