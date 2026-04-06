// Selects the container elements from the DOM where tasks and notifications will be displayed.
const taskList = document.getElementById("taskList");
const notificationContainer = document.getElementById("notificationContainer");

/**
 * Adds a new task to the list
 * Triggered on Add Task button click or Enter key press
 * 
 * Last Updated: 2026-02-09
 * Author: Janverly
 */
function addTask(event) {
    event.preventDefault(); // prevent form submission refresh

    const taskInput = document.getElementById("taskInput");
    const taskText = taskInput.value.trim(); //get what the user enters and TRIM REMOVES THE EXCESS SPACE

    if (taskText === "") {
        createNotification("Cannot add empty task!");
        return;
    }

    // Create task
    const task = document.createElement("li");
    task.className = "task";
    task.innerText = taskText;

    // del create
    const deleteBtn = document.createElement("button");
    deleteBtn.className = "delete-btn";
    deleteBtn.innerText = "Delete";

    // Delete task on button click
    deleteBtn.onclick = function() {
        taskList.removeChild(task);
        createNotification(`Task removed: ${taskText}`);
    };

    task.onclick = function() {
        task.classList.toggle("completed"); //strike-through niya lang 
        //console.log("Test")
    };

    // Append delete button to task
    task.appendChild(deleteBtn);

    // Add task to the bottom
    taskList.appendChild(task);

    // Clear input
    taskInput.value = "";

    // Show notif
    createNotification(`Task added: ${taskText}`);
}

/*
 * Creates a notification message
 * @param {string} message - to display message 
 */
function createNotification(message) {
    const notification = document.createElement("div");
    notification.className = "notification";

    const text = document.createElement("span");
    text.innerText = message;

    const closeBtn = document.createElement("button");
    closeBtn.className = "close-btn";
    closeBtn.innerText = "Close";

    // Close notification manually
    closeBtn.onclick = function() {
        notificationContainer.removeChild(notification);
    };

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
        if (notificationContainer.contains(notification)) {
            notificationContainer.removeChild(notification);
        }
    }, 5000);
}
