import type { SkillLevel } from "./i_skill_level";
import type { Stat } from "./i_stats";
import { SubStat } from "./c_sub_stats";
import { Requirement } from "./c_requirement";
import { type ITalent, CTalent } from "./i_talent";
import type { Skill } from "./i_skill";


export class Character{
    //#region fields
    name:string = '';
    family:string = '';
    birth_date:string = '';
    species:string = '';
    hair_color:string = '';
    culture:string = '';
    profession:string = '';
    title:string = '';
    birthplace:string = '';
    age:number = 0;
    height:number = 0;
    weight:number = 0;
    sex:string = '';
    eye_color:string = '';
    social_status:string = '';
    magical_tradition_core_stat:string = '';
    holy_tradition_core_stat:string = '';

    
    ap_bank:number;
    stats: Stat[] = [];
    sub_stats: SubStat[] = [];
    talents: ITalent[] = [];
    skills: Skill[] = [];
    //#endregion

    //#region ctor
    constructor(level: SkillLevel){
        this.ap_bank = level.ap_base;
        this.stats.push(
            {id:'MU',full_name:'Mut',lvl:8,lvl_max:level.stat_max_level},
            {id:'KL',full_name:'Klugheit',lvl:8,lvl_max:level.stat_max_level},
            {id:'IN',full_name:'Intuition',lvl:8,lvl_max:level.stat_max_level},
            {id:'CH',full_name:'Charisma',lvl:8,lvl_max:level.stat_max_level},
            {id:'FF',full_name:'Fingerfertigkeit',lvl:8,lvl_max:level.stat_max_level},
            {id:'GE',full_name:'Gewandheit',lvl:8,lvl_max:level.stat_max_level},
            {id:'KO',full_name:'Konstitution',lvl:8,lvl_max:level.stat_max_level},
            {id:'KK',full_name:'Körperkraft',lvl:8,lvl_max:level.stat_max_level},
        );
        this.sub_stats.push(
            new SubStat('LEP','Lebenspunkte',['KO'],this),
            new SubStat('ASP','Astralpunkte',[],this),
            new SubStat('KAP','Karmapunkte',[],this),
            new SubStat('SK','Seelenkraft',['MU','KL','IN'],this),
            new SubStat('ZK','Zähigkeit',['MU','GE'],this),
            new SubStat('AW','Ausweichen',['GE'],this),
            new SubStat('INI','Initiative',['GE','MU'],this),
            new SubStat('GS','Geschwindigkeit',[],this),
            new SubStat('WS','Wundschwelle',['KO'],this),
        );
        this.sub_stats.forEach(element=>element.calculate());
        new CTalent().getTalents().forEach(element=>{
            this.talents.push(element);
        });
    }
    //#endregion

    //#region functions
    public getSkillIndex(id:string): number{
        return this.skills.indexOf(this.skills.find(element => element.id === id)!);
    }

    public getStatIndex(id:string): number{
        return this.stats.indexOf(this.stats.find(element => element.id === id)!);
    }

    public getTalentIndex(id:string): number{
        return this.talents.indexOf(this.talents.find(element => element.id === id)!);
    }
    
    public increaseStat(id:string){
        let stat_index = this.stats.indexOf(this.stats.find(element=>element.id === id)!);
        this.stats[stat_index].lvl += 1;
        this.recalculateSubStat(id);
    }

    private recalculateSubStat(id:string){
        this.sub_stats.forEach(sub_stat=>{
            if(sub_stat.derived_from.includes(id)){
                this.sub_stats[this.sub_stats.indexOf(sub_stat)].calculate();
            }
        });
    }

    public testValidate(){
        new Requirement(this,'talent',{
            operator:'&',
            count:2,
            validations:[
                {id:'Fliegen',min_fw:1},
                {id:'Gaukeleien',min_fw:1},
                {id:'Klettern',min_fw:1},
            ]
        }).validate();
    }
    //#endregion
}