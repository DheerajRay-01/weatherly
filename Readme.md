Here's the updated **README.md** without the project structure and with your repository link:

---

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
```

Replace the placeholders with your actual Appwrite project details and OpenWeatherMap API key.

---

### **4. Run the Project**

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
