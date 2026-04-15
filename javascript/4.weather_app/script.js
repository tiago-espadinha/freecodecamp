const citySelect = document.getElementById("city-select");
const getWeatherBtn = document.getElementById("get-weather-btn");
const weatherCard = document.getElementById("weather-card");

// Helper to handle "N/A" for undefined values
const formatValue = (val, unit = "") =>
  val !== undefined && val !== null ? `${val}${unit}` : "N/A";

async function getWeather(city) {
  try {
    const response = await fetch(
      `https://weather-proxy.freecodecamp.rocks/api/city/${city}`,
    );
    if (!response.ok) throw new Error("Network response was not ok");
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(error);
    return null;
  }
}

async function showWeather(city) {
  const data = await getWeather(city);

  if (!data) {
    alert("Something went wrong, please try again later.");
    return;
  }

  // Reveal the weather card
  weatherCard.classList.remove("hidden");

  // Populate UI elements
  document.getElementById("location").textContent = formatValue(data.name);
  document.getElementById("weather-icon").src = data.weather?.[0]?.icon || "";
  document.getElementById("weather-main").textContent = formatValue(
    data.weather?.[0]?.main,
  );
  document.getElementById("main-temperature").textContent = formatValue(
    data.main?.temp,
    "°C",
  );
  document.getElementById("feels-like").textContent = formatValue(
    data.main?.feels_like,
    "°C",
  );
  document.getElementById("humidity").textContent = formatValue(
    data.main?.humidity,
    "%",
  );
  document.getElementById("wind").textContent = formatValue(
    data.wind?.speed,
    " m/s",
  );
  document.getElementById("wind-gust").textContent = formatValue(
    data.wind?.gust,
    " m/s",
  );
}

getWeatherBtn.addEventListener("click", () => {
  const selectedCity = citySelect.value;
  if (selectedCity) {
    showWeather(selectedCity);
  }
});
