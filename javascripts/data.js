"use strict";

const dom = require('./dom');

let AttractionsArray = [];
let Attractions_TypesArray = [];
let AreasArray = [];
let AreasAndAttrObject = {};

let getAttractionsJSON = () => {
	return new Promise(function(resolve, reject) {
		$.ajax('./db/attractions.json').done(function(data){
			resolve(data.attractions);
		}).fail(function(error){
			reject(error);
		});
	});
};

let getAttraction_TypesJSON = () => {
	return new Promise(function(resolve, reject) {
		$.ajax('./db/attraction_types.json').done(function(data){
			resolve(data.attraction_types);
		}).fail(function(error){
			reject(error);
		});
	});
};

let getAreasJSON = () => {
	return new Promise(function(resolve, reject) {
		$.ajax('./db/areas.json').done(function(data){
			resolve(data.areas);
		}).fail(function(error){
			reject(error);
		});
	});
};

let getAllData = () => {
	Promise.all([getAttractionsJSON(), getAttraction_TypesJSON(), getAreasJSON()]).then(function(results) { 
			AttractionsArray 			= results[0];
			Attractions_TypesArray 		= results[1];
			AreasArray 					= results[2];

			// Replace type_id and area_id numbers with actual names
			AttractionsArray.forEach(function(Attraction){
				Attractions_TypesArray.forEach(function(Type) {
					if (Type.id === Attraction.type_id) {
						Attraction.type_id = Type.name;
					}
				});
				AreasArray.forEach(function(Area) {
					if (Area.id === Attraction.area_id) {
						Attraction.area_id = Area.name;
					}
				});
			});
			// console.log(AttractionsArray);
			dom.printLeftDiv(AttractionsArray.slice(0,10));

			// Create object with area names as keys and an array of attractions in that area as values 
			for(let i = 0; i < AreasArray.length; i++) {
				let areaName = AreasArray[i].name;
				AreasAndAttrObject[areaName] = [];
			}

			AttractionsArray.forEach(function(Attraction) {
				let objectKeys = Object.keys(AreasAndAttrObject);
				for (let i = 0; i < objectKeys.length; i++) {
					let attractionAreaName = Attraction.area_id;
					let areaName = objectKeys[i];

					 // console.log(attractionAreaName, areaName);
					if (areaName === attractionAreaName) {
						console.log(Attraction.name);
						AreasAndAttrObject[areaName].push(Attraction.name);
					}
				}
			});

			console.log("AreasAndAttrObject", AreasAndAttrObject);

	}).catch(function(error){
		console.log("error from Promise.all", error);
	});
};

module.exports = {getAllData};