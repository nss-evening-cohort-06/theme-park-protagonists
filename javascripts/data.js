"use strict";
const dom = require('./dom');

//////////////////////
// global variables //
//////////////////////

let firebaseKey = "";
let AttrArray = [];
let TypesArray = [];
let AreasArray = [];
let attractionsWithTimes = [];
let currentAttractons = [];
let MaintenanceTickets = [];
let OutOfOrdersArray = [];
let upsideDown = ["away", "beneath", "blinking", "broken", "camera", "christmasclaws", "cruiser", "darkness", "enchanted", "evil", "film", "forgotten", "friend", "gasoline", "ghost", "gloomy", "hawkins", "hidden", "hungry", "indiana", "invisible", "labyrinth", "lights", "merlin", "mike", "monsters", "neon", "nighttime", "party", "portal", "pulsate", "school", " sheriff", "spellbinding", "supernatural", "thunder", "underground", "vintage", "waffle"];

//////////////////////
////// functions /////
//////////////////////

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
		// Add properties type_name and area_name to the attractions data
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
		// Loop to add maintenance keys to the AttraArray objects
		AttrArray.forEach(function (Attraction) {
			Attraction.maintenance = false;
		});

		AttrArray.forEach(function (Attraction) {
			maintenanceCheck(Attraction);
		});

		for (let i = 0; i < AttrArray.length; i++) {
			if (AttrArray[i].times != null) {
				attractionsWithTimes.push(AttrArray[i]);
			}
		}

		getOutOfOrders(MaintenanceTickets);  // gets first out-of-order ticket for attraction
		dom.printToMainDiv(AreasArray);  // prints park areas to the DOM
		showCurrentAttraction(); // initially prints current attractions to left div on the DOM

		}).catch(function (error) {
		console.log("error from Promise.all", error);
	});
};

const getOutOfOrders = (mainTicket) => { 
	let tempArray = [];
	let idNow = 0;
	for(let i = 0; i < mainTicket.length; i++) {
		if (i !== mainTicket.length -1) {
	  		let id1 = mainTicket[i].attraction_id; 
	    	let id2 = mainTicket[i+1].attraction_id; 
	    	if (id1 === id2 && id1 !== idNow) {
	    		tempArray.push(mainTicket[i]);
	    		idNow = id1;
	    	}
    		if (i > 0) {
	    		let id3 = mainTicket[i-1];
	    		if( id1 !== id2 && id1 !== id3 && id1 !== idNow){
	    			tempArray.push(mainTicket[i]);
	    			idNow = id1;
	    		} 
    		}
	  	}
	}
	OutOfOrdersArray = tempArray;
	// console.log("out of orders",OutOfOrdersArray);
};

const isRideOpen = (attr) => {
	maintenanceCheck(attr);
	outOfOrderCheck(attr);
	if ( ( !attr.out_of_order  && attr.maintenance === false ) ) {
		// console.log(attr);
		return(attr);
	}
};

const maintenanceCheck = (attrObject) => {
	MaintenanceTickets.forEach(function(maintenanceTicket) {
		let currentDate = moment();
		if (attrObject.id === maintenanceTicket.attraction_id) {
			let ticketDate = moment(maintenanceTicket.maintenance_date);
			let ticketDateEnd = moment(ticketDate).add(maintenanceTicket.maintenance_duration_hours, 'hours');
			if (currentDate.isBetween(ticketDate,ticketDateEnd)) {
				attrObject.maintenance = true;
			}
		}
	});
};

const outOfOrderCheck = (attrObject) => {
	if(attrObject.out_of_order) {
		OutOfOrdersArray.forEach(function(maintenanceTicket) {
			let currentDate = moment();
			if (attrObject.id === maintenanceTicket.attraction_id) {
				let ticketDate = moment(maintenanceTicket.maintenance_date);
				let ticketDateEnd = moment(ticketDate).add(maintenanceTicket.maintenance_duration_hours, 'hours');
				if (currentDate > ticketDateEnd) {
					attrObject.out_of_order = false;
				}
			}
		});
	}
};

const getAttracts = (parkId) => {
	let tempArray = [];
	let parkName = AreasArray[parkId - 1].name;
	// Only pushes attractions that are not out-of-order or not under maintenance
	AttrArray.forEach(function (attr) {
		if (attr.area_name === parkName) {
			if (isRideOpen(attr)) {
				tempArray.push(isRideOpen(attr, parkName));
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
				currentAttractons.push(isRideOpen(attractionsWithTimes[i]));
			}
		}
	}
	dom.printLeftDiv(currentAttractons);
};

module.exports = { setKey, getAllData, getAttracts, getAttractionsJSON, getAttractionsBetween, showCurrentAttraction, getAttractionAreas, getAttractionData, getAreaData, upsideDown };
