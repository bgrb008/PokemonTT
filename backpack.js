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
  "Potion": add 20hp,
  ""
}