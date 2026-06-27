// ===========================
// MAX GIVEAWAY MINI APP
// ===========================

const tg = window.Telegram.WebApp;

tg.ready();
tg.expand();

// Loading Screen

window.onload = function () {

    setTimeout(function () {

        document.getElementById("loading").style.display = "none";

        document.getElementById("app").style.display = "block";

    }, 1500);

};

// ===========================
// Telegram User
// ===========================

let user = tg.initDataUnsafe.user;

const adminButton = document.getElementById("adminNav");

if (adminButton) {
    adminButton.style.display =
        (user && user.username === "kingvmax")
            ? "flex"
            : "none";
}

if (user) {

    document.getElementById("username").innerHTML =
        user.first_name;

    document.getElementById("userid").innerHTML =
        "ID: " + user.id;

    document.getElementById("profileName").innerHTML =
        user.first_name;

    document.getElementById("profileID").innerHTML =
        user.username
        ? "@" + user.username
        : "No Username";

    if (user.photo_url) {

        document.getElementById("avatar").innerHTML =
            `<img src="${user.photo_url}" style="width:100%;height:100%;border-radius:50%;">`;

        document.querySelector(".bigAvatar").innerHTML =
            `<img src="${user.photo_url}" style="width:100%;height:100%;border-radius:50%;">`;

    }

}

// ===========================
// Mini App Coins
// ===========================

let coins = Number(
    localStorage.getItem("coins") || 0
);

document.getElementById("coins").innerHTML = coins;
document.getElementById("coinCard").innerHTML = coins;

// ===========================
// Navigation
// ===========================

const pages =
document.querySelectorAll(".page");

const buttons =
document.querySelectorAll("nav button");

buttons.forEach(btn => {

    btn.onclick = function () {

        pages.forEach(page => {

            page.classList.remove("active");

        });

        buttons.forEach(button => {

            button.classList.remove("active");

        });

        document
            .getElementById(btn.dataset.page)
            .classList.add("active");

        btn.classList.add("active");

        tg.HapticFeedback.selectionChanged();

    }

});

// ===========================
// Giveaway
// ===========================

document.getElementById(
"enterGiveaway"
).onclick = function(){

tg.HapticFeedback.notificationOccurred(
"success"
);

alert(

"🎉 Entry Submitted!\n\n🍀 Good Luck!"

);

};

// ===========================
// Theme
// ===========================

document.getElementById(
"themeBtn"
).onclick=function(){

alert(

"🌙 Dark Theme\n\nAlready Enabled."

);

};

// ===========================
// About
// ===========================

document.getElementById(
"aboutBtn"
).onclick=function(){

alert(

"👑 MAX GIVEAWAY\n\n"+

"Official Telegram Mini App\n\n"+

"Owner & Developer\n"+

"@kingvmax\n\n"+

"🎁 Join Giveaways\n"+

"🪙 Earn Coins\n"+

"🏆 Win Rewards\n"+

"👥 Invite Friends\n\n"+

"Version 1.0"

);

};
