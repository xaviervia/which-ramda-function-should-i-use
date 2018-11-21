import washington from 'washington'
import whichRamdaFunctionShouldIUse from '../src'

washington([
  {
    description: 'find splitEvery and splitAt',
    test: () => whichRamdaFunctionShouldIUse(
      [2, [1, 2, 3]],
      [[1, 2], [3]]
    ),
    shouldEqual: [ 'splitAt', 'splitEvery' ]
  },
  {
    description: 'find toPairs',
    test: () => whichRamdaFunctionShouldIUse(
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
    ),
    shouldEqual: [ 'toPairs', 'toPairsIn' ]
  }
])
