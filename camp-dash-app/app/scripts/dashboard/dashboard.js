'use strict';
const date = new Date();
let hr = date.getHours(), timeQuery = updateClock();

window.addEventListener('load', function () {
  const bg = document.querySelector('body').style,
  img = 'https://source.unsplash.com/1280x680?';
  bg.opacity = 0;
  setTimeout(function() {
    bg.background = `#fff url("${img+timeQuery}") no-repeat fixed center`;
    bg.backgroundSize = 'cover';
    setTimeout(function() {bg.transition = 'opacity 2s', bg.opacity = 1}, 1500);
  }, 1200);
});
