import { NirveTypes } from "./nirve-common.dto";

export class NirveCreateDto {
  name: string;
  description: string;
  updatedAt: Date;
  creatorNotes: string;
  type: NirveTypes;
}
