btn = document.querySelector("#search-button");

async function getWeatherData() {
  let city = document.querySelector(".search-box input").value;
  let geolocation = await getGeolocation(city);
  try {
    const url = `https://api.open-meteo.com/v1/forecast?latitude=${geolocation.lat}&longitude=${geolocation.lon}&current=temperature_2m,weather_code,is_day,relative_humidity_2m,wind_speed_10m&hourly=temperature_2m,relative_humidity_2m,wind_speed_10m`;
    // Await the fetch call
    let response = await fetch(url);

    if (!response.ok) {
      throw new Error("Network response was not ok " + response.statusText);
    }

    let data = await response.json();
    let temp = data["current"]["temperature_2m"];
    let wind = data["current"]["wind_speed_10m"];
    let humidity = data["current"]["relative_humidity_2m"];
    let weather_code = data["current"]["weather_code"];
    let is_day = data["current"]["is_day"];

    postData(
      city.toUpperCase(),
      temp,
      wind,
      humidity,
      weatherCodes[weather_code]
    );
    update_weather(weather_code, is_day);
  } catch (error) {
    console.error("There has been a problem with your fetch operation:", error);
  }
}

const postData = (location, temp, wind, humidity, weather_code) => {
  let temp_tag = document.querySelector("#temperature");
  let location_tag = document.querySelector("#location");
  let humidity_tag = document.querySelector(".humidity b");
  let wind_tag = document.querySelector(".wind b");
  let weather_info = document.querySelector("#weather-info");

  location_tag.innerText = location;
  temp_tag.innerText = `${temp}°C`;
  wind_tag.innerText = wind;
  humidity_tag.innerText = humidity;
  weather_info.innerText = weather_code;
};

async function getGeolocation(city) {
  const url = `https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(
    city
  )}&format=json`;

  try {
    const response = await fetch(url);

    if (!response.ok) {
      throw new Error("Network response was not ok " + response.statusText);
    }

    const data = await response.json();

    if (data.length > 0) {
      const { lat, lon } = data[0];
      return { lat, lon };
    } else {
      console.log("No results found.");
    }
  } catch (error) {
    console.error("Error fetching geolocation:", error);
  }
}

const update_weather = (weather_code, is_day) => {
  let weather = weatherCodes[weather_code].toLowerCase();
  let img_tag = document.querySelector("#weather-img");

  if (is_day == 1 && weather == "clear sky") {
    img_tag.src = "assets/weather-icons/clear-day.svg";
  } else if (is_day == 0 && weather == "clear sky") {
    img_tag.src = "assets/weather-icons/clear-night.svg";
  } else if (is_day == 1 && weather == "partly") {
    img_tag.src = "assets/weather-icons/partly-cloudy-day.svg";
  } else if (is_day == 0 && weather == "partly cloudy") {
    img_tag.src = "assets/weather-icons/partly-cloudy-night.svg";
  } else if (is_day == 1 && weather == "overcast") {
    img_tag.src = "assets/weather-icons/overcast-day.svg";
  } else if (is_day == 0 && weather == "overcast") {
    img_tag.src = "assets/weather-icons/overcast-night.svg";
  } else if (is_day == 1 && weather == "partly cloudy") {
    img_tag.src = "assets/weather-icons/partly-cloudy-day.svg";
  } else if (is_day == 0 && weather == "partly cloudy") {
    img_tag.src = "assets/weather-icons/partly-cloudy-night.svg";
  } else if (is_day == 1 && weather == "fog") {
    img_tag.src = "assets/weather-icons/fog-day.svg";
  } else if (is_day == 0 && weather == "fog") {
    img_tag.src = "assets/weather-icons/fog-night.svg";
  } else if (is_day == 1 && weather == "light rain") {
    img_tag.src = "assets/weather-icons/partly-cloudy-day-drizzle.svg";
  } else if (is_day == 0 && weather == "light rain") {
    img_tag.src = "assets/weather-icons/partly-cloudy-night-drizzle.svg";
  } else if (weather == "heavy rain" || weather == "moderate rain") {
    img_tag.src = "assets/weather-icons/rain.svg";
  } else if (is_day == 1 && weather == "showers") {
    img_tag.src = "assets/weather-icons/partly-cloudy-day-rain.svg";
  } else if (is_day == 0 && weather == "showers") {
    img_tag.src = "assets/weather-icons/partly-cloudy-night-rain.svg";
  } else if (is_day == 0 && weather == "thunderstorm") {
    img_tag.src = "assets/weather-icons/thunderstorms-rain.svg";
  }
};

btn.addEventListener("click", (evt) => {
  evt.preventDefault();
  getWeatherData();
});
