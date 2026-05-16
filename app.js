let currentXP = 0;



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


const classSelect = document.getElementById("class");
const regionSelect = document.getElementById("region");

const statsDisplay = document.getElementById("statsDisplay");
const regionBoostDisplay = document.getElementById("regionBoostDisplay");
const abilitiesDisplay = document.getElementById("abilitiesDisplay");

classSelect.addEventListener("change", updateCharacterSheet); 
regionSelect.addEventListener("change", updateCharacterSheet);

function updateCharacterSheet() {

    const selectedClass = classSelect.value;
    const selectedRegion = regionSelect.value;

    
    regionBoostDisplay.innerHTML = "";
    abilitiesDisplay.innerHTML = "";
    statsDisplay.innerHTML = "";

    if (!classes[selectedClass]) return;

    const classData = classes[selectedClass];
    const regionData = regions[selectedRegion];

    const finalStats = calculateStats(classData, regionData);

    statsDisplay.innerHTML = `<h3>Stats</h3>`;

    for (let stat in finalStats) {
        statsDisplay.innerHTML += ` <p>${stat}: ${finalStats[stat]}</p>`;
    }


    abilitiesDisplay.innerHTML =`
        <h3>abilities</h3>
        `;

        abilitiesDisplay.innerHTML = "";

        classData.abilities.forEach((ability) => {
            const desc= ability.description || "special class ability";
            const cooldown= ability.cooldown || "N/A";
        abilitiesDisplay.innerHTML += `
            <div class="ability-card">
                <h3>${ability.name}</h3>
                <p><strong>Description:</strong><span class="ability-data">${desc}</span></p>
                <p><strong>Cooldown:</strong><span class="ability-data">${cooldown}</span></p>
            </div>
       `;
    });
}