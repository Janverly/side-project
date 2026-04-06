/*  
 * DOCU: Custom Array Filter
 * @param {Array} arr - The array to be filtered
 * @param {Function} callback - Function used to test each array element
 * @returns {Array} - A new array containing elements that passed the test
 *  
 * Author: Janverly  
 * Last Updated By: Janverly
 */

function customFilter(arr, callback) {
    let result = [];

    for (let i = 0; i < arr.length; i++) {
        if (callback(arr[i])) {
            result.push(arr[i]);
        }
    }

    return result;
}

function isEven(num) {
    return num % 2 === 0;
}

var numbers = [1, 2, 3, 4, 5, 6];
var evenNumbers = customFilter(numbers, isEven);
console.log(evenNumbers);


/*  
 * DOCU: Countdown Timer
 * @param {Number} start - The number to start counting down from
 * @param {Function} callback - Function that displays the current number
 *  
 * Last Updated: 
 * Author: Janverly
 * Last Updated By: Janverly
 */



function countdown(start, callback) {
    callback(start); //start counting from 5, callback --calls and nagdidisplay nung num

    if (start > 0) {
        setTimeout(function () {
            countdown(start - 1, callback);
        }, 1000);
    }
}

function displayNumber(num) {
    console.log(num); //num === start
}

countdown(5, displayNumber);  // Output: 5 4 3 2 1 0 (with 1-second delay between each)



/*  
 * DOCU: Dynamically create a button with a click event (Simple Event Listener)
 * @param {String} buttonText - The text displayed on the button
 * @param {Function} callback - The function to run when the button is clicked
 * @returns {void} - Does not return anything, just adds a button to the page
 *  
 * Last Updated: 2026-02-06s
 * Author: Janverly  
 * Last Updated By: Janverly
 */

function createButton(buttonText, callback) {
    let button = document.createElement("button"); //create new button, not on html

    button.textContent = buttonText; // Click me text

    button.addEventListener("click", callback) //what the button do "click"

    document.body.appendChild(button); // display niya sa webpage
}

function buttonClicked() {
    console.log("Button Clicked!");
}

createButton("Click Me", buttonClicked);






//Create a function that executes a series of tasks 
// (functions) one by one, with a 1-second delay between each task.

function runTasks(tasks) {
    for (let i = 0; i < tasks.length; i++) {  //loops the tasks on the runTask length
        setTimeout(() => { //pass arrow function sa task [i]
            tasks[i](); //parang cacall niya yung mga functions based sa index [i], tasks[0] = task1(), tasks[1]...
        }, i * 1000); //delay 1000ms or 1 sec
    }
}
function task1() {
    console.log("Task 1 completed");
}

function task2() {
    console.log("Task 2 completed");
}

function task3() {
    console.log("Task 3 completed");
}

runTasks([task1, task2, task3]);  //call then pass niya yung asa array task functions


//Task 5: Interactive Quiz Game (Extra Miles)

function askQuestion(question, choices, correctAnswer, callback) {
    console.log(question);

    setTimeout(() => {
        console.log("Choices: " + choices.join(", ")); //did search how do i print all the choices huhu

        setTimeout(() => {
            let userAnswer = choices[choices.length - 1]; // pick last choice
            callback(userAnswer === correctAnswer);
        }, 5000); //5 sec delay para sa sagot

    }, 1000); // 1 second delay before choices
}
function checkAnswer(isCorrect) {
    if (isCorrect) {
        console.log("Correct!");
    } else {
        console.log("Wrong!");
    }
}

askQuestion("What is 2 + 2?", ["1", "2", "3", "4"], "2", checkAnswer);
