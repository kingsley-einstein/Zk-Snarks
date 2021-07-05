const BIGINT = require("big-integer");
const crypto = require("crypto");
const { SHA256 } = require("crypto-js");

class Prover {
  generateX() {
    this.x = crypto.randomBytes(64).toString("hex");
  }

  generateV() {
    this.v = crypto.randomBytes(32).toString("hex");
  }

  /**
   *
   * @param {BIGINT.BigInteger} g
   */
  computeY(g) {
    const X = BIGINT(this.x, 16);
    return g.pow(X).toString(16);
  }

  /**
   *
   * @param {BIGINT.BigInteger} g
   */
  computeT(g) {
    return g.pow(BIGINT(this.v, 16)).toString(16);
  }

  /**
   *
   * @param {BIGINT.BigInteger} g
   * @param {string} y
   * @param {string} t
   */
  computeC(g, y, t) {
    return SHA256(g.toString(16) + y + t).toString();
  }

  /**
   *
   * @param {string} c
   */
  computeR(c) {
    const C = BIGINT(c, 16);
    return BIGINT(this.v, 16)
      .minus(C.multiply(BIGINT(this.x, 16)))
      .toString(16);
  }
}

module.exports = Prover;
