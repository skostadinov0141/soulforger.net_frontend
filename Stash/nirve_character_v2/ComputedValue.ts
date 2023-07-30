import { Character } from "./Character";

export interface IComputedValue {
	searches: string[];
	calculation: string;
}

export default class ComputedValue implements IComputedValue {
	constructor(
		public searches: string[],
		public calculation: string,
	) {
		this.searches = searches;
		this.calculation = calculation;
	}

	public compute(character: Character): number {
		let values: number[] = [];
		// Loop through all searches and find the values
		this.searches.forEach((search) => {
			values.push(character.find(search));
		});
		// Replace all $x with the values
		let parsedCalculation = "";
		for (let i = 0; i < this.calculation.replaceAll(" ", "").length; i++) {
			const char = this.calculation.replaceAll(" ", "")[i];
			// If the char is a $, go to the next char and use it as an index for the values array
			// If the char is not a $, just add it to the parsedCalculation
			if (char === "$") {
				i++;
				const char = this.calculation.replaceAll(" ", "")[i];
				parsedCalculation += values[parseInt(char)];
				continue;
			}
			parsedCalculation += char;
		}
		return eval(parsedCalculation);
	}
}
