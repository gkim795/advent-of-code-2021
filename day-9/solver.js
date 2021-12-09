const fs = require('fs')
const testAsArray = fs
  .readFileSync('./test.txt', null)
  .toString()
  .split('\n')
  .map((v) => {
    let stringVersion = String(v)
      .split('')
      .map((i) => Number(i))
    return stringVersion
  })

const secondTestAsArray = fs
  .readFileSync('./test.txt', null)
  .toString()
  .split('\n')
  .map((v) => {
    return String(v)
      .split('')
      .map((i) => {
        return { val: Number(i), seen: false }
      })
  })

const inputAsArray = fs
  .readFileSync('./input.txt', null)
  .toString()
  .split('\n')
  .map((v) => {
    let stringVersion = String(v)
      .split('')
      .map((i) => Number(i))
    return stringVersion
  })

const secondInputAsArray = fs
  .readFileSync('./input.txt', null)
  .toString()
  .split('\n')
  .map((v) => {
    return String(v)
      .split('')
      .map((i) => {
        return { val: Number(i), seen: false }
      })
  })
/**
 * 9 highest | 0 lowest
 *
 * find the 'low' points -> lower than the ones up,down,left,right of it
 */

const partOne = (input) => {
  let lowPoints = 0
  let count = 0

  let col = input[0].length
  let row = input.length

  for (let r = 0; r < row; r++) {
    for (let c = 0; c < col; c++) {
      let current = Number(input[r][c])

      let up = r - 1 < 0 ? Infinity : Number(input[r - 1][c])
      let down = r + 1 === row ? Infinity : Number(input[r + 1][c])
      let left = c - 1 < 0 ? Infinity : Number(input[r][c - 1])
      let right = c + 1 === col ? Infinity : Number(input[r][c + 1])

      if (current < up && current < down && current < left && current < right) {
        count += 1
        lowPoints += current
      }
    }
  }

  return lowPoints + count
}

/**
 *
 * input: int[];
 * output: int; (product of three largest)
 *
 * goal: find basins: all location that eventually flow downward to a single low point. every low point has a basin - but some basins are very small. Locations of height 9 do not count as being IN a basin and all other locations are always a part of ONE basin.
 *
 * 1. Find a low point
 * 2. Extend outwards - if the points only belong to ONE basin we could mark that string/place as Infinity
 *    SO that other basins don't try to get confused or so that we know it as 'seen'
 * 3. If outwards can't extend past left,up,right,down, then check against the top three values;
 * 4. Return top three.
 *
 */
const partTwo = (input) => {
  let [maxRow, maxCol] = [input.length, input[0].length]

  const getUp = (row, col) =>
    row - 1 < 0 ? Infinity : input[row - 1][col]['val']
  const getDown = (row, col) =>
    row + 1 === maxRow ? Infinity : input[row + 1][col]['val']
  const getLeft = (row, col) =>
    col - 1 < 0 ? Infinity : input[row][col - 1]['val']
  const getRight = (row, col) =>
    col + 1 === maxCol ? Infinity : input[row][col + 1]['val']

  const getUp2 = (row, col) =>
    row - 1 < 0 ? undefined : input[row - 1][col]['val']
  const getDown2 = (row, col) =>
    row + 1 === maxRow ? undefined : input[row + 1][col]['val']
  const getLeft2 = (row, col) =>
    col - 1 < 0 ? undefined : input[row][col - 1]['val']
  const getRight2 = (row, col) =>
    col + 1 === maxCol ? undefined : input[row][col + 1]['val']

  const isLowPoint = (row, col) => {
    let current = input[row][col]['val']

    let up = getUp(row, col)
    let down = getDown(row, col)
    let left = getLeft(row, col)
    let right = getRight(row, col)

    return current < up && current < down && current < left && current < right
  }

  let getNextDoorPoints = (row, col) => {
    let up = getUp2(row, col)
    let down = getDown2(row, col)
    let left = getLeft2(row, col)
    let right = getRight2(row, col)

    return [up, down, left, right]
  }

  const findBasin = (row, col, seen) => {
    let size = 1

    let nextDoorPoints = getNextDoorPoints(row, col)

    let coordinates = {
      0: { row: row - 1, col: col }, // up
      1: { row: row + 1, col: col }, // down
      2: { row: row, col: col - 1 }, // left
      3: { row: row, col: col + 1 }, // right
    }

    for (let i = 0; i < nextDoorPoints.length; i++) {
      let current = nextDoorPoints[i]
      let coordinate = coordinates[i]
      let seenString = `row: ${coordinate.row} & col: ${coordinate.col}`

      if (current === undefined || seen.has(seenString)) continue

      seen.add(`row: ${coordinate.row} & col: ${coordinate.col}`)

      if (current === 9) {
        continue
      } else {
        size += findBasin(coordinate.row, coordinate.col, seen)
      }
    }
    return size
  }

  let listOfLowPoints = []

  for (let row = 0; row < maxRow; row++) {
    for (let col = 0; col < maxCol; col++) {
      let lowPoint = isLowPoint(row, col)

      if (lowPoint) {
        listOfLowPoints.push([row, col])
      }
    }
  }

  const basinSizes = []

  for (let i = 0; i < listOfLowPoints.length; i++) {
    let [row, col] = listOfLowPoints[i]
    let seenString = `row: ${row} & col: ${col}`
    let basinSize = findBasin(row, col, new Set(seenString))

    basinSizes.push(basinSize - 1)
  }

  basinSizes.sort((a, b) => b - a)
  return basinSizes[0] * basinSizes[1] * basinSizes[2]
}

const main = () => {
  const input = inputAsArray

  return {
    tests: {
      partOne: partOne(testAsArray),
      partTwo: partTwo(secondTestAsArray),
    },
    partOne: partOne(input),
    partTwo: partTwo(secondInputAsArray),
  }
}

console.log(main())
