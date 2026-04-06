const gameContainer = document.createElement("div");
gameContainer.style.display = "grid";
gameContainer.style.gridTemplateColumns = "repeat(10, 40px)";
gameContainer.style.gap = "2px";
gameContainer.style.position = "relative";

const map = [
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    [1, 0, 0, 0, 0, 2, 0, 0, 0, 1],
    [1, 0, 1, 1, 1, 1, 1, 1, 0, 1],
    [1, 0, 0, 0, 2, 0, 0, 0, 0, 1],
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1]
];
document.body.appendChild(gameContainer);

function drawMap() {
    gameContainer.innerHTML = ""; 

    for (let row = 0; row < map.length; row++) {
        for (let col = 0; col < map[row].length; col++) {
            const tile = document.createElement("div");
            tile.style.width = "40px";
            tile.style.height = "40px";

            if (map[row][col] === 1) {
                tile.style.backgroundColor = "black"; // Wall
            } else if (map[row][col] === 2) {
                tile.style.backgroundColor = "gold"; // Coin
            } else {
                tile.style.backgroundColor = "lightgray"; // Empty space
            }

            gameContainer.appendChild(tile);
        }
    }
}

// Ghost
const ghost = document.createElement("div");
ghost.style.width = "40px";
ghost.style.height = "40px";
ghost.style.backgroundColor = "red";
ghost.style.position = "absolute"; // Allows smooth movement inside the grid
gameContainer.appendChild(ghost); // Append ghost inside gameContainer

let ghostX = 2, 
    ghostY = 1;


    function updateGhostPosition() {
    ghost.style.left = `${ghostX * 42}px`;
    ghost.style.top = `${ghostY * 42}px`;
}

document.addEventListener("keydown", (event) => {
    if (event.keyCode === 37) { // Move left
        let nextX = ghostX - 1; // Calculate the next position

        if (map[ghostY][nextX] !== 1) { // Check if it's not a wall
            ghostX = nextX;
            console.log("Collided!");
        }
    }

    updateGhostPosition();
});

updateGhostPosition();
drawMap();