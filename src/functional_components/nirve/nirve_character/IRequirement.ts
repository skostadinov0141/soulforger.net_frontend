import { IBenderSkill } from "./IBenderStats";
import IDisadvantage from "./IDisadvantage";
import { IItem } from "./IInventory";
import { ISpell } from "./IMageStats";
import ISkill from "./ISkill";

export default interface IRequirement {
    description: string;
    steps: IRequirementStep[];
}

export interface IRequirementStep {
    mode: 'exist' | '!exist' | '==' | '!=' | '>' | '<' | '>=' | '<=';
    value: number | string | ISkill | IBenderSkill | ISpell | IItem | IDisadvantage;
    path: string[];
}