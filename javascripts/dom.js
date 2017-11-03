'use strict';

const showString = (shows) => {
  let showString = '';
  for (let i = 0; i < shows.length; i++) {
    showString += `<div class="current-show-name"><a href='#'>${shows[i].name}</a> (${shows[i].area_id})</div>`;
    showString += `<p>${shows[i].times}<p>`;

  }
  printToShowTimes(showString);
};

const printToShowTimes = (dom) => {
  $('#current-shows').append(dom);
};

module.exports = { showString };