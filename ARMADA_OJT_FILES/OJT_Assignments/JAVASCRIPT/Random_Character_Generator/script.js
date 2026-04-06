

const names = ["Thorin", "Elara", "Zane", "Ivy", "Dante"];
const classes = ["Warrior", "Mage", "Archer", "Healer", "Assassin"];
const abilities = ["Fireball", "Healing Touch", "Stealth", "Lightning Strike", "Power Slash"];

const maxRounds = 10;
let round = 1;

/*  
 * DOCU: Creates a character object with random or provided properties for a game.
 * @param {string} name - Optional. The name of the character. If not provided, a random name is chosen from the `names` array.
 * @returns {object} - Returns a character object with the following properties:
 *   - name: The character's name (string)
 *   - health: A random number between 50 and 150 representing the character's health
 *   - class: A random class chosen from the `classes` array
 *   - specialAbility: A random ability chosen from the `abilities` array
 *   - battle(opponent): A method that makes this character attack another character
 *
 * The battle(opponent) method works as:
 *   - Calculates random damage between 5 and 20
 *   - Reduces the opponent's health by that amount
 *   - Ensures opponent's health does not go below 0
 *   - Logs a message showing the attack, the ability used, and the opponent's health before and after the attack
 *
 * Last Updated: 2026-02-09
 * Author: Janverly
 */
function generateCharacter(name) {
  return {
    name: name || names[Math.floor(Math.random() * names.length)],
    health: Math.floor(Math.random() * 101) + 50, // 50–150, did search this 
    class: classes[Math.floor(Math.random() * classes.length)],
    specialAbility: abilities[Math.floor(Math.random() * abilities.length)],

    battle: function(opponent) {
      const damage = Math.floor(Math.random() * 16) + 5; // 5–20
      const prevHealth = opponent.health;
      opponent.health  = opponent.health - damage;
      if (opponent.health < 0) opponent.health = 0;
      console.log(
        this.name + " (" + this.class + ") attacks " +
        opponent.name + " (" + opponent.class + ") with " +
        this.specialAbility + ". " +
        opponent.name + "'s health drops from " + prevHealth +
        " to " + opponent.health
      );
    }
  };
}

/*  
 * DOCU: Creates a party (array) of game characters.
 * @param {number} count - The number of characters to generate in the party.
 * @returns {object[]} - Returns an array of character objects, each created using the `generateCharacter` function.
 *
 * Last Updated: 2026-02-09
 * Author: Janverly
 */
function generateMultipleCharacter(count) {
  const party = [];
  for (let i = 0; i < count; i++) {
    party[i] = generateCharacter();
  }
  return party;
}

/*  
 * DOCU: Displays the health of all characters in a given party.
 * @param {object[]} party - An array of character objects whose health will be displayed.
 * @param {string} partyName - The name of the party to display in the output.
 * @returns - Prints the party's characters and their current health to the console.
 *
 * Last Updated: 2026-02-09
 * Author: Janverly
 */
function showPartyHP(party, partyName) {
  let status = partyName + " HP: ";
  for (let i = 0; i < party.length; i++) {
    status += party[i].name + "(" + party[i].health + ") ";
  }
  console.log(status); //and instead of character.randomizeHealth
}

/*  
 * DOCU: Starts a battle between two parties and displays their members.
 * @param {object[]} party1 - Array of character objects representing the first party.
 * @param {object[]} party2 - Array of character objects representing the second party.
 * @returns - Prints the members of both parties with their class and current health to the console.
 *
 * Last Updated: 2026-02-09
 * Author: Janverly
 */

function partyBattle(party1, party2) {
  round = 1;
  console.log("\n=== Party Battle Start ===");

  // Show party members with health 
  console.log("Party 1:");
  for (let i = 0; i < party1.length; i++) {
    console.log(party1[i].name + " - " + party1[i].class + " - HP: " + party1[i].health);
  }
  console.log("Party 2:");
  for (let i = 0; i < party2.length; i++) {
    console.log(party2[i].name + " - " + party2[i].class + " - HP: " + party2[i].health);
  }

  /*  
 * DOCU: Performs one round of battle between two parties.  
 *        Each living character attacks an opponent with a delay.  
 *        Updates HP, displays results, and repeats until a party wins or max rounds are reached.
 *
 * @function nextRound
 * @returns - Logs attacks, updates health, and shows the battle outcome.
 *
 * Last Updated: 2026-02-09
 * Author: Janverly
 */

  function nextRound() {
    console.log("\n--- Round " + round + " ---");

    let delay = 0;

    // Party1 attacks Party2
    for (let i = 0; i < party1.length; i++) {
      const attacker = party1[i];
      if (attacker.health > 0) {
        for (let j = 0; j < party2.length; j++) {
          const target = party2[j];
          if (target.health > 0) {
            setTimeout(() => {
              console.log(attacker.name + " from Party 1 is attacking!");
              attacker.battle(target);
            }, delay);
            delay = delay + 1500;
            break;
          }
        }
      }
    }

    // Party2 attacks Party1
    for (let i = 0; i < party2.length; i++) {
      const attacker = party2[i];
      if (attacker.health > 0) {
        for (let j = 0; j < party1.length; j++) {
          const target = party1[j];
          if (target.health > 0) {
            setTimeout(() => {
              console.log(attacker.name + " from Party 2 is attacking!");
              attacker.battle(target);
            }, delay);
            delay = delay + 1500;
            break;
          }
        }
      }
    }

    // After all attacks, show HP and check for battle end
    setTimeout(() => {
      showPartyHP(party1, "Party 1");
      showPartyHP(party2, "Party 2");

      round++;

      // Check alive
      let party1Alive = false;
      let party2Alive = false;
      
      //if there is at least 1 character still alive in the party
      for (let i = 0; i < party1.length; i++) if (party1[i].health > 0) party1Alive = true;
      for (let i = 0; i < party2.length; i++) if (party2[i].health > 0) party2Alive = true;

        if (round > maxRounds || !party1Alive || !party2Alive) {
        console.log("\n=== Battle Result ===");

        if (party1Alive && party2Alive) {
            console.log("It's a draw!");
        } 
        else if (party1Alive && !party2Alive) {
            console.log("Party 1 wins!");
        } 
        else if (!party1Alive && party2Alive) {
            console.log("Party 2 wins!");
        } 
        else {
            console.log("Both parties are defeated. It's a draw!");
        }

        // Show alive characters
        console.log("\nAlive characters:");
        for (let i = 0; i < party1.length; i++) {
            if (party1[i].health > 0) {
            console.log(party1[i].name + " - HP: " + party1[i].health);
            }
        }
        for (let i = 0; i < party2.length; i++) {
            if (party2[i].health > 0) {
            console.log(party2[i].name + " - HP: " + party2[i].health);
            }
        }

        return;
        }


      nextRound();
    }, delay + 500);
  }

  nextRound();
}

// Generate 2 parties of 3 characters
const party1 = generateMultipleCharacter(3);
const party2 = generateMultipleCharacter(3);


partyBattle(party1, party2); //call the func
