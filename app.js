$(document).ready(function() {
    /*data base*/
    /* raw weather objecdt from api*/
    var apiKey = "1e01aa7c28fe7bf55d263dbe7e9d9dac";

    $("#srchBtn").on("click", function() {
      event.preventDefault();
      var city = $("#srchCity")
        .val()
        .trim();
      var queryURL = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=imperial&appid=${apiKey}`;
      $.ajax({
        url: queryURL,
        method: "GET"
      }).then(function(response) {
        console.log(response);
        $('#srchCityName').html(`<div><h1>${response.name}</h1></div>`);
        $('#srchCityTemp').html(`<div><h4>Temperature: ${response.main.temp}</h4></div>`).Math.round();
        $('#srchCityWindSpeed').html(`<div><h4>Wind Speed: ${response.wind.speed}</h4></div>`);
        $('#srchCityHumidity').html(`<div><h4>Humidity: ${response.main.humidity}</h4></div>`);
      });
    });




  });



     
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


