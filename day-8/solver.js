const fs = require('fs')
const inputAsArray = fs.readFileSync('./input.txt', null).toString().split('\n')

const returnUniqueLetters = (letters) => {
  let unique = new Set()

  for (let i = 0; i < letters.length; i++) {
    if (letters[i] !== ' ') {
      unique.add(letters[i])
    }
  }

  return unique.size
}

const partOne = (input) => {
  // unique counter
  const uniqueLetters = {
    2: 1,
    4: 4,
    3: 7,
    7: 8,
  }

  let count = 0

  for (let i = 0; i < input.length; i++) {
    let [signalPatterns, outputValue] = input[i].split(' | ')

    let words = outputValue.split(' ')

    for (let i = 0; i < words.length; i++) {
      let sum = returnUniqueLetters(words[i])

      if (uniqueLetters[sum]) {
        count += 1
      }
    }
  }
  return count
}

const partTwo = (input) => {
  let sumOfOutputValues = 0

  const countToNumber = {
    6: [0, 6, 9],
    2: 1,
    5: [2, 3, 5],
    4: 4,
    3: 7,
    7: 8,
  }
  const contains = (word, container) => {
    for (let i = 0; i < word.length; i++) {
      if (!container.includes(word[i])) {
        return false
      }
    }

    return true
  }

  const decipherRound1 = (stringToDecipher) => {
    let count = new Set()

    for (let i = 0; i < stringToDecipher.length; i++) {
      count.add(stringToDecipher[i])
    }

    return countToNumber[count.size]
  }

  // iterate through the input
  for (let i = 0; i < input.length; i++) {
    let unknown = {}
    let known = {}
    let knownV2 = {}

    const { uniqueSignalPatters, fourDigitOutputValue } = input[i]
    let words = uniqueSignalPatters.split(' ')
    let secondHalf = fourDigitOutputValue.split(' ')

    for (let word = 0; word < words.length; word++) {
      let valueOfPossibilities = decipherRound1(words[word])

      if (Array.isArray(valueOfPossibilities)) {
        unknown[words[word]] = valueOfPossibilities
      } else {
        known[words[word]] = valueOfPossibilities
        knownV2[valueOfPossibilities] = words[word]
      }
    }

    for (let word = 0; word < secondHalf.length; word++) {
      let valueOfPossibilities = decipherRound1(words[word])

      if (Array.isArray(valueOfPossibilities)) {
        unknown[words[word]] = valueOfPossibilities
      } else {
        known[words[word]] = valueOfPossibilities
        knownV2[valueOfPossibilities] = words[word]
      }
    }

    // iterate round 2 - find the word based on what we know!

    let listOfUnknown = Object.keys(unknown)

    for (let i = 0; i < listOfUnknown.length; i++) {
      let current = listOfUnknown[i] // cagedb
      let valueOfPossibilities = unknown[current] // [0,6,9]

      let one = knownV2[1]
      let four = knownV2[4]
      let seven = knownV2[7]

      if (valueOfPossibilities.includes(0)) {
        if (contains(four, current)) {
          // we know its 9 if it includes a four
          known[current] = 9
          knownV2[9] = current
          delete unknown[current]
        } else if (contains(one, current) && contains(seven, current)) {
          // we know its 0 if it includes a  1 & 7
          known[current] = 0
          knownV2[0] = current
          delete unknown[current]
        } else {
          known[current] = 6
          knownV2[6] = current
          delete unknown[current]
        }
      } else if (valueOfPossibilities.includes(2)) {
        // [2, 3, 5]
        if (contains(seven, current)) {
          known[current] = 3
          knownV2[3] = current
          delete unknown[current]
        }
      }
    }

    let secondVersionUnknown = Object.keys(unknown)
    for (let i = 0; i < 2; i++) {
      let current = secondVersionUnknown[i]
      if (contains(current, knownV2[9])) {
        known[current] = 5
        knownV2[5] = current
        delete unknown[current]
      } else {
        known[current] = 2
        knownV2[2] = current
        delete unknown[current]
      }
    }

    let listOfNum = []
    for (let word = 0; word < secondHalf.length; word++) {
      let current = secondHalf[word]
      let length = current.length
      // check by length

      let contains0 = contains(knownV2[0], current)
      let contains1 = contains(knownV2[1], current)
      let contains2 = contains(knownV2[2], current)
      let contains3 = contains(knownV2[3], current)
      let contains4 = contains(knownV2[4], current)
      let contains5 = contains(knownV2[5], current)
      let contains6 = contains(knownV2[6], current)
      let contains7 = contains(knownV2[7], current)
      let contains8 = contains(knownV2[8], current)
      let contains9 = contains(knownV2[9], current)

      if (length === 6) {
        // [either: 9, 6, 5]
        if (contains9) {
          listOfNum.push(9)
        } else if (contains0) {
          listOfNum.push(0)
        } else if (contains6) {
          listOfNum.push(6)
        }
      } else if (length === 5) {
        // [either: 2, 3, 6]
        if (contains2) {
          listOfNum.push(2)
        } else if (contains3) {
          listOfNum.push(3)
        } else if (contains5) {
          listOfNum.push(5)
        }
      } else {
        if (contains8) {
          listOfNum.push(8)
        } else if (contains4) {
          listOfNum.push(4)
        } else if (contains7) {
          listOfNum.push(7)
        } else if (contains1) {
          listOfNum.push(1)
        }
      }
    }

    sumOfOutputValues += Number(listOfNum.join(''))
    // use the initial plan to decipher what we can
    console.log(secondHalf, Number(listOfNum.join('')))
  }

  return sumOfOutputValues
}

const main = () => {
  const input = inputAsArray.map((v) => {
    let [uniqueSignalPatters, fourDigitOutputValue] = v.split(' | ')
    return {
      uniqueSignalPatters,
      fourDigitOutputValue,
    }
  })
  return {
    partOne: partOne(inputAsArray),
    partTwo: partTwo(input),
  }
}

console.log(main())

/**
 * 4 digit -> 7 segment displays are malfunctioning
 * each digit is rendered by turning on or off the segments from a - g
 *
 *
 * c & f are on - 1 uses c & f
 * b & g are turned on too
 *
 * 10 unique signal patterns
 * and you write a single four digit output value (puzzl einput)
 *
 * using signla digits you find what pattern to what digit
 *
 *
 * [ten unique signal patterns] | [four digit output value]
 *
 * -- only care about the output  (after | )
 * try to find the 1, 4, 7 ,8
 *
 * 1:
 * 4:
 * 7:
 * 8:
 *
 * count unique:
 */
