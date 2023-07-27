import { type } from "os";
import { ICharacterClass } from "./CharacterClass";
import { IModifier } from "./Modifier";
import { ICharacter } from "./ICharacter";
import { getProperty, setProperty } from "./ObjectHelpers";
import { BaseStats, IBaseStats } from "./BaseStats";

export type CharacterKeys = keyof ICharacter;
export type CharacterClassKeys = keyof ICharacterClass;

export default class Character implements ICharacter {
    // Personal
    name:string = '';
    age: number = 5;
    origin: string = '';
    
    // Character definition
    level: number = 0;
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
    xp: number = 0;

    // Character properties
    modifierLinks: string[] = [];
    modifiers: IModifier[] = [];
    // skills: Skill[] = [];
    // disadvantages: Disadvantage[] = [];
    // spells: any[] | undefined = undefined;
    // bendingSkills: any[] | undefined = undefined;
    // inventory: Inventory = new Inventory();

    [key: string]: any;

    addClass(input: ICharacterClass): boolean{
        if(input.modifiers && input.modifiers.length > 0){
            let currentClassCount = this.characterClass.length;
            for(let i = 0; i < input.modifiers.length; i++){
                this.modifierLinks.push(`characterClass.${currentClassCount}.modifiers.${i}`);
            }
        }
        this.characterClass.push(input);
        return true;
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