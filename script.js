let inputLocation = document.querySelector(".location");
var submitButton = document.querySelector("#submit-button");
var forcastDiv = document.querySelector(".forecast");
// data variable selectors
var cityName = document.querySelector(".cityname");
var countryName = document.querySelector(".country");
var contents = document.querySelector(".content");
var temperature = document.querySelector(".temp");
var humidity = document.querySelector(".humid");
var weatherCondition = document.querySelector(".condition");
var localTime = document.querySelector(".time");
var windCondition = document.querySelector(".wind");
var weatherIcon = document.querySelector("img");
var snowFlakes = document.querySelector(".snowflakes");
var clouds = document.querySelector("#background-wrap");

const weekday = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
let Backgrounds = [
  "imgs/vintage-high-blue-abstract-old.jpg",
  "imgs/SL-072620-33020-24.jpg",
];

//search button event listener functions
submitButton.addEventListener("click", () => {
  var x = inputLocation.value;
  inputLocation.value = "";

  fetch(
    `https://api.weatherapi.com/v1/forecast.json?key=df3fede8047949aa986140536230604&q=${x}&days=6&aqi=yes&alerts=yes
    `,
    { mode: "cors" }
  )
    .then((response) => {
      {
        return response.json();
      }
    })
    .then((response) => {
      if (response.current.is_day == 1) {
        document.getElementsByTagName("body")[0].style.backgroundImage =
          "url(" + Backgrounds[0] + ")";
      } else {
        document.getElementsByTagName("body")[0].style.backgroundImage =
          "url(" + Backgrounds[1] + ")";
      }
      const days = [];
      for (var i = 0; i < response.forecast.forecastday.length; ++i) {
        days.push(
          weekday[new Date(response.forecast.forecastday[i].date).getDay()]
        );
      }

      updateValues(response);
      for (i = 0; i < response.forecast.forecastday.length; i++) {
        forcastDiv.appendChild(
          createForcastDiv(days[i], response.forecast.forecastday[i])
        );
      }
    });
});

//function render
function render(city) {
  document.querySelector(".lds-dual-ring").style.display = "none";
  fetch(
    `https://api.weatherapi.com/v1/forecast.json?key=df3fede8047949aa986140536230604&q=${city}&days=6&aqi=yes&alerts=yes
    `,
    { mode: "cors" }
  )
    .then((response) => {
      {
        return response.json();
      }
    })
    .then((response) => {
      document.querySelector(".weather-icon").style.visibility = "visible";
      document.querySelector(".humidity-icon").style.visibility = "visible";
      document.querySelector(".wind-icon").style.visibility = "visible";

      if (response.current.is_day == 1) {
        document.getElementsByTagName("body")[0].style.backgroundImage =
          "url(" + Backgrounds[0] + ")";
      } else {
        document.getElementsByTagName("body")[0].style.backgroundImage =
          "url(" + Backgrounds[1] + ")";
      }

      const days = [];
      for (var i = 0; i < response.forecast.forecastday.length; ++i) {
        days.push(
          weekday[new Date(response.forecast.forecastday[i].date).getDay()]
        );
      }

      updateValues(response);
      for (i = 0; i < response.forecast.forecastday.length; i++) {
        forcastDiv.appendChild(
          createForcastDiv(days[i], response.forecast.forecastday[i])
        );
      }
    });
}

fetch(`https://api.ipify.org?format=json`)
  .then((response) => {
    return response.json();
  })
  .then((data) => {
    fetch(`https://ip-api.com/json/${data.ip}`)
      .then((res) => {
        return res.json();
      })
      .then((r) => {
        render(r.city);
      });
  });

const createForcastDiv = (day, data) => {
  const newDiv = document.createElement("div");
  newDiv.classname = "forecastday";
  newDiv.innerHTML = `
        <div class="forecastday-position">
        <div class="day">${day}</div>
        <div class="day-temp">${data.day.maxtemp_c}&#176/${data.day.mintemp_c}&#176</div>
        <img src="${data.day.condition.icon}">
        </div>
        `;
  return newDiv;
};

const updateValues = (response) => {
  cityName.innerHTML = `${response.location.name},`;
  countryName.innerHTML = `${response.location.country}`;
  temperature.innerHTML = ` ${response.current.temp_c}&#176;`;
  weatherIcon.src = response.current.condition.icon;
  weatherCondition.innerHTML = `${response.current.condition.text}`;
  humidity.innerHTML = `Humidity: ${response.current.humidity}%`;
  windCondition.innerHTML = `Wind: ${response.current.wind_mph} mph`;
  forcastDiv.innerHTML = "";
};
