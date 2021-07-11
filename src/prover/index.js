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

  /**
   *
   * @param {string} pk
   * @param {BIGINT.BigInteger} globalInput
   */
  computeProof(pk, globalInput) {
    const PROVING_KEY = BIGINT(pk, 16);
    const X = BIGINT(this.x, 16);
    const XP = globalInput.modPow(BIGINT[-1], this.modulo);
    const PROOF = PROVING_KEY.multiply(
      globalInput.modPow(X, this.modulo).multiply(XP)
    ).toString(16);
    return [PROOF, XP.toString(16)];
  }
}

module.exports = Prover;
