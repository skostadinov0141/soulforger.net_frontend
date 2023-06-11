export interface Validations {
    email_format: boolean;
    contains_uppercase: boolean;
    contains_lowercase: boolean;
    contains_number: boolean;
    contains_special: boolean;
    not_contains_special: boolean;
    not_contains_whitespace: boolean;
    min_length: boolean;
    max_length: boolean;
}

export interface Validation {
    name: string;
    enabled: boolean;
    content: string;
    count?: number;
}

export class Validate{

    validations: Validation[] = [
        {name:'email_format',enabled:false,content:'Ist eine gültige E-Mail Adresse'},
        {name:'contains_uppercase',enabled:false,content:'Enthält einen Großbuchstaben'},
        {name:'contains_lowercase',enabled:false,content:'Enthält einen Kleinbuchstaben'},
        {name:'contains_number',enabled:false,content:'Enthält eine Zahl'},
        {name:'contains_special',enabled:false,content:'Enthält ein Sonderzeichen'},
        {name:'not_contains_special',enabled:false,content:'Enthält kein Sonderzeichen'},
        {name:'not_contains_whitespace',enabled:false,content:'Enthält keine Leerzeichen'},
        {name:'min_length',enabled:false,content:'',count:0},
        {name:'max_length',enabled:false,content:'',count:0},
    ];

    constructor(_validations: string[], min_count?: number, max_count?: number){
        _validations.forEach(validation => {
            if(validation.includes(':')){
                let validation_parsed = validation.split(':');
                let index = this.validations.indexOf(this.validations.find(element=>element.name === validation_parsed[0])!);
                this.validations[index].enabled = true;
                this.validations[index].count = parseInt(validation_parsed[1]);
                if(validation_parsed[0] === 'min_length') this.validations[index].content = "Enthält mindestens " + this.validations[index].count + " Zeichen";
                if(validation_parsed[0] === 'max_length') this.validations[index].content = "Enthält maximal " + this.validations[index].count + " Zeichen";
                // this.validations[index].content = "Enthält mindestens " + this.validations[index].count + " Zeichen";
            }else{
                this.validations[this.validations.indexOf(this.validations.find(element=>element.name === validation)!)].enabled = true;
            }
        });
    }

    public getValidationsContent(): string[]{
        let content: string[] = [];
        this.validations.forEach(validation => {
            if(validation.enabled){
                content.push(validation.content);
            }
        });
        return content;
    }

    public validate(value: string): string[]{
        let failed: string[] = [];
        this.validations.forEach(validation => {
            switch(validation.name){
                case 'email_format':
                    if(!this.validateEmailFormat(value)){
                        failed.push(validation.content);
                    }
                    break;

                case 'contains_uppercase':
                    if(!this.validateContainsUppercase(value)){
                        failed.push(validation.content);
                    }
                    break;

                case 'contains_lowercase':
                    if(!this.validateContainsLowercase(value)){
                        failed.push(validation.content);
                    }
                    break;

                case 'contains_number':
                    if(!this.validateContainsNumber(value)){
                        failed.push(validation.content);
                    }
                    break;

                case 'contains_special':
                    if(!this.validateContainsSpecial(value)){
                        failed.push(validation.content);
                    }
                    break;

                case 'not_contains_special':
                    if(!this.validateNotContainsSpecial(value)){
                        failed.push(validation.content);
                    }
                    break;

                case 'not_contains_whitespace':
                    if(!this.validateNotContainsWhitespace(value)){
                        failed.push(validation.content);
                    }
                    break;

                case 'min_length':
                    if(!this.validateMinLength(value)){
                        failed.push(validation.content);
                    }
                    break;

                case 'max_length':
                    if(!this.validateMaxLength(value)){
                        failed.push(validation.content);
                    }
                    break;

                default:
                    break;
            }
        });
        return failed;
    }

    private validateEmailFormat(value: string): boolean{
        let regex = new RegExp('^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$');
        return regex.test(value);
    }

    private validateContainsUppercase(value: string): boolean{
        let regex = new RegExp('[A-Z]');
        return regex.test(value);
    }

    private validateContainsLowercase(value: string): boolean{
        let regex = new RegExp('[a-z]');
        return regex.test(value);
    }

    private validateContainsNumber(value: string): boolean{
        let regex = new RegExp('[0-9]');
        return regex.test(value);
    }

    private validateContainsSpecial(value: string): boolean{
        let regex = new RegExp('[^a-zA-Z0-9]');
        return regex.test(value);
    }

    private validateNotContainsSpecial(value: string): boolean{
        let regex = new RegExp('[^a-zA-Z0-9]');
        return !regex.test(value);
    }

    private validateNotContainsWhitespace(value: string): boolean{
        let regex = new RegExp('\\s');
        return !regex.test(value);
    }

    private validateMinLength(value: string): boolean{
        let result = value.length >= this.validations[this.validations.indexOf(this.validations.find(element=>element.name === 'min_length')!)].count!;
        return result;
    }

    private validateMaxLength(value: string): boolean{
        let result = value.length <= this.validations[this.validations.indexOf(this.validations.find(element=>element.name === 'max_length')!)].count!;
        return result;
    }

}