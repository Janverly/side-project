/*
 * Updates the user's name on the profile card using the input field value.
 * If the input is empty or contains only spaces, the name will not be updated.
 * Displays a message indicating whether the update was successful or invalid.
 * 
 * Last Updated: 2026-02-09
 * Author: Janverly Bacani
 */
function updateName() {
    let name = document.getElementById("nameInput").value.trim();
    if(name !== "") { // ignore empty or spaces
        document.getElementById("profileName").innerText = name;
        document.getElementById("message").innerText = "Name updated!";
    } else {
        document.getElementById("message").innerText = "Name cannot be empty!";
    }
}

/*
 * Updates the user's bio on the profile card using the input field value.
 * If the input is empty or contains only spaces, the bio will not be updated.
 * 
 * Last Updated: 2026-02-09
 * Author: Janverly Bacani
 */
function updateBio() {
    let bio = document.getElementById("bioInput").value.trim();
    if(bio !== "") {
        document.getElementById("profileBio").textContent = bio;
        document.getElementById("message").innerText = "Bio updated!";
    } else {
        document.getElementById("message").innerText = "Bio cannot be empty!";
    }
}

/*
 * Updates the profile image on the profile card using a URL provided by the user.
 * If the input is empty or contains only spaces, the profile image will not be updated.
 *
 * Last Updated: 2026-02-09
 * Author: Janverly Bacani
 */

function updateImage() {
    let url = document.getElementById("imageInput").value.trim();
    if(url !== "") {
        document.getElementById("profileImage").src = url;
        document.getElementById("message").innerText = "Profile image updated from URL!";
    } else {
        document.getElementById("message").innerText = "URL cannot be empty!";
    }
}

/**
 * Changes the background color of the profile card based on the user's color selection.
 * If the color input is empty or invalid, the background will not change.
 * Last Updated: 2026-02-09
 * Author: Janverly Bacani
 */
function changeBackground() {
    let color = document.getElementById("bgColorInput").value;
    
    if(color.trim() !== "") {
        document.getElementById("profileCard").style.backgroundColor = color;
        document.getElementById("message").innerText = "Background color changed!";
    }
}
