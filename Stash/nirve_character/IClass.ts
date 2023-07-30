import IModifier, { IPermanentModifier } from "./IModifier";
import IRequirement from "./IRequirement";

export default interface IClass {
	name: string;
	level: number;
	xpCosts: number[];
	requirements: IRequirement[];
	choices: IClassChoice[];
}

export interface IClassChoice {
	description: string;
	maxChoices: number;
	modifiers: IModifier[];
	permanentModifiers: IPermanentModifier[];
}
