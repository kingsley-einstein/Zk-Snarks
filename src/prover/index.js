const BIGINT = require("big-integer");
const crypto = require("crypto");
const { SHA256 } = require("crypto-js");

class Prover {
  constructor() {
    this.modulo = BIGINT("294318880544991639594266924362588035491");
  }

  generateX() {
    let rand = crypto.randomBytes(64).toString("hex");
    let randnum = BIGINT(rand, 16);

    while (!BIGINT[2].lt(randnum) && !randnum.lt(this.modulo)) {
      rand = crypto.randomBytes(1).toString("hex");
      randnum = BIGINT(rand, 16);
    }

    this.x = randnum.toString(16);
  }

  generateR() {
    let rand = crypto.randomBytes(64).toString("hex");
    let randnum = BIGINT(rand, 16);

    while (
      !BIGINT[1].lt(randnum) &&
      !randnum.lt(this.modulo.subtract(BIGINT[1]))
    ) {
      rand = crypto.randomBytes(1).toString("hex");
      randnum = BIGINT(rand, 16);
    }

    this.r = randnum.toString(16);
  }

  /**
   *
   * @param {BIGINT.BigInteger} g
   */
  computeY(g) {
    const X = BIGINT(this.x, 16);
    const y = g.modPow(X, this.modulo);
    return y.toString(16);
  }

  /**
   *
   * @param {BIGINT.BigInteger} g
   */
  computeT(g) {
    const R = BIGINT(this.r, 16);
    const t = g.modPow(R, this.modulo);
    return t.toString(16);
  }

  /**
   *
   * @param {string} t
   * @param {string} message
   */
  computeC(t, message) {
    const T = BIGINT(t, 16);
    const concatenatedHash = SHA256(T.toString(16))
      .toString()
      .concat(SHA256(message).toString());
    const hashAsInteger = BIGINT(concatenatedHash, 16);
    return hashAsInteger.mod(this.modulo.subtract(1)).toString(16);
  }

  /**
   *
   * @param {string} c
   */
  computeU(c) {
    const R = BIGINT(this.r, 16);
    const C = BIGINT(c, 16);
    const X = BIGINT(this.x, 16);
    return R.add(C.multiply(X)).toString(16);
  }
}

module.exports = Prover;
