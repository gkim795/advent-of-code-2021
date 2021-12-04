const fs = require('fs');
const inputAsArray = fs
	.readFileSync('./input.txt', null)
	.toString()
	.split('\n');

const partOne = input => {
	// each bit in the gamma rate can be found by finding
	// the most common bit in the corresponding position of all numbers
	// in the diagnostic report
	let gammaRate = 0;
	let epsilonRate = 0;

	let count = [];

	for (let i = 0; i < input.length; i++) {
		let bitString = input[i];
		for (let m = 0; m < bitString.length; m++) {
			let current = bitString[m];

			let currentCounter = count[m] || {};

			currentCounter[current] = currentCounter[current] || 0;

			currentCounter[current]++;
			count[m] = currentCounter;
		}
	}

	let majority = [];
	let minority = [];
	for (let i = 0; i < count.length; i++) {
		let zeroCount = count[i]['0'];
		let oneCount = count[i]['1'];

		majority.push(zeroCount > oneCount ? '0' : '1');
		minority.push(zeroCount > oneCount ? '1' : '0');
	}

	// convert gamma rate to a number from binary
	gammaRate = parseInt(majority.join(''), 2);
	epsilonRate = parseInt(minority.join(''), 2);

	return gammaRate * epsilonRate;
};

const partTwo = input => {};

const main = () => {
	// input will be in binary
	const input = inputAsArray.map(v => String(v));

	return {
		partOne: partOne(input),
		partTwo: partTwo(input)
	};
};

console.log(main());
