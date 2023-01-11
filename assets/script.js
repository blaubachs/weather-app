// 555fdd6ef60c3be6d13b1f047feabef9
// http://api.openweathermap.org/geo/1.0/direct?q={city name},{state code},{country code}&limit={limit}&appid={API key}

// current weather
// https://api.openweathermap.org/data/2.5/weather?lat={lat}&lon={lon}&appid={API key}

let currentUrl =
  "https://api.openweathermap.org/data/2.5/weather?lat=44.34&lon=10.99&units=imperial&appid=555fdd6ef60c3be6d13b1f047feabef9";

let forecastUrl =
  "https://api.openweathermap.org/data/2.5/forecast?lat=44.34&lon=10.99&units=imperial&appid=555fdd6ef60c3be6d13b1f047feabef9";

let inputCityUrl =
  "http://api.openweathermap.org/geo/1.0/direct?q=wenatchee&limit=1&appid=555fdd6ef60c3be6d13b1f047feabef9";

fetch(inputCityUrl)
  .then(function (response) {
    console.log(response);
    return response.json();
  })
  .then(function (data) {
    console.log(data);
  });

fetch(forecastUrl)
  .then(function (response) {
    console.log(response);
    return response.json();
  })
  .then(function (data) {
    console.log(data);
  });

fetch(currentUrl)
  .then(function (response) {
    console.log(response);
    return response.json();
  })
  .then(function (data) {
    console.log(data);
  });
// append button for previous searches under #previously-searched
let historyDiv = $("#previously-searched");
// <button class="btn btn-primary bg-secondary" type="button" id="previous-item">Button</button>

// append under #forecast-section
let forecastDiv = $("#forecast-section");
//   <div class="card p-0 m-1" style="width: 15rem;">
//   <div class="card-body shadow bg-secondary rounded">
//     <h5 class="card-title" id="city-name">City Name<span id="currentDate"> date</span></h5>
//     <h6 class="card-subtitle mb-2 text-muted">Card subtitle</h6>
//     <img>
//     <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
//   </div>
// </div>
