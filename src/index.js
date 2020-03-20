var fs = require('fs');
var readline = require('readline');
var stream = require('stream');
const Hand = require("./models/hand")

var fileLocation = process.argv[2];

try 
{
  var instream = fs.createReadStream(fileLocation);
  var outstream = new stream;
  var reader = readline.createInterface(instream, outstream);

  reader.on('line', function(line) {
    // process line here
    let hand = new Hand(line);
    console.log(`${line} => ${hand.getBest()}`);
  });
}
catch (err) {
  console.error(err, err.stackTrace);
}