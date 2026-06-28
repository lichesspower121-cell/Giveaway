// ===========================
// MAX GIVEAWAY MINI APP
// By @kingvmax
// ===========================

const tg = window.Telegram.WebApp;

tg.ready();
tg.expand();

// ===========================
// CONFIG
// ===========================

const API =
"https://broken-fire-be9c.lichesspower121.workers.dev";

const ADMIN_ID = 8264872439;

// ===========================
// Loading
// ===========================

window.addEventListener("load", async () => {

    try {

        await loadUser();

    } catch (e) {

        console.error(e);

    }

    document.getElementById("loading").style.display = "none";
    document.getElementById("app").style.display = "flex";

});

// ===========================
// Telegram User
// ===========================

const user = tg.initDataUnsafe.user || {};

let coins = 0;
let referrals = 0;
let premium = false;

// ===========================
// Load User
// ===========================

async function loadUser() {

    if (!user.id) return;

    const res = await fetch(
        API + "/user?id=" + user.id
    );

    const data = await res.json();

    coins = Number(data.coins || 0);
    referrals = Number(data.referrals || 0);
    premium = Boolean(data.premium);
    coins = Number(data.coins || 0);
referrals = Number(data.referrals || 0);
premium = Boolean(data.premium);

document.getElementById("profileName").textContent =
    user.first_name || "Unknown";

document.getElementById("profileID").textContent =
    user.username
        ? "@" + user.username
        : "No Username";

    updateUI();

}

// ===========================
// Update UI
// ===========================

function updateUI() {

    document.getElementById("username").textContent =
        user.first_name || "Unknown";

    document.getElementById("userid").textContent =
        "ID: " + user.id;

    document.getElementById("profileName").textContent =
        user.first_name || "Unknown";

  document.getElementById("profileID").textContent =
    "ID: " + user.id;

    document.getElementById("coins").textContent = coins;
    document.getElementById("coinCard").textContent = coins;

    document.getElementById("points").textContent = coins;

    document.getElementById("refs").textContent = referrals;
    // ===========================
// PROFILE PAGE
// ===========================

document.getElementById("profileCoins").textContent = coins;

document.getElementById("profilePoints").textContent = coins;

document.getElementById("profileRefs").textContent = referrals;

if (user.id === ADMIN_ID) {

    document.getElementById("profileRank").textContent =
        "👑 Owner";

} else if (premium) {

    document.getElementById("profileRank").textContent =
        "💎 Premium";

} else {

    document.getElementById("profileRank").textContent =
        "🥉 Member";

}

    if (user.id === ADMIN_ID) {

        document.getElementById("rank").textContent =
            "👑 Owner";

        document.getElementById("coins").textContent =
            "∞";

        document.getElementById("coinCard").textContent =
            "∞";

    } else {

        document.getElementById("rank").textContent =
            premium
                ? "💎 Premium"
                : "🥉 Member";

    }

    if (user.photo_url) {

        document.getElementById("avatar").innerHTML =
            `<img src="${user.photo_url}">`;

        document.querySelector(".bigAvatar").innerHTML =
            `<img src="${user.photo_url}">`;

    }

}
// ===========================
// Navigation
// ===========================

const pages = document.querySelectorAll(".page");
const navButtons = document.querySelectorAll("nav button");

navButtons.forEach((btn) => {

    btn.addEventListener("click", () => {

        const page = btn.dataset.page;

        if (!page) return;

        pages.forEach((p) => p.classList.remove("active"));

        const target = document.getElementById(page);

        if (target) {

            target.classList.add("active");

        }

        navButtons.forEach((b) => {

            b.classList.remove("active");

        });

        btn.classList.add("active");

        tg.HapticFeedback.selectionChanged();

    });

});

// ===========================
// Admin
// ===========================

const adminNav = document.getElementById("adminNav");

if (adminNav) {

    if (
        user.id === ADMIN_ID ||
        user.username === "kingvmax"
    ) {

        adminNav.style.display = "flex";

    } else {

        adminNav.style.display = "none";

    }

}

// ===========================
// Coin Functions
// ===========================

async function addCoins(amount) {

    if (user.id === ADMIN_ID) {

        return;

    }

    const res = await fetch(

        API +
        "/addCoins?id=" +
        user.id +
        "&amount=" +
        amount

    );

    const data = await res.json();

    coins = data.coins;

    updateUI();

}

