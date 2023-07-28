import { Parser } from "expr-eval";
import { getProperty } from "./ObjectHelpers";
import { v4 } from "uuid";

interface IVariable{
    key: string;
    value: string;
}

export interface IRollResult{
    success: boolean;
    rollValue: number;
    diceValue: number;
    difference: number;
}

export class Roll{
    name: string = '';
    description: string = '';
    variables: IVariable[] = [];
    modifications: number[] = [];
    formula: string = "";

    toJSON(): object{
        return {
            _id: v4(),
            name: this.name,
            description: this.description,
            variables: this.variables,
            modifications: this.modifications,
            formula: this.formula
        }
    }

    parseFormula(parent:object): string | false{
        let parsedFormula = this.formula;
        for(const variable of this.variables){
            let findResult = getProperty(parent, variable.value);
            if(!findResult){return false;}
            if(typeof findResult !== 'number'){return false;}
            parsedFormula = parsedFormula.replaceAll(variable.key, findResult.toString());
        }
        return parsedFormula;
    }

    roll(parent:object): IRollResult | false{
        let parsedFormula = this.parseFormula(parent);
        if(!parsedFormula){return false;}
        let rollValue = new Parser().evaluate(parsedFormula);
        console.log(rollValue);
        for(const modification of this.modifications){
            rollValue += modification;
        }
        let rollDice = this.rollDice(1,100);
        let difference = rollValue - rollDice;
        return {
            success: (rollValue >= rollDice),
            rollValue: rollValue,
            diceValue: rollDice,
            difference: difference
        }
    }

    rollDice(min:number,max:number): number{
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }
}