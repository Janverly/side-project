let balance = 1000;
let dailyWithdrawn = 0;
const dailyLimit = 500;

const balanceDisplay = document.getElementById("balance");
const dailyUsedDisplay = document.getElementById("dailyUsed");
const amountInput = document.getElementById("amount");
const historyList = document.getElementById("history");
const notificationContainer = document.getElementById("notificationContainer");

const depositBtn = document.getElementById("depositBtn");
const withdrawBtn = document.getElementById("withdrawBtn");



function deposit() {
    const amount = Number(amountInput.value);

    if (amount <= 0) {
        showNotification("Enter a valid deposit amount.", "error");
        return;
    }

    balance += amount;
    updateBalance();
    addTransaction("Deposit", amount);
    showNotification(`Deposited $${amount}`, "success");
    amountInput.value = "";
}

function withdraw() {
    const amount = Number(amountInput.value);

    if (amount <= 0) {
        showNotification("Enter a valid withdrawal amount.", "error");
        return;
    }

    if (amount > balance) {
        showNotification("Insufficient balance.", "error");
        return;
    }

    if (dailyWithdrawn + amount > dailyLimit) {
        showNotification("Daily withdrawal limit exceeded ($500).", "error");
        return;
    }

    balance = balance - amount;
    dailyWithdrawn = dailyWithdrawn + amount;

    updateBalance();
    updateDailyWithdrawal();
    addTransaction("Withdraw", amount);
    showNotification(`Withdrew $${amount}`, "success");
    amountInput.value = "";
}

function updateBalance() {
    balanceDisplay.textContent = balance;
}

function updateDailyWithdrawal() {
    dailyUsedDisplay.textContent = dailyWithdrawn;
}

function addTransaction(type, amount) {
    const li = document.createElement("li");
    li.textContent = `${type}: $${amount}`;
    historyList.appendChild(li);
}

function showNotification(text, type) {
    const notif = document.createElement("div");
    notif.className = `notification ${type}`;
    notif.textContent = text;

    notificationContainer.appendChild(notif);

    setTimeout(() => {
        notif.remove();
    }, 4000);
}


depositBtn.addEventListener("click", deposit);
withdrawBtn.addEventListener("click", withdraw);