const { readFileSync } = require('fs')
const inputData = readFileSync('./input.txt', null).toString().split('\n')
const testData = readFileSync('./test.txt', null).toString().split('\n')

const partOne = (template, pairInsertionRules) => {
  let path = template
  let rulesForPair = new Set(Object.keys(pairInsertionRules))

  const checkString = (string) => {
    let newString = []
    for (let i = 0; i < string.length; i++) {
      let subString = string.slice(i, i + 2)
      newString.push(string[i])
      if (rulesForPair.has(subString)) {
        newString.push(pairInsertionRules[subString])
      }
    }

    return newString.join('')
  }

  for (let i = 0; i < 40; i++) {
    let getNewString = checkString(path)
    path = getNewString
  }

  let count = {}
  let maxCount = 0

  for (let i = 0; i < path.length; i++) {
    count[path[i]] = count[path[i]] || 0
    count[path[i]]++

    maxCount = Math.max(count[path[i]], maxCount)
  }

  let minCount = count[path[0]]

  for (let path in count) {
    minCount = Math.min(minCount, count[path])
  }

  
  return maxCount - minCount
}

const partTwo = (template, rules) => {
  let frequency = {}

  for (let i = 0; i < template.length - 1; i++) {
    let subString = template.substring(i, i + 2);
    frequency[subString] = frequency[subString] || 0;
    frequency[subString]++;
  }


  const replace = () => {
    let newFrequency = Object.assign({}, frequency);
    for (let pair in frequency) {

      for (let key in rules) {
        let start = key;
        let end = rules[key]


        if(pair === start) {
 
          let occurrences = frequency[pair];
          newFrequency[pair] -= occurrences;

          let beg = pair[0]+end;
          let ending = end + pair[1];

          newFrequency[beg] = newFrequency[beg] || 0;
          newFrequency[ending] = newFrequency[ending] || 0
          newFrequency[beg] += occurrences;
          newFrequency[ending] += occurrences;

          break
        }
      }
    } 
    return newFrequency
  }

  for (let i = 0; i < 40; i ++) {
     frequency = replace()
  }


  
 let counter = {};

  for (let pair in frequency) {
    counter[pair[0]] = counter[pair[0]] || 0;
    counter[pair[1]] = counter[pair[1]] || 0

    counter[pair[0]] += frequency[pair];
    counter[pair[1]] += frequency[pair]
  }


  let max = -Infinity;
  let min = Infinity;

  for (let pair in counter) {
    counter[pair] = Math.floor(counter[pair] / 2);
    max = Math.max(counter[pair], max);
    min = Math.min(counter[pair], min)
  }


  console.log({max, min, counter})

  return max - min
}

const main = () => {
  const parser = (input) => {
    let template = input[0]
    let pairInsertionRules = {}

    for (let i = 2; i < input.length; i++) {
      let [pair, insert] = input[i].split(' -> ')
      pairInsertionRules[pair] = insert
    }

    return { template, pairInsertionRules }
  }

  const parsedTestData = parser(testData)
  const parsedInputData = parser(inputData)
  return {
    // partOne: {
    //   sample: [
    //     partOne(parsedTestData.template, parsedTestData.pairInsertionRules),
    //     1588,
    //   ],
    //   input: partOne(
    //     parsedInputData.template,
    //     parsedInputData.pairInsertionRules
    //   ),
    // },
    partTwo: { sample: [partTwo(parsedInputData.template, parsedInputData.pairInsertionRules), 0] },
  }
}

console.log(main())
