import { IModifier } from "./Modifier";
import { IRequirement } from "./Requirement";

export interface ICharacterClass {
	id: string;
	name: string;
	level: number;
	modifiers: IModifier[];
}

export interface ICharacterClassBase {
	id: string;
	name: string;
	level: number;
	baseCost: number;
	levelCost: number;
	choices: number[];
	requirements: IRequirement[];
	options: IModifier[][];
}
