import { test, expect, assert } from "vitest";
import Character from "../src/functional_components/nirve/nirve_character_v3/Character";
import { IModifier } from "../src/functional_components/nirve/nirve_character_v3/Modifier";
import { IRequirement } from "../src/functional_components/nirve/nirve_character_v3/Requirement";
import { ICharacterClassBase } from "../src/functional_components/nirve/nirve_character_v3/CharacterClass";
import { v4 } from "uuid";

test("Add general Modifier", () => {
	// create
	const character = new Character();
	const modifier = <IModifier>{
		id: "test",
		description: "test modifier",
		mode: "+",
		value: 50,
		passive: true,
		active: false,
		target: "age",
	};

	// modify
	const result = character.addModifier(modifier);

	// assert
	expect(result).toBe(true);
	expect(character.modifiers.length).toBe(1);
	expect(character.modifiers[0]).toBe(modifier);
});

test("Add and apply general Modifier", () => {
	// create
	const character = new Character();
	const modifier = <IModifier>{
		id: "test",
		description: "test modifier",
		mode: "+",
		value: 50,
		passive: true,
		active: false,
		target: "age",
	};
	const startAge = character.age;

	// modify
	const resultAddition = character.addModifier(modifier);
	const resultApply = character.applyModifier(0);

	// assert
	expect(resultAddition).toBe(true);
	expect(resultApply).toBe(true);
	expect(character.age).toBe(startAge + modifier.value);
	expect(character.age).not.toBe(startAge);
	expect(character.modifiers.length).toBe(1);
	expect(character.modifiers[0]).toBe(modifier);
});

test("Add and apply general Modifier with negative value", () => {
	// create
	const character = new Character();
	const modifier = <IModifier>{
		id: "test",
		description: "test modifier",
		mode: "-",
		value: 50,
		passive: true,
		active: false,
		target: "age",
	};
	const startAge = character.age;

	// modify
	const resultAddition = character.addModifier(modifier);
	const resultApply = character.applyModifier(0);

	// assert
	expect(resultAddition).toBe(true);
	expect(resultApply).toBe(true);
	expect(character.age).toBe(startAge - modifier.value);
	expect(character.age).not.toBe(startAge);
	expect(character.modifiers.length).toBe(1);
	expect(character.modifiers[0]).toBe(modifier);
});

test("Add and apply general Modifier with multiplication", () => {
	// create
	const character = new Character();
	character.age = 10;
	const modifier = <IModifier>{
		id: "test",
		description: "test modifier",
		mode: "*",
		value: 2,
		passive: true,
		active: false,
		target: "age",
	};
	const startAge = character.age;

	// modify
	const resultAddition = character.addModifier(modifier);
	const resultApply = character.applyModifier(0);

	// assert
	expect(resultAddition).toBe(true);
	expect(resultApply).toBe(true);
	expect(character.age).toBe(startAge * modifier.value);
	expect(character.age).not.toBe(startAge);
	expect(character.modifiers.length).toBe(1);
	expect(character.modifiers[0]).toBe(modifier);
});

test("Add and apply general Modifier with division", () => {
	// create
	const character = new Character();
	character.age = 10;
	const modifier = <IModifier>{
		id: "test",
		description: "test modifier",
		mode: "/",
		value: 2,
		passive: true,
		active: false,
		target: "age",
	};
	const startAge = character.age;

	// modify
	const resultAddition = character.addModifier(modifier);
	const resultApply = character.applyModifier(0);

	// assert
	expect(resultAddition).toBe(true);
	expect(resultApply).toBe(true);
	expect(character.age).toBe(startAge / modifier.value);
	expect(character.age).not.toBe(startAge);
	expect(character.modifiers.length).toBe(1);
	expect(character.modifiers[0]).toBe(modifier);
});

test("Add Class with one requirement (fulfilled)", () => {
	// create
	const character = new Character();
	character.level = 1;
	character.xp = 100;
	const modifier: IModifier = {
		id: "test",
		description: "test modifier",
		mode: "+",
		value: 50,
		passive: true,
		active: false,
		target: "age",
	};
	const requirement: IRequirement = {
		description: "test requirement",
		mode: ">=",
		value: 1,
		target: "level",
	};
	const _class: ICharacterClassBase = {
		id: v4(),
		name: "test class",
		level: 1,
		baseCost: 10,
		levelCost: 10,
		choices: [0],
		requirements: [requirement],
		options: [[modifier]],
	};
	const startAge = character.age;
	const startXP = character.xp;

	// modify
	const resultAddition = character.addClass(_class);

	// assert
	expect(resultAddition).toBe(true);
	expect(character.characterClass.length).toBe(1);
	expect(character.characterClass[0].id).toBe(_class.id);
	expect(character.characterClass[0].name).toBe(_class.name);
	expect(character.characterClass[0].level).toBe(_class.level);
	expect(character.characterClass[0].modifiers.length).toBe(1);
	expect(character.characterClass[0].modifiers[0]).toBe(_class.options[0][0]);
	expect(character.modifierLinks.length).toBe(1);
	expect(character.xp).toBe(startXP - _class.baseCost);
	expect(character.age).eq(modifier.value + startAge);
});

