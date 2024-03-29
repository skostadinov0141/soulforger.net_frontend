import API from "@/functional_components/API/api";
import BaseService from "@/functional_components/API/abstract.service";
import { NirveTag } from "@/functional_components/API/nirve-tag/nirve-tag.class";
import { CreateNirveTagDto } from "@/functional_components/API/nirve-tag/dto/create-nirve-tag.dto";
import { NirveGroup } from "@/functional_components/API/nirve-group/nirve-group.class";
import { Queries } from "@/functional_components/API/query.types";

export type NirveTagQuery = Partial<{ [K in keyof NirveTag]: Queries }>;

export class NirveTagService extends BaseService<NirveTag> {
  constructor(apiInstance: API) {
    super(apiInstance, "nirve-tag", NirveTag);
  }

  async post(data: CreateNirveTagDto): Promise<NirveTag> {
    return await super.post(data);
  }
}
