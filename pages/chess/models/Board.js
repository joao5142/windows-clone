export default class Board {
	static letters = ["a", "b", "c", "d", "e", "f", "g", "h"];
	static nums = [8, 7, 6, 5, 4, 3, 2, 1];
	static indexLetter = 0;
	static indexNum = 0;

	constructor() {}

	static initBoard() {
		let fields = document.querySelectorAll(".chess__square");

		fields.forEach((field) => {
			if (this.indexLetter >= this.letters.length) {
				this.indexNum++;
				this.indexLetter = 0;
			}
			field.dataset.position = this.letters[this.indexLetter] + this.nums[this.indexNum];
			this.indexLetter++;
		});
	}
}
