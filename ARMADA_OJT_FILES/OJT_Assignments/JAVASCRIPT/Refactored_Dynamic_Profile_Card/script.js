// Select profile card elements
const profileName = document.getElementById("profileName");
const profileBio = document.getElementById("profileBio");
const profileImage = document.getElementById("profileImage");
const profileCard = document.getElementById("profileCard");

// Select input fields and button
const nameInput = document.getElementById("nameInput");
const bioInput = document.getElementById("bioInput");
const imageInput = document.getElementById("imageInput");
const bgColorInput = document.getElementById("bgColorInput");
const updateBtn = document.getElementById("updateProfileBtn");

// Notification container
const notificationContainer = document.getElementById("notificationContainer");

/**
 * Creates a notification message that disappears after 5 seconds
 * 
 * Date: 02/09/26
 * Author: Janverly
 */
function createNotification(msg) {
    const notification = document.createElement("div");
    notification.className = "notification";

    const text = document.createElement("span");
    text.innerText = msg;

    const closeBtn = document.createElement("button");
    closeBtn.className = "close-btn";
    closeBtn.innerText = "Close";

    closeBtn.onclick = () => {
        notificationContainer.removeChild(notification);
    };

    notification.appendChild(text);
    notification.appendChild(closeBtn);

    if (notificationContainer.firstChild) {
        notificationContainer.insertBefore(notification, notificationContainer.firstChild);
    } else {
        notificationContainer.appendChild(notification);
    }

    setTimeout(() => {
        if (notificationContainer.contains(notification)) {
            notificationContainer.removeChild(notification);
        }
    }, 3000);
}

/**
 * Updates profile name if non-empty and different
 */
function updateName() {
    const name = nameInput.value.trim();
    if (name === "") {
        createNotification("Invalid input: Name cannot be empty!");
        return null;
    }
    if (name !== profileName.innerText) {
        profileName.innerText = name;
        return "Name updated!";
    }
    return null; // no change
}

/**
 * Updates profile bio if non-empty and different
 */
function updateBio() {
    const bio = bioInput.value.trim();
    if (bio === "") {
        createNotification("Invalid input: Bio cannot be empty!");
        return null;
    }
    if (bio !== profileBio.textContent) {
        profileBio.textContent = bio;
        return "Bio updated!";
    }
    return null;
}

/**
 * Updates profile image if non-empty and different
 */
function updateImage() {
    const url = imageInput.value.trim();
    if (url === "") {
        createNotification("Invalid input: Image URL cannot be empty!");
        return null;
    }
    if (url !== profileImage.getAttribute("src")) {
        profileImage.setAttribute("src", url);
        return "Profile image updated!";
    }
    return null;
}

/**
 * background color profile
 * bg-color is changing to black if entered empty field on the inputs
 */
function updateBackground() {
    const color = bgColorInput.value.trim() || "#ffffff"; // default to white
    profileCard.style.backgroundColor = color; 

    return `Background color set to ${color}`; 
}


/**
 *update all the functions
 */
function updateProfile() {
    const updates = [];

    [updateName, updateBio, updateImage, updateBackground].forEach(fn => {
        const msg = fn();
        if (msg) updates.push(msg);
    });

    if (updates.length === 0) {
        createNotification("No updates applied.");
    } else {
        updates.forEach(msg => createNotification(msg));
    }
}

// Attach listener
updateBtn.addEventListener("click", updateProfile);
