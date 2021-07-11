const Generator = require("./generator");
const Prover = require("./prover");
const Verifier = require("./verifier");

const generator = new Generator();
const prover = new Prover();
const verifier = new Verifier();

const g = generator.computeG();
console.log("G: ", g.toJSNumber());

prover.generateX();
prover.generateV();

console.log("X: ", prover.x);
console.log("V: ", prover.v);

const y = prover.computeY(g);
const r = prover.computeR(g);
const u = prover.computeU(r);
const isValid = verifier.isValid(g, y, r, u, prover.modulo);

console.log("Y: ", y);
console.log("R: ", r);
console.log("U: ", u);
console.log("IsValid: ", isValid);
