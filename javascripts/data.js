"use strict";

const dom = require('./dom');

let AttrArray = [];
let TypesArray = [];
let AreasArray = [];
let AreasAndAttrObject = {};
let joinedArea_Attr = [];
let jointedAttr_Type = [];


const equijoin = (xs, ys, primary, foreign, sel) => {
    const ix = xs.reduce((ix, row) => ix.set(row[primary], row), new Map());
    return ys.map(row => sel(ix.get(row[foreign]), row));
};

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
			AttrArray 	= results[0];
			TypesArray 		= results[1];
			AreasArray 		= results[2];

			// Replace type_id and area_id numbers with actual names
			AttrArray.forEach(function(Attraction){
				TypesArray.forEach(function(Type) {
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
			//dom.printLeftDiv(AttrArray.slice(0,10));
			// console.log('AttrArray', AttrArray);
			// console.log('TypesArray', TypesArray);
			// console.log('AreasArray',AreasArray);
			dom.printToMainDiv(AreasArray);  // initially prints park areas to the DOM
	}).catch(function(error){
		console.log("error from Promise.all", error);
	});
};

const getAttracts = (parkId) => {
	let tempArray = [];
	let parkName = AreasArray[parkId-1].name;
	console.log(parkName);

	AttrArray.forEach(function(attr) {
		if(attr.area_id === parkName)
			tempArray.push(attr);
	}); 
	console.log('getAttracts - parkName', parkName);
	dom.printLeftDiv(tempArray);
};

module.exports = {getAllData, getAttracts};