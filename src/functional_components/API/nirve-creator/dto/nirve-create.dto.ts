export class NirveCreateDto {
  name: string;
  description: string;
  creatorNotes: string;
  type: NirveTypes;
  tags: string[];
  groups: string[];
}

export type NirveTypes =
  | "bending-skill"
  | "character-class"
  | "disadvantage"
  | "item"
  | "race"
  | "religion"
  | "skill"
  | "spell";
