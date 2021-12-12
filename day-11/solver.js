const { readFileSync } = require('fs')
const inputData = readFileSync('./input.txt', null)
  .toString()
  .split('\n')
  .map((v) => {
    return v.split('').map((n) => Number(n))
  })
const testData = readFileSync('./test.txt', null)
  .toString()
  .split('\n')
  .map((v) => {
    return v.split('').map((n) => Number(n))
  })

/**
 *
 * 10x10 matrix
 * energy level ranges from 0 - 9
 *
 * Flash Light Step:
 * 1. energy level of each octopus raises by 1
 * 2. octopus with energy level > 9 flashes
 *  2B. nearby octopus increases by one PLUS the diagonally one
 *  2C. if any of those are greater than 9 - it also flashes
 *  2D. An octopus can only flash at most ONCE per step
 * 3. If the octopus flashed, the energy goes back to 0
 */

const partOne = (input) => {
  const inputMaxRow = input.length - 1
  const inputMaxCol = input[0].length - 1

  const getNeighbors = (row, col) => {
    return [
      row !== 0 && [row - 1, col],
      row !== inputMaxRow && [row + 1, col],
      col !== 0 && [row, col - 1],
      col !== inputMaxCol && [row, col + 1],

      row !== 0 && col !== 0 && [row - 1, col - 1],
      row !== 0 && col !== inputMaxCol && [row - 1, col + 1],
      row !== inputMaxRow && col !== 0 && [row + 1, col - 1],
      row !== inputMaxRow && col !== inputMaxCol && [row + 1, col + 1],
    ].filter((v) => v)
  }

  let flashCount = 0
  let total = (inputMaxRow + 1) * (inputMaxCol + 1)

  // actual steps running
  for (let i = 0; i < 10000; i++) {
    let flashed = new Set() // row: ${} col: ${};

    const flash = (row, col) => {
      if (flashed.has(`row: ${row} col: ${col}`)) return

      flashed.add(`row: ${row} col: ${col}`)
      flashCount += 1

      let neighbors = getNeighbors(row, col)

      for (let n = 0; n < neighbors.length; n++) {
        let [neighborRow, neighborCol] = neighbors[n]
        input[neighborRow][neighborCol]++
        if (input[neighborRow][neighborCol] > 9) {
          flash(neighborRow, neighborCol)
        }
      }
    }

    for (let row = 0; row < input.length; row++) {
      for (let col = 0; col < input[0].length; col++) {
        input[row][col]++
      }
    }

    for (let row = 0; row < input.length; row++) {
      for (let col = 0; col < input[0].length; col++) {
        if (input[row][col] > 9) {
          flash(row, col)
        }
      }
    }

    let zeroCounts = 0

    for (let row = 0; row < input.length; row++) {
      for (let col = 0; col < input[0].length; col++) {
        if (input[row][col] > 9) {
          input[row][col] = 0
          zeroCounts++
        }
      }
    }

    if (zeroCounts === total) {
      console.log('step: ', i)
      return
    }
  }
}

const partTwo = (input) => {
  input
}

const main = () => {
  return {
    partOne: partOne(inputData),
  }
}

console.log(main())
