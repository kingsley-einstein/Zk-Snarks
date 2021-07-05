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
console.log("Y: ", y);

const t = prover.computeT(g);
console.log("T: ", t);

const c = prover.computeC(g, y, t);
console.log("C: ", c);

const r = prover.computeR(c);
console.log("R: ", r);

const validity = verifier.isValid(g, t, r, y, c);
console.log("Validity: ", validity);
