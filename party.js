const PARTY_SAVE_KEY = "partyData";

//array of pokemon in the party
let currentParty = [] 

function toggleCard(card) {
  const allCards = document.querySelectorAll(".party-card");
  allCards.forEach(c => {
    if (c !== card) {
      c.classList.remove("expanded");
    }
  });

  card.classList.toggle("expanded");
}

//=====================
//dice scaling function
//=====================
function getMoveDice(power, level) {

  const baseDice = power >= 80 ? "d8" : "d6";

  const diceCount = Math.floor((level - 1) / 5) + 1;

  return `${diceCount}${baseDice}`;
}

  //hp bar fill function
function changeHP(button, type) {
  const card = button.closest(".party-card");

  const hpNumber = card.querySelector(".hp-number");
  const hpFill = card.querySelector(".hp-bar .fill");
  const hpInput = card.querySelector(".hp-input");

  let currentHP = parseInt(hpNumber.dataset.current);
  const maxHP = parseInt(hpNumber.dataset.max);

  
  const amount = parseInt(hpInput.value);
  
  if (isNaN(amount)) return;

  if (type === "damage") {
    currentHP -= amount;
  } 

  if (type === "heal") {
     currentHP += amount;
  }

  if (currentHP < 0) currentHP = 0;
  if (currentHP > maxHP) currentHP = maxHP;

  if (currentHP < 0) currentHP = 0;
  if (currentHP === 0) {
    card.classList.add("fainted");
  } else {
    card.classList.remove("fainted");
  }

  hpNumber.dataset.current = currentHP;

  hpNumber.textContent = `${currentHP} / ${maxHP}`

  const hpPercent = (currentHP / maxHP) * 100;
  hpFill.style.width = hpPercent + "%";

  hpFill.classList.remove("hp-green", "hp-yellow", "hp-red");
  
  if (hpPercent >= 65) {
    hpFill.classList.add("hp-green");
  } else if (hpPercent >= 25) {
    hpFill.classList.add("hp-yellow");
  } else {
    hpFill.classList.add("hp-red");
  }

  hpInput.value = "";

  saveParty();
}

//==========================
//building movesets by level
//==========================
function buildInitialMoves(pokemon) {
  const learnset = pokemon.learnset || [];

  const known = learnset
  .filter(m => m.level <= pokemon.level)
  .sort((a, b) =>a.level - b.level)
  .slice(-4); //keep the 4 most recently learned

  return known.map(m => {
    const power = getMovePower(m.move);
    return {
      name: m.move,
      power: power,
      pp: { current: 10, max: 10 },
      condition: getMoveCondition(m.move)
    };
  });
}

//==================
//new moves by level
//==================
function getNewMovesAtLevel(card, level) {
  const pokedexData = JSON.parse(localStorage.getItem("pokedex")) || [];
  const pokemon = pokedexData.find(p => p.id == card.dataset.pokedexId);
  if (!pokemon || !pokemon.learnset) return [];

  return pokemon.learnset.filter(m => parseInt(m.level) === level);
}

//=================
//add moves to card
//=================
function addMovesToCard(card, moveName) {
  const container = card.querySelector(".moves");
  const power = getMovePower(moveName);
  const level = parseInt(card.querySelector(".level").textContent.replace("Lvl.", ""))
  
  const wrapper = document.createElement("div");
  wrapper.className = "move-wrapper";
  wrapper.innerHTML = `
    <div class="move-row">
      <span class="move-name">${moveName}</span>
      <span class="move-power">PWR:${power}</span>
      <span class="move-dice">${getMoveDice(power, level)}</span>
    </div>
    <div class="move-pp">
      <span class="pp-number" data-current="10" data-max="10">10/10</span>
      <button onclick="changePP(this, -1)">-</button>
      <button onclick="changePP(this, 1)">+</button>
    </div>
  `;
  container.appendChild(wrapper);
}
                                                            

