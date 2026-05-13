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

const classes = {
     pokemonMaster: {
         name: "Pokemon Master",

         stats: {
             battletactics: 3,
             bonding: 2,
             perception: 1,
             command: 2,
             inspiration: 1,
             pokemonlore: 1,
             tracking: 1,
             survival: -1,
             catching: 2,
         },

         abilities: [
             {
             name: "Adaptive Flow",
             description: "When your pokemon has a critical hit, you may attack a 2nd time immediately after",
             cooldown: "Once per battle",
            },

             {
             name: "Masters Switch",
             description: "Trainer may switch their active pokemon without use of an action",
             cooldown: "Once per Battle",
             },

             {
             name: "Clutch Synchronization",
             description: "When your active pokemon has 30% or less hp, add 1d6 to all rolls and +2 to AC or defense",
             cooldown: "Duration 2 turns, once per battle",
             },

             {
             name: "Bond Stability",
             description: "When commanding pokemon +2 to all bond checks, reduce failure chance reroll 1s",
                cooldown: "Once per battle"
             },
         ]
        },

    theCollector: {
        name: "The Collector",

        stats: {
            catching: 3,
            tracking: 2,
            perception: 1,
            survival: -1,
            pokemonlore: 1,
            bonding: 1,
            battletactics: -1,
            empathy: 2,
            inspiration: 1,
        },

        abilities: [
            {
            name: "Efficient Catcher",
            description: "When catching a wild pokemon, roll 1d20 + tracking , if wild pokemon is below 50% hp, add 1d6 roll, roll with advantage on first catching roll",
            cooldown: "Twice per long rest",
            },

            {
            name: "Field Awareness",
            description: "When entering a wild area, roll 1d20 + tracking, if roll is more than a dc15 reveal a rare spawn",
            cooldown: "Once per wild area",
            },

            {
            name: "Rare Feelings",
            description: "When encountering a wild pokemon, roll 1d20 if dc18 or higher, rare encounter detected",
            cooldown: "Upon successful encounter +2 to catching rolls until end of encounter",
            },

            {
            name: "Lucky Encounter",
            description: "Fortune seems to guide you, upon succesful catch, roll 1d6 bonus xp",
            cooldown: "Once per long rest",
            },
            
        ]
        },


    pokemonBreeder: {
        name: "Pokemon Breeder",

        stats: {
            bonding: 3,
            empathy: 2,
            pokemonlore: 1,
            inspiration: 2,
            command: 1,
            catching: 1,
            perception: 1,
            battletactics: -1,
            survival: -1,
            
        },

        abilities: [
            {
            name: "Nurturing care",
            description: "Your care for your pokemon is unmatched, roll 1d6 for addition healing during a short rest",
            cooldown: "Once per short rest",
            },

            {
            name: "Evolution Insight",
            description: "When evolving a pokemon, roll 1d20 + bonding vs dc15, if successful roll 1d4 to reduce evolution level",
            cooldown: "Once per evolution"
            },

            {
            name: "Calm Presence",
            description: "When status effect is applied to your pokemon, roll 1d20 + empathy vs dc15, if successful remove status effect",
            cooldown: "once per battler",
            },

            {
            name: "Nature Boost",
            description: "When in a wild area, roll 1d20 + empathy vs dc15, if successful add 1d6 to a healing roll",
            cooldown: "Once per wild area",
            },
        ]
        },

    battleMaster: {
        name: "Battle Master",

        stats: {
            battletactics: 3,
            command: 2,
            perception: 2,
            inspiration: 1,
            bonding: 1,
            survival: -1,
            catching: 1,
            technology: 1,
            empathy: 1,
        },

        abilities: [
            {
            name: "Prediction Window",
            description: "When entering a battle, roll 1d20 + perception vs enemy hidden 1d20 roll + battle tactics, if successfil reveal enemy's first move",
            cooldown: "once at beginning of turn",
            },

            {
            name: "Finisher Instinct",
            description: "When enemy pokemon is less than 25% hp, add 1d8 damage to all attack rolls, if roll is 18 or higher, automatic critical hit",
            cooldown: "Once per battler",
            },

            {
            name: "Tactical Edge",
            description: "When entering a battle gain the advantage on your first 2 turns, +2 on all rolls and +1 to AC",
            cooldown: "Twice per long rest",
            },

            {
            name: "Pressure Play",
            description: "Roll penalty for enemy, if battle master is winning the match enemy rolls with disadvantage and take -2 to AC",
            cooldown: "Once per battle",
            },
        ]
       
    },

    researchFellow: {
        name: "Research Fellow",

        stats: {
            pokemonlore: 3,
            technology: 3,
            perception: 2,
            battletactics: -1,
            survival: 1,
            catching: 1,
            bonding: 1,
            command: -1,
            inspiration: 1,
        },

        abilities: [

            {
            name: "Scan Analysis",
            description: "When encountering a new pokemon not in your pokedex, roll 1d20 + technology vs dc15, if successful reveal ability, resistance, and weakness",
            cooldown: "Twice per long rest",
            },

            {
            name: "Data Advantage",
            description: "When encountering a pokemon that is in your pokedex, roll with arvantage on all rolls",
            cooldown: "Twice per long rest",
            },

            {
            name: "Field study",
            description: "When in the wild area, after a successful encounter, roll 1d20 if 15or higher roll 1d8 to gain extra xp",
            cooldown: "Once per encounter",
            },

            {
            name: "Tech Synergy",
            description: "When using an item roll 1d6 to add to strength of item or reroll failed item activation",
            cooldown: "once per item",
            },
        ]
        },

    influencer: {
        name: "Influencer",

        stats: {
            inspiration: 3,
            bonding: 1,
            command: 1,
            perception: 1,
            pokemonlore: 1,
            survival: -1,
            catching: 2,
            battletactics: 2,
            technology: 2,
        },

        abilities: [

            {
            name: "Crowd Hype",
            description: "During battle if player rolls a k/o or critical hit, roll 1d20 + inspiration vs dc15, if successeful stack 1d6 to all damage rolls, if failed stacks reset",
            cooldown: "Max of 4 stacks and once per battle",
            },

            {
            name: "Charisma Boost",
            description: "At the end of battle, if influencer wins, roll 1d20 + inspiration, if 15 or higher gain 1d6 xp, if you roll 18 or higher roll 2d6 xp",
            cooldown: "Once per battle",
            },

            {
            name: "Trend Setter",
            description: "When beginning a new battle, roll 1d20 + inspiration vs dc15, if successful gain advantage + 1d4 on first attack",
            cooldown: "Once per battle",
            },

            {
            name: "Fame",
            description: "The more you win the more famous you become, add 1d4 per win to all xp rolls",
            cooldown: "If you lose a battle, all stacks are removed",
            },
        ]
        },

    pokemonPerformer: {
        name: "Pokemon Performer",

        stats: {
            inspiration: 3,
            bonding: 2,
            battletactics: 1,
            perception: 1,
            command: 2,
            catching: -1,
            survival: -1,
            pokemonlore: 1,
            tracking: -1,
        },

        abilities: [
            {
            name: "Stage Pressence",
            description: "During a contest battle, on your turn roll 1d20 + inspiration vs dc15, if successeful gain a combo bonus of 1d6 additional damage",
            cooldown: "Once per battle",
            },

            {
            name: "Flow State",
            description: "At the beginning of your turn, roll 1d20 + bonding vs dc15, if successeful gain 1d4 to all damage rolls, can stack up to 4 times",
            cooldown: "If fail stacks reset, once per battle",
            },

            {
            name: "Audience Effect",
            descriptions: "When performing a contest move, draw inspiration from the crowd, roll 1d20 + inspiration vs dc15, if successful add 1d6 in bonus damage",
            cooldown: "Once per contest",
            },

            {
            name: "Graceful Recovery",
            description: "During a contest battle, if your pokemon gets knocked out, roll 1d20 + bonding if 15 or higher, pokemon gains 1d6 of hp, if 18 or higher gain 2d6",
            cooldown: "Once per long rest",
            },
        ]
        },

    pokemonRanger: {
        name: "Pokemon Ranger",

        stats: {
            survival: 3,
            tracking: 2,
            empathy: 1,
            perception: 1,
            technology: -1,
            battletactics: -1,
            catching: 1,
            pokemonlore: 1,
            bonding: 2,
            
        },

        abilities: [
            {
            name: "Wild Sense",
            description: "When entering a wild area roll 1d20 + tracking vs dc15, if successful reveal a rare spawn",
            cooldown: "Once per wild area",
            },

            {
            name: "Nature Bond",
            description: "When encountering a wild pokemon, roll 1d20 + empathy vs dc15 if successful, skip battle and add 1d4 to catch roll",
            cooldown: "Twice per long rest"
            },

            {
            name: "Environmental Adaptation",
            description: "When in a wild area or gym gain 1d6 to all damage rolls, based on environment( ie. grass, water, etc)",
            cooldown: "Once per battle or encounter",
            },

            {
            name: "Guardian Instinct",
            description: "When in a wild area roll 1d20 + perception vs dc 15, if successful divert 25% of allys damage to yourself",
            cooldown: "Once per wild area",
            },
        ]
        },

};


