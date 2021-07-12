const BIGINT = require("big-integer");
const crypto = require("crypto");

class Generator {
  constructor() {
    this.modulo = BIGINT("294318880544991639594266924362588035491");
  }

  computeG() {
    return BIGINT[2];
  }

  /**
   * @param {BIGINT.BigInteger} g
   * @param {BIGINT.BigInteger} modulo
   * @param {string} c
   */
  computeKeys(g, modulo, c) {
    // const rand = crypto.randomBytes(16).toString("hex");
    // const randNum = BIGINT(rand, 16).toJSNumber();
    // const lambda = BIGINT.randBetween(
    //   BIGINT[3],
    //   modulo.subtract(BIGINT[3]),
    //   () => randNum
    // ).toString(16);
    const C = BIGINT(c, 16);
    // const cLAMBDA = C.multiply(BIGINT(lambda, 16));
    const pk = g.modPow(C.pow(BIGINT[2]).add(BIGINT[2].multiply(C)), modulo);
    const vk = g.modPow(C.add(BIGINT[3]), modulo);
    return [pk.toString(16), vk.toString(16)];
  }
}

module.exports = Generator;
