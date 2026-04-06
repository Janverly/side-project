
function fetchData(url, callback) {
  console.log("Fetching data from", url); //fetch niya yung api/users
  setTimeout(() => {
    callback({ name: "John Doe" }); // papass niya sa userData.name
  }, 1000);
}

fetchData("api/users", function(userData) {
  console.log("User Data:", userData.name);
});


function calculate(num1, num2, operation) {
    return operation(num1, num2);
}

function add(a, b) {
    return a + b;
}

function multiply(a, b) {
    return a * b;
}

//no delay just display the output
console.log(calculate(5, 3, add));      // Output: 8
console.log(calculate(4, 2, multiply)); // Output: 8





//Exercise 2
function delayedMessage(message, delay, callback) {
    setTimeout(() => {
        callback(message);
    }, delay);
}
//delay 2 seconds
delayedMessage("Hello, world!", 2000, function(msg) {
    console.log(msg);
});






//Exercise 3
function repeatTask(times, callback) {
    for (let i = 0; i < times; i++) {
        callback(i);
    }
}
//rerepeat lang 
repeatTask(7, function(index) {
    console.log("Iteration:", index);
});

