import type {Character} from "./c_character";

export class SubStat{
    id:string;
    full_name:string;
    value:number;
    base_value:number;
    derived_from:string[];
    private character: Character;

    constructor(
        id:string,
        full_name:string,
        derived_from:string[],
        character: Character,
    ){
        this.id = id;
        this.full_name = full_name;
        this.value = 0;
        this.base_value = 0;
        this.derived_from = derived_from;
        this.character = character;
    }

    calculate() {
        switch (this.id) {
            case 'LEP':
                this.value = this.base_value + this.get_stat('KO') + this.get_stat('KO');
                break;

            case 'ASP':
                this.value = this.base_value + this.get_stat(this.derived_from[0]);
                break;
        
            case 'KAP':
                this.value = this.base_value + this.get_stat(this.derived_from[0]);
                break;

            case 'SK':
                this.value = Math.round(this.base_value + (this.get_stat('MU') + this.get_stat('KL') + this.get_stat('IN'))/6);
                break;

            case 'ZK':
                this.value = Math.round(this.base_value + (this.get_stat('KO') + this.get_stat('KO') + this.get_stat('KK'))/6);
                break;

            case 'AW':
                this.value = Math.round(this.get_stat('GE')/2);
                break;

            case 'INI':
                this.value = Math.round((this.get_stat('MU') + this.get_stat('GE'))/2);
                break;

            case 'GS':
                this.value = this.base_value;
                break;    
            
            case 'WS':
                this.value = Math.round(this.get_stat('KO')/2);
                break; 

            default:
                break;
        }
    }

    private get_stat(id:string): number{
        return this.character.stats.find(element => element.id === id)?.lvl!;
    }

}