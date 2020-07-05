// ES6 module
// export function add(left, right) { return left + right; }
// export function sub(left, right) { return left - right; }

/**
 * commonJS modules. ES6 is not working for some reason.
 */
module.exports = {
    add: function(left, right) { return left + right; },
    sub: function(left, right) { return left - right; }
}