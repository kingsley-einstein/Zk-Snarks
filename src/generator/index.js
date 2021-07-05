const BIGINT = require("big-integer");
const crypto = require("crypto");

class Generator {
  computeG() {
    const g = crypto.randomBytes(1).toString("hex");
    return BIGINT(g, 16);
  }
}

module.exports = Generator;
