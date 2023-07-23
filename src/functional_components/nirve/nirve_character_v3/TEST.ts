import { v4 } from "uuid";
import Character from "./Character";
import { ICharacterClass } from "./CharacterClass";


export default function test(){
    let character = new Character();
    console.log(character.age);
    character.addClass(<ICharacterClass>{
        name: "Old Man",
        level: 1,
        modifiers: [
            {
                id: 'test2',
                description: "Old Man Level 1",
                mode: "+",
                value: 50,
                passive: true,
                active: false
            }
        ]
    });
    character.applyModifier('test2');
    console.log(character.age);
}