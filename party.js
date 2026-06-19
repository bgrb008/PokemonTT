const PARTY_SAVE_KEY = "partyData";

function toggleCard(card) {
  const allCards = document.querySelectorAll(".party-card");
  allCards.forEach(c => {
    if (c !== card) {
      c.classList.remove("expanded");
    }
  });

  card.classList.toggle("expanded");
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

//move pp function
function changePP(button, amount) {
  const movePP = button.closest(".move-pp");
  const ppNumber = movePP.querySelector(".pp-number");

  let currentPP = parseInt(ppNumber.dataset.current);

  const maxPP = parseInt(ppNumber.dataset.max);

  currentPP += amount;

  if (currentPP > maxPP) currentPP = maxPP;

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
  
  if (currentXP >= xpNeeded) {
    currentXP -= xpNeeded;
    currentLevel += 1;
    xpNeeded = 50 * currentLevel;

    card.querySelector(".level").textContent = `Lvl.${currentLevel}`;
    
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
      name: card.querySelector(".name")?.textContent,
      hpCurrent: parseInt(hp.dataset.current),
      hpMax: parseInt(hp.dataset.max),
      level: level.textContent,
      xpCurrent: parseInt(xpText.dataset.current),
      xpMax: parseInt(xpText.dataset.max),
      condition: condition ? condition.value : "None",
      pp: Array.from(card.querySelectorAll(".pp-number")).map(pp => ({
        current: parseInt(pp.dataset.current),
        max: parseInt(pp.dataset.max)
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

  const cards = document.querySelectorAll(".party-card");

  data.forEach((saved, i) => {
    const card = cards[i];
    if (!card) return;

    const hp = card.querySelector(".hp-number");
    const hpfill = card.querySelector(".hp-bar .fill");
    const hpPercent = (saved.hpCurrent / saved.hpMax) * 100;
    hpfill.style.width = hpPercent + "%";
    const xpText = card.querySelector(".xp-text");
    const xpFill = card.querySelector(".xp-fill");
    xpFill.style.width = (saved.xpCurrent / saved.xpMax) * 100 + "%";
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
  });
}