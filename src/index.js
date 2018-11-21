import R from 'ramda'

export default (args, output) => {
  return Object.keys(R).filter((key) => {
    if (typeof R[key] !== 'function') {
      return false
    }

    try {
      return R.equals(
        R[key].apply(null, args),
        output
      )
    } catch (e) {
      return false
    }
  })
}
