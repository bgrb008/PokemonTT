
const pokeballs ={
  "Pokeball": "An item for catching wild pokemon",
  "Greatball": "A ball with a higher catch rate than a pokeball",
  "Ultraball": "A ball with a higher catch rate than a greatball",
  "Masterball": "A ball that catches any pokemon without fail",
}

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
  "Elixir": "Restore 10 PP to all moves",
  "Max Elixir": "Restore PP to all moves"
}

const conditions ={
  "Antidote": "Cures effects from poisoning",
  "Awakening": "Wakes sleeping pokemon",
  "Burn Heal": "Heals burned pokemon",
  "Ice Heal": "Thaws pokemon that have been frozen",
  "Paralyze Heal": "Heals pokemon suffering from paralysis",
  "Full Heal": "Cures all status effects",
  
}


document.getElementById('pokecoins').value = parseInt(localStorage.getItem('pokecoins'))
  || 0;

function savedata(){
  localStorage.setItem('pokecoins', document.getElementById('pokecoins').value);
}
function saveBackpack() {
  const pokeballItems = [];
  const potionItems = [];
  const conditionItems = [];

  document.querySelectorAll('#pokeball-list li').forEach(li => {
    pokeballItems.push({
      name: li.querySelector('.pokeball-name').textContent,
      qty: li.querySelector('.qty-input').value
    });
  });

  document.querySelectorAll('#potion-list li').forEach(li => {
    potionItems.push({
      name: li.querySelector('.potion-name').textContent,
      qty: li.querySelector('.qty-input').value
    });
  });

  document.querySelectorAll('#condition-list li').forEach(li => {
    conditionItems.push({
      name: li.querySelector('.condition-name').textContent,
      qty: li.querySelector('.qty-input').value
    });
  });

  localStorage.setItem('pokeballs', JSON.stringify(pokeballItems));
  localStorage.setItem('potions', JSON.stringify(potionItems));
  localStorage.setItem('conditions', JSON.stringify(conditionItems)) 
}

function loadBackpack() {
  const savedPokeballs =
    JSON.parse(localStorage.getItem('pokeballs')) || [];

  const savedPotions =
    JSON.parse(localStorage.getItem('potions')) || [];

  const savedConditions =
    JSON.parse(localStorage.getItem('conditions')) || [];


  savedPokeballs.forEach(ball => {
    const li = document.createElement('li');

    li.innerHTML = `
      <div class="pokeball-item">
        <div class="pokeball-top">
          <span class="pokeball-name">${ball.name}</span>
          <input type="number" value="${ball.qty}" min="1" class="qty-input">
          <button class="qty-btn" onclick="addQty(this)">+</button>
          <button class="qty-btn" onclick="usePokeball(this)">Use</button>
        </div>
        <span class="pokeball-desc">${pokeballs[ball.name]}</span>
      </div>
    `;

    document.getElementById('pokeball-list').appendChild(li);
  });

  savedPotions.forEach(potion => {
    const li = document.createElement('li');

    li.innerHTML = `
      <div class="potion-item">
        <div class="potion-top">
          <span class="potion-name">${potion.name}</span>
          <input type="number" value="${potion.qty}" min="1" class="qty-input">
          <button class="qty-btn" onclick="addQty(this)">+</button>
          <button class="qty-btn" onclick="usePotion(this)">Use</button>
        </div>
        <span class="potion-desc">${potions[potion.name]}</span>
      </div>
    `;

    document.getElementById('potion-list').appendChild(li);
  });


savedConditions.forEach(condition =>{ 
  const li = document.createElement('li');
                                    
  li.innerHTML = `
    <div class="condition-item">
      <div class="condition-top">
        <span class="condition-name">${condition.name}</span>
        <input type="number" value="${condition.qty}" min="1" class="qty-input">
        <button class="qty-btn" onclick="addQty(this)">+</button>
        <button class="qty-btn" onclick="useCondition(this)">Use</button>
        </div>
        <span class="condition-desc">${conditions[condition.name]}</span>
    </div>
  `;

  
  document.getElementById('condition-list').appendChild(li);
  });
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

document.getElementById('pokeball-selector').addEventListener('change', () => {
  const selected = document.getElementById('pokeball-selector').value;
  if (!selected) return;

  const li = document.createElement('li');
  li.innerHTML = `
    <div class="pokeball-item">
      <div class="pokeball-top">
        <span class="pokeball-name">${selected}</span>
        <input type="number" value="1" min="1" class="qty-input">
        <button class="qty-btn" onclick="addQty(this)">+</button>
        <button class="qty-btn" onclick="usePokeball(this)">Use</button>
        </div>
        <span class="pokeball-desc">${pokeballs[selected]}</span>
      
    </div>
  `;

  document.getElementById('pokeball-list').appendChild(li);
  document.getElementById('pokeball-selector').value = '';

  saveBackpack();
  
});

function addQty(btn) {
  const input = btn.previousElementSibling;
  input.value = parseInt(input.value) + 1;
  
  saveBackpack();
}


function usePokeball(btn) {
  const input = btn.previousElementSibling.previousElementSibling;
  let qty = parseInt(input.value);
  if (qty > 1){
    input.value = qty - 1;
} else {
  btn.closest('li').remove();
    
}
  saveBackpack();
}
    



document.getElementById('potion-selector').addEventListener('change', () => {
  const selected = document.getElementById('potion-selector').value;
  if (!selected) return;

  const li = document.createElement('li');
  li.innerHTML = `
    <div class="potion-item">
      <div class="potion-top">
        <span class="potion-name">${selected}</span>  
        <input type="number" value="1" min="1" class="qty-input">
        <button class="qty-btn" onclick="addQty(this)">+</button>
        <button class="qty-btn" onclick="usePotion(this)">Use</button>
      </div>
      <span class="potion-desc">${potions[selected]}</span>
    </div>
  `;
  
  document.getElementById('potion-list').appendChild(li);

  document.getElementById('potion-selector').value = '';

  saveBackpack();
});


function usePotion(btn) {
  const input = btn.previousElementSibling.previousElementSibling;
  let qty = parseInt(input.value);
  if (qty > 1) {
    input.value = qty - 1;
  } else {
    btn.closest('li').remove();
  }
  saveBackpack()
  };


document.getElementById('condition-selector').addEventListener('change', () => {
  const selected = document.getElementById('condition-selector').value;
  if (!selected) return;

  const li = document.createElement('li');
  li.innerHTML = `
    <div class="condition-item">
      <div class="condition-top">
        <span class="condition-name">${selected}</span>
        <input type="number" value="1" min="1" class="qty-input">
        <button class="qty-btn" onclick="addQty(this)">+</button>
        <button class="qty-btn" onclick="useCondition(this)">Use</button>
         </div>
         <span class="condition-desc">${conditions[selected]}</span>
    </div>
  `;

  document.getElementById('condition-list').appendChild(li);
  document.getElementById('condition-selector').value = '';

  saveBackpack();
});

function useCondition(btn) {
  const input = btn.previousElementSibling.previousElementSibling;
  let qty = parseInt(input.value);
  if (qty > 1) {
    input.value = qty - 1;
  } else {
    btn.closest('li').remove();
  }
  saveBackpack()
  }

loadBackpack();


