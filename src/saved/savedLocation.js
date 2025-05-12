import service from "../appWrite/config";
import authService from "../appWrite/appwrite";
import { showToast } from "../toast.js";  // Import your toast function

let locations = [];

// Show the loader
function showLoader() {
    const loader = document.getElementById("loader");
    loader.classList.remove("hidden");
}

// Hide the loader
function hideLoader() {
    const loader = document.getElementById("loader");
    loader.classList.add("hidden");
}

// Fetch saved locations for the current user
async function fetchSaved(userId) {
    try {
        showLoader();  // Show the loader before fetching
        const allSaved = await service.getAllSaved(userId);
        locations = allSaved.documents;
        console.log("Fetched Locations:", locations);

        if (locations.length === 0) {
            showToast("No saved locations found.", "info");
        } else {
            showToast("Locations loaded successfully.", "success");
        }

        renderSavedLocations();  // Render the list after fetching
    } catch (error) {
        console.error("Error fetching saved locations:", error);
        showToast("Failed to fetch saved locations. Please try again.", "error");
    } finally {
        hideLoader();  // Hide the loader after fetching
    }
}

// Render the saved locations list
function renderSavedLocations() {
    const savedLocationsList = document.getElementById("saved-locations-list");
    savedLocationsList.innerHTML = "";  // Clear the list before adding new items

    if (locations.length === 0) {
        savedLocationsList.innerHTML = "<p>No saved locations yet.</p>";
        return;
    }

    locations.forEach((location, index) => {
        const listItem = document.createElement("li");
        listItem.classList.add("location-item");
        listItem.setAttribute("key", location.$id);

        listItem.innerHTML = `
            <div class="location-info">
                <span class="city-name">${location.city}</span>
                <span class="created-at">Saved on: ${new Date(location.$createdAt).toLocaleDateString()}</span>
            </div>
            <div>
                <button class="check-weather-btn">Check Weather</button>
                <button class="delete-btn">Delete</button>
            </div>
        `;

        const checkWeatherBtn = listItem.querySelector(".check-weather-btn");
        const deleteBtn = listItem.querySelector(".delete-btn");

        // Handle weather check
        checkWeatherBtn.addEventListener("click", () => {
            window.location.href = `/weather?city=${location.city}`;
        });

        // Handle delete
        deleteBtn.addEventListener("click", () => {
            deleteLocation(location.$id, index);
        });

        savedLocationsList.appendChild(listItem);
    });
}

// Delete a location
async function deleteLocation(id, index) {
    try {
        showLoader();  // Show loader on delete
        const deleteSave = await service.deleteSave(id);  // Call the backend service to delete
        console.log(deleteSave);
        
        locations.splice(index, 1);
        renderSavedLocations();
        showToast("Location deleted successfully.", "success");
    } catch (error) {
        console.error("Error deleting location:", error);
        showToast("Failed to delete location. Please try again.", "error");
    } finally {
        hideLoader();  // Hide loader after delete
    }
}

// Fetch user and locations on load
async function getUser() {
    try {
        showLoader();  // Show loader on page load
        const user = await authService.getCurrentUser();
        if (user) {
            fetchSaved(user.$id);
        } else {
            showToast("User not logged in. Redirecting to login.", "warning");
            window.location.href = "/";
        }
    } catch (error) {
        console.error("Error fetching user:", error);
        showToast("Failed to fetch user. Please try again.", "error");
        window.location.href = "/";
    } finally {
        hideLoader();  // Hide loader after user check
    }
}

// Initialize on page load
getUser();
