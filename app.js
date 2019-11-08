$(document).ready(function(){
//db
apiKey = '1e01aa7c28fe7bf55d263dbe7e9d9dac';
function currentWeather() {
    var queryURL = 
    'http://api.openweathermap.org/data/2.5/weather?q=' +
    city +
    '&units=imperial&APPID=' +
    apiKey;


    $ajax({
        url: queryURL,
        method: 'GET',
    }).then(function(response){
        for (var i = 0; i < data.list.length; i++) {
            if (data.list[i].dt_txt.indexOf('15:00:00') === -1) {
                console.log(data);
            }
        }
    })
}


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
