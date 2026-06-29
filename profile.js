// ===========================
// PROFILE
// ===========================

async function loadProfile() {

    if (!user) return;

    const res = await fetch(

        "https://broken-fire-be9c.lichesspower121.workers.dev/user?id=" +

        user.id

    );

    const data = await res.json();

    document.getElementById("profileName").innerHTML =
        data.first_name;

    document.getElementById("profileID").innerHTML =
        "@" + data.username;

    document.getElementById("profileCoins").innerHTML =
        data.coins;

    document.getElementById("profilePoints").innerHTML =
        data.coins;

    document.getElementById("profileRefs").innerHTML =
        data.referrals;

    document.getElementById("profileRank").innerHTML =
        user.id == 8264872439
        ? "👑 Owner"
        : "🥉 Member";

}

loadProfile();
