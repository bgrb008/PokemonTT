let teamDiv = document.getElementbyId(“team”);

function addPokemon() {
	let div = document.createElement(“div”);
	div.className = “Pokemon”;

	div.innerhtml = ‘
		<input placeholder=“Pokemon Name”>
		<input type=“number” placeholder=“HP”>
		<input placeholder=“Move 1”>
		<input placeholder=“Move 2”>
	‘;

	teamDiv.appendChild(div);
}
