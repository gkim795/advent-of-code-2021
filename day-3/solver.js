const fs = require('fs');
const inputAsArray = fs
	.readFileSync('./input.txt', null)
	.toString()
	.split('\n');

const partOne = input => {
	console.log({ input });
};

const partTwo = input => {
	console.log({ input });
};

const main = () => {
	const input = inputAsArray.map(() => {});

	return {
		partOne: partOne(input),
		partTwo: partTwo(input)
	};
};

console.log(main());