async function removeCoins(amount) {

    if (user.id === ADMIN_ID) {

        return true;

    }

    const res = await fetch(

        API +
        "/removeCoins?id=" +
        user.id +
        "&amount=" +
        amount

    );

    const data = await res.json();

    if (data.success === false) {

        tg.showAlert("❌ Not enough coins!");

        return false;

    }

    coins = data.coins;

    updateUI();

    return true;

}

// ===========================
// Refresh Coins
// ===========================

setInterval(() => {

    loadUser();

}, 10000);
// ===========================
// GIVEAWAYS
// ===========================

const giveawayBtn =
document.getElementById("enterGiveaway");

if (giveawayBtn) {

    giveawayBtn.onclick = async () => {

        const joined = await removeCoins(50);

        if (!joined) return;

        tg.HapticFeedback.notificationOccurred("success");

        tg.showAlert(
            "🎉 Successfully entered the Giveaway!\n\n50 Coins deducted."
        );

    };

}

// ===========================
// DAILY REWARD
// ===========================

async function dailyReward() {

    const last =
    Number(localStorage.getItem("daily") || 0);

    const now = Date.now();

    if (now - last < 86400000) {

        tg.showAlert(
            "⏰ You already claimed today's reward!"
        );

        return;

    }

    localStorage.setItem("daily", now);

    await addCoins(100);

    tg.HapticFeedback.notificationOccurred("success");

    tg.showAlert(
        "🎁 Daily Reward Claimed!\n\n+100 Coins"
    );

}

// ===========================
// SLOT MACHINE
// ===========================

async function playSlots() {

    const ok = await removeCoins(10);

    if (!ok) return;

    const roll =
    Math.floor(Math.random() * 100);

    if (roll >= 95) {

        await addCoins(500);

        tg.showAlert("🎰 JACKPOT!\n\n+500 Coins");

    }

    else if (roll >= 70) {

        await addCoins(30);

        tg.showAlert("🎉 You won +30 Coins");

    }

    else {

        tg.showAlert("😢 Better luck next time.");

    }

}

// ===========================
// DICE
// ===========================

async function playDice() {

    const ok = await removeCoins(5);

    if (!ok) return;

    const dice =
    Math.floor(Math.random() * 6) + 1;

    if (dice >= 5) {

        await addCoins(20);

        tg.showAlert(
            "🎲 You rolled " +
            dice +
            "\n\n+20 Coins"
        );

    }

    else {

        tg.showAlert(
            "🎲 You rolled " +
            dice +
            "\nNo reward."
        );

    }

}

// ===========================
// LUCKY WHEEL
// ===========================

async function playWheel() {

    const ok = await removeCoins(20);

    if (!ok) return;

    const prizes = [

        0,
        25,
        50,
        100,
        250,
        500

    ];

    const reward =
    prizes[
        Math.floor(Math.random() * prizes.length)
    ];

    if (reward > 0) {

        await addCoins(reward);

        tg.showAlert(
            "🎯 Lucky Wheel!\n\n+" +
            reward +
            " Coins"
        );

    }

    else {

        tg.showAlert(
            "😢 No reward this time."
        );

    }

}
// ===========================
// LEADERBOARD
// ===========================

async function loadLeaderboard() {

    try {

        const res = await fetch(
            API + "/leaderboard"
        );

        const data = await res.json();

        const board =
        document.getElementById("leaderboard");

        if (!board) return;

        board.innerHTML = "";

        data.forEach((u, index) => {

            board.innerHTML += `
            <div class="leader">
                <h3>#${index + 1}</h3>
                <div>
                    <b>${u.username || "Unknown User"}</b>
                    <br>
                    🪙 ${u.coins}
                </div>
            </div>
            `;

        });

    } catch (e) {

        console.log(e);

    }

}

// ===========================
// SETTINGS
// ===========================

const themeBtn =
document.getElementById("themeBtn");

if (themeBtn) {

    themeBtn.onclick = () => {

        tg.showAlert(
            "🌙 Dark Theme Enabled"
        );

    };

}

const aboutBtn =
document.getElementById("aboutBtn");

if (aboutBtn) {

    aboutBtn.onclick = () => {

        tg.showAlert(
            "👑 MAX GIVEAWAY\n\nOfficial Mini App\n\nDeveloper:\n@kingvmax"
        );

    };

}

// ===========================
// OWNER MODE
// ===========================

if (user.id === ADMIN_ID) {

    coins = 999999999;

    updateUI();

}

// ===========================
// AUTO REFRESH
// ===========================

setInterval(() => {

    loadUser();

}, 15000);

// ===========================
// START
// ===========================

loadLeaderboard();

console.log(
    "✅ MAX GIVEAWAY LOADED"
);

