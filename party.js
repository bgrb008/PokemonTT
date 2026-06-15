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
  const hpText = card.querySelector(".hp-text");
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

  hpNumber.dataset.current = currentHP;

  hpNumber.textContent = `${currentHP} / ${maxHP}`
  hpText.textContent = `HP: ${currentHP} / ${maxHP}`;

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
  const moveRow = button.closest(".move-row");
  const ppNumber = moveRow.querySelector(".pp-number");

  let currentPP = parseInt(ppNumber.dataset.current);

  const maxPP = parseInt(ppNumber.dataset.max);

  currentPP += amount;

  if (currentPP < 0) currentPP = 0;
  if (currentPP > maxPP) currentPP = maxPP;

  ppNumber.dataset.current = currentPP;

  ppNumber.textContent = `${currentPP} / ${maxPP}`;
  
}
