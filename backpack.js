document.getElementById('pokecoins').value = localStorage.getItem('pokecoins') || 0;

document.getElementById('add-pokecoins-button').addEventListener('click', () => {
  let currentpokecoins = parseInt(document.getElementById('pokecoins').value) || 0;
  let amount = parseInt(document.getElementById('pokecoins-amount').value) || 0;
  currentpokecoins += amount;
  document.getElementById('pokecoins').value = currentpokecoins;
  localStorage.setItem('pokecoins', currentpokecoins);
  document.getElementById('pokecoins-amount').value = '';
});

document.getElementById('subtract-pokecoins-button').addEventListener('click', () => {
  let currentpokecoins = parseInt(document.getElementById('pokecoins').value) || 0;
  let amount = parseInt(document.getElementById('pokecoins-amount').value) || 0;
  currentpokecoins -= amount;
  document.getElementById('pokecoins').value = currentpokecoins;
  localStorage.setItem('pokecoins', currentpokecoins);
   document.getElementById('pokecoins-amount').value = '';
});