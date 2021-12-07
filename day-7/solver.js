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
  let [minDistance, minValue] = [Infinity, -1];

  for (let i = 0; i < input.length; i++) {
    let current = input[i];
    let currentDistanceSum = 0;
    for (let m = 0; m < input.length; m++) {
      currentDistanceSum += Math.abs(input[m] - current)
    }

    if(currentDistanceSum < minDistance) {
      minValue = current;
      minDistance = currentDistanceSum;
    }

  }

  return minDistance
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
  let min = Math.min(...input)

  for (let i = min; i <= max; i++) {
    let currentDistanceSum = 0;
    for (let m = 0; m < input.length; m++) {
      let start = Math.min(input[m], i);
      let end = Math.max(input[m], i);

      let sum = sumOfIntegers(start, end)


      currentDistanceSum += sum
    }

    if(currentDistanceSum < minDistance) {
      minValue = i;
      minDistance = currentDistanceSum;
    }

  }

 

  return minDistance
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
