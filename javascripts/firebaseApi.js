"use strict";

let firebaseKey = {};
let userUid = "";



const setKey = (key) => {
	firebaseKey = key;
};

// const areasJSON = () => {
// 	return new Promise((resolve, reject) => {
// 		$.ajax('./db/areas.json').then((results) => {
// 			resolve(results);
// 		}).catch((err) => {
// 			reject(err);
// 		});
// 	});
// };


module.exports = { setKey,};

