import { BenderStats } from "./BenderStats";
import { IDisadvantage } from "./IDisadvantage";
import { IItem } from "./IItem";
import { ISpell } from "./IMageStats";
import { MainStats } from "./MainStats";
import { ISkill } from "./ISkill";

export interface ICharacter {
	// Semantic stats
	name: string;
	age: number;
	level: number;
	race: string;
	religion: string;
	origin: string;
	xp: number;
	energy: number;

	// Class stats
	className: string;
	classLevel: number;

	inventory: IItem[];

	// The core attributes of the character
	mainStats: MainStats;

	skills: ISkill[];

	disadvantages: IDisadvantage[];

	// The stats of the character as a bender
	benderStats: BenderStats;

	spells: ISpell[];

	// modifiers: IModifier[]
}

export default class Character implements ICharacter {
	name: string = "";
	age: number = 0;
	level: number = 0;
	race: string = "";
	religion: string = "";
	origin: string = "";
	xp: number = 0;
	energy: number = 0;
	className: string = "";
	classLevel: number = 0;
	inventory: IItem[] = [];
	mainStats: MainStats = new MainStats();
	skills: ISkill[] = [];
	disadvantages: IDisadvantage[] = [];
	benderStats: BenderStats = new BenderStats();
	spells: ISpell[] = [];
	// modifiers: IModifier[] = [];

	public get(searchTerm: string): any | false {
		let subSearchTerm = searchTerm.split(":");
		switch (subSearchTerm[0]) {
			case "name":
				return this.name;
			case "age":
				return this.age;
			case "level":
				return this.level;
			case "race":
				return this.race;
			case "religion":
				return this.religion;
			case "origin":
				return this.origin;
			case "xp":
				return this.xp;
			case "energy":
				return this.energy;
			case "className":
				return this.className;
			case "classLevel":
				return this.classLevel;
			case "inventory":
				// TODO: Implement inventory
				return this.inventory;
			case "mainStats":
				return this.mainStats.get(subSearchTerm[1]);
			case "skills":
				// TODO: Implement skills
				return this.skills;
			case "disadvantages":
				// TODO: Implement disadvantages
				return this.disadvantages;
			case "benderStats":
				return this.benderStats.get(subSearchTerm[1]);
			case "spells":
				// TODO: Implement spells
				return this.spells;
			default:
				return false;
		}
	}

	public set(searchTerm: string, value: any): boolean {
		let subSearchTerm = searchTerm.split(":");
		switch (subSearchTerm[0]) {
			case "name":
				this.name = value;
				return true;
			case "age":
				this.age = value;
				return true;
			case "level":
				this.level = value;
				return true;
			case "race":
				this.race = value;
				return true;
			case "religion":
				this.religion = value;
				return true;
			case "origin":
				this.origin = value;
				return true;
			case "xp":
				this.xp = value;
				return true;
			case "energy":
				this.energy = value;
				return true;
			case "className":
				this.className = value;
				return true;
			case "classLevel":
				this.classLevel = value;
				return true;
			case "inventory":
				// TODO: Implement inventory
				this.inventory = value;
				return true;
			case "mainStats":
				return this.mainStats.set(subSearchTerm[1], value);
			case "skills":
				// TODO: Implement skills
				this.skills = value;
				return true;
			case "disadvantages":
				// TODO: Implement disadvantages
				this.disadvantages = value;
				return true;
			case "benderStats":
				return this.benderStats.set(subSearchTerm[1], value);
			case "spells":
				// TODO: Implement spells
				this.spells = value;
				return true;
			default:
				return false;
		}
	}
}
