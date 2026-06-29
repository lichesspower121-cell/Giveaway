// =====================
// Cloudflare Coins
// =====================

async function refreshCoins() {

    if (!user) return;

    const res = await fetch(

        "https://broken-fire-be9c.lichesspower121.workers.dev/user?id=" +

        user.id

    );

    const data = await res.json();

    coins = Number(data.coins || 0);

    document.getElementById("coins").textContent = coins;
    document.getElementById("coinCard").textContent = coins;

    document.getElementById("points").textContent = coins;

    document.getElementById("profileCoins").textContent = coins;
    document.getElementById("profilePoints").textContent = coins;

}
