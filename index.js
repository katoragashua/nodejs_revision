const { parse } = require("querystring");
// console.log(parse);



console.log(__dirname); // __dirname is the directory name of the current module
console.log(__filename); // __filename is the filename of the current module





// `__dirname` is a special variable in Node.js that represents the absolute path of the directory containing the current module. It is **not** part of a specific module but is available globally in Node.js when executing scripts using CommonJS (`require()` syntax).

// ### Example usage:
// ```javascript
// console.log(__dirname); // Outputs the directory of the current script
// ```
// If you're using ES modules (`import` syntax), `__dirname` is **not** available by default, but you can recreate it like this:

// ```javascript
// import { dirname } from 'path';
// import { fileURLToPath } from 'url';

// const __filename = fileURLToPath(import.meta.url);
// const __dirname = dirname(__filename);

// console.log(__dirname);
// ```

// Would you like me to explain more about handling paths in Node.js? 🚀

// (method) NodeJS.EventEmitter<DefaultEventMap>.emit<any>(eventName: string | symbol, ...args: AnyRest): boolean (+1 overload)
// Synchronously calls each of the listeners registered for the event named eventName, in the order they were registered, passing the supplied arguments to each.

// Returns true if the event had listeners, false otherwise.

// import { EventEmitter } from "node:events";
// const myEmitter = new EventEmitter();

// // First listener
// myEmitter.on("event", function firstListener() {
//   console.log("Helloooo! first listener");
// });
// // Second listener
// myEmitter.on("event", function secondListener(arg1, arg2) {
//   console.log(`event with parameters ${arg1}, ${arg2} in second listener`);
// });
// // Third listener
// myEmitter.on("event", function thirdListener(...args) {
//   const parameters = args.join(", ");
//   console.log(`event with parameters ${parameters} in third listener`);
// });

// console.log(myEmitter.listeners("event"));

// myEmitter.emit("event", 1, 2, 3, 4, 5);

// Prints:
// [
//   [Function: firstListener],
//   [Function: secondListener],
//   [Function: thirdListener]
// ]
// Helloooo! first listener
// event with parameters 1, 2 in second listener
// event with parameters 1, 2, 3, 4, 5 in third listener
