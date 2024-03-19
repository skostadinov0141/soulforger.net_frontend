import { test, expect } from "vitest";
import Character from "../src/functional_components/nirve/nirve_character_v3/Character";
import {
  IRollResult,
  Roll,
} from "../src/functional_components/nirve/nirve_character_v3/Roll";

test("Parse formula", () => {
  // create
  const character = new Character();
  const roll = new Roll();

  // modify
  character.baseStats.strength.default = 10;
  character.baseStats.strength.current = 10;
  character.baseStats.acrobatics.default = 10;
  character.baseStats.acrobatics.current = 10;
  roll.variables.push({ key: "Kraft", value: "baseStats.strength.current" });
  roll.variables.push({
    key: "Akrobatik",
    value: "baseStats.acrobatics.current",
  });
  roll.formula = "(Kraft + Akrobatik):2";
  const result = roll.parseFormula(character);
  const startStrength = character.baseStats.strength.current;
  const startAcrobatics = character.baseStats.acrobatics.current;

  // assert
  expect(result).toBe(`(${startStrength} + ${startAcrobatics}):2`);
});

test("Calculate roll value", () => {
  // create
  const character = new Character();
  const roll = new Roll();

  // modify
  character.baseStats.strength.default = 10;
  character.baseStats.strength.current = 10;
  character.baseStats.acrobatics.default = 10;
  character.baseStats.acrobatics.current = 10;
  roll.variables.push({ key: "Kraft", value: "baseStats.strength.current" });
  roll.variables.push({
    key: "Akrobatik",
    value: "baseStats.acrobatics.current",
  });
  roll.formula = "(Kraft + Akrobatik)/2";
  const result = roll.roll(character);
  const startStrength = character.baseStats.strength.current;
  const startAcrobatics = character.baseStats.acrobatics.current;

  // assert
  expect(result).not.toBe(false);
  expect((result as IRollResult).rollValue).toBe(
    (startStrength + startAcrobatics) / 2
  );
});

test("Calculate roll value with modification", () => {
  // create
  const character = new Character();
  const roll = new Roll();

  // modify
  character.baseStats.strength.default = 10;
  character.baseStats.strength.current = 10;
  character.baseStats.acrobatics.default = 10;
  character.baseStats.acrobatics.current = 10;
  roll.variables.push({ key: "Kraft", value: "baseStats.strength.current" });
  roll.variables.push({
    key: "Akrobatik",
    value: "baseStats.acrobatics.current",
  });
  roll.formula = "(Kraft + Akrobatik)/2";
  const modification: number = 10;
  roll.modifications.push(modification);
  const result = roll.roll(character);
  const startStrength = character.baseStats.strength.current;
  const startAcrobatics = character.baseStats.acrobatics.current;

  // assert
  expect(result).not.toBe(false);
  expect((result as IRollResult).rollValue).toBe(
    (startStrength + startAcrobatics) / 2 + modification
  );
});
