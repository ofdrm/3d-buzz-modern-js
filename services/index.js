/**
 * when a script or module imports the directory services, it automatically imports exported stuff from index.js
 */
module.exports = {
    sayHi: function(name) {
        return "Hi " + name + "!";
    }
}