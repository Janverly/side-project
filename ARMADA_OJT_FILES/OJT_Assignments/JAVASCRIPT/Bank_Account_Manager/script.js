/*
 * DOCU: Stores the current balance of the bank account.
 *       This value is updated after every valid transaction.
 * 
 * Date: 02/09/26
 * Author: Janverly
 */

let balance = 1000; // Initial balance

const balanceDisplay = document.getElementById("balance"); //display current balance
const amountInput = document.getElementById("amount"); //user's input 
const message = document.getElementById("message"); 

const depositBtn = document.getElementById("depositBtn"); //trigger depo
const withdrawBtn = document.getElementById("withdrawBtn"); //trigger wid


/*
 * DOCU: Handles deposit transactions.
 *       Validates the entered amount before adding it
 *       to the account balance.
 * 
 * Date: 02/09/26
 * Author: Janverly
 */
function deposit() {
    const amount = Number(amountInput.value);

    if (amount <= 0) {
        showMessage("Enter a valid deposit amount.", "red");
        return;
    }

    balance = balance + amount;
    updateBalance();
    showMessage(`Deposited ₱${amount}`, "green");
    amountInput.value = "";
}

/*
 * DOCU: Handles withdrawal transactions.
 *       Ensures the amount is valid and does not
 *       exceed the current balance.
 * 
 * Date: 02/09/26
 * Author: Janverly
 */
function withdraw() {
    const amount = Number(amountInput.value);

    //did ask for help with gpt with the color
    if (amount <= 0) {
        showMessage("Enter a valid withdrawal amount.", "red");
        return;
    }

    if (amount > balance) {
        showMessage("Insufficient balance.", "red");
        return;
    }

    balance = balance - amount;
    updateBalance();
    showMessage(`Withdrew ₱${amount}`, "green");
    amountInput.value = "";
}


/*
 * Updates the displayed balance on the screen.
 * Uses textContent to reflect changes in real time.
 */
function updateBalance() {
    balanceDisplay.textContent = balance;
}

/*
 * Displays a feedback message to the user.
 * The color changes based on transaction result.
 */
function showMessage(text, color) {
    message.textContent = text;
    message.style.color = color;
}


depositBtn.addEventListener("click", deposit); //triggers deposit funcitona nd button
withdrawBtn.addEventListener("click", withdraw); //button and function widthdraw 
