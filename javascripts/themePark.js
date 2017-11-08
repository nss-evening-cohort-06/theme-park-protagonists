"use strict";

let themeParkKey;
let firebaseKey = "";
let attractionNames = [];

const setKey = (apiKey) => {
  themeParkKey = apiKey;
};

module.exports = { setKey };