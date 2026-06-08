let currentPokemonData = null;

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

document.getElementById('confirm-add').addEventListener('click', () => {
  const status = document.getElementById('pokemon-status').value;
  const imgurl = currentPokemonData.sprites.other['official-artwork'].front_default;

  const li = document.createElement('li');
  
  const ball = document.createElement('img');
  ball.src = 'Pokedex-icon.png';
  ball.className = status === 'caught' ? 'ball-icon caught' : 'ball-icon seen';
  
  ball.addEventListener('click', (event) => {
    event.stopPropagation();
    
    if (li.dataset.caught === 'true') {
      li.dataset.caught = 'false';
      li.dataset.status = 'seen';
      ball.className = 'ball-icon seen';
      label.textContent = currentPokemonData.name;

    } else {
      li.dataset.status = 'caught';
      li.dataset.caught = 'true';
      ball.className = 'ball-icon caught';
      label.textContent = currentPokemonData.name;
    
    }
  });

  const label = document.createElement('span');
  label.textContent = currentPokemonData.name;
  li.appendChild(ball);
  li.appendChild(label);
  li.dataset.image = imgurl;
  li.dataset.status = status;
  li.dataset.caught = status === 'caught';
  li.dataset.id = currentPokemonData.id;

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
      <h3>${data.name}</h3>
      <p>Number: ${data.id}</p>
      <p>Type: ${types}</p>
      <p>Stats: ${stats}</p>
      <p>Description: ${description}</p>
      <p>Weaknesses: ${[...weaknesses].join(', ')}</p>
      <p>Resistances: ${[...resistances].join(', ')}</p>
      <p>Immunities: ${[...immunities].join(', ')}</p>
  `;
    });
  });
  });
  });
  document.getElementById('pokemon-list').appendChild(li);
  document.getElementById('pokemon-name').value = '';
  document.getElementById('status-modal').style.display = 'none';
});

document.getElementById('cancel-add').addEventListener('click', () => {
  document.getElementById('status-modal').style.display = 'none';
  document.getElementById('pokemon-name').value = '';
});