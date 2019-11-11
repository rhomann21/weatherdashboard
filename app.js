$(document).ready(function() {

    $('#srchBtn').keypress(function (e) {
        if (e.which == 13) {//Enter key pressed
            $('#srchBtn').click();//Trigger search button click event
        }
    });

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

            
                
            let fiveDayDate = responsef.list[i].dt_txt;
                console.log(fiveDayDate);
            let fiveDayTemp = responsef.list[i].main.temp;
            let fiveDayHum = responsef.list[i].main.humidity;

            let newTemp = (((fiveDayTemp - 273.15) * 1.8) + 32).toFixed(); 

            $('#cardRowFiveDay').html(`<div class="card-body bg-primary p-3">
            <h5 class="card-title text-white">${fiveDayDate}</h5>
             <p class="card-text text-white">Icon</p>
             <p class="text-white">Temperature: ${newTemp}</p>
             <p class="text-white">Humidity: ${fiveDayHum}</p>`);
            };
        });
    });

    });
    

});

  });
