// console.log(arguments);
// console.log(require("module").wrapper);

//module.exports
const C = require("./test-module-1");
const cal1 = new C();
console.log(cal1.mutiply(5, 9));

//exports
const cal2 = require("./test-module-2");
console.log(cal2.add(2, 3));

//caching
require("./test-module-3")();
require("./test-module-3")();
require("./test-module-3")();
