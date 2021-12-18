const { readFileSync } = require('fs')
const inputData = readFileSync('./input.txt', null).toString().split('\n')
const testData = readFileSync('./test.txt', null).toString().split('\n')

const partOne = (paths) => {
  
  
  const findPath = (currentPath, startNode) => {
    if(startNode === "end") return [currentPath]

    let smallCaveCount = {};
    let seenSmallCaveTwice = false;
    for (let i = 0; i < currentPath.length; i++) {
      let curr = currentPath[i];

      if(curr === "start" || curr.toUpperCase() === curr) continue;
      smallCaveCount[curr] = smallCaveCount[curr] || 0
      smallCaveCount[curr]++;

      if(smallCaveCount[curr] === 2) seenSmallCaveTwice = true;
    }

    let possibleNextNodes = paths[startNode];
 
    let filtered =  possibleNextNodes.filter(nextNode => {
      const isStartNode = nextNode === "start";
      const isBigCave = nextNode === nextNode.toUpperCase();

      if(isStartNode) return false;

      if(isBigCave || nextNode==="end") {
        return true
      }
        let currentSmallCaveCount = smallCaveCount[nextNode];
        if(currentSmallCaveCount === 2) return false;
        if(currentSmallCaveCount === 1 && seenSmallCaveTwice) return false;
        return true
    })

    
    return filtered.flatMap((node) =>
    findPath([...currentPath, node], node))
  }

  
  const result = findPath(["start"], "start")
  
  let set = new Set();

  for (let i = 0; i < result.length; i++) {
    let current = result[i].join(",")
    set.add(current)
  }

  return set.size
}

const partTwo = (input) => {
  input
}

const main = () => {

  const createPaths = (input) => {
    let paths = {};

    for (let path of input) {

      const [start,end] = path.split("-");
      paths[start] = paths[start] || [];
      paths[start].push(end)


      paths[end] = paths[end] || []
      paths[end].push(start)
    }

    return paths;
  }

  const paths = createPaths(testData)
  const inputPaths = createPaths(inputData)
  return {
    partOne: { sample: partOne(paths), input: partOne(inputPaths) },
    // partTwo: { sample: partTwo(testData), input: partTwo(inputData) },
  }
}

console.log(main())
