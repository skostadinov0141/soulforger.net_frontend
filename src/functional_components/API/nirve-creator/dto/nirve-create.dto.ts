export class NirveCreateDto {
  name: string;
  description: string;
  updatedAt: Date;
  creatorNotes: string;
  type: NirveTypes;
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
