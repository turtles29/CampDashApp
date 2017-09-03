'use strict';

var latitude;
var longitude;
var tempF;
var weatherId;

//checks to see if geolocation is stored in local storage
window.onload = function() {
  if (localStorage.getItem('lat') === null){
    geoFindMe();
  } else {
    init();
  }

};

//geoFindme is the geolocation; will retrieve coordinates
function geoFindMe() {

  if (!navigator.geolocation){
    $('#dispCity').text('Unable to retrieve your location');
    $('#weather-value').text('Turn on location');
  }

  function success(position) {

    //longitude = position.coords.longitude;
    localStorage.setItem('lat',position.coords.latitude);
    localStorage.setItem('lon',position.coords.longitude);
    //latitude  = localStorage.getItem('lat');

    init();
  }


  function error() {
    $('#dispCity').text('Unable to retrieve your location');
    $('#weather-value').text('Turn on location');
  }

 navigator.geolocation.getCurrentPosition(success, error);
}
//init after coordinates are recieved

function init() {
  var api = 'https://api.openweathermap.org/data/2.5/weather?';
  var key = '&appid=c206c23ffceb3192352454f2000a0b75';
  var lat = 'lat=' +  localStorage.getItem('lat');
  var lon = 'lon=' + localStorage.getItem('lon');
  var unitImp = '&units=imperial'
  var urlFromIP = api + lat + '&' + lon + key + unitImp;

  $(document).ready(function() {
    getWeather();
    getCity();

    //Get weather by using open weather map api
     function getWeather() {
    $.ajax({
      url: urlFromIP,
      success: function(parsed_json) {
        tempF = parsed_json.main.temp;
        weatherId = (parsed_json.weather[0].id);
        $('#weather-value').text(Math.round(tempF) + '°');
        getIcon(weatherId);
      }
    });
  }

  //Get city by coordiantes using google api reverse geolocation
      function getCity() {
        var cityName;

        $.ajax({
          url: 'https://maps.googleapis.com/maps/api/geocode/json?latlng=' + localStorage.getItem('lat') + ',' + localStorage.getItem('lon'),
          data: {},
          success: function(data) {

           $('#dispCity').html(data);
            $.each( data['results'],function(i, val) {
                $.each( val['address_components'],function(i, val) {
                    if (val['types'] == 'locality,political') {
                        if (val['long_name']!='') {
                            $('#dispCity').html(val['long_name']);
                        }
                        else {
                            $('#dispCity').html('unknown');
                        }

                    }
                });
            });


          }
        });
  }

  //close document ready
  });

  //close init
}

function getIcon(weatherId) {
  if (weatherId > 199 && weatherId < 233) {
		$('#weather-container').prepend('<img id="weather-icon" src="images/icons/thunderstorm.svg"/>');
	} else if (weatherId > 299 && weatherId < 322) {
		$('#weather-container').prepend('<img id="weather-icon" src="images/icons/drizzle.svg"/>');
	} else if (weatherId > 499 && weatherId < 532) {
		$('#weather-container').prepend('<img id="weather-icon" src="images/icons/rain.svg"/>');
	} else if (weatherId > 599 && weatherId < 623) {
		$('#weather-container').prepend('<img id="weather-icon" src="images/icons/snow.svg"/>');
	} else if (weatherId === 800) {
		$('#weather-container').prepend('<img id="weather-icon" src="images/icons/clear.svg"/>');
	} else if (weatherId > 800 && weatherId < 805 ) {
    $('#weather-container').prepend('<img id="weather-icon" src="images/icons/Cloud.svg"/>');
  }
}
