const Generator = require("./generator");
const Prover = require("./prover");
const Verifier = require("./verifier");

const generator = new Generator();
const prover = new Prover();
const verifier = new Verifier();

const M = Date.now().toString(16);
console.log("M: ", M);

const g = generator.computeG();
console.log("G: ", g.toJSNumber());

prover.generateX();
prover.generateR();

console.log("X: ", prover.x);
console.log("R: ", prover.r);

const y = prover.computeY(g);
const t = prover.computeT(g);
const c = prover.computeC(t, M);
const u = prover.computeU(c);

console.log("[Y, T, C, U]: ", [y, t, c, u]);

const isValid = verifier.isValid(g, t, M, u, y, prover.modulo);

console.log("ISVALID: ", isValid);