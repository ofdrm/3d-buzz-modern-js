/**
 * a module can also refer to a module up the hierarchy in directory
 */
var calc = require('../calculator')

module.exports.calcIndirect = function(left, right) {
    return calc.add(left, right);
}