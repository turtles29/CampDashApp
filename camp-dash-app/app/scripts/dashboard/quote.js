'use strict';
const quoteContainer = document.querySelector('#quote-container'),
quoteTar = document.querySelector('#quote'),
authorTar = document.querySelector('#author');

function update(response) {
  response = JSON.parse(response);
	const author = response['quoteAuthor'] != '' ? response['quoteAuthor'] : 'Unknown';
  quoteTar.innerHTML = response['quoteText'];
	authorTar.innerHTML = author;
}

function loadQuote() {
  var xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
      update(this.response);
    }
  };
  xhttp.open("GET", "https://api.forismatic.com/api/1.0/?method=getQuote&lang=en&format=json&json=", true);
  xhttp.send();
}

try { loadQuote() } catch(err) {
  console.log("first quote did not load, trying again.");
  loadQuote();
};

quoteContainer.addEventListener('mouseover', function() {
  quoteTar.style.bottom = '5px';
  authorTar.style.bottom = '15px';
  authorTar.style.opacity = 1;
});

quoteContainer.addEventListener('mouseleave', function() {
  quoteTar.style.bottom = 0;
  authorTar.style.bottom = '35px';
  authorTar.style.opacity = 0;
});
