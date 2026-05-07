let currentXP = P;

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

const levelInput = document.getElementById('level');
const xpInput = document.getElementById('xp');

xpInput.addEventListener('input', () => {
    let currentLevel = parseInt(levelInput.value) || 1;
    let currentXP = parseInt(xpInput.value) || 0;
    
    // the progressive math;
    //starting at 100 xp, increasing by 25% per level
    let xpNeeded = Math.floor(100 * Math.pow(1.25, currentLevel - 1));
    
    if (currentXP >= xpNeeded) {
        levelInput.value = currentLevel + 1;
        
        //this resets xp to 0.
        //if you want to keep the "extra" xp:
xpInput.value = currentXP - xpNeeded;
        
        
        alert(`level up! you need ${Math.floor(100 * 
Math.pow(1.25, currentLevel))} xp for the next level.`);
    }
});


function updateXPBar() {
    const levelInput =
document.getElementById(`level`);
    const xpInput = document.getElementById(`xp`);
    const barFill = document.getElementById(`xp-bar-fill`);
    const xpText = document.getElementById(`xp-text`);
    
    let currentLevel = parseInt(levelInput.value) || 1;
    let currentXP = currentXP || 0;
    
    let xpNeeded = Math.floor(100 * Math.pow(1.25, currentLevel - 1));

    let percentage = (currentXP / xpNeeded) * 100;
    
    barFill.style.width = percentage + "%";
    xpText.innerText = `${currentXP} / ${xpNeeded} XP`;
    
}

updateXPBar();




document.getElementById('add-xp-button').addEventListener('click', () => {
    let amount =
parseInt(document.getElementById('xp-amount').value) || 0;
    currentXp += amount;
    document.getElementById('xp-amount').value = '';
    updateXPBar();
});