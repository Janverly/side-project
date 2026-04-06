function generatePattern() {  
  let result = "";  
  for (let i = 1; i <= 3; i++) {  // rows
    for (let j = 1; j <= i; j++) {   //column
      result += j + " ";  
    }  
    /*
    *               1" " \n
    *   copy result 1 2 " "\n
    *               1 2 3 " " \n
    */
    result += "\n";  
  }  
  return result;  
}  
console.log(generatePattern());

// Challenge 2
function swapFirstLast(arr) {  
  let first = arr.shift();   // removes first element 10
  let last = arr.pop();  // removes last element 40
  arr.unshift(last);  //add elements to the beginning 40
  arr.push(first);  // add elements to the end  10
  return arr;  
}  

let numbers = [10, 20, 30, 40];  
console.log(swapFirstLast(numbers));  
console.log(numbers); 

// Challenge 3
function filterPassingGrades(grades) {  
  let passing = [];  
  for (let grade of grades) {  
    if (grade >= 70) {  
      passing.push(grade); //add elements to the end 
    } else {  
      passing.unshift(grade);  //add element to the beginning
    }  
  }  
  return passing;  
}  
//did add this for new line
console.log("\n");
let scores = [85, 45, 90, 60];  
console.log(filterPassingGrades(scores)); 






//Challenge 4

function findValue(arr, target) {  
  for (let i = 0; i < arr.length; i++) {  
    if (arr[i] === target) {  
      return `Found at index ${i}`;  
    }  
  }  
  return "Not found";  
}  

let data = [5, 12, 8, 130, 44];  
console.log(findValue(data, 12));  
console.log(findValue(data, 100)); 