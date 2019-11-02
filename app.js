$(document).ready(function(){
//db
//variables
var cityWeather = "https://openweathermap.org/data/2.5/weather?q=London,uk&appid=b6907d289e10d714a6e88b30761fae22"
//utility functions
    //get raw data
    // parse raw data
    //parse raw data
    //render pardes data
//event functions
    //search button click
    //have city name
    //send city name
    //send city name to an openweather api
    //set the weather info to the object returned
//init
//check local storage for history of citites and render

$.ajax({
    url: cityWeather,
    method: "GET"
  }).then(function(response) {
    console.log(response);
    //parse data
  });
});

///sign up for an api key

///go into main and grab variables