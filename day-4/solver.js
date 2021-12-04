const fs = require('fs');
const inputAsArray = fs
	.readFileSync('./input.txt', null)
	.toString()
	.split('\n');

const partOne = (bingoNumbersCalled, bingoCards) => {
	let cardsToCheck = [...bingoCards];
	const amountOfBingoCards = bingoCards.length;
	const checkWinningBingoCard = card => {
		for (let i = 0; i < 5; i++) {
			let row = card[i];
			let col = [card[0][i], card[1][i], card[2][i], card[3][i], card[4][i]];

			let rowFilter = row.filter(v => v.seen === true);
			let colFilter = col.filter(v => v.seen === true);

			if (rowFilter.length === 5) {
				return row;
			}
			if (colFilter.length === 5) {
				return col;
			}
		}
	};

	const checkMarkedBingCard = (cardRow, input) => {
		let currentCard = cardsToCheck[cardRow];
		for (let i = 0; i < 5; i++) {
			for (let m = 0; m < 5; m++) {
				let val = currentCard[i][m]['val'];
				if (val === input) {
					currentCard[i][m]['seen'] = true;
				}
			}
		}
	};

	for (let i = 0; i < bingoNumbersCalled.length; i++) {
		let currentNumber = bingoNumbersCalled[i];

		for (let m = 0; m < amountOfBingoCards; m++) {
			checkMarkedBingCard(m, currentNumber);
			let res = checkWinningBingoCard(bingoCards[m]);

			if (res) {
				let sum = bingoCards[m].reduce((prev, curr) => {
					let innerSum = 0;
					for (let j = 0; j < 5; j++) {
						if (!curr[j]['seen']) {
							innerSum += curr[j]['val'];
						}
					}

					return innerSum + prev;
				}, 0);

				return sum * currentNumber;
			}
		}
	}
};

const partTwo = (bingoNumbersCalled, bingoCards) => {
	let cardsToCheck = [...bingoCards];
	const amountOfBingoCards = bingoCards.length;

	let wonCards = new Set();

	const checkWinningBingoCard = (card, index) => {
		for (let i = 0; i < 5; i++) {
			let row = card[i];
			let col = [card[0][i], card[1][i], card[2][i], card[3][i], card[4][i]];

			let rowFilter = row.filter(v => v.seen === true);
			let colFilter = col.filter(v => v.seen === true);

			if (rowFilter.length === 5 || colFilter.length === 5) {
				wonCards.add(index);
				console.log(index, wonCards);
				if (wonCards.size === amountOfBingoCards) {
					// time to return

					return rowFilter.length === 5 ? row : col;
				}
			}
		}
	};

	const checkMarkedBingCard = (cardRow, input) => {
		let currentCard = cardsToCheck[cardRow];
		for (let i = 0; i < 5; i++) {
			for (let m = 0; m < 5; m++) {
				let val = currentCard[i][m]['val'];
				if (val === input) {
					currentCard[i][m]['seen'] = true;
				}
			}
		}
	};

	for (let i = 0; i < bingoNumbersCalled.length; i++) {
		let currentNumber = bingoNumbersCalled[i];

		for (let m = 0; m < amountOfBingoCards; m++) {
			if (wonCards.has(m)) {
				// skip
			} else {
				checkMarkedBingCard(m, currentNumber);
				let res = checkWinningBingoCard(bingoCards[m], m);

				if (res) {
					let sum = bingoCards[m].reduce((prev, curr) => {
						let innerSum = 0;
						for (let j = 0; j < 5; j++) {
							if (!curr[j]['seen']) {
								innerSum += curr[j]['val'];
							}
						}

						return innerSum + prev;
					}, 0);
					console.log({ sum, currentNumber, bingoCards });
					return sum * currentNumber;
				}
			}
		}
	}
};

const main = () => {
	const input = inputAsArray.map(v => v);

	const bingoNumbersCalled = input[0].split(',').map(v => Number(v));
	const bingoCards = [];
	let index = 2;

	const convertToRow = row => {
		row = row.split(' ');
		let rowToPush = [];
		for (let i = 0; i < row.length; i++) {
			if (row[i] !== '') {
				rowToPush.push({ val: Number(row[i]), seen: false });
			}
		}
		return rowToPush;
	};

	while (index < input.length) {
		let row1 = convertToRow(input[index]);
		let row2 = convertToRow(input[index + 1]);
		let row3 = convertToRow(input[index + 2]);
		let row4 = convertToRow(input[index + 3]);
		let row5 = convertToRow(input[index + 4]);

		let cardToPush = [row1, row2, row3, row4, row5];
		bingoCards.push(cardToPush);

		index += 6;
	}

	return {
		partOne: partOne(bingoNumbersCalled, bingoCards),
		partTwo: partTwo(bingoNumbersCalled, bingoCards)
	};
};

console.log(main());

/**
 * Bingo -> 5 x 5 grid of numbers
 * -- chosen number is "marked"
 *
 * win: row all marked or column all marked
 *
 * return: sum of row * num that was called to win it
 *
 * -> how to handle this in a one pass?
 * -> how to parse the input
 * 		- first line is the input
 * 		- blank line (introducing a new bingo card)
 * 		- next line within bing card - represent new row
 * -> when to check for wins
 * 		- every time after a number is 'marked'
 * -> helpful that we know all of them will have 5 rows and 5 columns
 * -> unsure how many bingo cards we'll get
 *
 */
