const fs = require('fs')
const inputAsArray = fs.readFileSync('./input.txt', null).toString().split(',').map(v => Number(v))
const testAsArray = fs.readFileSync('./test.txt', null).toString().split(',').map(v => Number(v))

/**
 * 
 * crab submarines only go horizontal
 * 
 * input: int[]
 * output: int;
 * 
 * goal: find a way to make horizontal positions the same w/ smallest waste 
 * 
 * input: int[] - 16, 1, 2..
 * crab horizontal position 16..another at 1...
 * 
 * 2 is the least friction because
 * 
 * 
 * for (let i = 0; i < int.length; i++) {
 *  let distance = int[i] - 2 
 * }
 */

const partOne = (input) => {
  let sorted = [...input].sort((a, b) => a - b)
  let middle = Math.floor(sorted.length /2)
  let oddAns = sorted[middle];
  let evenAns = ((sorted[middle] + sorted[middle - 1])/2)
  

  let trueMedian = middle % 2 === 0 ? evenAns : oddAns;

  return sorted.reduce((a, b) => {return a + Math.abs(trueMedian - b)}, 0)

}

/**
 * 
 * 16 -> 5 === 66 
 * - 16 - 5 = 11 * 6(?)
 *  --------------------
 * 1 + 2 + 3 + 4 + ... 11
 * -----------------------
 */

const sumOfIntegers = (start, end) => {
  let sum = 0;
  let distance = end - start;

  for (let i = 1; i <= distance; i++) {
    sum += i
  }

  return sum
}

const partTwo = (input) => {
  let [minDistance, minValue] = [Infinity, -1];

  let max = Math.max(...input)
 

  let sum = input.reduce((a, b) => {return a + b}, 0)
  let avg = Math.ceil(sum / input.length)
  
  let ans =  input.reduce((a, b) => {
    let sum = sumOfIntegers(Math.min(b, avg), Math.max(b, avg))
    return sum + a
  }, 0)
  console.log({ans, avg})

  return ans
}

const main = () => {
  const input = inputAsArray;


  return {
    test: {
      partOne: (partOne(testAsArray) === 37 ),
      partTwo: (partTwo(testAsArray) === 168)
    },
    partOne: partOne(input),
   partTwo: partTwo(input),
  }
}

console.log(main())
