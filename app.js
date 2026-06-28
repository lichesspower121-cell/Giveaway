// =====================================
// MAX GIVEAWAY MINI APP
// Batch 1
// By @kingvmax
// =====================================

const tg = window.Telegram.WebApp;

tg.ready();
tg.expand();

// =====================================
// CONFIG
// =====================================

const API = "https://broken-fire-be9c.lichesspower121.workers.dev";

const ADMIN_ID = 8264872439;

// =====================================
// USER
// =====================================

const user = tg.initDataUnsafe.user || {};

let coins = 0;
let referrals = 0;
let premium = false;

// =====================================
// START
// =====================================

window.addEventListener("load", async () => {

    if (!user.id) {

        alert("Please open inside Telegram.");

        return;

    }

    await loadUser();

    document.getElementById("loading").style.display = "none";

    document.getElementById("app").style.display = "flex";

});

// =====================================
// LOAD USER
// =====================================

async function loadUser() {

    const res = await fetch(

        API +

        "/user?id=" + encodeURIComponent(user.id) +

        "&username=" + encodeURIComponent(user.username || "") +

        "&first_name=" + encodeURIComponent(user.first_name || "") +

        "&photo_url=" + encodeURIComponent(user.photo_url || "")

    );

    const data = await res.json();

    coins = Number(data.coins || 0);

    referrals = Number(data.referrals || 0);

    premium = Boolean(data.premium);

    updateUI(data);

}

// =====================================
// UPDATE UI
// =====================================

function updateUI(data) {

    // Header

    document.getElementById("username").textContent =
        data.first_name || user.first_name || "User";

    document.getElementById("userid").textContent =
        "ID: " + data.id;

    // Home

    document.getElementById("coins").textContent =
        user.id == ADMIN_ID ? "∞" : coins;

    document.getElementById("coinCard").textContent =
        user.id == ADMIN_ID ? "∞" : coins;

    document.getElementById("points").textContent = coins;

    document.getElementById("refs").textContent = referrals;

    document.getElementById("rank").textContent =
        user.id == ADMIN_ID
            ? "👑 Owner"
            : premium
                ? "💎 Premium"
                : "🥉 Member";

    // Profile

    document.getElementById("profileName").textContent =
        data.first_name || user.first_name || "User";

    document.getElementById("profileID").textContent =
        data.username
            ? "@" + data.username
            : "ID: " + data.id;

    document.getElementById("profileCoins").textContent =
        user.id == ADMIN_ID ? "∞" : coins;

    document.getElementById("profilePoints").textContent =
        coins;

    document.getElementById("profileRefs").textContent =
        referrals;

    document.getElementById("profileRank").textContent =
        user.id == ADMIN_ID
            ? "👑 Owner"
            : premium
                ? "💎 Premium"
                : "🥉 Member";

    // Avatar

    if (user.photo_url) {

        document.getElementById("avatar").innerHTML =
            `<img src="${user.photo_url}" style="width:100%;height:100%;border-radius:50%;">`;

        document.querySelector(".bigAvatar").innerHTML =
            `<img src="${user.photo_url}" style="width:100%;height:100%;border-radius:50%;">`;

    }

    // Admin

    const adminNav = document.getElementById("adminNav");

    if (user.id == ADMIN_ID || user.username == "kingvmax") {

        adminNav.style.display = "flex";

    } else {

        adminNav.style.display = "none";

    }

}
