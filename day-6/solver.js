const fs = require('fs')
const inputAsArray = fs.readFileSync('./input.txt', null).toString().split(',').map(v => Number(v)) 

const testInputAsArray = fs.readFileSync('./test.txt', null).toString().split(',').map(v => Number(v)) 

const partOne = (input) => {
  let birthRule = [...input];
  let count = 80;
 
  while(count > 0) {
    let children = []

    for(let i = 0; i < birthRule.length; i++) {
      birthRule[i] = birthRule[i] - 1;
      if(birthRule[i] < 0) {
        birthRule[i] = 6;
        children.push(8)
      }
    }

    birthRule.push(...children)
    count--;
  }

  return birthRule.length
}

const partTwo = (input) => {
  // first figure out how many fish are ready 
  let daysOfFish = new Array(8).fill(0); // 8 max days

  input.forEach(day => {
    daysOfFish[day] = daysOfFish[day] + 1;
  })

  console.log(daysOfFish)

  // ages
  // after day 0 is done we don't need this data - shift
  // ready to give birth Fish are the ones at index 0 and what's currently on day 6 vs 8 ??
  // [0, 1, 2, 3, 4, 5, 6,7,8, -> -> ]

  for (let day = 0; day < 256; day++) {
   
    let babiesBorn = daysOfFish.shift() || 0;

    daysOfFish[6] = (daysOfFish[6] || 0 )+ Number(babiesBorn);
    daysOfFish[8] = (daysOfFish[8] ||0 ) + Number(babiesBorn);
  }

  let sumOfFish = 0;

  daysOfFish.forEach(fish => sumOfFish+=fish);

  return sumOfFish
}

const main = () => {
  const input = inputAsArray;

  const testInput = testInputAsArray;

  return {
    example: {
      //partOne: (partOne(testInput) === 5934),
      partTwo: (partTwo(testInput) === 26984457539)
    },
   // partOne: partOne(input),
   partTwo: partTwo(input),
  }
}

console.log(main())

/**
 * fish: number that represents the number of days until it creates a new lanternfish
 *      - new fish would need slightly longer before its capable of producing more lanternfish (2 more days for its first cycle)
 * 
 * values: internalTimer/ at the start of the day what value is this
 *          babies created
 * 
 * 80 days
 * 
 * note: internalTimer must result to 0 before resetting
 */
