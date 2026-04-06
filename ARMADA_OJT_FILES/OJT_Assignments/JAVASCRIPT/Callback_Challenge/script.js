/*  
 * DOCU: Creates a new array by applying a given function (callback) to each element of the input array.  
 * @param {Array} arr - The array of elements to process.  
 * @param {Function} callback - A function that is called on each element of the array, returning the transformed value.  
 * @returns {Array} - A new array containing the results of calling the callback on each element of the input array.  
 *  
 * Last Updated: 2026-02-06  
 * Author: Janverly Bacani  
 * Last Updated By: Janverly Bacani  
 */
/*
function customMap(arr, callback) {
    let result = []; //store mo dito mga values

    for (let i = 0; i < arr.length; i++) { //read every element sa numbers na array
        result.push(callback(arr[i])); // i = 0 --> arr[0] = 1
    }
    return result;
}

let numbers = [1, 2, 3];
let doubled = customMap(numbers, function (num) { //cacall niya si custoMap then papasa ni numbers kay arr..?
   
  return num * 2; //pass callback
});

console.log(doubled); // [2, 4, 6]
*/


/*  
 * DOCU: Creates a new array containing only the elements of the input array that satisfy a given condition.  
 * @param {Array} arr - The array of elements to process.  
 * @param {Function} callback - A function that tests each element, returning true if it should be included in the new array result.  
 * @returns {Array} - A new array containing only the elements that passed the test implemented by the callback.  
 *  
 * Last Updated: 2026-02-06  
 * Author: Janverly Bacani  
 * Last Updated By: Janverly Bacani, Jorge Abenojar and Neil Benitez    
 */
/*
function filter(arr, callback) {
    let result = [];
    
    for (let i = 0; i < arr.length; i++) {
        if (callback(arr[i])) { //send value to callback function (trrue or false if less than 10 ba yung value nung pinapass)
            result.push(arr[i]); //aadd niya if nasatisfy yung condition na val < 10 
        }
    }

    return result;
}

let result = filter([1, 2, 3, 4, 15], function (val) { 
   return val < 10;
});

console.log(result); // [1, 2, 3, 4]
*/

/*  
 * DOCU: Checks if at least one element in the array satisfies a condition defined by the callback function.  
 * @param {Array} arr - The array of elements to test.  
 * @param {Function} callback - A function that returns true if the element meets a condition, false otherwise.  
 * @returns {boolean} - Returns true if at least one element passes the test; otherwise, returns false.  
 *  
 * Last Updated: 2026-02-08  
 * Author: Janverly Bacani  
 * Last Updated By: Janverly Bacani  
 */
/*
function some(arr, callback) {
    for (let i = 0; i < arr.length; i++) {
        if (callback(arr[i])) { //callback (1) --> 1 > 5 --> false,...callback(4) --> 4> 5 false
            return true;
        }      
    }
return false;
}

let result = some([1, 2, 3, 4], function (val) {
   return val > 5;
});

console.log(result); // false, kasi wala namang 5 sa array
*/


/*  
 * DOCU: Checks if all elements in the array meet the condition specified in the callback
 * @param {Function} callback - A function that tests each element and returns true or false.  
 * @returns {boolean} - Returns true if at least one element passes the test, otherwise false.  
 * Last Updated: 2026-02-06  
 * Author: Janverly Bacani  
 * Last Updated By: Janverly Bacani, Jorge Abenojar and Neil Benitez  
 */
/*
function every(arr, callback) {
    for (let i = 0; i < arr.length; i++) {
        if (callback(arr[i]) === false) {  //If element fails, immediately return false
            return false;     
        }
    }
    return true; //laaht nung laman nung array, passed sa condition
}

let result = every([1, 2, 3], function (val) {
return val > 0;
});

console.log(result); // true
*/


/*  
 * DOCU: Reduces an array to a single value by repeatedly applying a callback function to its elements.  
 * @param {Array} arr - The array of elements to process.  
 * @param {Function} callback - A function that takes an accumulator and the current element, and returns the updated accumulator.  
 * @returns {*} - The final accumulated value after processing all elements.  
 * 
 * Last Updated: 2026-02-06  
 * Author: Janverly Bacani  
 * Last Updated By: Janverly Bacani and Neil Benitez
 */
/*
function reduce(arr, callback) {
    let acc = arr[0]; //start with first element 
    for (let i = 1; i < arr.length; i++) {
        acc = callback(acc, arr[i]);
   }

   return acc;
}

let sum = reduce([1, 2, 3], function (acc, num) {
    return acc + num;
});

console.log(sum); // 6
*/


/*  
 * DOCU: Checks if any element in the array satisfies the condition defined by the callback function, similar to Array.prototype.includes.  
 * @param {Array} arr - The array of elements to test.  
 * @param {Function} callback - A function that tests each element and returns true if the condition is met.  
 * @returns {boolean} - Returns true if at least one element satisfies the condition, otherwise false.  
 *  
 * Last Updated: 2026-02-07  
 * Author: Janverly Bacani  
 * Last Updated By: Janverly Bacani  
 */
/*
function includes(arr, callback) {
    for (let i = 0; i < arr.length; i++) {
        if (callback(arr[i])) {
            return true;
        }
    }
    return false;
}
let result = includes([1, 2, 3], function (val) {
    return val === 2;
});

console.log(result); // true
*/