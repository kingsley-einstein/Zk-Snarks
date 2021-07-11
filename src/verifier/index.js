const BIGINT = require("big-integer");

class Verifier {
  /**
   *
   * @param {string} vk
   * @param {string} proof
   * @param {string} xp
   */
  isValid(vk, proof, xp) {
    const VK = BIGINT(vk, 16);
    const PROOF = BIGINT(proof, 16);
    const XP = BIGINT(xp, 16);
    const POLYNOMIAL = PROOF.multiply(VK);
    return POLYNOMIAL.mod(XP).equals(BIGINT[0]);
  }
}

module.exports = Verifier;
