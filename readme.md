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

…because, where you really going to read the docs?

## Install

```
yarn add which-ramda-function-should-i-use
```
