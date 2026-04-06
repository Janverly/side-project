$(document).ready(function(){

    const candies = ["candy1.png","candy2.png","candy3.png","candy4.png"];
    const question = "question.png"; 
    const totalPairs = 6; // 12 images (pairs)

    // Generate a simple list of candy pairs
    function generatePairs() {
        let pairList = [];
        for(let i = 0; i < totalPairs; i++){
            const candy = candies[i % candies.length];
            pairList.push(candy, candy);
        }
        return pairList; // no shuffle needed
    }

    // Load the game board
    function loadGame() {
        const pairList = generatePairs();
        $("#game").empty();
        pairList.forEach(c => {
            $("#game").append(
                `<img src="img/${question}" data-candy="${c}" class="candy" data-flipped="false">`
            );
        });

        // Attach click flip logic
        $(".candy").click(function(){
            const $img = $(this);
            const flipped = $img.data("flipped"); // true or false
            const candyImg = $img.data("candy");

            if(!flipped){
                $img.attr("src", "img/" + candyImg);
                $img.data("flipped", true);
            } else {
                $img.attr("src", "img/" + question);
                $img.data("flipped", false);
            }
        });
    }

    // Reset button
    $("#reset").click(loadGame);

    // Initial load
    loadGame();

});