
// Task1: Calculate the Total Cost of Items

let item1 = 40, item2 = 3, item3 = 2;
let totalCost = item1 + item2 + item3;


console.log("The total cost of the items is " + totalCost);
// or

//console.log("THe total cost is $totalCost");


//Task 2: Calculate the Average of the Three Numbers


let num1 = 23, num2 = 34, num3 = 45;

let ave = (num1 + num2 + num3) / 3

console.log("The average is : "+ ave)


// Task 3: Odd or Even Checker

let check_num = 23;

if (check_num % 2 == 0 ){
    console.log(check_num +" is an even number.")
}
else if (check_num % 2 == 1) {
    console.log(check_num + " is an odd number. ");
}
else {
    console.log(check_num + " is not a number.")
}

// Task 4: Calculate Discounts

let og_price = 500, dis_percent = 23;

let discount = (og_price  * dis_percent) / 100;
let new_price = og_price - discount;

console.log("The discounted price is "+ new_price);

// Bonus Task: Reverse Percentage Calculation
og_price = new_price / (1 - dis_percent / 100);

console.log("The original price before discount is " + og_price);



