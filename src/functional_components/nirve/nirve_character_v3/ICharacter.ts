import { ICharacterClass } from "./CharacterClass";
import { IModifierLink } from "./Modifier";

export interface ICharacter {
    // Personal
    name: string;
    age: number;
    origin: string;
    
    // Character definition
    level: number;
    characterClass: ICharacterClass | undefined; // TODO: Add character class function
    // race: Race = new Race();
    // religion: Religion = new Religion();
    
    // // Character stats
    // baseStats: BaseStats = new BaseStats();
    // motivation: Motivation = new Motivation();
    maxMass: number;
    maxDistance: number;
    maxArea: number;
    energy: number;
    xp: number;

    // Character properties
    modifiers: IModifierLink[];
    // skills: Skill[] = [];
    // disadvantages: Disadvantage[] = [];
    // spells: any[] | undefined = undefined;
    // bendingSkills: any[] | undefined = undefined;
    // inventory: Inventory = new Inventory();

    // [key: string]: any;
}