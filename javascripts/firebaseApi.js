"use strict";

let firebaseKey = {};
let userUid = "";

const areas = [];
const attraction_types = [];
const attractions = [];
const parkInfo = [];

const setKey = (key) =>{
	firebaseKey = key;
};


const areasJSON = () => {
	return new Promise((resolve, reject) =>{
		$.ajax(`${firebaseKey.databaseURL}/areas.json`).then((results) =>{
			console.log(results);
			resolve(results);
		}).catch((err) =>{
			reject(err);
		});
	});
};



module.exports= {setKey, areasJSON};