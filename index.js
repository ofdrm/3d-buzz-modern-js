// importing es6 module
// import { add, sub } from './calculator';

// console.log(add(10, 20));
// console.log(sub(10, 20));


// importing commonJS module
// you can also directly import sayHello like so:
// var sayHello = require('./greet').sayHello;
var greet = require('./greet');

// calling functions on a commonJS module
console.log(greet.sayHello('drm'));
console.log(greet.sayHola('ddd'));

var service = require('./services'); // importing a directory imports stuff exported in index.js in that directory
console.log(service.sayHi('blah')); //referring to functions in index.js of services directory

var calcInd = require('./services/service');
console.log(calcInd.calcIndirect(100, 200));

var readDoc = require('./readDocuments');
readDoc.read();