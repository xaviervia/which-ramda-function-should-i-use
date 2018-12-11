# Which Ramda function should I use?

```javascript
import whichRamdaFunctionShouldIUse from 'which-ramda-function-should-i-use'

console.log(
  whichRamdaFunctionShouldIUse(
    // the arguments I would pass
    // (as in: R.fn({ a: 1, b: 2 }))
    [
      {
        a: 1,
        b: 2
      }
    ],

    // the output I expect
    [
      ['a', 1],
      ['b', 2]
    ]
  )
)
// > [ 'toPairs', 'toPairsIn' ]
```

…because, were you really going to read the docs?

## Install

```
yarn add which-ramda-function-should-i-use
```

## CLI

```shell
whichramda -j '{ "a": 1, "b": 2 }' '[["a", 1], ["b", 2]]'
# outputs ["toPairs","toPairsIn"]

# Or, having a file: lol.json
# {
#   "input": {
#     "a": 1,
#     "b": 2
#   },
#   "output": [["a", 1], ["b", 2]]
# }
whichramda -f lol.json
# outputs ["toPairs","toPairsIn"]
```