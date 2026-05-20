document.addEventListener('change', saveData);
document.addEventListener('input', saveData);

function saveData() {
    const inputs = document.querySelectorAll('input, select, textarea');
    const data = {};
    inputs.forEach(el => {
        if (el.id && el.id !== 'pokecoins-amount') {
            data[el.id] = el.value;
        }
    });
    localStorage.setItem('trainerData', JSON.stringify(data)); 
    localStorage.setItem('currentXP', currentXP);
}

function loadData() {
    const saved =
localStorage.getItem('trainerData');
   if (!saved) return;
   const data = JSON.parse(saved);
   Object.keys(data).forEach(id => {
        const el =document.getElementById(id);
        if (el) el.value = data[id];
     });
  const savedXP = localStorage.getItem('currentXP');
  if (savedXP !== null) currentXP = parseInt(savedXP);
     updateXPBar();
     updateCharacterSheet();
  }

loadData();