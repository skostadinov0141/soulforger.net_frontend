export class NirveCommonDto {
  _id: string;
  name: string;
  description: string;
  location: string;
  createdBy: string;
  createdAt: Date;
  updatedAt: Date;
  creationPhase: number;
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
