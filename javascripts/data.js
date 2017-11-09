"use strict";
const dom = require('./dom');
// const events = require('./events');

let firebaseKey = "";
let AttrArray = [];
let TypesArray = [];
let AreasArray = [];
let attractionsWithTimes = [];
let currentAttractons = [];
let MaintenanceTickets = [];
let OutOfOrdersArray = [];

const setKey = (key) => {
	firebaseKey = key;
};

let getAttractionsJSON = () => {
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

let getAttraction_TypesJSON = () => {
	return new Promise(function (resolve, reject) {
		$.ajax(`${firebaseKey.databaseURL}/attraction_types.json`).done(function (data) {
			resolve(data);
		}).fail(function (error) {
			reject(error);
		});
	});
};

let getAreasJSON = () => {
	return new Promise(function (resolve, reject) {
		$.ajax(`${firebaseKey.databaseURL}/areas.json`).done(function (data) {
			resolve(data);
		}).fail(function (error) {
			reject(error);
		});
	});
};

let getMaintenanceTicketsJSON = () => {
	return new Promise(function (resolve, reject) {
		$.ajax(`${firebaseKey.databaseURL}/maintenance_tickets.json`).done(function (data) {
			resolve(data);
		}).fail(function (error) {
			reject(error);
		});
	});
};


const maintenanceCheck = (attrObject) => {
	MaintenanceTickets.forEach(function(maintenanceTicket) {
		let currentDate = Date().split(" ").slice(0,3);
		if (attrObject.id === maintenanceTicket.attraction_id) {
			let ticketDate = maintenanceTicket.maintenance_date.split(" ").slice(0,3);
			if (JSON.stringify(currentDate) === JSON.stringify(ticketDate)) { 
				let currentTime = Date().split(" ").slice(4)[0];
				let ticketStart = maintenanceTicket.maintenance_date.split(" ").slice(4)[0].split(":");
				let ticketEnd	= maintenanceTicket.maintenance_date.split(" ").slice(4)[0].split(":");
				ticketEnd[0]	= (parseInt(ticketStart[0]) + parseInt(maintenanceTicket.maintenance_duration_hours)).toString();
				ticketStart = ticketStart.join(":");
				ticketEnd = ticketEnd.join(":");
				currentTime = moment(currentTime, 'HH:mm:ss');
				ticketStart = moment(ticketStart, 'HH:mm:ss');
				ticketEnd = moment(ticketEnd, 'HH:mm:ss');
				if (currentTime.isBetween(ticketStart,ticketEnd)) {
					attrObject.maintenance = true;
				}
			}
		}
	});
};

const outOfOrderCheck = (attrObject) => {
	OutOfOrdersArray.forEach(function(maintenanceTicket) { console.log("in outOfOrderCheck 1");
		let currentDate = Date().split(" ").slice(0,3);
		if (attrObject.id === maintenanceTicket.attraction_id) { console.log("in outOfOrderCheck 2", attrObject.id);
			let ticketDate = maintenanceTicket.maintenance_date.split(" ").slice(0,3);
			if (JSON.stringify(currentDate) === JSON.stringify(ticketDate)) { console.log("in outOfOrderCheck 3");
				let currentTime = Date().split(" ").slice(4)[0];
				let ticketStart = maintenanceTicket.maintenance_date.split(" ").slice(4)[0].split(":");
				let ticketEnd	= maintenanceTicket.maintenance_date.split(" ").slice(4)[0].split(":");
				ticketEnd[0]	= (parseInt(ticketStart[0]) + parseInt(maintenanceTicket.maintenance_duration_hours)).toString();
				ticketStart = ticketStart.join(":");
				ticketEnd = ticketEnd.join(":");
				currentTime = moment(currentTime, 'HH:mm:ss');
				ticketStart = moment(ticketStart, 'HH:mm:ss');
				ticketEnd = moment(ticketEnd, 'HH:mm:ss');
				if (currentTime.isAfter(ticketEnd)) { 
					attrObject.out_of_order = "blah";
				}
			}
		}
	});
};

let getAllData = () => {
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
		//dom.printLeftDiv(AttrArray.slice(0,10));
		// console.log('TypesArray', TypesArray);
		// console.log('AreasArray',AreasArray);

		getOutOfOrders(MaintenanceTickets);
		dom.printToMainDiv(AreasArray);
		showCurrentAttraction(); // initially prints park areas to the DOM
	}).catch(function (error) {
		console.log("error from Promise.all", error);
	});
};

const isRideOpen = (attr) => {
	maintenanceCheck(attr);
	outOfOrderCheck(attr);
	if ( (attr.out_of_order !== "blah" && attr.maintenance === false) || ( !attr.out_of_order  && attr.maintenance === false ) ) {
		console.log(attr);
		return(attr);
	}
};

// const setOutOfOrders = (outOfOrderArray) => {
// 	outOfOrderArray.forEach(function(item) {
// 		AttrArray.forEach(function(attr) {
// 			let id = item.attraction_id;
// 			if (id === attr.id) {

// 			}
// 		});
// 	});
// };

function getOutOfOrders(mainTicket) { 
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
	console.log("out of orders",OutOfOrdersArray);
}

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
				currentAttractons.push(isRideOpen(attractionsWithTimes[i]));
			}
		}
	}
	dom.printLeftDiv(currentAttractons);
};


module.exports = { setKey, getAllData, getAttracts, getAttractionsJSON, getAttractionsBetween, showCurrentAttraction, getAttractionAreas, getAttractionData, getAreaData};
