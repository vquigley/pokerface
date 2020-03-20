const names = require("../types/name.js");

class Card {
  constructor(card) {
    this.name = names[card[0]];
    this.suit = card[1];
  }
}

module.exports = Card