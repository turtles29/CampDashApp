'use strict';
// time
const clockLocation = document.querySelector('#time'),
greeting = document.querySelector('#greeting'),
// name
name = document.querySelector('#username');

// Clock stuff
function updateClock() {
  let now = new Date(),
  time = [now.getHours(), now.getMinutes()];
  time = time.map((unit) => unit = unit < 10 ? `0${unit}` : `${unit}`);

  greeting.innerHTML = 'Good evening'
  if (time[0] < 12/*noon*/ && time[0] > 3/*am*/) greeting.innerHTML = 'Good morning';
  if (time[0] > 12/*noon*/ && time[0] < 16/*4 pm*/) greeting.innerHTML = 'Good afternoon';

  clockLocation.innerText = time.join(':');
  setTimeout(updateClock, 1000);

  let timeOfDay = 'deep';
  if (hr <= 4 || hr >= 22) timeOfDay = 'midnight';
  else if (hr > 4 && hr < 8) timeOfDay = 'sunrise';
  else if (hr >= 8 && hr < 12) timeOfDay = 'morning';
  else if (hr >= 12 && hr < 16) timeOfDay = 'ocean';
  else if (hr >= 16 && hr < 19) timeOfDay = 'evening';
  else if (hr >= 19 && hr < 22) timeOfDay = 'sunset';
  return timeOfDay;
}

// Name stuff
function getName() {
  if (!localStorage.name) localStorage.name = prompt('What is your name?');
  name.innerHTML = localStorage.name;
}
