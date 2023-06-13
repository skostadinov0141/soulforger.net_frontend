export class Validate{

    public validateEmailFormat(value: string): boolean{
        let regex = new RegExp(/(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/);
        return regex.test(value);
    }
    
    public validateContainsUppercase(value: string): boolean{
        let regex = new RegExp('[A-Z]');
        return regex.test(value);
    }
    
    public validateContainsLowercase(value: string): boolean{
        let regex = new RegExp('[a-z]');
        return regex.test(value);
    }
    
    public validateContainsNumber(value: string): boolean{
        let regex = new RegExp('[0-9]');
        return regex.test(value);
    }
    
    public validateContainsSpecial(value: string): boolean{
        let regex = new RegExp('[^a-zA-Z0-9]');
        return regex.test(value);
    }
    
    public validateNotContainsSpecial(value: string): boolean{
        let regex = new RegExp('[^a-zA-Z0-9]');
        return !regex.test(value);
    }
    
    public validateNotContainsWhitespace(value: string): boolean{
        let regex = new RegExp('\\s');
        return !regex.test(value);
    }
    
    public validateMinLength(value: string, min_length: number): boolean{
        let result = value.length >= min_length;
        return result;
    }

    public validateMaxLength(value: string, max_length: number): boolean{
        let result = value.length <= max_length;
        return result;
    }

    public compareValues(value1: string, value2: string): boolean{
        return value1 === value2;
    }

}