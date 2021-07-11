const BIGINT = require("big-integer");
const crypto = require("crypto");
const { SHA256 } = require("crypto-js");

class Prover {
  constructor() {
    this.modulo = BIGINT("294318880544991639594266924362588035491");
  }

  generateX() {
    const randomBytes = crypto.randomBytes(1).toString("hex");
    const randomNum = BIGINT(randomBytes, 16).toJSNumber();
    this.x = BIGINT.randBetween(
      BIGINT(2),
      this.modulo.subtract(BIGINT[1]),
      () => randomNum
    ).toString(16);
  }

  generateV() {
    const randomBytes = crypto.randomBytes(1).toString("hex");
    const randomNum = BIGINT(randomBytes, 16).toJSNumber();
    this.v = BIGINT.randBetween(
      BIGINT(1),
      this.modulo.subtract(BIGINT[1]),
      () => randomNum
    ).toString(16);
  }

  /**
   *
   * @param {BIGINT.BigInteger} g
   */
  computeY(g) {
    const X = BIGINT(this.x, 16);
    return g.modPow(X, this.modulo).toString(16);
  }

  /**
   *
   * @param {BIGINT.BigInteger} g
   */
  computeR(g) {
    const V = BIGINT(this.v, 16);
    return g.modPow(V, this.modulo).toString(16);
  }

  /**
   *
   * @param {string} r
   */
  computeU(r) {
    const R = BIGINT(r, 16);
    const X = BIGINT(this.x, 16);
    const hash = SHA256(r).toString();
    const hashAsBigInt = BIGINT(hash, 16);
    const c = hashAsBigInt.modPow(BIGINT[1], this.modulo.subtract(BIGINT[1]));
    const u1 = R.add(c.multiply(X));
    const u2 = u1.modPow(BIGINT[1], this.modulo.subtract(BIGINT[1]));
    return u2.toString(16);
  }
}

module.exports = Prover;
