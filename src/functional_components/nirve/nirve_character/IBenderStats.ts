import IModifier from "./IModifier";
import IRequirement from "./IRequirement";

export default interface IBenderStats {
    maxMass: number;
    maxDistance: number;
    maxArea: number;
    benderSkills: IBenderSkill[];
}

export interface IBenderSkill {
    name: string;
    effect: string;
    xpCost: number;
    requirements: IRequirement[];
}