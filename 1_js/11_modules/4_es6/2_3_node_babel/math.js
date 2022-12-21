// function sum(a, b) {
//     return a + b
// }

// function minus(a, b) {
//     return a - b
// }

// console.log(666);

// export {sum, minus}



"use strict";

// Object.defineProperty(exports, "__esModule", {
//   value: true
// });
exports.minus = minus;
exports.sum = sum;
console.log("exports", exports);
console.log("module.exports", module.exports === exports);

function sum(a, b) {
  return a + b;
}
function minus(a, b) {
  return a - b;
}
console.log(666);
