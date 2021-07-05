const BIGINT = require("big-integer");

class Verifier {
  /**
   * @param {BIGINT.BigInteger} g
   * @param {string} t
   * @param {string} r
   * @param {string} y
   * @param {string} c
   */
  isValid(g, t, r, y, c) {
    const R = BIGINT(r, 16);
    const Y = BIGINT(y, 16);
    const C = BIGINT(c, 16);
    const T = BIGINT(t, 16);
    return T.equals(g.pow(R).multiply(Y.pow(C)));
  }
}

module.exports = Verifier;