const classSelect = document.getElementById("class");
const statsDisplay = document.getElementById("statsDisplay");
const abilitiesDisplay = document.getElementById("abilitiesDisplay");

classSelect.addEventListener("change",() => {
    const selectedClass = classSelect.value;

    statsDisplay.innerHTML = "";
    abilitiesDisplay.innerHTML = "";

    if (!classes[selectedClass]) return;

    const classData = classes[selectedClass];

    const stats = classData.stats;

    document.getElementById('mod-battletactics').value = stats.battletactics || 0;
    document.getElementById('mod-bonding').value = stats.bonding || 0;
    document.getElementById("mod-perception").value = stats.perception || 0;
    document.getElementById("mod-command").value = stats.command || 0;
    document.getElementById("mod-inspiration").value = stats.inspiration || 0;
    document.getElementById("mod-pokemonlore").value = stats.pokemonlore || 0;
    document.getElementById("mod-catching").value = stats.catching || 0;
    document.getElementById("mod-empathy").value = stats.empathy || 0;
    document.getElementById("mod-technology").value = stats.technology || 0;
    document.getElementById("mod-survival").value = stats.survival || 0;
    document.getElementById("mod-tracking").value = stats.tracking || 0;
    
    

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
                <p><strong>Description:</strong><span class="ability-data">${desc}</scan></p>
                <p><strong>Cooldown:</strong><span class="ability-data">${cooldown}</span></p>
            </div>
       `;
    });
});