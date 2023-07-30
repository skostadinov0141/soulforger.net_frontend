import { IBenderSkill } from "../nirve_character_v2/BenderStats";
import IDisadvantage from "../nirve_character_v2/IDisadvantage";
import { IItem } from "../nirve_character_v2/IItem";
import { ISpell } from "../nirve_character_v2/IMageStats";
import ISkill from "../nirve_character_v2/ISkill";

export default interface IModifier {
	special_concern: string; // damage-taken, damage-dealt
	trigger: string; // Wann wird der Modifikator angewendet
	active: boolean; // Ist der Modifikator aktiv
	mode: "+" | "-" | "*" | "/" | "add" | "remove" | "set"; // 2. Entscheide wie der Wert verändert wird
	value:
		| number
		| string
		| ISkill
		| IBenderSkill
		| ISpell
		| IItem
		| IDisadvantage; // 3. Womit der Wert verändert wird
	path: string[]; // 1. ich suche nach etwas im Charakter
}

export interface IPermanentModifier {
	special_concern: string; // damage-taken, damage-dealt
	mode: "+" | "-" | "*" | "/" | "add" | "remove" | "set"; // 2. Entscheide wie der Wert verändert wird
	value:
		| number
		| string
		| ISkill
		| IBenderSkill
		| ISpell
		| IItem
		| IDisadvantage; // 3. Womit der Wert verändert wird
	path: string[]; // 1. ich suche nach etwas im Charakter
}

// Jeder Tigris hat den Modifikator doppelter schaden von Feuer
// Waldelfen haben +10 auf verstecken im Wald
// Verstecken ist ein Talent
// Im Wald ist ein Trigger              V
//
