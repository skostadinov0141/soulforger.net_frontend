import { Stat } from "./MainStats";
import IModifier from "../nirve_character/IModifier";
import IRequirement from "../nirve_character/IRequirement";

export interface ISpell {
    name: string;
    level: number;
    cost: number;
    perfection: number;
    risk: number;
    xpCost: number;
    requirements: IRequirement[];
}