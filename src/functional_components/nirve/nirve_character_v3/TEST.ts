import { v4 } from "uuid";
import Character from "./Character";
import { ICharacterClass } from "./CharacterClass";
import { IModifier } from "./Modifier";


export default function test(){
    let character = new Character();
    console.log(character.xp);
    character.addClass(<ICharacterClass>{
        name: "Old Man",
        level: 1,
        modifiers: [
            <IModifier>{
                id: 'test2',
                description: "Old Man Level 1",
                mode: "+",
                value: 500,
                passive: true,
                active: false,
                target: "xp"
            }
        ]
    });
    character.applyModifier(0);
    console.log(character.xp);
}