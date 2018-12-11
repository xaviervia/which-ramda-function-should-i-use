#!/usr/local/bin/node

var fs = require("fs");
var whichRamda = require("../dist").default;

var args = process.argv.slice(2);

var mode = args.shift();
if (["-j", "--json", "-f", "--file"].indexOf(mode) === -1){
  args.unshift(mode);
  mode = "";
}

function asJson(input) {
  try {
    return JSON.parse(input);
  } catch (e) {
    return JSON.parse('"' + input + '"');
  }
}

var theRamda = null;

switch (mode) {
  case "--json":
  case "-j":
    try {
      var output = asJson(args.pop());
      var input = args.map(asJson);
      theRamda = whichRamda(Array.isArray(input) ? input : [input], output);
    } catch (e) {
      console.error("Couldn't find out which ramda... ");
      console.error(e.message);
      console.error(e.stack);
    }
    break;

  case "--file":
  case "-f":
  default:
    try {
        var file = args.shift();
        var fileContent = fs.readFileSync(file).toString();
        var fileContentJson = JSON.parse(fileContent);
        var input = fileContentJson.input;
        var output = fileContentJson.output;
        theRamda = whichRamda(Array.isArray(input) ? input : [input], output);
    } catch (e) {
        console.error("Couldn't find out which ramda...");
        console.error(e.message);
        console.error(e.stack);
    }
    break;
}

if (theRamda) {
    console.log(JSON.stringify(theRamda));
    process.exit(0);
} else {
    process.exit(1);
}

