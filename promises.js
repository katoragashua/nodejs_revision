const promise = new Promise((resolve, reject) => {
    // Simulating an asynchronous operation (like a file read/write)
    setTimeout(() => {
      const success = true; // Simulate success or failure
      if (success) {
        resolve("Operation was successful!");
      } else {
        reject("Operation failed.");
      }
    }, 2000); // 2 seconds delay
  }); // Creating a new Promise
  // The Promise constructor takes a function with two arguments: resolve and reject. You can use these to control the promise's state.
  
  promise.then((message) => {
    console.log(message); // This will run if the promise is resolved
  });
  
  const greetKator = (name) => {
    return new Promise((resolve, reject) => {
      if (name === "Kator") {
        resolve(`Hello, ${name}!`);
      } else {
        reject("This is not a greeting for Kator!");
      }
    });
  };
  
  greetKator("Jason")
    .then((message) => {
      console.log(message); // This will run if the promise is resolved
    })
    .catch((error) => {
      console.error(error); // This will run if the promise is rejected
    });
  
  