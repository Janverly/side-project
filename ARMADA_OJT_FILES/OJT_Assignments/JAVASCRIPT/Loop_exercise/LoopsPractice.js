let number = 5;

// Task 1: Multiplication Table Generator
for (let i = 1; i <= 10; i++){

let product = number* i;
    console.log(number +" x " + i + " = " + product)
}


// Task 2: Sum of First N Natural Numbers

let n = 0;

for (let j = 0; j <= 5; j++){
    n = n +j;
}
console.log("The sum of the first 5 numbers is: "+ n);



// Task 3: Array Elements Printer

let nums = [1,3,5,7,9];

for (let i = 0; i < nums.length; i++){
    console.log("Array Element: " +nums[i]);
}


// Task 4: Patterm Printer

let pattern = 5;
for (let i = 1; i <= pattern; i++){
    let row = "";
    for (let j = 1; j <= i; j++){
        row = row + "*";
    }
    console.log(row);
}


// Task 5: Reverse Array Elmeents

let orig = [9, 8, 7, 6, 5, 4];
let reverse = [];

for (let i = orig.length - 1; i >= 0; i--) {
    reverse.push(orig[i]);
}

for (let i = 0; i < reverse.length; i++) {
    console.log("Array Element: " + reverse[i]);
}


