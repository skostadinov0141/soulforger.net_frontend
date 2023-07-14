import { IBenderSkill } from "./IBenderStats";
import IDisadvantage from "./IDisadvantage";
import { IItem } from "./IInventory";
import { ISpell } from "./IMageStats";
import ISkill from "./ISkill";

export default interface IModifier {
    special_concern: string; // damage-taken, damage-dealt
    trigger: string; // Wann wird der Modifikator angewendet
    active: boolean; // Ist der Modifikator aktiv
    mode: '+' | '-' | '*' | '/' | 'add' | 'remove' | 'set'; // 2. Entscheide wie der Wert verändert wird
    value: number | string | ISkill | IBenderSkill | ISpell | IItem | IDisadvantage; // 3. Womit der Wert verändert wird
    path: string[]; // 1. ich suche nach etwas im Charakter
}

export interface IPermanentModifier {
    special_concern: string; // damage-taken, damage-dealt
    mode: '+' | '-' | '*' | '/' | 'add' | 'remove' | 'set' ; // 2. Entscheide wie der Wert verändert wird
    value: number | string | ISkill | IBenderSkill | ISpell | IItem | IDisadvantage; // 3. Womit der Wert verändert wird
    path: string[]; // 1. ich suche nach etwas im Charakter
}

// Jeder Tigris hat den Modifikator doppelter schaden durch Feuer
// Waldelfen haben +10 auf verstecken im Wald
// Verstecken ist ein Talent
// Im Wald ist ein Trigger              V
// 