
# 🌦️ Weatherly - Weather App

A beautiful, fast, and responsive weather application built with **HTML**, **CSS**, **JavaScript**, **Vite**, and **Appwrite**. Weatherly provides real-time weather updates, location saving, and an intuitive user interface.

---

## 🚀 Features

* 🌎 **Real-time Weather Updates** - Get current weather, temperature, humidity, wind speed, and more.
* 💾 **Save Locations** - Save your favorite locations for quick access.
* 🔄 **Seamless Navigation** - Client-side routing for a smooth experience.
* 📱 **Responsive Design** - Optimized for mobile, tablet, and desktop.
* 🛠️ **Appwrite Integration** - Secure data storage for user-specific locations.

---

## 🛠️ Setup Instructions

### **1. Clone the Repository**

```bash
git clone https://github.com/DheerajRay-01/weatherly.git
cd weatherly
```

---

### **2. Install Dependencies**

Make sure you have **Vite** installed. If not, run:

```bash
npm create vite@latest
```

Then, install the project dependencies:

```bash
npm install
```

---

### **3. Appwrite Setup**

#### **Step 1: Create an Appwrite Project**

1. Log in to your [Appwrite console](https://cloud.appwrite.io).
2. Create a new project (e.g., **"Weatherly"**).

#### **Step 2: Set Up a Database**

1. **Create a New Database** in your project (e.g., **"WeatherlyDB"**).
2. Create a **Collection** inside this database (e.g., **"locations"**).
3. Add the following fields to the collection:

   * **city** (Type: **String**) - The name of the city.
   * **user** (Type: **String**) - The user ID or email associated with the saved location.

#### **Step 3: Set Up API Keys**

1. Generate an **API Key** with **read** and **write** permissions for your database collection.

#### **Step 4: Update Environment Variables**

Create a `.env` file in the root of your project and add the following:

```plaintext
VITE_APPWRITE_URL=https://fra.cloud.appwrite.io/v1
VITE_APPWRITE_PROJECT_ID=your_project_id
VITE_APPWRITE_DATABASE_ID=your_database_id
VITE_APPWRITE_COLLECTION_ID=your_collection_id
VITE_WEATHER_API_KEY=your_weather_api_key
VITE_FORCAST_API_KEY=your_weather_forcast_api_key
```

Replace the placeholders with your actual Appwrite project details and OpenWeatherMap API key.

---

### **4. Weather API Integration**

We are using two weather APIs:

1. **Weather API (Forecast)**
   We use the [Weather API](https://www.weatherapi.com/) to fetch the 7-day forecast for a given location. This API provides detailed weather data, including temperature, humidity, rain chances, and weather conditions for each day.

   * **API Endpoint:** `https://api.weatherapi.com/v1/forecast.json`
   * **Features:**

     * 7-day weather forecast
     * Hourly data
     * Weather conditions (clear, cloudy, etc.)
     * Wind, humidity, and rain data
     * Supports multiple locations

   **Example API Request:**

   ```bash
   https://api.weatherapi.com/v1/forecast.json?key=YOUR_API_KEY&q=London&days=7
   ```

   * **Parameters:**

     * `key`: Your API key from Weather API.
     * `q`: Location query (can be city name, lat/long, or IP address).
     * `days`: Number of forecast days (up to 10).

   **Note:** Replace `YOUR_API_KEY` with your actual API key.

2. **OpenWeatherMap (Current Weather)**
   The [OpenWeatherMap API](https://openweathermap.org/api) is used to fetch the current weather conditions for a given location. It provides live weather data, including temperature, humidity, pressure, and weather descriptions.

   * **API Endpoint:** `https://api.openweathermap.org/data/2.5/weather`
   * **Features:**

     * Current weather data
     * Temperature, humidity, and pressure details
     * Weather descriptions (sunny, cloudy, etc.)
     * Wind speed and direction
     * Supports multiple locations

   **Example API Request:**

   ```bash
   https://api.openweathermap.org/data/2.5/weather?q=London&appid=YOUR_API_KEY&units=metric
   ```

   * **Parameters:**

     * `appid`: Your API key from OpenWeatherMap.
     * `q`: Location query (city name).
     * `units`: Specifies the units of measurement. Use `metric` for Celsius.

   **Note:** Replace `YOUR_API_KEY` with your actual API key.

---

### **5. Run the Project**

Start the development server:

```bash
npm run dev
```

Your app should now be running on `http://localhost:5173`.

---

## 🤝 Contributing

1. Fork the repository.
2. Create a new branch (`git checkout -b feature-branch`).
3. Make your changes.
4. Push to the branch (`git push origin feature-branch`).
5. Create a Pull Request.

---

## 🌟 Show Your Support

Leave a ⭐ if you like this project!

---

Let me know if you'd like further adjustments! 😊

---

