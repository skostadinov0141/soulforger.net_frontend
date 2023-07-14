import { Stat } from "./IMainStats";
import IModifier from "./IModifier";
import IRequirement from "./IRequirement";

export default interface IMageStats {
    spells: ISpell[];
    energy: Stat;
}

export interface ISpell {
    name: string;
    level: number;
    cost: number;
    perfection: number;
    risk: number;
    xpCost: number;
    requirements: IRequirement[];
}