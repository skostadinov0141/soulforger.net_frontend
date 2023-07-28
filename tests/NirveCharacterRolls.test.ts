import { test, expect, assert } from 'vitest';
import Character from '../src/functional_components/nirve/nirve_character_v3/Character';
import { IModifier } from '../src/functional_components/nirve/nirve_character_v3/Modifier';
import { IRequirement } from '../src/functional_components/nirve/nirve_character_v3/Requirement';
import { ICharacterClassBase } from '../src/functional_components/nirve/nirve_character_v3/CharacterClass';
import { v4 } from 'uuid';
import { IRollResult, Roll } from '../src/functional_components/nirve/nirve_character_v3/Roll';

test('Parse formula', () => {
    // create
    let character = new Character();
    let roll = new Roll();

    // modify
    character.baseStats.strength.default = 10;
    character.baseStats.strength.current = 10;
    character.baseStats.acrobatics.default = 10;
    character.baseStats.acrobatics.current = 10;
    roll.variables.push({key: 'Kraft', value: 'baseStats.strength.current'});
    roll.variables.push({key: 'Akrobatik', value: 'baseStats.acrobatics.current'});
    roll.formula = '(Kraft + Akrobatik):2';
    let result = roll.parseFormula(character);
    let startStrength = character.baseStats.strength.current;
    let startAcrobatics = character.baseStats.acrobatics.current;

    // assert
    expect(result).toBe(`(${startStrength} + ${startAcrobatics}):2`);
});

test('Calculate roll value', () => {
    // create
    let character = new Character();
    let roll = new Roll();

    // modify
    character.baseStats.strength.default = 10;
    character.baseStats.strength.current = 10;
    character.baseStats.acrobatics.default = 10;
    character.baseStats.acrobatics.current = 10;
    roll.variables.push({key: 'Kraft', value: 'baseStats.strength.current'});
    roll.variables.push({key: 'Akrobatik', value: 'baseStats.acrobatics.current'});
    roll.formula = '(Kraft + Akrobatik)/2';
    let result = roll.roll(character);
    let startStrength = character.baseStats.strength.current;
    let startAcrobatics = character.baseStats.acrobatics.current;

    // assert
    expect(result).not.toBe(false);
    expect((result as IRollResult).rollValue).toBe((startStrength + startAcrobatics) / 2);
});

test('Calculate roll value with modification', () => {
    // create
    let character = new Character();
    let roll = new Roll();

    // modify
    character.baseStats.strength.default = 10;
    character.baseStats.strength.current = 10;
    character.baseStats.acrobatics.default = 10;
    character.baseStats.acrobatics.current = 10;
    roll.variables.push({key: 'Kraft', value: 'baseStats.strength.current'});
    roll.variables.push({key: 'Akrobatik', value: 'baseStats.acrobatics.current'});
    roll.formula = '(Kraft + Akrobatik)/2';
    let modification: number = 10;
    roll.modifications.push(modification);
    let result = roll.roll(character);
    let startStrength = character.baseStats.strength.current;
    let startAcrobatics = character.baseStats.acrobatics.current;

    // assert
    expect(result).not.toBe(false);
    expect((result as IRollResult).rollValue).toBe((startStrength + startAcrobatics) / 2 + modification);
});