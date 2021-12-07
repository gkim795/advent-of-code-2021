const fs = require('fs')
const inputAsArray = fs.readFileSync('./input.txt', null).toString().split('\n')

const partOne = (input) => {
  input
}

const partTwo = (input) => {
  input
}

const main = () => {
  const input = inputAsArray
  return {
    partOne: partOne(input),
    partTwo: partTwo(input),
  }
}

console.log(main())
