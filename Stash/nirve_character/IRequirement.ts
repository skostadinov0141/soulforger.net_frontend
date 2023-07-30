import { IBenderSkill } from "../nirve_character_v2/BenderStats";
import IDisadvantage from "../nirve_character_v2/IDisadvantage";
import { IItem } from "../nirve_character_v2/IItem";
import { ISpell } from "../nirve_character_v2/IMageStats";
import ISkill from "../nirve_character_v2/ISkill";

export default interface IRequirement {
	description: string;
	steps: IRequirementStep[];
}

export interface IRequirementStep {
	mode: "exist" | "!exist" | "==" | "!=" | ">" | "<" | ">=" | "<=";
	value:
		| number
		| string
		| ISkill
		| IBenderSkill
		| ISpell
		| IItem
		| IDisadvantage;
	path: string[];
}
