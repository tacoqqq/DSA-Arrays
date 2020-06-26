const Memory = require('./memory');

const memory = new Memory();

class Array{
    constructor(){
        this.length = 0;
        this._capacity = 0;
        this.ptr = memory.allocate(this.length);
    }

    push(value){
        if (this.length >= this._capacity){
            this._resize((this.length + 1) * Array.SIZE_RATIO);
        }

        memory.set(this.ptr + this.length , value);
        this.length++;
    }

    pop(){
        if (this.length == 0){
            throw new Error('Index error');
        }
        const value = memory.get(this.ptr + this.length - 1);
        this.length--;
        return value;
    }

    insert(index,value){
        if (index < 0 || index >= this.length){
            throw new Error('Index Error');
        }

        if (this.length >= this._capacity){
            this._resize((this.length + 1) * Array.SIZE_RATIO);
        }

        memory.copy(this.ptr + index + 1 , this.ptr + index , this.length - index);
        memory.set(this.ptr + index , value);
        this.length++;
    }

    remove(index){
        if (index < 0 || index >= this.length){
            throw new Error('Index error');
        }

        memory.copy(this.ptr + index , this.ptr + index + 1 , this.length - index - 1);
        this.length--;
    }

    _resize(size){
        const oldPtr = this.ptr;
        this.ptr = memory.allocate(size)
        if (this.ptr === null){
            throw new Error('Out of memory')
        }
        memory.copy(this.ptr , oldPtr , this.length);
        memory.free(oldPtr);
        this._capacity = size;
    }

    get(index){
        const value = memory.get(this.ptr + index)
        return value
    }
}

function main(){

    Array.SIZE_RATIO = 3;

    // Create an instance of the Array class
    let arr = new Array();

    // Add an item to the array
    arr.push(3);
    arr.push(5);
    arr.push(15);
    arr.push(19);
    arr.push(45);
    arr.push(10);

    console.log(arr);
}

main()

/*
- What is the length, capacity and memory address of your array?
Ans: Array { length: 1, _capacity: 3, ptr: 0 }

- Add the following in the main function and then print the array:
Ans: Array { length: 6, _capacity: 12, ptr: 3 }

- Exploring the pop() method. What is the length, capacity, and address of your array? 
Ans: Array { length: 3, _capacity: 12, ptr: 3 } In the last execution, a total of 6 numbers are pushed into the array. At this step the array pops 3 numbers, thus the length of array = 3 (6-3). Capacity remains at 12 because we are only cutting the array, but the memory space is still preserved and waiting for future numbers to be pushed in.

- Understanding more about how arrays work:
Empty the array and add just 1 item: arr.push("tauhida");Print this 1 item that you just added. What is the result? Can you explain your result?
Ans: Array { length: 1, _capacity: 12, ptr: 3 } . It returns undefined.

What is the purpose of the _resize() function in your Array class?
Ans: Resize is to add size to the existing length, but how we do is by looking for a chunk of contiguous and subsequent memory sequences with the new size to store the new value. Resize is doing this work by looking for a new memory address with the new size and copy the value from the old memory address to the new memory address.
*/


/*
5. URLify a string
A common mistake users make when they type in an URL is to put spaces between words or letters. A solution that developers can use to solve this problem is to replace any spaces with a %20. Write a method that takes in a string and replaces all its empty spaces with a %20. Your algorithm can only make 1 pass through the string. Examples of input and output for this problem can be

Input: tauhida parveen
Output: tauhida%20parveen
Input: www.thinkful.com /tauh ida parv een
Output: www.thinkful.com%20/tauh%20ida%20parv%20een
*/

const Urlify = function(str){
    const strArr = str.split(' ') // [tauhida, parveen]
    const strUrlified = strArr.join('%20')
    return strUrlified
}

/*
6. Filtering an array
Imagine you have an array of numbers. Write an algorithm to remove all numbers less than 5 from the array. DO NOT use Array's built-in .filter() method here; write the algorithm from scratch.
*/

const arrFilter = function(arr,n){
    //chech from the 1st number of the array, compare it to n
    const sortedArr = arr.sort((a,b) => a - b);

    //look for the number index
    const targetNumIndex = arr.indexOf(n) 

    //remove all elements with index less than the targetNumIndex
    for (let i = 0 ; i < targetNumIndex ; i++){
      arr.shift()
    }
    return arr
  }


/*
7. Max sum in the array
You are given an array containing positive and negative integers. Write an algorithm which will find the largest sum in a continuous sequence.

Input: [4, 6, -3, 5, -2, 1]
Output: 12
*/

