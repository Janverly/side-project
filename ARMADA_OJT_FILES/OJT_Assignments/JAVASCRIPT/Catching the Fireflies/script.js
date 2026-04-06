/*  
* DOCU: Selects all firefly elements on the page for random movement and click behavior.
*  
* Last Updated: 2026-02-18  
* Author: Janverly  
*/
const fireflies = document.querySelectorAll(".firefly");


/*  
* DOCU: Moves a firefly element to a random position within the viewport.
* @param {HTMLElement} firefly - The firefly element to reposition randomly.
*  
* Last Updated: 2026-02-18  
* Author: Janverly  
*/
function moveRandomly(firefly) {
    const fireflyWidth = firefly.offsetWidth;
    const fireflyHeight = firefly.offsetHeight;

    const maxX = window.innerWidth - fireflyWidth; //kunin niya lang width nung browser then minus the 80px
    const maxY = window.innerHeight - fireflyHeight;//same dito

    const randomX = Math.random() * maxX; //random numebr between 0 and 1, horizontal
    const randomY = Math.random() * maxY;//vertical

    firefly.style.left = randomX + "px";//moves horizontally
    firefly.style.top = randomY + "px";//vertically px for pixzel unit, random spot
}


/*  
* DOCU: Initializes fireflies by giving them random positions and adding click behavior.
* Clicked fireflies shrink, disappear, then respawn at a new random location.
* @returns {void} - Modifies firefly elements directly.
*  
* Last Updated: 2026-02-16  
* Author: Janverly  
*/
fireflies.forEach(firefly => {

        
    moveRandomly(firefly); //random pos

        
    firefly.addEventListener("click", function() {

        // 'this' refers to the clicked firefly
        const currentFirefly = this;

        // Shrink animation
        currentFirefly.style.transform = "scale(0)";
        currentFirefly.style.transition = "transform 0.3s ease";

        // After 0.3s (shrink finished)
        setTimeout(() => {
            currentFirefly.style.visibility = "hidden"; // hide
            currentFirefly.style.transform = "scale(1)"; // reset size

            // After 1 second, respawn at a new random position
            setTimeout(() => {
                moveRandomly(currentFirefly);
                currentFirefly.style.visibility = "visible"; // show again
            }, 1000);

        }, 300);

    });
});


/*  
* DOCU: Optional - Make fireflies reposition on window resize to stay inside viewport
* @returns {void} - Updates all firefly positions when window is resized.
*  
* Last Updated: 2026-02-16  
* Author: Janverly  
*/
window.addEventListener("resize", () => {
    fireflies.forEach(firefly => moveRandomly(firefly));
});