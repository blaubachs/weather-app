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

let todayTemp = $("#tempSpan");
let todayWind = $("#windSpan");
let todayHumid = $("#humiditySpan");
let citySpan = $("city-span");
let saveArr = [];
let storedCoords = [];

onLoad();
function onLoad() {
  historyDiv.html("");
  let genArr = JSON.parse(localStorage.getItem("savedButtons"));
  if (genArr !== null) {
    for (i = 0; i < genArr.length; i++) {
      let createHistBtn = $("<button>");
      createHistBtn.attr("class", "btn btn-primary bg-secondary");
      createHistBtn.attr("type", "button");
      createHistBtn.attr("id", "previous-item");
      createHistBtn.text(genArr[i]);
      historyDiv.append(createHistBtn);
    }
  } else {
    return;
  }
}

// append button for previous searches under #previously-searched
function createBtn() {
  if (historyDiv.children().length >= 5) {
    historyDiv.children().eq(0).remove();
  }
  let city = searchInput.val().trim();
  let createHistBtn = $("<button>");
  createHistBtn.attr("class", "btn btn-primary bg-secondary");
  createHistBtn.attr("type", "button");
  createHistBtn.attr("id", "previous-item");
  createHistBtn.text(city);
  saveArr.push(city);
  historyDiv.append(createHistBtn);

  for (i = 0; i < historyDiv.children().length; i++) {
    localStorage.setItem("savedButtons", JSON.stringify(saveArr));
  }
}

searchBtn.on("click", function (event) {
  console.log(historyDiv.children().length);
  let city = searchInput.val().trim();
  let latLongTemp = [];

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
        if (storedCoords.length >= 5) {
          storedCoords.shift();

          storedCoords.push(data[0].lat.toFixed(2), data[0].lon.toFixed(2));
        } else {
          storedCoords.push(data[0].lat.toFixed(2), data[0].lon.toFixed(2));
        }
        console.log(storedCoords);
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
            forecastDiv.html("");
            for (let i = 0; i < 5; i++) {
              let dataIndex = i * 8 + 2;
              let listCast = dataForecast.list[dataIndex];
              console.log(listCast);
              forecastCardGen(
                listCast.dt_txt,
                listCast.weather[0].icon,
                listCast.main.temp,
                listCast.wind.speed,
                i
              );
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
  iconSource,
  forecastTemp,
  forecastWind,
  forecastHumid,
  idNumber
) {
  let createDiv = $("<div>");

  createDiv.attr("class", "card p-0 m-1");
  createDiv.attr("style", "width: 15rem;");
  createDiv.attr("id", "card- " + idNumber);
  forecastDiv.append(createDiv);

  let createCardBody = $("<div>");

  createCardBody.attr("class", "card-body shadow bg-secondary rounded");
  createDiv.append(createCardBody);

  let createH5 = $("<h5>");

  createH5.attr("class", "card-title pt-2");
  createH5.attr("id", "city-name date" + idNumber);
  createH5.text("Date: " + forecastDate);
  createCardBody.append(createH5);

  let createIcon = $("<img>");

  createIcon.attr(
    "src",
    "http://openweathermap.org/img/wn/" + iconSource + "@2x.png"
  );
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
}
