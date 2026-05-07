let currentXP = 0;

let teamDiv = document.getElementById("team");

function addPokemon() {
        let div = document.createElement("div");
        div.className = "pokemon";

        div.innerHTML = `
                <input placeholder="Pokemon Name">
                <input type="number" placeholder="HP">
                <input placeholder="Move 1">
                <input placeholder="Move 2">
        `;

        teamDiv.appendChild(div);
}




function updateXPBar() {
    const levelInput =
document.getElementById(`level`);
    
    const barFill = document.getElementById(`xp-bar-fill`);
    const xpText = document.getElementById(`xp-text`);
    
    let currentLevel = parseInt(levelInput.value) || 1;

    
    let xpNeeded = Math.floor(100 * Math.pow(1.25, currentLevel - 1));

    let percentage = (currentXP / xpNeeded) * 100;
    
    barFill.style.width = percentage + "%";
    xpText.innerText = `${currentXP} / ${xpNeeded} XP`;
    
}

updateXPBar();




document.getElementById('add-xp-button').addEventListener('click', () => {
    let amount =
parseInt(document.getElementById('xp-amount').value) || 0;
    currentXP += amount;

    let currentLevel = parseInt(document.getElementById('level').value) || 1;
    let xpNeeded = Math.floor(100 * Math.pow(1.25, currentLevel - 1));
    if (currentXP >= xpNeeded) {
        document.getElementById('level').value = currentLevel + 1;
    currentXP = currentXP - xpNeeded;
   alert(`level up! You need ${Math.floor(100 * Math.pow(1.25, currentLevel))} XP for the next level.`);
 }
    document.getElementById('xp-amount').value = '';
    updateXPBar();
});

const classes = {
     pokemonMaster: {
         name: "Pokemon Master",

         stats: {
             battletactics: 2,
             bonding: 2,
             perception: 1,
             command: 1,
             inspiration: 1,
             pokemonlore: 0,
         },

         abilities: [
             "Adaptive Trainer",
             "Bond Stability",
             "Clutch Synchronization",
             "Masters Switch",
         ]
        },

    theCollector: {
        name: "The Collector",

        stats: {
            catching: 3,
            tracking: 2,
            perception: 1,
            survival: 1,
            pokemonlore: 1,
            bonding: -1
        },

        abilities: [
            "Shiny Sense",
            "Efficient Catching",
            "Field Awareness",
            "Pack Catalog"
        ]
        },

    