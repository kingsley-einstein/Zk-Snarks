const BIGINT = require("big-integer");

class Verifier {
  /**
   *
   * @param {BIGINT.BigInteger} g
   * @param {string} hashX
   * @param {BIGINT.BigInteger} modulo
   */
  polynomial(g, hashX, modulo) {
    const X = BIGINT(hashX, 16);
    return g.modPow(
      X.pow(BIGINT[4])
        .add(X.pow(BIGINT[3]).multiply(BIGINT[5]))
        .subtract(X.pow(BIGINT[3]))
        .add(X.pow(BIGINT[2]))
        .subtract(X.multiply(BIGINT[6])),
      modulo
    );
  }

  /**
   * @param {BIGINT.BigInteger} g
   * @param {string} proof
   * @param {string} hashX
   * @param {string} vk
   * @param {BIGINT.BigInteger} modulo
   */
  verify(g, proof, hashX, vk, modulo) {
    const polynomial = this.polynomial(g, hashX, modulo);
    const PROOF = BIGINT(proof, 16);
    const VK = BIGINT(vk, 16);
    console.log(
      "POLYNOMIAL: ",
      polynomial.toJSNumber(),
      "PROOF * VK: ",
      PROOF.multiply(VK).toJSNumber()
    );
    return polynomial.equals(PROOF.multiply(VK));
  }
}

module.exports = Verifier;
