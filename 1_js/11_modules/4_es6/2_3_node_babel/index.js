// import {sum, minus} from './math.js'

// // nodejs后端运行，也报错
// console.log("sum", sum(1, 2));
// console.log("minus", minus(1, 2));

// 通过babel转换: 将es6转为commonJs
// https://www.babeljs.cn/repl
"use strict";

var _math = require("./math.js");
// nodejs后端运行，也报错
console.log("sum", (0, _math.sum)(1, 2));
console.log("minus", (0, _math.minus)(1, 2));

console.log(_math.sum(1, 2));