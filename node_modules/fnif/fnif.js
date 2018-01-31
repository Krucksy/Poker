const fakeFnc = () => undefined

/**
 * Functional equivalent of an *if* statement
 *
 * returns whatever the executed function returned
 * @param {boolean} condition
 * @param {() => any} ifTrue
 * @param {() => any} ifFalse
 */
const fnif = (condition, ifTrue, ifFalse) =>
(
    condition ? (ifTrue || fakeFnc)() : (ifFalse || fakeFnc)()
)

module.exports = fnif
