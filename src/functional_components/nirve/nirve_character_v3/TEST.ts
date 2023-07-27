import { v4 } from "uuid";
import Character from "./Character";
import { ICharacterClass, ICharacterClassBase } from "./CharacterClass";
import { IModifier } from "./Modifier";
import { IRequirement } from "./Requirement";


export default function test(){
    let character = new Character();
    console.log(character.xp);
    character.addClass(<ICharacterClassBase>{
        id: v4(),
        name: "Old Man",
        level: 1,
        baseCost: 25,
        levelCost: 15,
        choices: [0],
        options: [
            [
                <IModifier>{
                    id: 'test2',
                    description: "Old Man Level 1",
                    mode: "+",
                    value: 50,
                    passive: true,
                    active: false,
                    target: "age"
                }
            ]
        ],
        requirements: [
            <IRequirement>{
                target: "level",
                mode: ">=",
                value: 1,
                description: "test requirement"
            }
        ]
    });
    // console.log(character.checkRequirement(<IRequirement>{
    //     target: "level",
    //     mode: ">=",
    //     value: 1,
    //     description: "test requirement"
    // }));
    // character.applyModifier(0);
    console.log(character.xp);
}