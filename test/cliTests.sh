#!/bin/bash
NODE=${NODE_PATH:-`which node`}
TESTDIR=$(dirname "$0")
FAILURES=0

if [ -x $NODE ]; then
    echo "Using $NODE to test."
else
    echo "Couldn't find node.js executable under path \"$NODE\" - please set NODE_PATH to your node executable path. \"NODE_PATH=/your/node $0\"  "
fi

cd $TESTDIR

function testCli() {
    ANSWER=$1
    shift
    REST=$@

    TEST_TEXT="whichramda $REST"

    OUTPUT=$(/bin/bash -c "../bin/whichramda.js $REST")

    NODE_CMD="console.log(JSON.parse('$OUTPUT').includes('$ANSWER'))"
    TEST_RESULT=$($NODE -e "$NODE_CMD")
    
    if [ "$TEST_RESULT" == "true" ]; then
        echo "✅ $TEST_TEXT yields $OUTPUT, and it contains \"$ANSWER\""
    else 
        echo "❌ $TEST_TEXT yields $OUTPUT, but it doesn't contain \"$ANSWER\""
        FAILURES=$((FAILURES + 1))
    fi
}

function eval_results() {
    if [ "$FAILURES" == "0" ]; then
        echo "Huzzah! 🙌"
        exit 0
    else 
        echo "Failed tests: $FAILURES 😿"
        exit 1
    fi
}

# Tests be here
testCli "splitAt" "-f ./example.json" 
testCli "T" "-j a b true"
testCli "splitEvery" "--json 2 '[1, 2, 3]' '[[1, 2], [3]]'"
testCli "aperture" "-j 3 '[1, 2, 3, 4, 5]' '[[1, 2, 3], [2, 3, 4], [3, 4, 5]]'"

eval_results
exit $?