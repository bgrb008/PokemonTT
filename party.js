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
  
}

//condition function

function updateCondition(select) {
  alert("workin");
  
  const card = select.closest(".party-card");

  const condition = select.value.toLowerCase();
  console.log(condition);

  card.classList.remove(
    "burned", "poisoned", "sleep", "paralyzed", "frozen", "confused"
  );

  if (condition !== "none") {card.classList.add(condition);
  }
  
}

//xp bar function

function addXP(button) {

  const card = button.closest(".party-card");
  let currentXP = parseInt(card.querySelector(".xp-text").dataset.current) || 0;
  
  const xpInput = card.querySelector(".xp-input");
  const amount = parseInt(xpInput.value) || 0;
  if (amount <= 0) return;
  currentXP += amount;

  const levelInput = card.querySelector(".level");
  let currentLevel = parseInt(levelInput.textContent.replace("Lvl.", ""));
  let xpNeeded = Math.floor(50 * Math.pow(1.25, currentLevel - 1));

  if (currentXP >= xpNeeded) {
    currentLevel += 1;
    currentXP = currentXP - xpNeeded;
    levelInput.textContent = `Lvl.${currentLevel}`;
    alert(`Level up! Now level ${currentLevel}`);
  }

  card.querySelector(".xp-text").dataset.current = currentXP;
  updateXPBar(card);
}

function updateXPBar(card) {

  card.querySelector(".xp-text").dataset.current = currentXP;
  
  const levelInput = card.querySelector(".level");
  const barFill = card.querySelector(".xp-fill");
  const xpText = card.querySelector(".xp-text");
  const xpInput = card.querySelector(".xp-input");

  let currentLevel = parseInt(levelInput.textContent.replace("Lvl.", ""));

  let xpNeeded = Math.floor(50 * Math.pow(1.25, currentLevel - 1));

  let currentXP = parseInt(xpText.dataset.current) || 0;
  let percentage = (currentXP / xpNeeded) * 100;

  barFill.style.width = percentage + "%";
  xpText.innerText = `${currentXP} / ${xpNeeded} XP`;

  xpInput.value = "";
  
}