/*
 * Creates a new notification element and displays it at the top of the notification container.
 * The notification includes a message and a "Close" button, and it automatically disappears
 * after 5 seconds if the user does not manually close it.
 *
 * - Dynamically creates HTML elements using createElement().
 * - Inserts new notifications at the top of the container (stacking newest on top).
 * - Allows manual removal via a Close button.
 * - Automatically removes notifications after 5 seconds to prevent clutter.
 * - Uses contains() to safely check if the element is still in the DOM before removing it.
 *
 * @param {string} message - The text message to display inside the notification.
 *
 * Last Updated: 2026-02-09
 * Author: Janverly Bacani
 * 
 * nag-ask kila: Jorge and Neil
 */ 
 
const notificationContainer = document.getElementById("notificationContainer");

        // Function to create notifications
    function createNotification(message) {
            // Create elements
        const notification = document.createElement("div");
        notification.className = "notification";

        const text = document.createElement("span");
        text.innerText = message;

        const closeBtn = document.createElement("button");
        closeBtn.className = "close-btn";
        closeBtn.innerText = "Close";

            // Close button functionality
        closeBtn.onclick = function() {
            notificationContainer.removeChild(notification);
        };

            // Append text and button
        notification.appendChild(text);
        notification.appendChild(closeBtn);

            // Insert at top
        if (notificationContainer.firstChild) {
            notificationContainer.insertBefore(notification, notificationContainer.firstChild);
        } else {
            notificationContainer.appendChild(notification);
        }

            // Auto-remove after 5 seconds
        setTimeout(function() {
            if (notificationContainer.contains(notification)) { //to safely check if the notification is still in the DOM before trying to remove it
                notificationContainer.removeChild(notification);
            }
        }, 5000);
    }