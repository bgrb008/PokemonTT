//======================
//global state(app data)
//======================

//pokemon sellected from api
let currentPokemonData = null;
//pokedex storage array
let pokedex = [];
//pokemon selected to be deleted
let pokemonToDelete = null;
//predictive search for add pokemon
let pokemonListCache = [];

//=================
//move power lookup
//=================
function getMovePower(moveName) {
  const movePowers = {
    tackle: 40,
    ember: 40,
    flamethrower: 90,
    scratch: 40,
    thunderbolt: 90,
  };

  return movePowers[moveName.toLowerCase()] || 50;
}

//=====================
//dice scaling function
//=====================
function getMoveDice(power, level) {

  const baseDice = power >= 80 ? "d8" : "d6";

  const diceCount = Math.floor((level - 1) / 5) + 1;

  return `${diceCount}${baseDice}`;
}

//==========================
//condition mapping function
//==========================
function getMoveCondition(moveName) {
  const moveConditions = {
    ember: "burned",
    flamethrower: "burned",
    thunderwave: "paralyzed",
    poisonpowder: "poisoned",
    icebeam: "frozen",
    hypnosis: "sleep",
  };

  return moveConditions[moveName.toLowerCase()] || null;
}

//===============
//modal functions
//===============

//opens the delete confirmation modal when trash icon clicked
function showDeleteModal(){
  document.getElementById('delete-modal').style.display = 'flex';
}

//=============
//save function
//=============
function savePokedex() {
  localStorage.setItem('pokedex', JSON.stringify(pokedex)
  ); 
}

//=============================
//add pokemon(api fetch & modal)
//=============================
const addBtn = document.getElementById('add-pokemon-button');
if (addBtn) addBtn.addEventListener('click', async () => {
  const pokemonName = document.getElementById('pokemon-name').value;

  const response = await fetch(
   `https://pokeapi.co/api/v2/pokemon/${pokemonName.toLowerCase()}`
  );

  const data = await response.json();

  const movesWithDetails = await Promise.all(
    data.moves.map(async (m) => {
      
      const details = m.version_group_details || [];

      const levelMove = details.find(v => 
        v.move_learn_method.name === 'level-up'
      );

      if (!levelMove) return null;

      const moveData = await fetch(m.move.url).then(r => r.json());

      let description = "No description available";

      const effectEntry = moveData.effect_entries.find(e => e.language.name === 'en');

      if (effectEntry?.effect) {
        description = effectEntry.effect;
      } else {
        const flavorEntry = moveData.flavor_text_entries.find(e => e.language.name === 'en'
      );

      if (flavorEntry?.flavor_text) {
        description = flavorEntry.flavor_text;
      }
    }

    description = description.replace(/\n/g, ' ').replace(/\f/g, ' ');

      return {
        move: m.move.name,
        level: levelMove.level_learned_at,
        power: moveData.power,
        type: moveData.damage_class.name,
        description: description
      };
    })
);
    
  const cleanLearnset = movesWithDetails.filter(Boolean);

  if (!data) {
    console.warn("Pokemon fetch failed");
    return;
  }
  
    currentPokemonData = {
      id: data.id,
      name: data.name,
      image: data.sprites.other['official-artwork'].front_default,

      types: data.types.map(t => t.type.name),

      stats: {
        hp: data.stats[0].base_stat,
        attack: data.stats[1].base_stat,
        defense: data.stats[2].base_stat,
        spAttack: data.stats[3].base_stat,
        spDefense: data.stats[4].base_stat,
        speed: data.stats[5].base_stat
      },

      abilities: data.abilities.map(a => a.ability.name),

      learnset: cleanLearnset
    };

    document.getElementById('modal-pokemon-name').textContent = data.name;
    document.getElementById('status-modal').style.display = 'flex';

    const modal=document.getElementById('status-modal');
    modal.style.display = 'flex';  
  });


