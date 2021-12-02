const fs = require("fs")

const inputAsArray = fs.readFileSync("./input.txt", null).toString().split("\n");

let ans = 0;
let prev = Number(inputAsArray[0]) 

for (let i = 1; i < inputAsArray.length; i++) {
  const current = Number(inputAsArray[i]);
  if(current > prev) {
    ans++;
  }
  prev = current;
}

// need to keep track of three items

let ans2 = 0;
let itemsToSum = [Number(inputAsArray[0]), Number(inputAsArray[1]), Number(inputAsArray[2])]
let prevSum = itemsToSum[0] + itemsToSum[1] + itemsToSum[2]

let no = "one"

for (let i = 3; i < inputAsArray.length ; i++ )  {
  const current = Number(inputAsArray[i]);
  let prevFirst = Number(inputAsArray[i-3]);

  const currentSum = prevSum - prevFirst + current;

  if(currentSum > prevSum){
    ans2++;
  }
  prevSum = currentSum;
}

console.log({ans2})