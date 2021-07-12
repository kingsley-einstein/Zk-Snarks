const Generator = require("./generator");
const Prover = require("./prover");
const Verifier = require("./verifier");

const generator = new Generator();
const prover = new Prover();
const verifier = new Verifier();

const g = generator.computeG();
console.log("G: ", g.toJSNumber());

prover.generateX();
console.log("X: ", prover.x);

const c = prover.computeC();
console.log("C: ", c);

const keys = generator.computeKeys(g, generator.modulo, c);
console.log("Keys: ", keys);

const proof = prover.prove(g, keys[0]);
console.log("Proof: ", proof);

const verification = verifier.verify(g, proof, c, keys[1], generator.modulo);
console.log("Verification: ", verification);