//====================
//move render function
//====================
function renderMoves(card, pokemon) {
  const container = card.querySelector(".moves");
  if (!container) return;
  if (!pokemon.moves || pokemon.moves.length === 0) return;

  container.innerHTML = `
    <span class="moves-header">Moves</span>
  `

  const level = parseInt(String(pokemon.level).replace("Lvl.", "")) || 1;

pokemon.moves.forEach(move => {
  const dice = getMoveDice(move.power, level);

  const wrapper = document.createElement("div");
  wrapper.className =  "move-wrapper";

  wrapper.innerHTML = `
    <div class="move-row">
      <span class="move-name">${move.name}</span>
      <span class="move-power">PWR:${move.power}</span>
      <span class="move-dice">${dice}</span>
    </div>
    
    <div class="move-pp">
      <span class="pp-number" 
        data-current="${move.pp.current}"
        data-max="${move.pp.max}">${move.pp.current}/${move.pp.max}
      </span>

      <button onclick="changePP(this, -1)">-</button>
      <button onclick="changePP(this, 1)">+</button>

      ${move.condition ? `
        <div class="move-condition">
          ${move.condition}
        </div>
        ` : ""}
    </div>
      `;

     container.appendChild(wrapper);
  });
}

//move pp function
function changePP(button, amount) {
  const movePP = button.closest(".move-pp");
  const ppNumber = movePP.querySelector(".pp-number");

  let currentPP = parseInt(ppNumber.dataset.current);

  const maxPP = parseInt(ppNumber.dataset.max);

  currentPP += amount;

  if (currentPP > maxPP) currentPP = maxPP;
  if (currentPP < 0) currentPP = 0;

  ppNumber.dataset.current = currentPP;

  ppNumber.textContent = `${currentPP} / ${maxPP}`;

  saveParty();
  
}

//condition function

function updateConditions(select) {
  
  const card = select.closest(".party-card");

  const effectBox = card.querySelector(".condition-effect");

  const condition = select.value.toLowerCase();

  card.classList.remove(
    "burned",
    "poisoned", 
    "sleep",
    "paralyzed",
    "frozen", 
    "confused"
  );

  if (condition !== "none") {
    card.classList.add(condition);
  }

  if (condition === "burned") {
    effectBox.textContent = "End of turn: lose 5HP";
  }

  if (condition === "poisoned") {
    effectBox.textContent = "End of turn: lose 3HP";
  }

  if (condition === "sleep") {
    effectBox.textContent = "At beginning of turn: Roll 1D20 DC10 to wake up";
  }

  if (condition === "paralyzed") {
    effectBox.textContent = "At beginning of turn: Roll 1D20 DC10 to move, still paralized until healed";
  }

  if (condition === "frozen") {
    effectBox.textContent = "At beginning of turn: Roll 1D20 DC10 to thaw";
  }

  if (condition === "confused") {
    effectBox.textContent = "At beginning of turn: Roll 1D20 DC10, if fail self damage";
  }

  if (condition === "none") {
    effectBox.textContent = "";
  }

  saveParty();

}

//xp bar function

function addXP(button) {

  const card = button.closest(".party-card");
  const xpText = card.querySelector(".xp-text");
  const xpInput = card.querySelector(".xp-input");

  let currentXP = parseInt(xpText.dataset.current) || 0;
  let xpNeeded = parseInt(xpText.dataset.max) || 1;
  
  const amount = parseInt(xpInput.value) || 0;
  if (amount <= 0) return;

  xpInput.value = "";
  
  currentXP += amount;

  let currentLevel = parseInt(card.querySelector(".level").textContent.replace("Lvl.", ""))
  
  while (currentXP >= xpNeeded) {
    currentXP -= xpNeeded;
    currentLevel += 1;
    xpNeeded = 50 * currentLevel;

    card.querySelector(".level").textContent = `Lvl.${currentLevel}`;
    alert(`Congratulations! ${card.querySelector(".name").textContent} has leveled up to ${currentLevel}!`)

    const newMoves = getNewMovesAtLevel(card, currentLevel);

      const pokedexData = JSON.parse(localStorage.getItem("pokedex")) || [];
      const pokemon = pokedexData.find(p => p.id == card.dataset.pokedexId);

    newMoves.forEach(move => {
      const moveCount = card.querySelectorAll(".move-wrapper").length;
      if (moveCount < 4) {
        addMovesToCard(card, move.move);
      } else {
        openForgetMoveModal(card, move.move);
      }
    });
  }

  xpText.dataset.current = currentXP;
  xpText.dataset.max= xpNeeded;
  
  updateXPBar(card);
  saveParty()
}

