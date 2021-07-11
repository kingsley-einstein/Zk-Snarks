const BIGINT = require("big-integer");
const crypto = require("crypto");

class Generator {
  constructor() {
    this.modulo = BIGINT("294318880544991639594266924362588035491");
  }

  computeG() {
    this.g = BIGINT[700];
  }

  computeKeys() {
    const randomBytes = crypto.randomBytes(32).toString("hex");
    const randomNum = BIGINT(randomBytes, 16).toJSNumber();
    const lambda = BIGINT.randBetween(
      BIGINT[1],
      this.modulo.subtract(BIGINT[1]),
      () => randomNum
    );
    const pk = this.g
      .modPow(lambda, this.modulo)
      .multiply(this.g.modPow(BIGINT[1], this.modulo))
      .toString(16);
    const vk = this.g
      .modPow(lambda, this.modulo)
      .multiply(this.g.modPow(BIGINT[2], this.modulo))
      .toString(16);

    return [pk, vk];
  }
}

module.exports = Generator;
