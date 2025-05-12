import authService from "../../appWrite/appwrite";
import { showToast } from "../../toast";  // Make sure to import your toast function

document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("signup-form");
    const submitBtn = document.getElementById("login-btn");  // Assuming your button has this ID

    form.addEventListener("submit", async (event) => {
        event.preventDefault();  // Prevent the page from refreshing
        
        const email = document.getElementById("email").value.trim();
        const password = document.getElementById("password").value.trim();

        // Basic form validation
        if (email === "" || password === "") {
            showToast("All fields are required.", "error");
            return;
        }

        // Disable the button, change color, and show loading text
        submitBtn.disabled = true;
        submitBtn.classList.add("bg-gray-400", "cursor-not-allowed");  // Change button color to gray
        const originalText = submitBtn.textContent;
        submitBtn.textContent = "Logging in...";

        try {
            const result = await authService.login({ email, password });

            if (result) {
                const user = await authService.getCurrentUser();
                console.log("User logged in:", user);
                showToast(`Welcome back, ${user.name || "User"}!`, "success");
                window.location.href = "/";  // Redirect to homepage
            }

        } catch (error) {
            console.error("Login error:", error);

            // Handle specific errors if available
            const errorMessage = error.message || "Login failed. Please try again.";
            showToast(errorMessage, "error");
        } finally {
            // Restore the button state and color
            submitBtn.disabled = false;
            submitBtn.classList.remove("bg-gray-400", "cursor-not-allowed");
            submitBtn.textContent = originalText;
        }
    });
});
