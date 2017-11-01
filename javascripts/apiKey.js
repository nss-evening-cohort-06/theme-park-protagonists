"use strict";

const themePark = require('./themePark');
const firebaseApi = require('./firebaseApi');

const apiKeys = () => {
	return new Promise((resolve, reject) => {
		$.ajax('./db/firebaseKey.json').done((data) => {
			resolve (data.firebaseKeys);
		}).fail((error) => {
			reject(error);
		});
	});
};

const retrieveKeys = () => {
	apiKeys().then((results) => {
		themePark.setKey(results.apiKey);
		firebaseApi.setKey(results);
	}).catch((error) => {
		console.log('error in retrieve keys', error);
	});
};

module.exports = {retrieveKeys};