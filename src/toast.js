// toast.js
import Toastify from 'toastify-js';
import 'toastify-js/src/toastify.css';

export function showToast(message, type = "success") {
    const colors = {
        success: "#28a745",
        error: "#dc3545",
        info: "#007bff",
        warning: "#ffc107",
    };

    Toastify({
        text: message,
        duration: 3000,
        gravity: "bottom",
        position: "right",
        backgroundColor: colors[type] || colors.success,
        stopOnFocus: true,
        close: true,
        offset: {
            x: 20,
            y: 20
        },
        style: {
            borderRadius: "8px",
            boxShadow: "0 2px 15px rgba(0,0,0,0.2)",
            fontFamily: "Inter, sans-serif",
            color: "#ffffff",
            padding: "12px 24px",
            fontWeight: "600"
        }
    }).showToast();
}
