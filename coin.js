// =====================
// Coins System
// =====================

let coins = Number(localStorage.getItem("coins") || 0);

function updateCoins() {

    localStorage.setItem("coins", coins);

    const coinTop = document.getElementById("coins");
    const coinCard = document.getElementById("coinCard");

    if (coinTop) coinTop.textContent = coins;
    if (coinCard) coinCard.textContent = coins;
}

function addCoins(amount) {

    coins += amount;

    updateCoins();

}

function removeCoins(amount) {

    coins = Math.max(0, coins - amount);

    updateCoins();

}

updateCoins();