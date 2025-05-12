import conf from "../conf.js";
import authService from "./appWrite/appwrite";
import service from "./appWrite/config.js";
import { showToast } from "./toast.js";

const API_KEY = conf.weatherApiKey;
const BASE_URL = "https://api.openweathermap.org/data/2.5/weather";
const FORCAST_URL = "https://api.weatherapi.com/v1/forecast.json?"
const FORCAST_API = conf.forcastApiKey;
const searchBtn = document.querySelector("#search-btn");
const input = document.querySelector("#location-input");
const auth_Btn = document.querySelector("#auth-btn");
const userName = document.getElementById("user-name");
const userEmail = document.getElementById("user-email");
const loader = document.querySelector("#loader");
const profileIcon = document.getElementById("profile-icon");
const forecast = document.getElementById("forecast-head");
const profileDropdown = document.getElementById("profile-dropdown");

let userID;
// Extract city from the URL
const params = new URLSearchParams(window.location.search);
const city = params.get("city");
if (city) fetchWeather(city);

// Get Current User
async function getUser() {
    try {
        const user = await authService.getCurrentUser();
        if (user) {
            userID = user.$id;
            userName.textContent = user.name || "User Name";
            userEmail.textContent = user.email || "user@example.com";
            profileIcon.innerHTML = user.name.charAt(0).toUpperCase() ||` <i class="fas fa-user"></i> `
            auth_Btn.textContent = "Logout";
            // showToast(`Welcome, ${user.name}!`, "success");
        } else {
            handleLogoutUI();
        }
    } catch (error) {
        console.error("Error fetching user:", error);
        handleLogoutUI();
        showToast("Failed to fetch user info. Please log in again.", "error");
    }
}

function handleLogoutUI() {
    userID = null;
    userName.textContent = "Username";
    userEmail.textContent = "username@gmail.com";
    auth_Btn.textContent = "Login";
    profileIcon.innerHTML=` <i class="fas fa-user"></i> `   
}

// Logout or Redirect to Login
auth_Btn.addEventListener("click", async () => {
    if (userID) {
        try {
            await authService.logout();
            handleLogoutUI();
            showToast("Logged out successfully.", "success");
            // window.location.href = "./src/auth/login/login.html";
            window.location.href = "/";
        } catch (error) {
            console.error("Error logging out:", error);
            showToast("Failed to log out. Please try again.", "error");
        }
    } else {
        window.location.href = "./src/auth/Signup/signup.html";
    }
});

// Format Timestamp
function formateTime(timestamp) {
    const date = new Date(timestamp * 1000);
    const formattedTime = date.toLocaleTimeString();
    const formattedDate = date.toLocaleDateString();
    return `${formattedTime}, ${formattedDate}`;
}

// Update Weather UI
function updateWeatherUI(data) {
    const weatherCard = `
        <div class="weatherCard" id="weather-info">
            <div class="save-btn-container-top">
                <button class="save-btn" id="save-btn">
                    <i class="fas fa-bookmark"></i> Save
                </button>
            </div>
            <div class="weatherData">
                <div class="weatherData-left">
                    <img src="https://openweathermap.org/img/wn/${data.icon}@2x.png" alt="icon" class="image">
                </div>
                <div class="weatherData-right">
                    <div class="weatherData-right-top">
                        <span class="city-name"><b>${data.city}</b></span>
                    </div>
                    <div class="weatherData-right-bottom">
                        <div class="weatherData-right-bottom-left">
                            <div class="degree"><b>${data.curr_temp}°C</b></div>
                            <div class="weather-type"><b>${data.type}</b></div>
                        </div>
                        <div class="weatherData-right-bottom-right">
                            <div class="max-temp"><b>Max: ${data.max_temp}°C</b></div>
                            <div class="min-temp"><b>Min: ${data.min_temp}°C</b></div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="extraData">
                <div class="data-item">
                    <i class="fas fa-tint"></i>
                    <span><b>Humidity:</b> ${data.humidity}%</span>
                </div>
                <div class="data-item">
                    <i class="fas fa-wind"></i>
                    <span><b>Wind Speed:</b> ${data.windSpeed} km/h</span>
                </div>
                <div class="data-item">
                    <i class="fas fa-tachometer-alt"></i>
                    <span><b>Pressure:</b> ${data.pressure} hPa</span>
                </div>
            </div>
            <div class="sunData">
                <div class="data-item">
                    <i class="fas fa-sun"></i>
                    <span><b>Sunrise:</b> ${data.sunrise}</span>
                </div>
                <div class="data-item">
                    <i class="fas fa-moon"></i>
                    <span><b>Sunset:</b> ${data.sunset}</span>
                </div>
            </div>
        </div>
    `;
    const weatherContainer = document.querySelector(".weatheContainer");
    weatherContainer.innerHTML = weatherCard;

    // Add Save Button Event
    const saveBtn = document.querySelector("#save-btn");
    saveBtn.addEventListener("click", () => handleSave(data.city));
}


