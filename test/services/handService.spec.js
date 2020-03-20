const assert = require('assert');
const handTypes = require('../../src/types/hand.js');
const Hand = require('../../src/models/hand.js');
const HandService = require('../../src/services/handService.js');

describe('pokerHandService', function() {
  let handService;

  beforeEach(function () {
    handService = new HandService();
  })

  describe('#getBestHand() functional tests', function() {
    it('should return royal flush', function() {
      let hand = new Hand("TS JS QS KS AS");
      const bestHand = handService.getBestHand(hand);
      assert.equal(bestHand, handTypes.ROYAL_FLUSH);
    });

    it('should return royal flush unorderd', function() {
      let hand = new Hand("AS TS QS JS KS");
      const bestHand = handService.getBestHand(hand);
      assert.equal(bestHand, handTypes.ROYAL_FLUSH);
    });

    it('should return low Straight flush', function() {
      let hand = new Hand("2S 3S AS 4S 5S");
      const bestHand = handService.getBestHand(hand);
      assert.equal(bestHand, handTypes.STRAIGHT_FLUSH);
    });

    it('should return middle Straight flush', function() {
      let hand = new Hand("7S 8S 9S TS 6S");
      const bestHand = handService.getBestHand(hand);
      assert.equal(bestHand, handTypes.STRAIGHT_FLUSH);
    });

    it('should return four of a kind', function() {
      let hand = new Hand("9H 9D 3S 9S 9C");
      const bestHand = handService.getBestHand(hand);
      assert.equal(bestHand, handTypes.FOUR_OF_A_KIND);
    });

    it('should return full house', function() {
      let hand = new Hand("9C 3H 9S 9H 3S");
      const bestHand = handService.getBestHand(hand);
      assert.equal(bestHand, handTypes.FULL_HOUSE);
    });

    it('should return flush', function() {
      let hand = new Hand("2S 3S AS 4S 6S");
      const bestHand = handService.getBestHand(hand);
      assert.equal(bestHand, handTypes.FLUSH);
    });

    it('should return low straight', function() {
      let hand = new Hand("2S 3S AS 4S 5H");
      const bestHand = handService.getBestHand(hand);
      assert.equal(bestHand, handTypes.STRAIGHT);
    });

    it('should return high straight', function() {
      let hand = new Hand("AS TS QS JS KH");
      const bestHand = handService.getBestHand(hand);
      assert.equal(bestHand, handTypes.STRAIGHT);
    });

    it('should return middle straight', function() {
      let hand = new Hand("7H 8S 9C TD JD");
      const bestHand = handService.getBestHand(hand);
      assert.equal(bestHand, handTypes.STRAIGHT);
    });

    it('should return middle straight unordered', function() {
      let hand = new Hand("8S 7H TD 9C JD");
      const bestHand = handService.getBestHand(hand);
      assert.equal(bestHand, handTypes.STRAIGHT);
    });

    it('should return 3 of a kind', function() {
      let hand = new Hand("3H JS 3C 7C 3D");
      const bestHand = handService.getBestHand(hand);
      assert.equal(bestHand, handTypes.THREE_OF_A_KIND);
    });

    it('should return 2 pair', function() {
      let hand = new Hand("JH 2C JD 2H 4C");
      const bestHand = handService.getBestHand(hand);
      assert.equal(bestHand, handTypes.TWO_PAIR);
    });

    it('should return 1 pair', function() {
      let hand = new Hand("JH 1C JD 2H 4C");
      const bestHand = handService.getBestHand(hand);
      assert.equal(bestHand, handTypes.ONE_PAIR);
    });

    it('should return High Card', function() {
      let hand = new Hand("2H JS 3C 7C 5D");
      const bestHand = handService.getBestHand(hand);
      assert.equal(bestHand, handTypes.HIGH_CARD);
    });
  });
});