function updateXPBar(card) {

  const xpText = card.querySelector(".xp-text");
  const barFill = card.querySelector(".xp-fill");

  let currentXP = parseInt(xpText.dataset.current) || 0;
  let xpNeeded = parseInt(xpText.dataset.max) || 1;

  xpText.textContent = `${currentXP} / ${xpNeeded}`;

  barFill.style.width = (currentXP / xpNeeded) * 100 + "%";
  
}
//========================================
//party card template clone, add info from pokedx
//========================================
function addPokemonToParty(id) {

  try{
  const pokedexData = JSON.parse(localStorage.getItem("pokedex")) || [];
  const pokemon = pokedexData.find(p => p.id === id);

  if (!pokemon) return;

  const template = document.getElementById("party-card-template");
  const card = template.content.cloneNode(true).querySelector(".party-card");

  card.dataset.pokedexId = pokemon.id;

  card.querySelector(".sprite").src = pokemon.image;
  card.querySelector(".name").textContent = pokemon.name;
  card.querySelector(".level").textContent = `Lvl.${pokemon.level}`;

  const hpNumber = card.querySelector(".hp-number");
  hpNumber.dataset.current = pokemon.hp.current;
  hpNumber.dataset.max = pokemon.hp.max;
  hpNumber.textContent = `${pokemon.hp.current} / ${pokemon.hp.max}`;

  const hpFill = card.querySelector(".hp-bar .fill");
  const hpPercent = (pokemon.hp.current / pokemon.hp.max) * 100;
  hpFill.style.width = hpPercent + "%";
  hpFill.classList.add( hpPercent >= 65 ? "hp-green" : hpPercent >= 25 ? "hp-yellow" : "hp-red");

  const xpText = card.querySelector(".xp-text");
  xpText.dataset.current = pokemon.xp.current;
  xpText.dataset.max = pokemon.xp.max;

  document.getElementById("party-container").appendChild(card);

  updateXPBar(card);

  pokemon.moves = buildInitialMoves(pokemon)
  renderMoves(card, pokemon);

  currentParty.push(pokemon.id);

  saveParty();
  } catch (err) { 
    alert("Error adding pokemon to party: " + err.message);
  }
}

//======================
//party picker functions
//======================

function openPartyPicker() {
  if (currentParty.length >= 6) {
    alert("Your party is full! max number in party is 6. Choose one to replace");
    return;
  }

  const pokedexData = JSON.parse(localStorage.getItem("pokedex")) || [];

  const available = pokedexData.filter(p => p.caught && !currentParty.includes(p.id));

  const list = document.getElementById("party-picker-list");
  list.innerHTML = "";

  if (available.length === 0) {
    list.innerHTML = "<li>No available pokemon in pokedex</li>";
  } else {
    available.forEach(p => {
       const li = document.createElement("li");
       li.textContent = p.name;
       li.dataset.id = p.id;
       li.onclick = () => {
         addPokemonToParty(p.id);
         closePartyPicker();
       };
       list.appendChild(li);
    });
  }
  document.getElementById("party-picker-modal").style.display = "flex";
}

function closePartyPicker() {
   document.getElementById("party-picker-modal").style.display = "none";
}

//=================
//forget move modal
//=================
function openForgetMoveModal(card, newMoveName) {
  const list = document.getElementById("forget-move-list");
  list.innerHTML = "";

  document.getElementById("forget-move-title").textContent = `Learn ${newMoveName}?`;

  const currentMoves =card.querySelectorAll(".move-wrapper");

  currentMoves.forEach(wrapper => {
    const moveName = wrapper.querySelector(".move-name").textContent;
    const li = document.createElement("li");
    li.textContent = moveName;
    li.onclick = () => {
      wrapper.remove();
      addMovesToCard(card, newMoveName);
      closeForgetMoveModal();
      saveParty();
    };
    list.appendChild(li);
  });

  document.getElementById("forget-move-modal").style.display = "flex";
}

