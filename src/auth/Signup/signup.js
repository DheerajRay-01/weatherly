import authService from "../../appWrite/appwrite";
import { showToast } from "../../toast.js";

document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("signup-form");
    const submitBtn = document.getElementById("signup-btn");

    form.addEventListener("submit", async (event) => {
        event.preventDefault();  // Prevent the page from refreshing
        
        const name = document.getElementById("name").value.trim();
        const email = document.getElementById("email").value.trim();
        const password = document.getElementById("password").value.trim();
        const confirmPassword = document.getElementById("confirm-password").value.trim();

        // Basic form validation
        if (name === "" || email === "" || password === "" || confirmPassword === "") {
            showToast("All fields are required.", "error");
            return;
        }

        // Password match check
        if (password !== confirmPassword) {
            showToast("Passwords do not match.", "error");
            return;
        }

        // Password strength check
        if (password.length < 8) {
            showToast("Password must be at least 8 characters long.", "error");
            return;
        }

        // Disable the button and show loading text
        submitBtn.disabled = true;
        const originalText = submitBtn.textContent;
        submitBtn.textContent = "Signing Up...";

        try {
            const result = await authService.createAccount({ name, email, password });

            if (result) {
                const user = await authService.getCurrentUser();
                console.log("Account created:", user);
                showToast(`Welcome, ${user.name || "User"}! Your account has been created successfully.`, "success");
                window.location.href = "/";
            }

        } catch (error) {
            console.error("Signup error:", error);
            const errorMessage = error.message || "Signup failed. Please try again.";
            showToast(errorMessage, "error");
        } finally {
            // Restore the button state
            submitBtn.disabled = false;
            submitBtn.textContent = originalText;
        }
    });
});
