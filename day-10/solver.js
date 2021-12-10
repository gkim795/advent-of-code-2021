const { readFileSync } = require('fs')
const inputData = readFileSync('./input.txt', null).toString().split('\n')
const testData = readFileSync('./test.txt', null).toString().split('\n')

/**
 * example chunks include: 
 * (]
 * {()()()>
 * ((()))}
 * <([]){()}[{}])
 * 
 * corrupted line is when a chunk closes with the wrong character
 * (), {}, [], <>, 
 * 
 * these chunks may cause a line to be considered corrupted
 *
 * ): 3 points
 * ]: 57 points
 * }: 1197 points
 * >: 25137 points
 */

 const counter = {
  ")": "(",
  "}": "{",
  "]": "[",
  ">": "<"
}

const value = {
  ")": 3,
  "]": 57,
  "}": 1197,
  ">": 25137
}

let openSet = new Set(["(", "{", "<", "["]);

const partOne = (input, findIncomplete) => {
  let sum = 0;
  let incomplete = []
  const scanForBroken = (row) => {
    let open = [];

    for (let i = 0; i < row.length; i++) {
      let char = row[i];

      if(openSet.has(char)) {
        open.push(char)
        continue;
      }

      let lastChar = open.pop();

      if(counter[char] !== lastChar) {
        sum += value[char]
        return true;
      }
    }

    if(open.length !== 0) {
      return open
    }
    return true
  }

  for (let i = 0; i < input.length; i++) {
    const isBroken = scanForBroken(input[i])

    if (Array.isArray(isBroken)) {
      incomplete.push(isBroken)
    }
  }

  if(findIncomplete) return incomplete;

  return sum
}

const partTwo = (input) => {
  const incomplete = partOne(input, true)

  let sum = [];
  
  let points = {"(": 1, "[":2 ,"{": 3,"<": 4 }

  for (let i = 0; i < incomplete.length; i++) {
    let currentSum = 0;
    for (let m = incomplete[i].length -1 ; m >= 0; m--) {
      currentSum *=5;
      let findPoint = points[incomplete[i][m]];

      if(findPoint) {
        currentSum += findPoint
      }
    }
    sum.push(currentSum)
  }

  sum.sort((a, b)=> a- b)
  let halfPoint = Math.floor(incomplete.length/2)
  return sum[halfPoint]
}

const main = () => {
  return {
    partOne: { sample: partOne(testData) === 26397, input: partOne(inputData) },
    partTwo: { sample: partTwo(testData) === 288957, input: partTwo(inputData) },
  
  }
}

console.log(main())
