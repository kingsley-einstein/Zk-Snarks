const BIGINT = require("big-integer");
const { SHA256 } = require("crypto-js");

class Verifier {
  /**
   *
   * @param {BIGINT.BigInteger} g
   * @param {string} r
   * @param {string} M
   * @param {string} u
   * @param {string} y
   * @param {BIGINT.BigInteger} modulo
   */
  isValid(g, r, M, u, y, modulo) {
    const T = BIGINT(r, 16);
    const c = SHA256(T.toString(16)).toString().concat(SHA256(M).toString());
    const U = BIGINT(u, 16);
    const C = BIGINT(c, 16);
    const Y = BIGINT(y, 16);
    const LHS = g.pow(U);
    const RHS = T.multiply(Y.multiply(C)).mod(modulo);
    return LHS.equals(RHS);
  }
}

module.exports = Verifier;