const maxSum = function(arr){
    let maxSum = -Infinity;
  
    // left pointer
    for (let i = 0 ; i < arr.length - 1 ; i++){
      let sum = arr[i]
      //right pointer
      for (let j = i + 1 ; j < arr.length ; j++){
        sum = sum + arr[j]
        if (sum > maxSum){
          maxSum = sum
        }
      }
    }
  
    return maxSum
  }


/*
8. Merge arrays
Imagine you have 2 arrays which have already been sorted. Write an algorithm to merge the 2 arrays into a single array, which should also be sorted.

Input:[1, 3, 6, 8, 11] and [2, 3, 5, 8, 9, 10]
Output:[1, 2, 3, 3, 5, 6, 8, 8, 9, 10, 11]
*/

const mergeArr = function(arr1,arr2){
    const mergeArr = [...arr1, ...arr2];
    const sortedAnswer = mergeArr.sort( (a,b) => a-b );
    return sortedAnswer
  }
  
  testArr1 = [1, 3, 6, 8, 11] 
  testArr2 = [2, 3, 5, 8, 9, 10]
  mergeArr(testArr1, testArr2)

/*
9. Remove characters
Write an algorithm that deletes given characters from a string. For example, given a string of "Battle of the Vowels: Hawaii vs. Grozny" and the characters to be removed are "aeiou", the algorithm should transform the original string to "Bttl f th Vwls: Hw vs. Grzny". Do not use Javascript's filter, split, or join methods.

Input:'Battle of the Vowels: Hawaii vs. Grozny', 'aeiou'
Output: 'Bttl f th Vwls: Hw vs. Grzny'
*/

const removeChar = function(str,char){
    let answer = "";
  
    for(let i = 0 ; i < str.length ; i++){
      let pushOrNot = true
      for(let j = 0 ; j < char.length ; j++){
        if (str[i].toLowerCase() == char[j].toLowerCase()){
          pushOrNot = false
        }
      }
      if(pushOrNot) answer+=(str[i])
    }
  
    return answer
  }
  
  const testStr = 'Battle of the Vowels: Hawaii vs. Grozny';
  const testChar = 'aeiou';
  
  removeChar(testStr,testChar);



/*
10. Products
Given an array of numbers, write an algorithm that outputs an array where each index is the product of all the numbers in the input array except for the number at each current index. See the following example input and output.

Input:[1, 3, 9, 4]
Output:[108, 36, 12, 27]
*/

const products = function(arr){
    let ansArr = [];
    let product = 1;
    let arrCopy = [...arr]
  
    //if no 0 in the array
    if (!arr.includes(0)){
        console.log('in 1')
        for (let i = 0 ; i < arr.length ; i++){
          product = product * arr[i]
        }
  
        for (let j = 0 ; j < arr.length ; j++){
          ansArr.push(product / arr[j])
        }
        return ansArr
    }
  
    //if there are more than two 0 in the array
    if (arr.filter(num => num === 0).length >= 2){
      console.log('in 2')
        for (let k = 0 ; k < arr.length ; k++){
          ansArr.push(0)
        }
        return ansArr
    }
  
    //if there is one 0 in the array
    if (arr.filter(num => num === 0).length == 1){
  
      arrCopy = arr.filter(num => num !== 0)
  
      for (let m = 0 ; m < arrCopy.length ; m++){
        product = product * arrCopy[m]
      }
  
      for (let n = 0 ; n < arr.length ; n++){
        ansArr.push(0)
      }
  
      ansArr[arr.indexOf(0)] = product
  
      return ansArr
    }
  }
  
  const testArr = [0, 3, 0, 4]
  products(testArr)


/*
11. 2D array
Write an algorithm which searches through a 2D array, and whenever it finds a 0 should set the entire row and column to 0.

Input:
[
    [1,0,1,1,0],
    [0,1,1,1,0],
    [1,1,1,1,1],
    [1,0,1,1,1],
    [1,1,1,1,1]
];

Output:
[
    [0,0,0,0,0],
    [0,0,0,0,0],
    [0,0,1,1,0],
    [0,0,0,0,0],
    [0,0,1,1,0]
];

*/

/*
12. String rotation
Given 2 strings, str1 and str2, write a program that checks if str2 is a rotation of str1.

Input: amazon, azonma

Output: False

Input: amazon, azonam

Output: true

*/


const ifRotation = function(str1,str2){

    if (str1.length !== str2.length){
      return false
    }
    
    const text = str2 + str2
    
    if (text.indexOf(str1) == -1){
      return false
    } else {
      return true
    }
    
    }
    
    const testStr1 = 'amazon'
    const testStr2 = 'onamaz'
    
    ifRotation(testStr1 , testStr2)

