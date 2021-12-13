const { readFileSync } = require('fs')
const inputData = readFileSync('./input.txt', null).toString().split('\n')
const testData = readFileSync('./test.txt', null).toString().split('\n')

/*
(x,y) => (col, row)

(row, col)


fold bottom half UP 
fold vertical line LEFT

*/
const partOne = ({ colsToFold, rowsToFold, folds, matrix }) => {
  let minRow = matrix.length
  let minCol = matrix[0].length

  const foldRow = (rowToFold) => {
    // first fold UP
    let a = rowToFold - 1
    let b = rowToFold + 1

    minRow = Math.min(minRow, rowToFold)
    while (a >= 0 && b <= matrix.length - 1) {
      for (let i = 0; i < matrix[0].length; i++) {
        let current = matrix[a][i]
        let temp = matrix[b][i]

        if (current === '#' || temp === '#') {
          matrix[a][i] = '#'
        }

        matrix[b][i] = '.'
      }
      a--
      b++
    }
  }

  for (let i = 0; i < rowsToFold.length; i++) {
    foldRow(rowsToFold[i])
  }

  const foldCol = (colToFold) => {
    // first TO LEFT
    let aCol = colToFold - 1
    let bCol = colToFold + 1

    minCol = Math.min(minCol, colToFold)

    while (aCol >= 0 && bCol <= matrix[0].length - 1) {
      for (let i = 0; i < matrix.length; i++) {
        let current = matrix[i][aCol]
        let temp = matrix[i][bCol]

        if (current === '#' || temp === '#') {
          matrix[i][aCol] = '#'
        }

        matrix[i][bCol] = '.'
      }
      aCol--
      bCol++
    }
  }

  for (let i = 0; i < colsToFold.length; i++) {
    foldCol(colsToFold[i])
  }

  // for (let i = 0; i < 1; i++) {
  //   let fold = folds[i][0]

  //   if (fold['col'] !== undefined) {
  //     foldCol(fold['col'])
  //   } else {
  //     let val = fold['row']
  //     foldRow(val)
  //   }
  // }

  let compareMatrix = []
  let sum = 0
  let dots = 0
  for (let i = 0; i < minRow; i++) {
    let newRow = []
    for (let c = 0; c < minCol; c++) {
      if (matrix[i][c] === '#') {
        newRow[c] = '#'
        sum++
      } else {
        newRow[c] = '.'
      }
    }
    compareMatrix.push(newRow)
  }

  for (let i = 0; i < compareMatrix.length; i++) {
    for (let c = 0; c < compareMatrix[0].length; c++) {
      if (compareMatrix[i][c] === '.') {
        dots++
      }
    }
  }

  for (let i = 0; i < compareMatrix.length; i++) {
    let row = compareMatrix[i]
    console.log(JSON.stringify(row))
  }
  //PGHZBFJC

  return sum
}

const partTwo = (input) => {
  input
}

const main = () => {
  const parser = (input) => {
    let foldOrder = { row: [], col: [] }
    let folds = []

    let coordinates = []
    let maxRow = 0
    let maxCol = 0

    for (let i = 0; i < input.length; i++) {
      if (input[i].includes('fold along x=')) {
        let val = Number(input[i].split('=')[1])
        folds.push([{ col: val }])
        foldOrder.col.push(val)
        continue
      }
      if (input[i].includes('fold along y=')) {
        let val = Number(input[i].split('=')[1])
        folds.push([{ row: val }])
        foldOrder.row.push(val)
        continue
      }

      if (input[i].length === 0) continue
      let [col, row] = input[i].split(',')
      maxRow = Math.max(row, maxRow)
      maxCol = Math.max(col, maxCol)
      coordinates.push([Number(row), Number(col)])
    }

    let matrix = new Array(maxRow + 1)

    for (let i = 0; i < matrix.length; i++) {
      let col = new Array(maxCol + 1).fill('.')
      matrix[i] = col
    }

    for (let i = 0; i < coordinates.length; i++) {
      let [row, col] = coordinates[i]

      matrix[row][col] = '#'
    }

    return {
      colsToFold: foldOrder.col,
      rowsToFold: foldOrder.row,
      folds,
      matrix,
    }
  }

  let parsedTestData = parser(testData)
  let parsedInputData = parser(inputData)
  return {
    partOne: {
      // sample: [partOne(parsedTestData), 17],
      input: partOne(parsedInputData),
    },
    // partTwo: { sample: [partTwo(testData), 0], input: partTwo(inputData) },
  }
}

console.log(main())
