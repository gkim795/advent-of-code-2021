const fs = require("fs");

const inputAsArray = fs
  .readFileSync("./input.txt", null)
  .toString()
  .split("\n");

let horizontal = 0;
let depth = 0;

const moveForward = (steps) => {
  horizontal += steps;
};

const moveDown = (steps) => {
  depth += steps;
};

const moveUp = (steps) => {
  depth -= steps;
};

const horizontalPosition = (horizontal, depth) => {
  return depth * horizontal;
};

for (let i = 0; i < inputAsArray.length; i++) {
  let [currentDirection, currentStep] = inputAsArray[i].split(" ");

  if (currentDirection === "forward") {
    moveForward(Number(currentStep));
  } else if (currentDirection === "down") {
    moveDown(Number(currentStep));
  } else if (currentDirection === "up") {
    moveUp(currentStep);
  }
}

let ans = horizontalPosition(horizontal, depth);
// console.log({ans})

let horizontal2 = 0;
let depth2 = 0;
let aim2 = 0;

const moveForward2 = (steps) => {
  horizontal2 += steps;
  depth2 += aim2 * steps;
};

const moveDown2 = (steps) => {
  aim2 += steps;
};

const moveUp2 = (steps) => {
  aim2 -= steps;
};

const horizontalPosition2 = (horizontal, depth) => {
  return depth * horizontal;
};

for (let i = 0; i < inputAsArray.length; i++) {
  let [currentDirection, currentStep] = inputAsArray[i].split(" ");
  console.log({ currentStep, currentDirection, horizontal2, depth2, aim2 });
  if (currentDirection === "forward") {
    moveForward2(Number(currentStep));
  } else if (currentDirection === "down") {
    moveDown2(Number(currentStep));
  } else if (currentDirection === "up") {
    moveUp2(currentStep);
  }
}
console.log({ horizontal2, depth2 });

let ans2 = horizontalPosition2(horizontal2, depth2);
console.log({ ans2 });
