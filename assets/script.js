// 555fdd6ef60c3be6d13b1f047feabef9
// http://api.openweathermap.org/geo/1.0/direct?q={city name},{state code},{country code}&limit={limit}&appid={API key}

// current weather
// https://api.openweathermap.org/data/2.5/weather?lat={lat}&lon={lon}&appid={API key}

let today = dayjs().format("MM/DD/YYYY");
let searchInput = $("#city-search");
let searchBtn = $("#search-button");
let historyDiv = $("#previously-searched");
let forecastDiv = $("#forecast-section");
let historyBtn = $("#previous-item");

function onLoad() {
  historyDiv.html("");
}

// append button for previous searches under #previously-searched
function createBtn() {
  let city = searchInput.val().trim();
  let createHistBtn = $("<button>");
  createHistBtn.attr("class", "btn btn-primary bg-secondary");
  createHistBtn.attr("type", "button");
  createHistBtn.attr("id", "previous-item");
  createHistBtn.text(city);
  historyDiv.append(createHistBtn);
}

searchBtn.on("click", function (event) {
  let city = searchInput.val().trim();
  let latLongTemp = [];
  let storedCoords = [];
  if (city == "") {
    alert("Please input a city name.");
    return;
  } else {
    // Define URL's to call API with
    let inputCityUrl =
      "http://api.openweathermap.org/geo/1.0/direct?q=" +
      city +
      "&limit=1&appid=555fdd6ef60c3be6d13b1f047feabef9";

    fetch(inputCityUrl)
      .then(function (response) {
        console.log(response);
        return response.json();
      })
      .then(function (data) {
        latLongTemp.push(data[0].lat.toFixed(2));
        latLongTemp.push(data[0].lon.toFixed(2));
        console.log(latLongTemp);

        let currentUrl =
          "https://api.openweathermap.org/data/2.5/weather?lat=" +
          latLongTemp[0] +
          "&lon=" +
          latLongTemp[1] +
          "&units=imperial&appid=555fdd6ef60c3be6d13b1f047feabef9";

        fetch(currentUrl)
          .then(function (response) {
            console.log(response);
            return response.json();
          })
          .then(function (data) {
            console.log(data);
          });

        let forecastUrl =
          "https://api.openweathermap.org/data/2.5/forecast?lat=" +
          latLongTemp[0] +
          "&lon=" +
          latLongTemp[1] +
          "&units=imperial&appid=555fdd6ef60c3be6d13b1f047feabef9";

        fetch(forecastUrl)
          .then(function (responseForecast) {
            console.log(responseForecast);
            return responseForecast.json();
          })
          .then(function (dataForecast) {
            for (let i = 0; i < 5; i++) {
              forecastCardGen((1)[i], (2)[i], (3)[i], (4)[i]);
            }
            console.log(dataForecast);
          });
      });

    createBtn();
  }
});

// append under #forecast-section
function forecastCardGen(
  forecastDate,
  forecastTemp,
  forecastWind,
  forecastHumid
) {
  let createDiv = $("<div>");

  createDiv.attr("class", "card p-0 m-1");
  createDiv.attr("style", "width: 15rem;");
  forecastDiv.append(createDiv);

  let createCardBody = $("<div>");

  createCardBody.attr("class", "card-body shadow bg-secondary rounded");
  createDiv.append(createCardBody);

  let createH5 = $("<h5>");

  createH5.attr("class", "card-title pt-2");
  createH5.attr("id", "city-name date");
  createH5.text("Date: " + forecastDate);
  createCardBody.append(createH5);

  let createIcon = $("<img>");

  // createIcon.attr(
  //   "src",
  //   "http://openweathermap.org/img/wn/" + weatherIcon + "@2x.png"
  // );
  createCardBody.append(createIcon);

  let createTemp = $("<h6>");

  createTemp.attr("class", "card-subtitle pt-2");
  createTemp.attr("id", "temp");
  createTemp.text("Temp: " + forecastTemp);
  createCardBody.append(createTemp);

  let createWind = $("<h6>");

  createWind.attr("class", "card-subtitle pt-2");
  createWind.attr("id", "wind");
  createWind.text("Wind: " + forecastWind);
  createCardBody.append(createWind);

  let createHumid = $("<h6>");

  createHumid.attr("class", "card-subtitle pt-2");
  createHumid.attr("id", "humidity");
  createHumid.text("Humidity: " + forecastHumid);
  createCardBody.append(createHumid);

  // let createP = $("<p>");

  // createP.attr("class", "card-text pt-1");
  // createCardBody.append(createP);
}

//   <div class="card p-0 m-1" style="width: 15rem;">
//   <div class="card-body shadow bg-secondary rounded">
//     <h5 class="card-title" id="city-name">City Name<span id="currentDate"> date</span></h5>
//     <h6 class="card-subtitle mb-2 text-muted">Card subtitle</h6>
//     <img>
//     <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
//   </div>
// </div>
