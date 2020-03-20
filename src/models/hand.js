const {handTypes, nameTypes} = require("../types");
const Card = require("./card.js");

class Hand {
  constructor(handAsString) {
    this.rawHand = handAsString;
    this.hand = this.parseCards();
    this.names = this.hand.map(element => {return element.name});
    this.suits = this.hand.map(element => {return element.suit});
    this.nameCountMap = this.getNameCountMap();
    this.uniqueSuits = this.removeDuplicates(this.suits);
    this.uniqueNames = this.removeDuplicates(this.names);

    this.lowAceSetup();

    this.names.sort((a, b)=>{return a-b});
  }

  getBest() {
    if (this.hand.length !== 5) {
      return handTypes.HIGH_CARD;
    }
    
    if (this.isRoyalFlush()) {
      return handTypes.ROYAL_FLUSH;
    }

    if (this.isStraigtFlush()) {
      return handTypes.STRAIGHT_FLUSH;
    }

    if (this.isFourOfAKind()) {
      return handTypes.FOUR_OF_A_KIND;
    }

    if (this.isFullHouse()) {
      return handTypes.FULL_HOUSE;
    }

    if (this.isSameSuit()) {
      return handTypes.FLUSH;
    }

    if (this.isStraight()) {
      return handTypes.STRAIGHT;
    }

    if (this.isThreeOfAKind()) {
      return handTypes.THREE_OF_A_KIND;
    }

    if (this.isTwoPair()) {
      return handTypes.TWO_PAIR;
    }

    if (this.isOnePair()) {
      return handTypes.ONE_PAIR;
    }

    return handTypes.HIGH_CARD;
  }

  isRoyalFlush() {
    return (this.isSameSuit() && this.isStraight() && this.getLowCard() === nameTypes.T);
  }

  isStraigtFlush() {
    return (this.isSameSuit() && this.isStraight() && this.getLowCard() !== nameTypes.T);
  }

  isFourOfAKind() {
    return this.getNamesByInstanceCount(4).length === 1;
  }

  isFullHouse() {
    return (this.getNamesByInstanceCount(3).length && this.getNamesByInstanceCount(2).length);
  }

  isFlush() {
    return this.isSameSuit();
  }

  isThreeOfAKind() {
    return this.getNamesByInstanceCount(3).length === 1;
  }

  isTwoPair() {
    return this.getNamesByInstanceCount(2).length === 2;
  }

  isOnePair() {
    return this.getNamesByInstanceCount(2).length === 1;
  }

  isStraight() {
    if (this.uniqueNames.length !== 5) {
      return false;
    }

    return this.areConsecutiveNumbers();
  }

  lowAceSetup() {
    const aceIndex = this.names.indexOf(nameTypes.A);

    if (aceIndex >= 0 && this.names.indexOf(nameTypes["2"]) >= 0) {
      this.names[aceIndex] = nameTypes.LA;
    }
  }

  parseCards() {  
    return this.rawHand.split(" ").map(element => {
      return new Card(element);
    });
  }

  getNameCountMap() {
    let instanceCount = new Map();

    this.names.forEach(element => {
      if (instanceCount.has(element)) {
        const count = instanceCount.get(element);
        instanceCount.set(element, count + 1);
      }
      else {
        instanceCount.set(element, 1);
      }
    });
    
    return instanceCount;
  }

  getNamesByInstanceCount(count) {
    let foundKeys = [];

    for (let [k, v] of this.nameCountMap) {
      if (v === count) { 
        foundKeys.push(k); 
      }
    }  
    return foundKeys;
  }

  isSameSuit() {
    return this.uniqueSuits.length === 1;
  }

  getLowCard() {
    return Math.min(...this.names)
  }

  removeDuplicates(array) {
    return [...(new Set(array))]
  };

  areConsecutiveNumbers() {
    let currentValue = this.names[0];
    
    for(let index = 1; index < this.names.length; index++) {
      if (this.names[index] !== ++currentValue) {
        return false;
      }
    }

    return true;
  }
}

module.exports = Hand;