function closeForgetMoveModal() {
  document.getElementById("forget-move-modal").style.display = "none";
}
  

//Autosave function

function saveParty() {
  const cards = document.querySelectorAll(".party-card");

  const data = [];

  cards.forEach(card => {
    const hp = card.querySelector(".hp-number");
    const xpText = card.querySelector(".xp-text");
    const level = card.querySelector(".level");
    const condition = card.querySelector(".conditions");

    data.push({
      pokedexId: parseInt(card.dataset.pokedexId),
      name: card.querySelector(".name")?.textContent,
      fainted: card.classList.contains("fainted"),
      hpCurrent: parseInt(hp.dataset.current),
      hpMax: parseInt(hp.dataset.max),
      level: level.textContent,
      xpCurrent: parseInt(xpText.dataset.current),
      xpMax: parseInt(xpText.dataset.max),
      condition: condition ? condition.value : "None",
      pp: Array.from(card.querySelectorAll(".pp-number")).map(pp => ({
        current: parseInt(pp.dataset.current),
        max: parseInt(pp.dataset.max)
     })),
       moves: Array.from(card.querySelectorAll(".move-wrapper")).map(m => ({
         name: m.querySelector(".move-name")?.textContent,
         power: parseInt(m.querySelector(".move-power")?.textContent.replace("PWR:", "")),
         condition: m.querySelector(".move-condition")?.textContent.trim() || null,
         pp: {
           current: parseInt(m.querySelector(".pp-number")?.dataset.current),
           max: parseInt(m.querySelector(".pp-number")?.dataset.max)
         }
       }))
          
    
    });
  });
  localStorage.setItem(PARTY_SAVE_KEY, JSON.stringify(data));
}

//load function

window.addEventListener("load", loadParty); 

function  loadParty() {
  const data = JSON.parse(localStorage.getItem(PARTY_SAVE_KEY));
  if (!data) return;

  data.forEach(saved => {
    addPokemonToParty(saved.pokedexId);

    const cards = document.querySelectorAll(".party-card");
    const card = cards[cards.length - 1];

    const hp = card.querySelector(".hp-number");
    const hpfill = card.querySelector(".hp-bar .fill");
    const hpPercent = (saved.hpCurrent / saved.hpMax) * 100;
    hpfill.style.width = hpPercent + "%";
    hpfill.classList.remove("hp-green", "hp-yellow", "hp-red") 
    if (hpPercent >= 65) {
      hpfill.classList.add("hp-green");
    } else if (hpPercent >= 25) {
      hpfill.classList.add("hp-yellow");
    } else {
      hpfill.classList.add("hp-red");
    }
    const xpText = card.querySelector(".xp-text");
    const xpFill = card.querySelector(".xp-fill");
     
    const level = card.querySelector(".level");
    const condition = card.querySelector(".conditions");
    const ppNumbers = card.querySelectorAll(".pp-number");
    saved.pp?.forEach((ppData, i) => {
      if (!ppNumbers[i]) return;

      ppNumbers[i].dataset.current = ppData.current;
      ppNumbers[i].dataset.max = ppData.max;
      ppNumbers[i].textContent = `${ppData.current} / ${ppData.max}`;
    });

    if (hp) {
      hp.dataset.current = saved.hpCurrent;
      hp.dataset.max = saved.hpMax;
      hp.textContent = `${saved.hpCurrent} / ${saved.hpMax}`;
    }

    if (saved.fainted) {
      card.classList.add("fainted");
    }

    if (level) {
      level.textContent = saved.level;
    }

    if (xpText) {
      xpText.dataset.current = saved.xpCurrent;
      xpText.dataset.max = saved.xpMax;
      updateXPBar(card);
    }

    if (condition) {
      condition.value = saved.condition;
      updateConditions(condition);
    }

    renderMoves(card, saved)
  });
}