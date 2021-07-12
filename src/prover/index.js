const BIGINT = require("big-integer");
const crypto = require("crypto");
const { SHA256 } = require("crypto-js");

class Prover {
  constructor() {
    this.modulo = BIGINT("294318880544991639594266924362588035491");
  }

  generateX() {
    const randomBytes = crypto.randomBytes(16).toString("hex");
    const randomNum = BIGINT(randomBytes, 16).toJSNumber();
    this.x = BIGINT.randBetween(
      BIGINT[2],
      this.modulo,
      () => randomNum
    ).toString(16);
  }

  computeC() {
    return SHA256(this.x).toString();
  }

  /**
   * @param {BIGINT.BigInteger} g
   * @param {string} pk
   */
  prove(g, pk) {
    const hashX = SHA256(this.x).toString();
    const proving_key = BIGINT(pk, 16);
    const X = BIGINT(hashX, 16);
    const r = g.modPow(X.subtract(BIGINT[1]), this.modulo);
    return proving_key.multiply(r).toString(16);
  }
}

module.exports = Prover;
