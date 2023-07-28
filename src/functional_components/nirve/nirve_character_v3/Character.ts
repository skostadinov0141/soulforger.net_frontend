import { type } from "os";
import { ICharacterClass, ICharacterClassBase } from "./CharacterClass";
import { IModifier } from "./Modifier";
import { ICharacter } from "./ICharacter";
import { getProperty, setProperty } from "./ObjectHelpers";
import { BaseStats, IBaseStats } from "./BaseStats";
import { IRequirement } from "./Requirement";
import { Roll } from "./Roll";

export type CharacterKeys = keyof ICharacter;
export type CharacterClassKeys = keyof ICharacterClass;

export default class Character implements ICharacter {
    // Personal
    name:string = '';
    age: number = 5;
    origin: string = '';
    
    // Character definition
    level: number = 1;
    characterClass: ICharacterClass[] = []; // TODO: Add character class function
    // race: Race = new Race();
    // religion: Religion = new Religion();
    
    // // Character stats
    baseStats: BaseStats = new BaseStats();
    // motivation: Motivation = new Motivation();
    maxMass: number = 0;
    maxDistance: number = 0;
    maxArea: number = 0;
    energy: number = 0;
    xp: number = 500;

    // Character properties
    modifierLinks: string[] = [];
    modifiers: IModifier[] = [];
    rolls: Roll[] = [];
    // skills: Skill[] = [];
    // disadvantages: Disadvantage[] = [];
    // spells: any[] | undefined = undefined;
    // bendingSkills: any[] | undefined = undefined;
    // inventory: Inventory = new Inventory();

    [key: string]: any;

    addClass(input: ICharacterClassBase): boolean{
        for(const requirement of input.requirements){
            if(!this.checkRequirement(requirement)){return false;}
        }
        this.xp -= input.baseCost;
        let modifiers: IModifier[] = [];
        for(let i = 0; i < input.options.length; i++){
            modifiers.push(input.options[i][input.choices[i]]);
        }
        let compiledClass: ICharacterClass = {
            id: input.id,
            name: input.name,
            level: input.level,
            modifiers: modifiers
        }
        this.characterClass.push(compiledClass);
        if(modifiers && modifiers.length > 0){
            let currentClassCount = this.characterClass.length - 1;
            for(let i = 0; i < modifiers.length; i++){
                if(i > 0){this.xp -= input.levelCost}
                this.modifierLinks.push(`characterClass.${currentClassCount}.modifiers.${i}`);
                this.applyModifier(this.modifierLinks.length - 1);
            }
        }
        return true;
    }

    checkRequirement(requirement: IRequirement): boolean{
        let target = getProperty(this, requirement.target);
        if(typeof target !== typeof requirement.value){return false;}
        if (typeof target === 'number' && typeof requirement.value === 'number') {
            switch (requirement.mode) {
                case '>':
                    return target > requirement.value;
                case '<':
                    return target < requirement.value;
                case '>=':
                    return target >= requirement.value;
                case '<=':
                    return target <= requirement.value;
                case '=':
                    return target === requirement.value;
                default:
                    return false; // Unsupported mode
            }
        }
        return false;
    }

    applyModifier(id: number): boolean{
        let modifier: IModifier = getProperty(this ,this.modifierLinks[id]) as IModifier;
        let target = getProperty(this, modifier.target);
        if(typeof modifier.value !== typeof target){return false;}
        if (typeof modifier.value === 'number' && typeof target === 'number') {
            let newValue;
            switch (modifier.mode) {
                case '+':
                    newValue = target + modifier.value;
                    break;
                case '-':
                    newValue = target - modifier.value;
                    break;
                case '*':
                    newValue = target * modifier.value;
                    break;
                case '/':
                    newValue = target / modifier.value;
                    break;
                case '=':
                    newValue = modifier.value;
                    break;
                default:
                    return false; // Unsupported mode
            }
            setProperty(this, modifier.target, newValue);
        }
        return true;
    }

    addModifier(modifier: IModifier): boolean{
        this.modifierLinks.push(`modifiers.${this.modifiers.length}`);
        this.modifiers.push(modifier);
        return true;
    }
}