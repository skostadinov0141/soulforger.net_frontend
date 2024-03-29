import BaseService from "@/functional_components/API/abstract.service";
import { NirveCommon } from "@/functional_components/API/nirve-creator/nirve-common.class";
import API from "@/functional_components/API/api";
import { NirveCreateDto } from "@/functional_components/API/nirve-creator/dto/nirve-create.dto";
import { Queries } from "@/functional_components/API/query.types";

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export type NirveCommonQuery = Partial<{ [K in keyof NirveCommon]: Queries }>;

export class NirveCreatorService extends BaseService<NirveCommon> {
  constructor(apiInstance: API) {
    super(apiInstance, "nirve-creator", NirveCommon);
  }

  async post(data: NirveCreateDto): Promise<NirveCommon> {
    return super.post(data);
  }

  async search(query: NirveCommonQuery): Promise<NirveCommon[]> {
    return super.search(query);
  }
}
