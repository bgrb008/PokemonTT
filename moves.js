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

  function convertMoveDescription(moveName, desc) {
    if (!desc) return "No effect.";

    const specialMoves = {
      "ember": "Deal damage. Target rolls 1D20 DC12 or becomes Burned.",
      "flamethrower": "Deal damage. Target rolls 1D20 DC12 or becomes Burned.",
      "thunderwave": "Target rolls 1D20 DC12 or becomes Paralyzed.",
      "poisonpowder": "Target rolls 1D20 DC12 or becomes Poisoned.",
      "icebeam": "Target rolls 1D20 DC12 or becomes Frozen.",
      "hypnosis": "Target rolls 1D20 DC12 or becomes Asleep.",
      "soak": "Target changes type to water until end of battle.",
      "water-sport": "Opponent is covered by a layer of water, reducing fire damage by 50% until end of battle.",
      "leech-seed": "Pokemon plants seed in apponent that leeches 3HP at the end of each turn until the end of battle",
      "work-up": "Raises attack by 1 step until end of battle",
      "odor-sleuth": "Allows normal and fighting type moves to hit ghost type pokemon",
      "retaliate": "Inflicts double damage if an ally fainted on the last turn",
      "fury-swipes": "rolls for 3 attacks, each success, roll damage",
      "pursuit": "Inflicts double damage if target is switching out",
      "bide": "stores energy for 2 turns, then inflicts double damage taken during that time",
      "detect": "Prevents all damage from the next attack, each detect after -1 from attack rolls",
      "attract": "Target of opposite gender rolls 1D20 DC12 or becomes Attracted, roll 1D20 DC12 at beginning of turn to wake up, skip turn until woken.",
      "endeavor": "Reduce opponent to same HP as user, fails if players HP is higher than the target",
      "charge": "Raise defense by 1, next electric type attack inflicts double damage",
      "shock-wave": "Deals damage, ignores changes to accuracy",
      "echoed-voice": "Deals damage, power increases by 40 each turn used by any pokemon on the field, max 200 power until end of battle",
      "bubble": "Deals damage, roll 1D20 DC12 or higher lowers targets ac by 1 until end of battle",
      "mud-shot": "Deals damage, roll 1D20 DC12 or higher lowers targets ac by 1 until end of battle",
      "low-kick": "Low kick inflicts greater damage on pokemon with higher HP, 45-60HP: 1D10, 61-75HP: 1D12, 76-90HP: 2D10, 91-105HP: 2D12",
      "focus-energy": "Increases critical hit chances, lowers dc by 2 for 3 turns",
      "sand-attack": "Add -1 to targets attack roll until end of battle",
      "harden": "Raise defense by 1 until end of battle",
      "stealth-rock": "Lays a ring of stones around opponent, when opponent switches pokemon, incoming pokemon takes 1D6 damage",
      "mud-slap": "Deals damage, lowers opponents AC by 1 until end of battle",
      "rapid-spin": "Deals damage, adds +1 to AC until end of battle, removes hazards from the field",
      "mud-sport": "Reduces electric type damage by 50% until end of battle",
      "hone-claws": "Raises attack by 1 stage, adds +1 to attack rolls until end of battle",
      "string-shot": "Lowers targets AC by 2 until end of battle",
      "bug-bite": "Deals damage, if target has a berry, it is consumed and the user gains 10HP",
      "razor-leaf": "Deals damage, critical hit chance increased, lowers DC required by 2 for 3 turns"
    }

    const cleanMoveName = moveName.toLowerCase().replace(" ", "-");
    
    if (cleanMoveName && specialMoves[cleanMoveName]) {
      
      return specialMoves[cleanMoveName];
    }

    let text = desc.toLowerCase();

    if (text.includes("paraly")) {
      return "Target rolls 1d20 dc12 or becomes Paralyzed.";
    }

    if (text.includes("burn")) {
      return "Target rolls 1d20 dc12 or becomes Burned, lose 5HP at end of turn.";
    }

    if (text.includes("poison")) {
      return "Target rolls 1d20 dc12 or becomes Poisoned, lose 3HP at end of turn.";
    }

    if (text.includes("sleep")) {
      return "Target rolls 1d20 dc12 or becomes Asleep, skip turn until woken.";
    }

    if (text.includes("freeze")) {
      return "Target rolls 1d20 dc12 or becomes Frozen, skip turn until thawed.";
    }

    if (text.includes("confus")) {
      return "Target rolls 1d20 dc12 or becomes Confused, self damage on turn.";
    }

    if (text.includes("flinch")) {
      return "Target loses next action";
    }

    if (text.includes("raises")) {
      return "Raise one related stat by 2 for 3 turns";
    }

    if (text.includes("lower") && text.includes("attack")) {
      return "Lower attack by 20 for 3 turns";
    }

    if (text.includes("lower") && text.includes("defense")) {
      return "Lower defense by 2 for 3 turns";
    }

    if (text.includes("lowers speed")) {
      return "Lower speed by 2 for 3 turns"
    }

    if (text.includes("lowers special attack")) {
      return "Lower special attack by 2 for 3 turns"
    }

    if (text.includes("lowers special defense")) {
      return "Lower special defense by 2 for 3 turns"
    }

    if (text.includes("lowers accuracy")) {
      return "Lower accuracy by 2 for 3 turns"
    }

    if (text.includes("raises defense")) {
      return "Raise defense by 2 for 3 turns"
    }

    if (text.includes("raises attack")) {
      return "Raise attack by 2 for 3 turns"
    }

    if (text.includes("raises speed")) {
      return "Raise speed by 2 for 3 turns"
    }

    if (text.includes("raises special attack")) {
      return "Raise special attack by 2 for 3 turns"
    }

    if (text.includes("raises special defense")) {
      return "Raise special defense by 2 for 3 turns"
    }


    return "No effect.";
  }