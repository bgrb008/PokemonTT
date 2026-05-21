document.getElementById('pokecoins').value = parseInt(localStorage.getItem('pokecoins'))
  || 0;

function savedata(){
  localStorage.setItem('pokecoins', document.getElementById('pokecoins').value);
}

document.getElementById('add-pokecoins-button').addEventListener('click', () => {
  let currentpokecoins = parseInt(document.getElementById('pokecoins').value) || 0;
  let amount = parseInt(document.getElementById('pokecoins-amount').value) || 0;
  currentpokecoins += amount;
  document.getElementById('pokecoins').value = currentpokecoins;
  document.getElementById('pokecoins').setAttribute('value', currentpokecoins);
  savedata()
  document.getElementById('pokecoins-amount').value = '';
});

document.getElementById('subtract-pokecoins-button').addEventListener('click', () => {
  let currentpokecoins = parseInt(document.getElementById('pokecoins').value) || 0;
  let amount = parseInt(document.getElementById('pokecoins-amount').value) || 0;
  currentpokecoins -= amount;
  if (currentpokecoins < 0) currentpokecoins = 0;
  document.getElementById('pokecoins').value = currentpokecoins;
  document.getElementById('pokecoins').setAttribute('value', currentpokecoins);
  savedata();
   document.getElementById('pokecoins-amount').value = '';
});

document.getElementById('potion-selector').addEventListener('change', () => {
  const selected = document.getElementById('potion-selector').value;
  if (!selected) return;

  const li = document.createElement('li');
  li.textContent = selected;
  document.getElementById('potion-list').appendChild(li);

  document.getElementById('potion-selector').value = '';
});

const potions ={
  "Potion": "Add 20HP",
  "Super Potion": "Add 50HP",
  "Hyper Potion": "Add 200HP",
  "Max Potion": "Fully Restore HP",
  "Full Restore": "Fully restore HP and cure all status effects",
  "Revive": "Revive fainted pokemon with 50% HP",
  "Max Revive": "Revive fainted pokemon with full HP",
  "Ether": "Restore 10 PP to a move",
  "Max Ether": "Restore all PP to a move",
  "Elixer": "Restore 10 PP to all moves",
  "Max Elixer": "Restore PP to all moves"
}

const potionSelector = document.getElementById("potion-selector");

const potionsDisplay = document.getElementById("potionsDisplay");

potionSelector.addEventListener("change", updatePotions);

function upDatePotions() {

  const selectedPotion = potionSelector.value;

  potionsDisplay.innerHTML = "";

  const potionData = potions[selectedPotion];

  if (potionData) {
    
  }
}