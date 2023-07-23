import IBenderStats from "../nirve_character_v2/BenderStats"
import IClass from "./IClass"
import IDisadvantage from "../nirve_character_v2/IDisadvantage"
import IInventory from "../nirve_character_v2/IItem"
import IMageStats from "../nirve_character_v2/IMageStats"
import IMainStats from "../nirve_character_v2/MainStats"
import ISkill from "../nirve_character_v2/ISkill"

export interface ICharacter{
    name: string
    age: number
    level: number
    race: string
    religion: string 
    origin: string 
    xp: number 
    _class: IClass
    inventory: IInventory 
    mainStats: IMainStats 
    skills: ISkill[] 
    disadvantages: IDisadvantage[] 
    benderStats: IBenderStats 
    mageStats: IMageStats 
    talents: ITalent[]
}

export class CCharacter{
    private name: string = "";
    private age: number = 0;
    private level: number = 0;
    private race: string = "";
    private religion: string = "";
    private origin: string = "";
    private xp: number = 0;
    private _class: IClass | null = null;
    private inventory: IInventory | null = null;
    private mainStats: IMainStats | null = null;
    private skills: ISkill[] = [];
    private disadvantages: IDisadvantage[] = [];
    private benderStats: IBenderStats | null = null;
    private mageStats: IMageStats | null = null;

    constructor(from?: ICharacter){
        if(from){
            this.name = from.name;
            this.age = from.age;
            this.level = from.level;
            this.race = from.race;
            this.religion = from.religion;
            this.origin = from.origin;
            this.xp = from.xp;
            this._class = from._class;
            this.inventory = from.inventory;
            this.mainStats = from.mainStats;
            this.skills = from.skills;
            this.disadvantages = from.disadvantages;
            this.benderStats = from.benderStats;
            this.mageStats = from.mageStats;
        }
    }

}