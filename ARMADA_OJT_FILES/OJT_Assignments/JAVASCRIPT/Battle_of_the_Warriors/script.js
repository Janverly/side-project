// warriors
let thor = {
  name: "Thor",
  hp: 100,
  strength: 13,
/*  
* DOCU: Generates a random attack damage based on Thor's and Zeus' strength.
*
* @returns {number} - A random integer between 0 and Thor's strength.
*
* Last Updated: 2026-02-08
* Author: Janverly
* Last Updated By: Janverly
*/
  attack: function () {
    return Math.floor(Math.random() * (this.strength + 1)); //cacall niya lang yng strength sa thor
  }
};

let zeus = {
  name: "Zeus",
  hp: 100,
  strength: 12,
  attack: function () {
    return Math.floor(Math.random() * (this.strength + 1));
  }
};

let round = 1;

/*  
* DOCU: Controls the battle rounds with delays.
*       Each round: Thor attacks, then Zeus attacks.
*  
* Last Updated: 2026-02-09
* Author: Janverly
* Last Updated By: Janverly 
*/

function battleRound() {

  // end battle if...
  if (round > 10 || thor.hp === 0 || zeus.hp === 0) {

    console.log("=== Battle Result ===");

    if (thor.hp > zeus.hp) {
      console.log("Thor Wins the battle!");
    } else if (zeus.hp > thor.hp) {
      console.log("Zeus Wins the battle!");
    } else {
      console.log("It's a draw!");
    }

    return;
  }

  console.log("=== Round " + round + " ===");

  // Thor attacks
  setTimeout(function () {

    let thorDamage = thor.attack();
    zeus.hp -= thorDamage;
    if (zeus.hp < 0) zeus.hp = 0;

    console.log("Thor attacks Zeus and does " + thorDamage + " damage!");
    console.log("Thor HP: " + thor.hp + " | Zeus HP: " + zeus.hp);

    // If Zeus dies, end battle
    if (zeus.hp === 0) {
      console.log("Zeus has fallen!");
      battleRound();
      return;
    }

    // Zeus attacks
    setTimeout(function () {

      let zeusDamage = zeus.attack();
      thor.hp -= zeusDamage;
      if (thor.hp < 0) thor.hp = 0;

      console.log("Zeus attacks Thor and does " + zeusDamage + " damage!");
      console.log("Thor HP: " + thor.hp + " | Zeus HP: " + zeus.hp);
    
      //if Thor dies, end battle
      if (thor.hp === 0) {
        console.log("Thor has fallen!");
        battleRound();
        return;
      }

      console.log("");
      round++;
      battleRound();

    }, 2000);

  }, 2000);
}

// Start battle
battleRound();
