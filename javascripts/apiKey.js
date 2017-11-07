"use strict";

const themePark = require('./themePark');
const data = require('./data');

const apiKeys = () => {
	return new Promise((resolve, reject) => {
		$.ajax('./db/firebaseKey.json').done((data) => {
			resolve(data.firebaseKeys);
		}).fail((error) => {
			reject(error);
		});
	});
};

const retrieveKeys = () => {
	apiKeys().then((results) => {
		themePark.setKey(results.apiKey);
		data.setKey(results);
		firebase.initializeApp(results.firebaseKeys);
<<<<<<< HEAD
=======
		data.getAttractionsJSON();
		data.getAllData();

>>>>>>> master
	}).catch((error) => {
		console.log('error in retrieve keys', error);
	});
};

module.exports = { retrieveKeys };