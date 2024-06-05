const fs = require("fs");
const message_file = fs.readFileSync("pyramid.txt").toString();

function decode(message_file) {
	let wordArr = message_file.split("\n");

	const objPairArr = [];

	wordArr.forEach((arrPair) => {
		const separatedPair = [arrPair];
		separatedPair.forEach((newPair) => {
			const objPair = newPair.split(" ");
			return objPairArr.push(objPair);
		});
	});

	const obj = Object.fromEntries(objPairArr);
	const pyramid = Object.keys(obj);

	let rowLength = 1;
	let rowEnd = 0;
	let endWord = "";

	for (let i = 0; i < pyramid.length; i++) {
		endWord += pyramid[i];
		rowEnd++;
		if (rowEnd >= rowLength) {
			endWord += "\n";
			rowEnd = 0;
			rowLength++;
		} else {
			endWord += " ";
		}
	}

	const rowArr = endWord.split("\n");

	const pyramidRows = [];

	for (let i = 0; i < rowArr.length; i++) {
		const element = rowArr[i];
		pyramidRows.push([element]);
	}

	const lastElementArr = [];

	for (let i = 0; i < pyramidRows.length; i++) {
		const elementArr = pyramidRows[i];
		const lastElement = elementArr.join(",").split(" ").pop();
		if (lastElement) {
			lastElementArr.push(lastElement);
		}
	}

	const foundWords = lastElementArr
		.map((element) => {
			for (const key in obj) {
				return obj[element];
			}
		})
		.join(" ");
	return foundWords;
}
console.log(decode(message_file));