function updateForecastUI(forecastArray) {

    const forecastContainer = document.querySelector("#forecast ul");
    forecastContainer.innerHTML = ""; // Clear previous data
    forecast.textContent = "7 Day Forcast"

    forecastArray.forEach((day, index) => {
        const listItem = document.createElement("li");
        listItem.classList.add("forecast-card");
        listItem.setAttribute("key", index);

        listItem.innerHTML = `
         <h3 class="forecast-date">${new Date(day.date).toDateString()}</h3>
<div class="forecast-icon-container">
    <img src="${day.conditionIcon}" alt="${day.conditionText}" class="forecast-icon" />
    <p class="forecast-condition">${day.conditionText}</p>
</div>
<div class="forecast-details">
    <div class="temp-range">
        <span class="high-temp">⬆️ ${day.maxTempC}°C</span>
        <span class="low-temp">⬇️ ${day.minTempC}°C</span>
    </div>
    <p class="avg-temp">🌡️ Avg: ${day.avgTempC}°C</p>
    <p class="humidity">💧 Humidity: ${day.avgHumidity}%</p>
    <p class="rain-chance">🌧️ Rain: ${day.chanceOfRain}%</p>
</div>

        `;

        forecastContainer.appendChild(listItem);
    });
    fetchForecast
}




// Fetch Weather Data

function fetchForecast(city) {
    const url = `${FORCAST_URL}key=${FORCAST_API}&q=${city}&days=7&aqi=no&alerts=no`;
    // Show the loader
    loader.classList.remove("hidden");

    fetch(url)
        .then((response) => response.json())
        .then((data) => {
            // Extracting day-wise forecast
       const forecastArray = data.forecast.forecastday.map(day => ({
    date: day.date,  // The date of the forecast
    maxTempC: day.day.maxtemp_c,  // Maximum temperature in Celsius
    minTempC: day.day.mintemp_c,  // Minimum temperature in Celsius
    avgTempC: day.day.avgtemp_c,  // Average temperature in Celsius
    avgHumidity: day.day.avghumidity,  // Average humidity percentage
    conditionText: day.day.condition.text,  // Text describing the weather condition
    conditionIcon: `https:${day.day.condition.icon}`,  // Icon URL for the weather condition (usually needs the full URL, so prefixing with "https:" might be necessary)
    chanceOfRain: day.day.daily_chance_of_rain,  // Rain chance in percentage
}));

            console.log(forecastArray);
            updateForecastUI(forecastArray)
        })
        .catch((error) => {
            console.error("Network Error:", error);
            showToast("Network error. Please try again.", "error");
        })
        .finally(() => {
            // Hide the loader
            loader.classList.add("hidden");
        });
}




function fetchWeather(city) {
    const url = `${BASE_URL}?q=${city}&appid=${API_KEY}&units=metric`;
    loader.classList.remove("hidden");

    fetch(url)
        .then((response) => response.json())
        .then((data) => {
            if (data.cod === 200) {
                const weatherData = {
                    city: data.name,
                    curr_temp: data.main.temp,
                    max_temp: data.main.temp_max,
                    min_temp: data.main.temp_min,
                    type: data.weather[0].description,
                    humidity: data.main.humidity,
                    windSpeed: data.wind.speed,
                    pressure: data.main.pressure,
                    sunrise: formateTime(data.sys.sunrise),
                    sunset: formateTime(data.sys.sunset),
                    icon: data.weather[0].icon,
                };
                fetchForecast(city)
                updateWeatherUI(weatherData);
            } else {
                console.error(`Error: ${data.message}`);
                showToast(`Error: ${data.message}`, "error");
            }
        })
        .catch((error) => {
            console.error("Network Error:", error);
            showToast("Network error. Please try again.", "error");
        })
        .finally(() => {
            loader.classList.add("hidden");
        });
}

// Handle Save
async function handleSave(city) {
    try {
        if (!userID) {
            showToast("Please log in to save locations.", "error");
            return;
        }

        const saveData = { city, user: userID };
        await service.createSave(saveData);
        showToast(`Location saved: ${city}`, "success");
    } catch (error) {
        console.error("Error saving location:", error);
        showToast("Failed to save location. Please try again.", "error");
    }
}


// Handle Search
function handleSearch() {
    const location = input.value.trim();
    if (!location) {
        showToast("Please enter a location.", "error");
        return;
    }

    fetchWeather(location);
    input.value = ""; // Clear input
}

// Event Listeners
searchBtn.addEventListener("click", handleSearch);
input.addEventListener("keyup", (e) => e.key === "Enter" && handleSearch());
profileIcon.addEventListener("click", (e) => {
    e.preventDefault();
    profileDropdown.classList.toggle("show");
});
document.addEventListener("click", (e) => {
    if (!profileIcon.contains(e.target) && !profileDropdown.contains(e.target)) {
        profileDropdown.classList.remove("show");
    }
});

getUser();
