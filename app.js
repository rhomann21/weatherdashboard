$(document).ready(function() {

 //put user search into local storeage

  let pastSearch = JSON.parse(localStorage.getItem("userSrch")) || {};
  for (i = 0; i < pastSearch.length; i++) {
      if (Object.keys(pastSearch).length) {
          $('#userSrch').append(`<button>${pastSearch[i].value}</button>`);
      }
  };

  let searches = [];

  function storeUserSearch() {
      let userInput = $('#srchCity');
      searches[searches.length] = {
          value: userInput.val()
      };
      localStorage.setItem("userSrch", JSON.stringify(searches));
      $('#prevSearches').append(`<button class="list-group-item">${userInput.val()}</button>`);
      $("#srchCity").val('');
  };

  //still need to link button click to previous city search!^^

  //clear user search button

  $("#clearBtn").on("click", function () {
    localStorage.clear();
    $('#userSrch').empty();
});

    //Search button on "Enter" key press
    $('#srchBtn').keypress(function (e) {
        if (e.which == 13) {
            $('#srchBtn').click();
        }
    });

    //add current time and date with moment
    var now = moment().format('lll');
    var dateElement = document.querySelector('#dateTime');

    dateElement.innerHTML = now.toString();

    //API key
    let apiKey = "1e01aa7c28fe7bf55d263dbe7e9d9dac";

    //Onclick Event to search API for user input city
    $("#srchBtn").on("click", function(callAPI) {
      event.preventDefault();
      let city = $("#srchCity")
        .val()
        .trim();
      let queryURL = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=imperial&appid=${apiKey}`;
      $.ajax({
        url: queryURL,
        method: "GET"
      }).then(function(response) {
          storeUserSearch();
          console.log(response);

        //Create divs for information pulled from API
        $('#srchCityName').html(`<div><h4>${response.name}</h4></div>`);
        $('#srchCityTemp').html(`<div><h4>Temperature: ${response.main.temp}°F</h4></div>`); //figure out why .toFixed() breaks code here
        $('#srchCityWindSpeed').html(`<div><h4>Wind Speed: ${response.wind.speed }MPH</h4></div>`);
        $('#srchCityHumidity').html(`<div><h4>Humidity: ${response.main.humidity}%</h4></div>`);

        //UV Index API 
        let lat = response.coord.lat;
        let lon = response.coord.lon;
        let queryURLu = `https://api.openweathermap.org/data/2.5/uvi?appid=${apiKey}&lat=${lat}&lon=${lon}`;
        $.ajax({
            url: queryURLu,
            method: "GET"
          }).then(function(response) {

            //Add new UV Index div 
        $('#srchCityUv').html(`<div><h4>The current UV Index is: ${response.value}</h4></div>`)
    
            //AJAX call for 5 day forecast
    }).then(function(fiveDayForecast){
        let queryURLfor = `http://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}`;
        $.ajax({
            url: queryURLfor,
            method: 'GET'
        }).then(function(responsef) {

            //loop through all 4o data points and pick one for each day
            for(i = 3; i < 40; i += 8) {
                day = (i-3) / 8;

            //Split date time into just date?
            let fiveDayDate = responsef.list[i].dt_txt;

            //Grab temperature and humidity
            let fiveDayTemp = responsef.list[i].main.temp;
            let fiveDayHum = responsef.list[i].main.humidity;

            //Convert from Kelvin
            let newTemp = (((fiveDayTemp - 273.15) * 1.8) + 32).toFixed(); 

            //Create card for forecast in row and append cards for week
            $('#cardRowFiveDay').append(`<div class="card-body bg-primary p-3">
            <h5 class="card-title text-white">${fiveDayDate}</h5>
             <p class="card-text text-white">Icon</p>
             <p class="text-white">Temperature: ${newTemp}°F</p>
             <p class="text-white">Humidity: ${fiveDayHum}%</p></div>`);
            };



            //need to add icons!!!!**
        });
    });

    });
    

});

  });
