"use strict";

let themeParkKey;

const setKey = (apiKey) => {
  themeParkKey = apiKey;
  console.log("key", themeParkKey);
};

module.exports= {setKey};