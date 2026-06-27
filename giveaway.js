// =====================
// Giveaway System
// =====================

const giveawayList = document.getElementById("giveawayList");

const giveaways = [

    {

        title: "🎁 Telegram Premium",

        prize: "1 Month Telegram Premium",

        coins: 50

    },

    {

        title: "💵 Cash Giveaway",

        prize: "$20 USDT",

        coins: 100

    }

];

function loadGiveaways() {

    if (!giveawayList) return;

    giveawayList.innerHTML = "";

    giveaways.forEach((g) => {

        giveawayList.innerHTML += `
        <div class="giveawayCard">

            <h2>${g.title}</h2>

            <p>${g.prize}</p>

            <button onclick="joinGiveaway(${g.coins})">

            Join (${g.coins} Coins)

            </button>

        </div>
        `;

    });

}

function joinGiveaway(cost) {

    if (coins < cost) {

        alert("❌ Not enough coins!");

        return;

    }

    removeCoins(cost);

    alert("🎉 Successfully Joined!");

}
loadGiveaways();

// ===========================
// GAMES
// ===========================

function playSlots(){

    const cost = 10;

    if(coins < cost){

        alert("❌ You need 10 coins.");
        return;

    }

    removeCoins(cost);

    let symbols=["🍒","🍋","💎","⭐","7️⃣"];

    let a=symbols[Math.floor(Math.random()*symbols.length)];
    let b=symbols[Math.floor(Math.random()*symbols.length)];
    let c=symbols[Math.floor(Math.random()*symbols.length)];

    if(a===b && b===c){

        addCoins(100);

        alert(
            "🎰 "+a+" "+b+" "+c+
            "\n\n🎉 JACKPOT!\n+100 Coins"
        );

    }else{

        alert(
            "🎰 "+a+" "+b+" "+c+
            "\n\n💔 You Lost"
        );

    }

}

function playDice(){

    const cost=5;

    if(coins<cost){

        alert("❌ Need 5 coins.");

        return;

    }

    removeCoins(cost);

    let player=Math.floor(Math.random()*6)+1;
    let bot=Math.floor(Math.random()*6)+1;

    if(player>bot){

        addCoins(15);

        alert(
            "🎲 You: "+player+
            "\n🤖 Bot: "+bot+
            "\n\n🎉 You Win!\n+15 Coins"
        );

    }else if(player===bot){

        addCoins(5);

        alert(
            "🤝 Draw!\n\n5 Coins Returned."
        );

    }else{

        alert(
            "😢 You Lost\n\n🎲 "+player+
            " vs "+bot
        );

    }

}

function playWheel(){

    const cost=20;

    if(coins<cost){

        alert("❌ Need 20 coins.");

        return;

    }

    removeCoins(cost);

    let rewards=[0,10,20,30,50,100,200];

    let reward=rewards[Math.floor(Math.random()*rewards.length)];

    if(reward>0){

        addCoins(reward);

        alert(
            "🎯 Lucky Wheel\n\n🎉 +"+
            reward+
            " Coins"
        );

    }else{

        alert(
            "💔 Better luck next time!"
        );

    }

}

function dailyReward(){

    let today=new Date().toDateString();

    let last=localStorage.getItem("dailyReward");

    if(last===today){

        alert(
            "⏳ You already claimed today's reward."
        );

        return;

    }

    localStorage.setItem("dailyReward",today);

    addCoins(25);

    alert(
        "🎁 Daily Reward\n\n+25 Coins"
    );

}
