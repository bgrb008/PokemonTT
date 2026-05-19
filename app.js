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

function calculateStats(classData, regionData) {
    const result = classData ? { ...classData.stats } : {};

    if (regionData) {
        for (let stat in regionData.stats) {
            result[stat] = (result[stat] || 0) + regionData.stats[stat];
        }
    }

    return result;
}

function updateCharacterSheet() {

    const selectedClass = classSelect.value;
    const selectedRegion = regionSelect.value;

    
    regionBoostDisplay.innerHTML = "";
    abilitiesDisplay.innerHTML = "";
    

    const classData = classes[selectedClass];
    const regionData = regions[selectedRegion];

    const finalStats = calculateStats(classData, regionData);

    statsDisplay.innerHTML = "";

    const allStatInputs = document.querySelectorAll("[id^='mod-']");
    allStatInputs.forEach(input => input.value = "");

    for (let stat in finalStats) {
        const statInput = document.getElementById("mod-" + stat);
    if (statInput) {
        statInput.value = finalStats[stat];
    }
    }

        regionBoostDisplay.innerHTML = "";
if (regionData && regionData.boosts) {
    regionData.boosts.forEach((boostItem) => {
    const desc= boostItem.description || "special region boost";
    const boostVal= boostItem.boost || "regional specific boost";
    const terrain= boostItem.terrain || "terrain specific boost";
    regionBoostDisplay.innerHTML += `
        <div class="region-boost-card">
            <h3>${regionData.name}</h3>
            <p><strong>Description:</strong><span class="region-boost-data">${desc}</span></p>
            <p><strong>Boost:</strong><span class="region-boost-data">${boostVal}</span></p>
            <p><strong>Terrain:</strong><span class="region-boost-data">${terrain}</span></p>
        </div>

    `;
    
    });

} else {
    regionBoostDisplay.innerHTML = "";
}


        abilitiesDisplay.innerHTML = "";

 if (classData && classData.abilities) {  
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
 } else {
     abilitiesDisplay.innerHTML = "";
}