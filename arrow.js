var obj = {
    name: "nelson",
    printName() {
        console.log("Name's still: " + this.name);
    },
    showName() {
        console.log("Name: " + this.name);

        setTimeout(function() {
            // this.name is undefined because the function is executed outside of obj context
            // rather in window context, so this.name is really window.name.
            // in node, there is no window.  it's something else I forgot. 
            // console.log("Name is still: " + this.name);

            // but this should work, because here printName() is executed on the obj
            obj.printName();
        }, 500);

        // or you can use arrow function which runs in the outer lexical scope so gets the real 'this'
        setTimeout(() => {
            console.log("Name is still: " + this.name);
        }, 1000);
    }
}

obj.showName();