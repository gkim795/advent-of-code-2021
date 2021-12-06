const fs = require('fs')
const inputAsArray = fs.readFileSync('./input.txt', null).toString().split('\n')

const partOne = (maxRow, maxCol, input) => {
  // input -> [start, end]
  // start -> [y, x]

  let matrix = new Array(maxRow)

  for (let row = 0; row <= maxRow; row++) {
    matrix[row] = new Array(maxCol + 1)
    matrix[row].fill('.')
  }

  let found = new Set()

  const markLines = (direction, common, point1, point2) => {
    for (let i = point1; i <= point2; i++) {
      let row = direction === 'horizontal' ? common : i
      let col = direction === 'horizontal' ? i : common

      if (matrix[row][col] === '.') {
        matrix[row][col] = 1
      } else {
        found.add(`row: ${row} & col: ${col}`)
        matrix[row][col]++
      }
    }
  }

  for (let i = 0; i < input.length; i++) {
    let [[row1, col1], [row2, col2]] = input[i]

    let isHorizontal = row1 === row2
    let isVertical = col1 === col2

    if (!isHorizontal && !isVertical) {
      continue
    }

    let direction = row1 === row2 ? 'horizontal' : 'vertical'

    let [minRow, maxRow] = [Math.min(row1, row2), Math.max(row1, row2)]
    let [minCol, maxCol] = [Math.min(col1, col2), Math.max(col1, col2)]

    if (direction === 'horizontal') {
      markLines('horizontal', row1, minCol, maxCol)
    }
    if (direction === 'vertical') {
      markLines('vertical', col1, minRow, maxRow)
    }
  }
  return found.size
}

const partTwo = (maxRow, maxCol, input) => {
  let matrix = new Array(maxRow)

  for (let row = 0; row <= maxRow; row++) {
    matrix[row] = new Array(maxCol + 1)
    matrix[row].fill('.')
  }

  let found = new Set()

  const markLines = (direction, common, point1, point2) => {
    for (let i = point1; i <= point2; i++) {
      let row = direction === 'horizontal' ? common : i
      let col = direction === 'horizontal' ? i : common

      if (matrix[row][col] === '.') {
        matrix[row][col] = 1
      } else {
        found.add(`row: ${row} & col: ${col}`)
        matrix[row][col]++
      }
    }
  }

  const markLinesDiagonal = (row1, row2, col1, col2) => {
    let row = row1
    let col = col1

    let rowDirection = row1 < row2 ? 'down' : 'up'
    let colDirection = col1 < col2 ? 'right' : 'left'

    while (
      row >= Math.min(row1, row2) &&
      row <= Math.max(row1, row2) &&
      col >= Math.min(col1, col2) &&
      col <= Math.max(col1, col2)
    ) {
      if (matrix[row][col] === '.') {
        matrix[row][col] = 1
      } else {
        found.add(`row: ${row} & col: ${col}`)
        matrix[row][col]++
      }

      if (rowDirection === 'up') {
        row -= 1
      } else {
        row += 1
      }

      if (colDirection === 'left') {
        col -= 1
      } else {
        col += 1
      }
    }
  }

  for (let i = 0; i < input.length; i++) {
    let [[row1, col1], [row2, col2]] = input[i]

    let isHorizontal = row1 === row2
    let isVertical = col1 === col2

    let direction = isHorizontal
      ? 'horizontal'
      : isVertical
      ? 'vertical'
      : 'diagonal'

    let [minRow, maxRow] = [Math.min(row1, row2), Math.max(row1, row2)]
    let [minCol, maxCol] = [Math.min(col1, col2), Math.max(col1, col2)]

    if (direction === 'diagonal') {
      markLinesDiagonal(row1, row2, col1, col2)
    } else if (direction === 'horizontal') {
      markLines('horizontal', row1, minCol, maxCol)
    } else if (direction === 'vertical') {
      markLines('vertical', col1, minRow, maxRow)
    }
  }

  return found.size
}

const main = () => {
  let maxRow = 0
  let maxCol = 0
  const input = inputAsArray.map((v) => {
    let [start, end] = v.split(' -> ')
    start = start.split(',')
    end = end.split(',')

    start[0] = Number(start[0])
    start[1] = Number(start[1])

    end[0] = Number(end[0])
    end[1] = Number(end[1])

    maxRow = Math.max(maxRow, start[1], end[1])
    maxCol = Math.max(maxCol, start[0], end[0])

    return [
      [start[1], start[0]],
      [end[1], end[0]],
    ]
  })

  return {
    partOne: partOne(maxRow, maxCol, input),
    partTwo: partTwo(maxRow, maxCol, input),
  }
}

console.log(main())

/**
 * coordinates: x1,y1 -> x2,y2
 * x1,y1 -> coordinate sof one end the line segment
 * x2,y2 -> coordinates of the other ends
 * line segment includes the points in between
 * ex. 1,1 -> 1,3 -> [1,1; 1,2; 1,3]
 * ex. 9,7 -> 7,7 -> [9,7;8,7;7,7]
 *  y -> ROW
 *  x -> COL
 * only consider horizontal and vertical lines
 *
 * goal: determine number of points where at least TWO lines overlap -> anywhere with point 2 & +
 *
 * 1. what's the max y and max x
 * 2. create the matrix
 * 3. have helper function that marks the coordinates
 */
