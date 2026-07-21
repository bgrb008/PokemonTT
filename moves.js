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

  function convertMoveDescription(desc) {
    if (!desc) return "No effect.";

    const specialMoves = {
      "ember": "Deal damage. Target rolls 1d20 dc12 or becomes Burned.",
      "flamethrower": "Deal damage. Target rolls 1d20 dc12 or becomes Burned.",
      "thunderwave": "Target rolls 1d20 dc12 or becomes Paralyzed.",
      "poisonpowder": "Target rolls 1d20 dc12 or becomes Poisoned.",
      "icebeam": "Target rolls 1d20 dc12 or becomes Frozen.",
      "hypnosis": "Target rolls 1d20 dc12 or becomes Asleep.",
      "soak": "Target changes type to water until end of battle."
    }

    if (moveName && specialMoves[moveName.toLowerCase()]) {
      return specialMoves[moveName.toLowerCase()];
    }

    let text = desc.toLowerCase();

    if (text.includes("paraly")) {
      return "Deal damage. Target rolls 1d20 dc12 or becomes Paralyzed.";
    }

    if (text.includes("burn")) {
      return "Deal damage. Target rolls 1d20 dc12 or becomes Burned, lose 5HP at end of turn.";
    }

    if (text.includes("poison")) {
      return "Deal damage. Target rolls 1d20 dc12 or becomes Poisoned, lose 3HP at end of turn.";
    }

    if (text.includes("sleep")) {
      return "Deal damage. Target rolls 1d20 dc12 or becomes Asleep, skip turn until woken.";
    }

    if (text.includes("freeze")) {
      return "Deal damage. Target rolls 1d20 dc12 or becomes Frozen, skip turn until thawed.";
    }

    if (text.includes("confus")) {
      return "Deal damage. Target rolls 1d20 dc12 or becomes Confused, self damage on turn.";
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