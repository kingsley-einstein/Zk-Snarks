const Generator = require("./generator");
const Prover = require("./prover");
const Verifier = require("./verifier");

const generator = new Generator();
const prover = new Prover();
const verifier = new Verifier();

generator.computeG();
console.log("G: ", generator.g.toJSNumber());

const keys = generator.computeKeys();
console.log("KEYS: ", keys);

prover.generateX();
console.log("X: ", prover.x);

const proof = prover.computeProof(keys[0], generator.g);
console.log("PROOF: ", proof);

const validity = verifier.isValid(keys[1], proof[0], proof[1]);
console.log("ISVALID: ", validity);