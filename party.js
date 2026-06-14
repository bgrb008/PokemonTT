function toggleCard(card) {
  const allCards = document.querySelectorAll("party-card");
  allCards.forEach(c => {
    if (c !== card) {
      c.classList.remove("expanded");
    }
  });

  card.classList.toggle("expanded");
}
