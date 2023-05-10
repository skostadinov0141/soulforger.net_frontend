import type { Character } from "./c_character";
import type { ValidationResponse, StatValidation } from "./i_requirements";
import type { Stat } from "./i_stats";

export class Requirement{
    
    private character:Character;
    private type:string;
    private content:Object;

    constructor(character:Character, type:string, content:Object){
        this.character = character;
        this.type = type;
        this.content = content;
    }

    public validate():ValidationResponse|void{
        switch (this.type) {
            case 'stat':
                this.validateStat();
                break;

            case 'talent':
                // this.validateTalent();
                break;

            case 'skill':
                // this.validateSkill();
                break;

            case 'advantage':
                // this.validateAdvantage();
                break;

            case 'disadvantage':
                // this.validateDisadvantage();
                break;

            case 'combat_skill':
                // this.validateCombatSkill();
                break;

            case 'species':
                // this.validateSpecies();
                break;

            case 'profession':
                // this.validateProfession();
                break;
        
            default:
                break;
        }
    }

    private validateStat():ValidationResponse|void{
        let compiled_validation: StatValidation = this.content as StatValidation;
        let validation_response: ValidationResponse = {result:true,problems:[],modifiers:undefined};
        if(compiled_validation.operator === '&'){
            compiled_validation.validations.forEach(element=>{
                let stat_element: Stat = this.character.stats[this.character.getStatIndex(element.id)];
                if(stat_element.lvl < element.min_lvl){
                    validation_response.result = false;
                    validation_response.problems.push(
                        `${stat_element.full_name} ist gerade auf Stufe ${stat_element.lvl}, es muss mind. auf Stufe ${element.min_lvl} sein.`
                    );
                }
            });
            console.log(validation_response);
        }else{
            let count: number = compiled_validation.count;
            compiled_validation.validations.forEach(element=>{
                let stat_element: Stat = this.character.stats[this.character.getStatIndex(element.id)];
                if(stat_element.lvl >= element.min_lvl){
                    count -= 1;
                }else{
                    validation_response.problems.push(`${stat_element.full_name} ist nicht auf Stufe ${element.min_lvl}`);
                }
            });
            if(count > 0){
                validation_response.result = false;
                validation_response.problems.push(`Es müssen mind. noch ${count} der obengenannte Eigenschaften auf die jeweilige Stufe gebracht werden.`);
            }
            console.log(validation_response);
        }
    }

}