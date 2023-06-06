import type { Character } from "./c_character";
import type { ValidationResponse, StatValidation, TalentValidation, SkillValidation } from "./i_requirements";
import type { Skill } from "./i_skill";
import type { Stat } from "./i_stats";
import type { ITalent } from "./i_talent";

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
                this.validateTalent();
                break;

            case 'skill':
                this.validateSkill();
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

    private validateSkill():ValidationResponse|void{
        let compiled_validation: SkillValidation = this.content as SkillValidation;
        let validation_response: ValidationResponse = {result:true,problems:[],modifiers:undefined};
        if(compiled_validation.operator === '&'){
            compiled_validation.validations.forEach(element=>{
                if(this.character.getSkillIndex(element.id) === -1 && compiled_validation.include === true){
                    validation_response.result = false;
                    validation_response.problems.push(
                        `Die Sonderfertigkeit ${element.id} wurde nicht gefunden.`
                    );
                }
                else if(this.character.getSkillIndex(element.id) !== -1 && compiled_validation.include === false){
                    validation_response.result = false;
                    validation_response.problems.push(
                        `Die Sonderfertigkeit ${element.id} wurde gefunden.`
                    );
                }else{
                    let skill_element: Skill = this.character.skills[this.character.getSkillIndex(element.id)];
                    if(skill_element.lvl < element.min_lvl){
                        validation_response.result = false;
                        validation_response.problems.push(
                            `Die Sonderfertigkeit ${element.id} wurde gefunden, jedoch ist die Stufe der Sonderfertigkeit ${skill_element.lvl}, statt die vorausgesetzte Stufe ${element.min_lvl}.`
                        );
                    }
                    if(skill_element.sub_categories !== element.sub_categories){
                        validation_response.result = false;
                        validation_response.problems.push(
                            `Die Sonderfertigkeit ${element.id} wurde gefunden, jedoch stimmen die Unterkategorien nicht überein. (Erwartet: [${element.sub_categories.join(', ')}]; Gefunden: [${skill_element.sub_categories.join(', ')}])`
                        );
                    }
                }
            });
            console.log(validation_response);
        }else{
            let count: number = compiled_validation.count;
            compiled_validation.validations.forEach(element=>{
                if(this.character.getSkillIndex(element.id) === -1 && compiled_validation.include === true){
                    count -= 1;
                    validation_response.problems.push(
                        `Die Sonderfertigkeit ${element.id} wurde nicht gefunden.`
                    );
                }
                else if(this.character.getSkillIndex(element.id) !== -1 && compiled_validation.include === false){
                    count -= 1;
                    validation_response.problems.push(
                        `Die Sonderfertigkeit ${element.id} wurde gefunden.`
                    );
                }else{
                    let skill_element: Skill = this.character.skills[this.character.getSkillIndex(element.id)];
                    if(skill_element.lvl < element.min_lvl){
                        count -= 1;
                        validation_response.problems.push(
                            `Die Sonderfertigkeit ${element.id} wurde gefunden, jedoch ist die Stufe der Sonderfertigkeit ${skill_element.lvl}, statt die vorausgesetzte Stufe ${element.min_lvl}.`
                        );
                    }
                    if(skill_element.sub_categories !== element.sub_categories){
                        count -= 1;
                        validation_response.problems.push(
                            `Die Sonderfertigkeit ${element.id} wurde gefunden, jedoch stimmen die Unterkategorien nicht überein. (Erwartet: [${element.sub_categories.join(', ')}]; Gefunden: [${skill_element.sub_categories.join(', ')}])`
                        );
                    }
                }
            });
            if(count > 0){
                validation_response.result = false;
                validation_response.problems.push(`Es müssen mind. noch ${count} der obengenannte Voraussetzungen erfüllt werden.`);
            }
            console.log(validation_response);
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

    private validateTalent():ValidationResponse|void{
        let compiled_validation: TalentValidation = this.content as TalentValidation;
        let validation_response: ValidationResponse = {result:true,problems:[],modifiers:undefined};
        if(compiled_validation.operator === '&'){
            compiled_validation.validations.forEach(element=>{
                let talent_element: ITalent = this.character.talents[this.character.getTalentIndex(element.id)];
                if(talent_element.fw < element.min_fw){
                    validation_response.result = false;
                    validation_response.problems.push(
                        `${talent_element.id} ist gerade auf FW ${talent_element.fw}, es muss mind. auf FW ${element.min_fw} sein.`
                    );
                }
            });
            console.log(validation_response);
        }else{
            let count: number = compiled_validation.count;
            compiled_validation.validations.forEach(element=>{
                let talent_element: ITalent = this.character.talents[this.character.getTalentIndex(element.id)];
                if(talent_element.fw >= element.min_fw){
                    count -= 1;
                }else{
                    validation_response.problems.push(`${talent_element.id} ist nicht auf Stufe ${element.min_fw}`);
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