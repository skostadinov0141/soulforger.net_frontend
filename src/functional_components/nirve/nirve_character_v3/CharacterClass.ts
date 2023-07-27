import { IModifier } from "./Modifier"

export interface ICharacterClass{
    id: string
    name: string
    level: number
    modifiers: IModifier[]
}

export interface ICharacterClassBase{
    id: string
    name: string
    // requirements: Requirement[]
    level: number
    baseCost: number
    levelCost: number
    choices: number[]
    options: IModifier[][]
}

// export class CharacterClass implements ICharacterClass{

//     id: string;
//     name: string;
//     level: number;
//     modifiers: IModifier[];
//     choices: number[];

//     constructor(base: ICharacterClassBase){
//         this.id = base.id;
//         this.name = base.name;
//         this.level = base.level;
//         let compiledModifiers: IModifier[] = [];
//         for(let i = 0; i < base.options.length; i++){
//             compiledModifiers.push(base.options[i][base.choices[i]]);
//         }
//         this.modifiers = compiledModifiers
//         this.choices = base.choices;
//     }

//     toBase(base: ICharacterClassBase): ICharacterClassBase{
//         base.id = this.id;
//         base.name = this.name;
//         base.level = this.level;
//         base.choices = this.choices;
//         return base;
//     }
// }