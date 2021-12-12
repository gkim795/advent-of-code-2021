const { readFileSync } = require('fs')
const inputData = readFileSync('./input.txt', null).toString().split('\n')
const testData = readFileSync('./test.txt', null).toString().split('\n')

const partOne = (input) => {
  input
}

const partTwo = (input) => {
  input
}

const main = () => {
  return {
    partOne: { sample: [partOne(testData), 0], input: partOne(inputData) },
    partTwo: { sample: [partTwo(testData), 0], input: partTwo(inputData) },
  }
}

console.log(main())
