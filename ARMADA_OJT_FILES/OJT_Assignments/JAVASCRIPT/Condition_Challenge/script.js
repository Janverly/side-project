// Task 1: Grading System

let grade = "o";

if (grade >= 90 && grade <=100){
    console.log("Grade A");
}
else if (grade >= 80 && grade <=89){
    console.log("Grade B");
}
else if(grade >= 70 && grade <= 79){
    console.log("Grade C");
}
else if (grade >= 60 && grade <= 69){
    console.log("Grade D");
}
else if(grade >=1 && grade <= 60){
    console.log("Grade F");
}
else{
    console.log("Not a number.");
}


//Task 2: Weather Advisor

let temperature = 30;

if (temperature <= 0){
    console.log("It's freezing outside! Bundle up!");
}
else if(temperature <= 15 && temperature >= 1){
    console.log("It's cold outisde. Wear a jacket.")
}
else if (temperature <=16 && temperature >= 30){
    console.log("The weather is nice. Enjoy your day!");
}
else if(temperature >= 30){
    console.log("It's hot outside. Stay hydrated!");
}
else{
    console.log("Not a number.");
}


//Task 3: Eligibility Checker

/*
let age = 11;

switch (true){
    case (age <= 13):
        console.log("You are too young for this activity");
        break;
    case (age <= 13 && age >= 17):
        console.log("You need parental permission.")
        break;
    case (age >= 18):
        console.log("You are eligible for this activity.")
        break;
    default:
        console.log("Not an age");
}
*/
let age = 11;

if (age <= 13) {
    console.log("You are too young for this activity");
} 
else if (age >= 14 && age <= 17) {
    console.log("You need parental permission.");
} 
else if (age >= 18) {
    console.log("You are eligible for this activity.");
} 
else {
    console.log("Not an age");
}


// task 4: Ticket Price Calculator

let isMember = false;

if (age <= 12){
    console.log("Your ticket is free!");
}
else if (age >= 12 && isMember){
    console.log("Your ticket costs $10.");
}
else if (age >= 12 && isMember){
    console.log("Your ticket costs $15.");
}
else{
    console.log("Invalid.");
}


// Task 5: Challenge Task: Leap Year Checker

function isLeapYear(year){
    return (year % 4 === 0 && year % 100 !== 0) || year % 400 === 0;
}
// === is yung para sure na sure siyaa if same talaga siya 
// year % 4 === 0  check niya if divisible siya sa 4 no modulo
//year % 100 !== 0 if not divisible sa 100
//so not divisible by 4 then hindi rin divisible by 100
// || or para kahit year 2000 yan (which is leap year) magiging tru siya 
// kasi nagdidivide siya sa 100 

// to test 
console.log(isLeapYear(1999));
console.log(isLeapYear(2000));
console.log(isLeapYear(2002));
console.log(isLeapYear(2004));