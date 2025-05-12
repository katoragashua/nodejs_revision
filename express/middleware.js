/*
 Middleware functions in Express.js are functions that have access to the request object (req), the response object (res), and the next middleware function in the application’s request-response cycle. They can perform a variety of tasks, such as executing code, modifying the request and response objects, ending the request-response cycle, and calling the next middleware function in the stack.
Middleware functions can be used for logging, authentication, error handling, and more. 
Middleware functions can perform the following tasks:

Execute any code.
Make changes to the request and the response objects.
End the request-response cycle.
Call the next middleware function in the stack.
 */

const appMiddleware = (req, res, next) => {
  console.log("App middleware executed");
  next();
};

const homePageMiddleware = (req, res, next) => {
  console.log("Home page middleware executed");
  next();
};

const productsPageMiddleware = (req, res, next) => {
  console.log("Products page middleware executed");
  next();
};

const productDetailsPageMiddleware = (req, res, next) => {
  console.log("Product details page middleware executed");
  next();
};

// Exporting middleware functions using module.exports
module.exports = {
  appMiddleware,
  homePageMiddleware,
  productsPageMiddleware,
  productDetailsPageMiddleware,
};

/**
 * This is another way you can export function in Node.js.
 * You can use module.exports to export a single function or object, and exports to export multiple functions or objects.
 * This is a common pattern in Node.js to organize and share code between different files.
 * In this case, we are exporting three middleware functions: firstMiddleware, secondMiddleware, and thirdMiddleware.
 * These functions can be imported and used in other files, such as the main application file (app.js).
 * This allows for better code organization and reusability.
 *
module.exports = {
    firstMiddleware: (req, res, next) => {
        console.log("First middleware executed");
        next();
    },
    secondMiddleware: (req, res, next) => {
        console.log("Second middleware executed");
        next();
    },
    thirdMiddleware: (req, res, next) => {
        console.log("Third middleware executed");
        next();
    }
}
 */
