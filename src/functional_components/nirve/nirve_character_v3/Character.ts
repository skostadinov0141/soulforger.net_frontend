import { type } from "os";
import { ICharacterClass } from "./CharacterClass";
import { IModifier, IModifierLink, LinkResolution } from "./Modifier";
import { ICharacter } from "./ICharacter";
import { getProperty, setProperty } from "./ObjectHelpers";

export type CharacterKeys = keyof ICharacter;
export type CharacterClassKeys = keyof ICharacterClass;

export default class Character implements ICharacter {
    // Personal
    name:string = '';
    age: number = 5;
    origin: string = '';
    
    // Character definition
    level: number = 0;
    characterClass: ICharacterClass | undefined = undefined; // TODO: Add character class function
    // race: Race = new Race();
    // religion: Religion = new Religion();
    
    // // Character stats
    // baseStats: BaseStats = new BaseStats();
    // motivation: Motivation = new Motivation();
    maxMass: number = 0;
    maxDistance: number = 0;
    maxArea: number = 0;
    energy: number = 0;
    xp: number = 0;

    // Character properties
    modifiers: IModifierLink[] = [];
    // skills: Skill[] = [];
    // disadvantages: Disadvantage[] = [];
    // spells: any[] | undefined = undefined;
    // bendingSkills: any[] | undefined = undefined;
    // inventory: Inventory = new Inventory();

    [key: string]: any;

    addClass(input: ICharacterClass): boolean{
        if(input.modifiers && input.modifiers.length > 0){
            for(let i = 0; i < input.modifiers.length; i++){
                this.modifiers.push({
                    sourceId: input.modifiers[i].id,
                    sourceLocation: [<CharacterKeys>'characterClass', <CharacterClassKeys>'modifiers', i.toString()],
                    targetId: input.modifiers[i].id,
                    targetLocation: [<CharacterKeys>'age']
                })
            }
        }
        this.characterClass = input;
        return true;
    }

    applyModifier(sourceId: string): boolean{
        let link = this.modifiers.find((modifierLink: IModifierLink) => {
            return modifierLink.sourceId === sourceId;
        });
        if(!link){return false;}
        let sourceVal: IModifier = getProperty(this, link.sourceLocation);
        let targetVal = getProperty(this, link.targetLocation);
        if(typeof sourceVal.value !== typeof targetVal){return false;}
        if (typeof sourceVal.value === 'number' && typeof targetVal === 'number') {
            let newValue;
            switch (sourceVal.mode) {
                case '+':
                newValue = targetVal + sourceVal.value;
                break;
                case '-':
                newValue = targetVal - sourceVal.value;
                break;
                case '*':
                newValue = targetVal * sourceVal.value;
                break;
                case '/':
                newValue = targetVal / sourceVal.value;
                break;
                default:
                return false; // Unsupported mode
            }
        
            setProperty(this, link.targetLocation, newValue);
        }
        return true;
    }
}