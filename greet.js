// commonJS module. exporting all functions in one object
// you could use an alias export that commonJS provides like so:
// exports.sayHello = function(){}
// imagine the code that's available to you behind the scenes to be like:
// var exports = module.exports;
// so, you can't use:
// exports = { add: function(){}}
// as that will override the export variable and it will no longer point to module.exports
// you can also define the function separately e.g. 
// function sayHello(name) {}
// exports.sayHello = sayHello
module.exports = {
    sayHello: function(name) { return "Hello " + name + "!"; },
    sayHola: function(name) { return "Hola " + name + "!"; }
};