let currentPokemonData = null;

let pokedex = [];

let pokemonToDelete = null;

function showDeleteModal(){
  document.getElementById('delete-modal').style.display = 'flex';
}

function savePokedex() {
  localStorage.setItem('pokedex', JSON.stringify(pokedex)
  ); 
}

document.getElementById('add-pokemon-button').addEventListener('click', () => {
  const pokemonName = document.getElementById('pokemon-name').value;

  fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonName.toLowerCase()}`)
  .then(response => response.json())
  .then(data => {
    currentPokemonData = data;
    document.getElementById('modal-pokemon-name').textContent = data.name;
    const modal=document.getElementById('status-modal');
    modal.style.display = 'flex';
    });    
});

function attachClickHandler(li) {
  li.addEventListener('click', () => {
    const image = document.querySelector('.pokemon-display img') || document.createElement('img');
    image.src = li.dataset.image;
    document.querySelector('.pokemon-display').appendChild(image);


  fetch(`https://pokeapi.co/api/v2/pokemon/${li.dataset.id}`)
  .then(response => response.json())
  .then(data => {
    const types = data.types.map(t => t.type.name).join(', ');
    const stats = data.stats.map(s => `${s.stat.name}: ${s.base_stat}`).join(', ');

    const typePromises = data.types.map(t =>
      fetch(t.type.url).then(res => res.json())
    );

    Promise.all(typePromises).then(typeDataArray => {
      const weaknesses = new Set();
      const resistances = new Set();
      const immunities = new Set();

      typeDataArray.forEach(typeData => {

      typeData.damage_relations.double_damage_from.forEach(type => {weaknesses.add(type.name);

  });

      typeData.damage_relations.half_damage_from.forEach(type => {resistances.add(type.name);
                                                });

      typeData.damage_relations.no_damage_from.forEach(type => {immunities.add(type.name);
                                                });
  });

    fetch(`https://pokeapi.co/api/v2/pokemon-species/${data.id}`)
    .then(response => response.json())
    .then(speciesData => {
      const descEntry = speciesData.flavor_text_entries.find(e => e.language.name === 'en');
      const description = descEntry ? descEntry.flavor_text : 'No description available';
    const details = document.querySelector('.pokemon-details');
    details.innerHTML =`
    <div style="display: flex; justify-content: space-between; align-items: center;">
      <h3>${data.name}</h3>
      <button id="delete-btn" onclick="showDeleteModal()"><img src="Trash_icon.png"></button>
    </div>
      <p>Number: ${data.id}</p>
      <p>Type: ${types}</p>
      <p>Stats: ${stats}</p>
      <p>Description: ${description}</p>
      <p>Weaknesses: ${[...weaknesses].join(', ')}</p>
      <p>Resistances: ${[...resistances].join(', ')}</p>
      <p>Immunities: ${[...immunities].join(', ')}</p>
          `;
      
      pokemonToDelete = li;
      document.getElementById('delete-modal-text').textContent = `Remove ${data.name} from Pokedex?`;
      
        });
      });
    });
  });  
}

function attachBallHandler(li, ball) {
  ball.addEventListener('click', (event) => {
    event.stopPropagation();
    if (li.dataset.caught === 'true') {
      li.dataset.caught = 'false';
      li.dataset.status = 'seen';
      ball.className = 'ball-icon seen';
      const p = pokedex.find(p => p.id == li.dataset.id)
      p.status = 'seen';
      p.caught = false;
      savePokedex();
    } else {
      li.dataset.caught = 'true';
      li.dataset.status = 'caught';
      ball.className = 'ball-icon caught';
      const p = pokedex.find(p => p.id == li.dataset.id)
      p.status = 'caught';
      p.caught = true;
      savePokedex();
    }
  });
}
document.getElementById('confirm-add').addEventListener('click', () => {
  const status = document.getElementById('pokemon-status').value;
  const imgurl = currentPokemonData.sprites.other['official-artwork'].front_default;

  const li = document.createElement('li');
  
  const ball = document.createElement('img');
  ball.src = 'caughticon.png';
  ball.className = status === 'caught' ? 'ball-icon caught' : 'ball-icon seen';

  attachBallHandler(li, ball);

  const label = document.createElement('span');
  label.textContent = currentPokemonData.name;
  li.appendChild(ball);
  li.appendChild(label);
  li.dataset.image = imgurl;
  li.dataset.status = status;
  li.dataset.caught = status === 'caught';
  li.dataset.id = currentPokemonData.id;

pokedex.push({
  name: currentPokemonData.name,
  image: imgurl,
  status: status,
  caught: status === 'caught',
  id: currentPokemonData.id
});

  savePokedex();

  attachClickHandler(li);
  document.getElementById('pokemon-list').appendChild(li);
  document.getElementById('pokemon-name').value = '';
  document.getElementById('status-modal').style.display = 'none';
});

document.getElementById('cancel-add').addEventListener('click', () => {
  document.getElementById('status-modal').style.display = 'none';
  document.getElementById('pokemon-name').value = '';
});

document.getElementById('confirm-delete').addEventListener('click', () => {
  if (pokemonToDelete) {
    const index = pokedex.findIndex(p => p.id == pokemonToDelete.dataset.id);
    if (index !== -1) pokedex.splice(index, 1);
    savePokedex();
    document.getElementById('delete-modal').style.display = 'none';
    pokemonToDelete.remove();
    pokemonToDelete = null;
    document.querySelector('.pokemon-details').innerHTML = '';
  }
});

document.getElementById('cancel-delete').addEventListener('click', () => {
  document.getElementById('delete-modal').style.display = 'none';
  pokemonToDelete = null;
});

window.addEventListener('load', () => {
  const savedPokedex = localStorage.getItem('pokedex');

  if (savedPokedex) {
     pokedex = JSON.parse(savedPokedex);
    pokedex.forEach(pokemon => {
      const li = document.createElement('li');
      const ball = document.createElement('img');
      ball.src = 'caughticon.png';
      ball.className = pokemon.caught ? 'ball-icon caught' : 'ball-icon seen';
      attachBallHandler(li, ball);
      const label = document.createElement('span');
      label.textContent = pokemon.name;
      li.appendChild(ball);
      li.appendChild(label);
      li.dataset.image = pokemon.image;
      li.dataset.status = pokemon.status;
      li.dataset.caught = pokemon.caught;
      li.dataset.id = pokemon.id;
      attachClickHandler(li);
        document.getElementById('pokemon-list').appendChild(li);
    });
  }
});