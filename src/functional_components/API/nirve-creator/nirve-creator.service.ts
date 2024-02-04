import BaseService from "@/functional_components/API/abstract.service";
import { NirveCommon } from "@/functional_components/API/nirve-creator/nirve-common.class";
import API from "@/functional_components/API/api";
import { NirveCreateDto } from "@/functional_components/API/nirve-creator/dto/nirve-create.dto";

export class NirveCreatorService extends BaseService<NirveCommon> {
  constructor(apiInstance: API) {
    super(apiInstance, "nirve-creator", NirveCommon);
  }

  async post(data: NirveCreateDto): Promise<NirveCommon> {
    return super.post(data);
  }
}
