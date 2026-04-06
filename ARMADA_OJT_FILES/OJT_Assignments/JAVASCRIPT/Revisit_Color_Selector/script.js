const body = document.body;
const selectedColorText = document.getElementById("selected-color");
const colorButtons = document.querySelectorAll(".color-button");

/*  
 * DOCU: Determines whether the text color should be black or white for readability  
 * @param {string} bgColor - Background color in "rgb(r, g, b)" format  
 * @returns {string} - Returns 'black' if the background is light, 'white' if dark  
 *  
 * Last Updated: 2026-02-12  
 * Author: Janverly Bacani 
 */

function getTextColor(bgColor) {
    const rgb = bgColor.match(/\d+/g).map(Number);
    const brightness = (rgb[0]*299 + rgb[1]*587 + rgb[2]*114) / 1000; //searched! 
    return brightness > 125 ? 'black' : 'white';
}

/*  
 * DOCU: Handles color button click events to change page background and update UI  
 * @param {Event} event - Click event triggered when a color button is pressed  
 * @returns - Updates the background color, selected color text, and active button highlight  
 *  
 * Last Updated: 2026-02-12  
 * Author: Janverly Bacani  
 * 
 */

colorButtons.forEach(button => {
    button.addEventListener("click", function() {
    const color = getComputedStyle(this).backgroundColor;

    // Change page background
    body.style.backgroundColor = color;

    // Update selected color text
    selectedColorText.textContent = `Selected Color: ${this.dataset.color}`;
    selectedColorText.style.color = getTextColor(color);

    // Highlight active button
    colorButtons.forEach(btn => btn.classList.remove("active"));
    this.classList.add("active");
    });
});