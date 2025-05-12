const EventEmitter = require("events");

const exampleEmitter = new EventEmitter()

exampleEmitter.on("sayName", (name) => {
    console.log(name);
})


exampleEmitter.emit("sayName", "Kator Agashua")



// Creating a custom Emitter class
class MyEmitter extends EventEmitter {
    constructor() {
      super();
      this.greeting = "Hello";
    }
    greet(name) {
      this.emit("greet", `${this.greeting} ${name}`); // Emit the 'greet' event with the name as an argument
    }
  }
  
  const emitter = new MyEmitter();
  
  emitter.on("greet", (input) => {
      console.log(`CUSTOM EMITTER:`,'\n', input); // Listen for the 'greet' event and log the name
  }); // Listen for the 'greet' event and log the name
  
  emitter.greet("Kator"); // Emit the 'greet' event with the name "Kator"