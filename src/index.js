function formatDate(timestamp) {
  let date = new Date(timestamp);
  let hours = date.getHours();
  if (hours < 10) {
    hours = `0${hours}`;
  }
  let minutes = date.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let day = days[date.getDay()];
  return `${day} ${hours}:${minutes}`;
}

function displayTemperature(response) {
  let temp = document.querySelector("#current-temp");
  let city = document.querySelector("#current-city");
  let description = document.querySelector("#current-description");
  let humidity = document.querySelector("#humidity");
  let wind = document.querySelector("#speed");
  let date = document.querySelector("#current-date");
  let icon = document.querySelector("#icon");

  celsiusTemp = Math.round(response.data.main.temp);

  temp.innerHTML = celsiusTemp;
  city.innerHTML = response.data.name;
  description.innerHTML = response.data.weather[0].description;
  humidity.innerHTML = Math.round(response.data.main.humidity);
  wind.innerHTML = Math.round(response.data.wind.speed);
  date.innerHTML = formatDate(response.data.dt * 1000);
  icon.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
  icon.setAttribute("alt", response.data.weather[0].description);
}

function search(city) {
  let apiKey = "f2cfad915dcee273a86b45e874d64e09";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayTemperature);
}

function submission(event) {
  event.preventDefault();
  let cityInput = document.querySelector("#city-input");
  search(cityInput.value);
}

function showFahrenheit(event) {
  event.preventDefault();
  let temp = document.querySelector("#current-temp");

  celsius.classList.remove("active");
  fahrenheit.classList.add("active");

  let fahrenheitTemp = (celsiusTemp * 9) / 5 + 32;
  temp.innerHTML = Math.round(fahrenheitTemp);
}

function showCelsius(event) {
  event.preventDefault();
  let temp = document.querySelector("#current-temp");

  celsius.classList.add("active");
  fahrenheit.classList.remove("active");

  temp.innerHTML = celsiusTemp;
}

let celsiusTemp = null;

let form = document.querySelector("#search-form");
form.addEventListener("submit", submission);

let celsius = document.querySelector("#celsius");
celsius.addEventListener("click", showCelsius);

let fahrenheit = document.querySelector("#fahrenheit");
fahrenheit.addEventListener("click", showFahrenheit);

search("Toronto");