//=====================
//pokemon details view
//=====================
function attachClickHandler(li) {
  li.addEventListener('click', () => {

    console.log("POKEMON CLICKED:", li.dataset.id);
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

//===========================
//status toggle (caught/seen)
//===========================
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

//===================
//confirm add pokemon
//===================
const confirmAdd = document.getElementById('confirm-add');
if (confirmAdd) confirmAdd.addEventListener('click', () => {
  const status = document.getElementById('pokemon-status').value;

  if (!currentPokemonData) {
    console.warn("No pokemon selected yet");
    return;
  }
  const imgurl = currentPokemonData.image;
  const level = parseInt(document.getElementById('pokemon-level').value) || 1;

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
  li.dataset.caught = status === 'caught'
    ? "true"
    : "false";
  li.dataset.id = currentPokemonData.id;

  const baseHP = currentPokemonData.stats.hp;
  
pokedex.push({
  id: currentPokemonData.id,
  name: currentPokemonData.name,
  image: currentPokemonData.image,
  
  status: status,
  caught: status === 'caught' ? true : false,

  types: currentPokemonData.types,
  stats: currentPokemonData.stats,
  abilities: currentPokemonData.abilities,
  learnset: currentPokemonData.learnset,

  level,

  

  hp: {
    base: baseHP,
    current: baseHP,
    max: baseHP
  },

  xp: {
    current: 0,
    max: 50
  },

});


  savePokedex();

  attachClickHandler(li);
  document.getElementById('pokemon-list').appendChild(li);
  document.getElementById('pokemon-name').value = '';
  document.getElementById('status-modal').style.display = 'none';
});

//================
//cancel add modal
//================
const cancelAdd = document.getElementById('cancel-add');
if (cancelAdd) cancelAdd.addEventListener('click', () => {
  document.getElementById('status-modal').style.display = 'none';
  document.getElementById('pokemon-name').value = '';
});

//=======================================
//delete pokemon(remove from liststorage)
//=======================================
const confirmDelete =document.getElementById('confirm-delete');
if (confirmDelete) confirmDelete.addEventListener('click', () => {
  if (pokemonToDelete) {
    const index = pokedex.findIndex(p => p.id == pokemonToDelete.dataset.id);
    if (index !== -1) pokedex.splice(index, 1);
    savePokedex();
    document.getElementById('delete-modal').style.display = 'none';
    pokemonToDelete.remove();
    pokemonToDelete = null;
    const displayImg = document.querySelector('.pokemon-display img');
    if (displayImg) displayImg.remove();
    document.querySelector('.pokemon-details').innerHTML = '';
  }
});

//===================
//cancel delete modal
//===================
const cancelDelete = document.getElementById('cancel-delete');
if (cancelDelete) cancelDelete.addEventListener('click', () => {
  document.getElementById('delete-modal').style.display = 'none';
  pokemonToDelete = null;
});

//=================================
//cache list for add pokemon search
//=================================
fetch('https://pokeapi.co/api/v2/pokemon?limit=10000')
  .then(res => res.json())
  .then(data => {
        pokemonListCache = data.results.map(p => p.name);
  });

//======================================
//live input listener for pokemon search
//======================================
const input = document.getElementById("pokemon-name");
const suggestionsBox = document.getElementById("suggestions");

if (input) input.addEventListener("input", () => {
  const value = input.value.toLowerCase();

  suggestionsBox.innerHTML = "";

  if (!value || pokemonListCache.length === 0) return;

  const matches = pokemonListCache
    .filter(name => name.startsWith(value))
    .slice(0, 6);

  matches.forEach(name => {
    const div = document.createElement("div");
    div.className = "suggestion-item";
    div.textContent = name;

    div.addEventListener("click", () => {
      input.value = name;
      suggestionsBox.innerHTML = "";
    });

    suggestionsBox.appendChild(div);
  });
});

if (suggestionsBox) document.addEventListener("click", (e) => {
  if (e.target.id !== "pokemon-name") {
    suggestionsBox.innerHTML = "";
  }
});

//=======================================
//initial load(rebuild list from storage)
//=======================================
window.addEventListener('load', () => {
  if (!document.getElementById('pokemon-list')) return;
  const savedPokedex = localStorage.getItem('pokedex');

  if (savedPokedex) {
     pokedex = JSON.parse(savedPokedex);
    pokedex.forEach(pokemon => {
      const li = document.createElement('li');
      const ball = document.createElement('img');
      ball.src = 'caughticon.png';

      const caughtBool = 
        pokemon.caught === true || pokemon.caught === 'true';
      
      ball.className = caughtBool 
        ? 'ball-icon caught' 
        : 'ball-icon seen';
      
      attachBallHandler(li, ball);
      const label = document.createElement('span');
      label.textContent = pokemon.name;
      li.appendChild(ball);
      li.appendChild(label);
      li.dataset.image = pokemon.image;
      li.dataset.status = pokemon.status;
      li.dataset.caught = caughtBool ? "true" : "false";
      li.dataset.id = pokemon.id;
      attachClickHandler(li);
        document.getElementById('pokemon-list').appendChild(li);
    });
  }
});