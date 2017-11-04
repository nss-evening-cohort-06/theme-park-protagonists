"use strict";

let themeParkKey;
let firebaseKey = "";


const setKey = (apiKey) => {
  themeParkKey = apiKey;
  console.log("key", themeParkKey);
};

module.exports= {setKey};