var fs = require('fs');
var readline = require('readline');
var stream = require('stream');
const Hand = require("./models/hand")
const HandService = require("./services/handService")

var fileLocation = process.argv[2];

try 
{
  let instream = fs.createReadStream(fileLocation);
  let outstream = new stream;
  let reader = readline.createInterface(instream, outstream);
  let handService = new HandService();

  reader.on('line', function(line) {
    let hand = new Hand(line);
    console.log(`${line} => ${handService.getBestHand(hand)}`);
  });
}
catch (err) {
  console.error(err, err.stackTrace);
}