test("Add Class with one requirement (not fulfilled)", () => {
	// create
	const character = new Character();
	character.level = 1;
	character.xp = 100;
	const modifier: IModifier = {
		id: "test",
		description: "test modifier",
		mode: "+",
		value: 50,
		passive: true,
		active: false,
		target: "age",
	};
	const requirement: IRequirement = {
		description: "test requirement",
		mode: ">=",
		value: 2,
		target: "level",
	};
	const _class: ICharacterClassBase = {
		id: v4(),
		name: "test class",
		level: 1,
		baseCost: 10,
		levelCost: 10,
		choices: [0],
		requirements: [requirement],
		options: [[modifier]],
	};
	const startAge = character.age;
	const startXP = character.xp;

	// modify
	const resultAddition = character.addClass(_class);

	// assert
	expect(resultAddition).toBe(false);
	expect(character.characterClass.length).toBe(0);
	expect(character.modifierLinks.length).toBe(0);
	expect(character.xp).toBe(startXP);
	expect(character.age).toBe(startAge);
});

test("Add Class with multiple requirements (fulfilled)", () => {
	// create
	const character = new Character();
	character.level = 2;
	character.xp = 100;
	const modifier: IModifier = {
		id: "test",
		description: "test modifier",
		mode: "+",
		value: 50,
		passive: true,
		active: false,
		target: "age",
	};
	const requirement1: IRequirement = {
		description: "test requirement",
		mode: ">=",
		value: 1,
		target: "level",
	};
	const requirement2: IRequirement = {
		description: "test requirement",
		mode: ">=",
		value: 2,
		target: "level",
	};
	const _class: ICharacterClassBase = {
		id: v4(),
		name: "test class",
		level: 1,
		baseCost: 10,
		levelCost: 10,
		choices: [0],
		requirements: [requirement1, requirement2],
		options: [[modifier]],
	};
	const startAge = character.age;
	const startXP = character.xp;

	// modify
	const resultAddition = character.addClass(_class);

	// assert
	expect(resultAddition).toBe(true);
	expect(character.characterClass.length).toBe(1);
	expect(character.characterClass[0].id).toBe(_class.id);
	expect(character.characterClass[0].name).toBe(_class.name);
	expect(character.characterClass[0].level).toBe(_class.level);
	expect(character.characterClass[0].modifiers.length).toBe(1);
	expect(character.characterClass[0].modifiers[0]).toBe(_class.options[0][0]);
	expect(character.modifierLinks.length).toBe(1);
	expect(character.xp).toBe(startXP - _class.baseCost);
	expect(character.age).toBe(modifier.value + startAge);
});

test("Add Class with multiple requirements (not fulfilled)", () => {
	// create
	const character = new Character();
	character.level = 1;
	character.xp = 100;
	const modifier: IModifier = {
		id: "test",
		description: "test modifier",
		mode: "+",
		value: 50,
		passive: true,
		active: false,
		target: "age",
	};
	const requirement1: IRequirement = {
		description: "test requirement",
		mode: ">=",
		value: 1,
		target: "level",
	};
	const requirement2: IRequirement = {
		description: "test requirement",
		mode: ">=",
		value: 2,
		target: "level",
	};
	const _class: ICharacterClassBase = {
		id: v4(),
		name: "test class",
		level: 1,
		baseCost: 10,
		levelCost: 10,
		choices: [0],
		requirements: [requirement1, requirement2],
		options: [[modifier]],
	};
	const startAge = character.age;
	const startXP = character.xp;

	// modify
	const resultAddition = character.addClass(_class);

	// assert
	expect(resultAddition).toBe(false);
	expect(character.characterClass.length).toBe(0);
	expect(character.modifierLinks.length).toBe(0);
	expect(character.xp).toBe(startXP);
	expect(character.age).toBe(startAge);
});

test("Add Class with multiple modifiers", () => {
	// create
	const character = new Character();
	character.level = 1;
	character.xp = 100;
	const modifier1: IModifier = {
		id: "test1",
		description: "test modifier",
		mode: "+",
		value: 50,
		passive: true,
		active: false,
		target: "age",
	};
	const modifier2: IModifier = {
		id: "test2",
		description: "test modifier",
		mode: "+",
		value: 50,
		passive: true,
		active: false,
		target: "level",
	};
	const requirement1: IRequirement = {
		description: "test requirement",
		mode: ">=",
		value: 1,
		target: "level",
	};
	const _class: ICharacterClassBase = {
		id: v4(),
		name: "test class",
		level: 1,
		baseCost: 10, // removed from xp at lvl 1
		levelCost: 5, // from lvl 2 on
		choices: [0, 0], // not always an OR situation
		options: [
			[modifier1, modifier2], // ["string1","string2"]
			[modifier2, modifier1],
		],
		requirements: [requirement1],
	};
	const startAge = character.age;
	const startXP = character.xp;
	const startLevel = character.level;

	// modify
	const resultAddition = character.addClass(_class);

	// assert
	expect(resultAddition).toBe(true);
	expect(character.characterClass.length).toBe(1);
	expect(character.characterClass[0].id).toBe(_class.id);
	expect(character.characterClass[0].name).toBe(_class.name);
	expect(character.characterClass[0].level).toBe(_class.level);
	expect(character.characterClass[0].modifiers.length).toBe(2);
	expect(character.characterClass[0].modifiers[0]).toBe(_class.options[0][0]);
	expect(character.characterClass[0].modifiers[1]).toBe(_class.options[1][0]);
	expect(character.modifierLinks.length).toBe(2);
	expect(character.xp).toBe(startXP - _class.baseCost - _class.levelCost);
	expect(character.age).toBe(modifier1.value + startAge);
	expect(character.level).toBe(modifier2.value + startLevel);
});
