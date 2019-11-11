$(document).ready(function() {
    /*data base*/
    /* raw weather objecdt from api*/
    let apiKey = "1e01aa7c28fe7bf55d263dbe7e9d9dac";

    $("#srchBtn").on("click", function() {
      event.preventDefault();
      let city = $("#srchCity")
        .val()
        .trim();
      let queryURL = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=imperial&appid=${apiKey}`;
      $.ajax({
        url: queryURL,
        method: "GET"
      }).then(function(response) {
        console.log(response);
        $('#srchCityName').html(`<div><h1>${response.name}</h1></div>`);
        $('#srchCityTemp').html(`<div><h4>Temperature: ${response.main.temp}°F</h4></div>`);
        $('#srchCityWindSpeed').html(`<div><h4>Wind Speed: ${response.wind.speed }MPH</h4></div>`);
        $('#srchCityHumidity').html(`<div><h4>Humidity: ${response.main.humidity}%</h4></div>`);

        let lat = response.coord.lat;
        let lon = response.coord.lon;
        let queryURLu = `https://api.openweathermap.org/data/2.5/uvi?appid=${apiKey}&lat=${lat}&lon=${lon}`;
        $.ajax({
            url: queryURLu,
            method: "GET"
          }).then(function(response) {
            console.log(response);
            $('#srchCityUv').html(`<div><h4>The current UV Index is: ${response.value}</h4></div>`)
    
    }).then(function(fiveDayForecast){
        let queryURLfor = `http://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}`;
        $.ajax({
            url: queryURLfor,
            method: 'GET'
        }).then(function(responsef) {
            console.log(responsef);
            for(i = 3; i < 40; i += 8) {
                day = (i-3) / 8;
                console.log(responsef.list[i].dt_txt);
            }
        })
    })

    });
    

});

  });
