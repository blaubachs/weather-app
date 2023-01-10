// 555fdd6ef60c3be6d13b1f047feabef9
// http://api.openweathermap.org/geo/1.0/direct?q={city name},{state code},{country code}&limit={limit}&appid={API key}

let requestUrl =
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

fetch(requestUrl)
  .then(function (response) {
    console.log(response);
    return response.json();
  })
  .then(function (data) {
    console.log(data);
  });
