import { NirveTypes } from "./dto/nirve-common.dto";

export class NirveCommon {
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
