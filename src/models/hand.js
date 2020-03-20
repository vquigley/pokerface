const {handTypes, nameTypes} = require("../types");
const Card = require("./card.js");

class Hand {
  constructor(handAsString) {
    this.cards = this.parseCards(handAsString);
  }

  parseCards(handAsString) {  
    return handAsString.split(" ").map(element => {
      return new Card(element);
    });
  }

}

module.exports = Hand;