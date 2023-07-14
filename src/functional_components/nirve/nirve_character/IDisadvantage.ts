import IModifier from "./IModifier";
import IRequirement from "./IRequirement";

export default interface IDisadvantage{
    name: string;
    description: string;
    requirements: IRequirement[];
}