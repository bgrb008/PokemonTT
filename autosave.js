document.addeventListener('change', saveData);
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

funtion loadData() {
    const saved =
localStorage.getItem('trainerData');
   if (!saved) return;
   const data = JSON.parse(saved);
   Object.keys(data).foreach(id => {
        const el =document.getElementById(id);
        if (el) el.value = data[id];
     });
  }

loadData();