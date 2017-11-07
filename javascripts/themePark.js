"use strict";

let themeParkKey;
let firebaseKey = "";

const setKey = (apiKey) => {
  themeParkKey = apiKey;
};

module.exports = { setKey };