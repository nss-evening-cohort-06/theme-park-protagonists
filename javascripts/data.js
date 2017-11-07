"use strict";
const dom = require('./dom');
let firebaseKey = "";
let AttrArray = [];
let TypesArray = [];
let AreasArray = [];
let attractionsWithTimes = [];
let currentAttractons = [];
let MaintenanceTickets = [];

// const setKey = (key) => {
// 	firebaseKey = key;
// };


let getAttractionsJSON = () => {
	return new Promise(function (resolve, reject) {
		$.ajax(`${firebaseKey.databaseURL}/attractions.json`).done(function (data) {
			resolve(data.attractions);
		}).fail(function (error) {
			reject(error);
		});
	});
};

let getAttraction_TypesJSON = () => {
	return new Promise(function (resolve, reject) {
		$.ajax(`${firebaseKey.databaseURL}/theme-1a9c2/attraction_types.json`).done(function (data) {
			resolve(data.attraction_types);
		}).fail(function (error) {
			reject(error);
		});
	});
};

let getAreasJSON = () => {
	return new Promise(function (resolve, reject) {
		$.ajax(`${firebaseKey.databaseURL}/theme-1a9c2/areas.json`).done(function (data) {
			resolve(data.areas);
		}).fail(function (error) {
			reject(error);
		});
	});
};

let getMaintenanceTicketsJSON = () => {
	return new Promise(function (resolve, reject) {
		$.ajax(`${firebaseKey.databaseURL}/theme-1a9c2/maintenance_tickets.json`).done(function (data) {
			resolve(data.maintenance_tickets);
		}).fail(function (error) {
			reject(error);
		});
	});
};

let getAllData = () => {
	Promise.all([getAttractionsJSON(), getAttraction_TypesJSON(), getAreasJSON(), getMaintenanceTicketsJSON()]).then(function (results) {
		AttrArray  = results[0];
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
		//dom.printLeftDiv(AttrArray.slice(0,10));
		console.log(AttrArray);
		// console.log('TypesArray', TypesArray);
		// console.log('AreasArray',AreasArray);
		dom.printToMainDiv(AreasArray);
		showCurrentAttraction(); // initially prints park areas to the DOM
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

module.exports = { getAllData, getAttracts, getAttractionsJSON, getAttractionsBetween, showCurrentAttraction };