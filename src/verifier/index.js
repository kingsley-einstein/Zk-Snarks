const BIGINT = require("big-integer");
const { SHA256 } = require("crypto-js");

class Verifier {
  /**
   * @param {BIGINT.BigInteger} g
   * @param {string} y
   * @param {string} r
   * @param {string} u
   * @param {BIGINT.BigInteger} modulo
   */
  isValid(g, y, r, u, modulo) {
    const Y = BIGINT(y, 16);
    const R = BIGINT(r, 16);
    const U = BIGINT(u, 16);
    const hash = SHA256(r).toString();
    const hashBigInt = BIGINT(hash, 16);
    const c = hashBigInt.modPow(BIGINT[1], modulo.subtract(BIGINT[1]));
    const LHS = g.modPow(U, modulo);
    const RHS1 = R.modPow(BIGINT[1], modulo);
    const RHS2 = Y.modPow(c, modulo);
    const mulRHS = RHS1.multiply(RHS2);
    const RHS = mulRHS.modPow(BIGINT[1], modulo);
    return LHS.equals(RHS);
  }
}

module.exports = Verifier;
