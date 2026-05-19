document.addEventListener('change', saveData);
document.addEventListener('input', saveData);

function saveData() {
    const inputs = document.querySelectorAll('input, select, textarea');
    const data = {};
    inputs.forEach(el => {
        if (el.id) {
            data[el.id] = el.value;
        }
    });
    localStorage.setItem('trainerData', JSON.stringify(data)); 
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
     updateXPBar();
     updateCharacterSheet();
  }

loadData();