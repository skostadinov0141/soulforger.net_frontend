import { BaseStats } from "./CBaseStats";
import BendingSkill from "./CBendingSkill";
import CharacterClass from "./CCharacterClass";
import Disadvantage from "./CDisadvantage";
import Motivation from "./CMotivation";
import Race from "./CRace";
import Religion from "./CReligion";
import Skill from "./CSkill";
import Spell from "./CSpell";

export default class Character {
	// Personal
	name: string = "";
	age: number = 5;
	origin: string = "";

	// Character definition
	level: number = 1;
	characterClass: CharacterClass[] = [];
	race: Race = new Race();
	religion: Religion = new Religion();

	// Character stats
	baseStats: BaseStats = new BaseStats();
	motivation: Motivation = new Motivation();
	maxMass: number = 0;
	maxDistance: number = 0;
	maxArea: number = 0;
	energy: number = 0;
	xp: number = 500;

	// Character properties
	modifierLinks: string[] = [];
	// modifiers: IModifier[] = [];
	// rolls: Roll[] = [];
	skills: Skill[] = [];
	disadvantages: Disadvantage[] = [];
	spells: Spell[] = [];
	bendingSkills: BendingSkill[] = [];
	// inventory: Inventory = new Inventory();
}
