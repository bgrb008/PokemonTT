let teamDiv = document.getElementById("team");

function addPokemon() {
        let div = document.createElement("div");
        div.className = "pokemon";

        div.innerHTML = `
                <input placeholder="Pokemon Name">
                <input type="number" placeholder="HP">
                <input placeholder="Move 1">
                <input placeholder="Move 2">
        `;

        teamDiv.appendChild(div);
}
