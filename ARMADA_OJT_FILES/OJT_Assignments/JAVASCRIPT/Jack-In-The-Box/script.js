const box = document.getElementById("jackBox");
const button = document.getElementById("toggleBtn");
const surprise = document.getElementById("surprise");
const sound = document.getElementById("popSound");

/*  
 * DOCU: Toggles the Jack-In-The-Box between closed and open states.
 *       When opened, the surprise image pops forward and a sound plays.
 *       After a 5-second delay, the box automatically closes and resets
 *
 * Last Updated: 2026-02-21  
 * Author: Janverly Bacani
 * 
 */

function toggleBox() {

    const currentState = box.getAttribute("data-state");
    const closedImage = box.getAttribute("data-closed");
    const openImage = box.getAttribute("data-open");

    if (currentState === "closed") {

    
        box.setAttribute("src", openImage);
        box.setAttribute("data-state", "open");
        button.textContent = "Waiting...";
        surprise.classList.add("show");
        sound.play();

        // Disable button while waiting
        button.disabled = true;

        setTimeout(function () {

            box.setAttribute("src", closedImage);
            box.setAttribute("data-state", "closed");
            button.textContent = "Open the Box";
            surprise.classList.remove("show");
            button.disabled = false;

        }, 5000);

    }
}

box.addEventListener("click", toggleBox);
button.addEventListener("click", toggleBox);