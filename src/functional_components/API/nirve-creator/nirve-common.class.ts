import { NirveTypes } from "@/functional_components/API/nirve-creator/dto/nirve-create.dto";

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
  tags: string[];
  groups: string[];
}
