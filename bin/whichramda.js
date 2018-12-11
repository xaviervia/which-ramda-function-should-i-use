#!/usr/local/bin/node

var fs = require("fs");
var whichRamda = require("../dist").default;

var args = process.argv.slice(2);
var executable = process.argv[1].split(/[\\\/]/g).pop()

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

    case "-h":
    case "--help":
    default:
      console.log("Usage: ")
      console.log(`${executable} (-f|-j|-h|--file|--json|--help) (inputs+|inputfilepath) (output?)`)
      console.log(`
      -f, --file\t\tFind which ramda fits your "inputfilepath" of shape: { input: any[], output: any } 
      -j, --json\t\tFind which ramda fits your "inputs" to produce an "output".
      -h, --help\t\tHelps.
      `)
      console.log(`
      Examples: 
      \t${executable} -j '{ "a": 1, "b": 2 }' '[["a", 1], ["b", 2]]'
      \t${executable} -f lol.json
      `)
    break;
}

if (theRamda) {
    console.log(JSON.stringify(theRamda));
    process.exit(0);
} else {
    process.exit(1);
}

