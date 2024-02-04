import API from "@/functional_components/API/api";
import BaseService from "@/functional_components/API/abstract.service";
import {NirveGroup} from "@/functional_components/API/nirve-group/nirve-group.class";
import {CreateNirveGroupDto} from "@/functional_components/API/nirve-group/dto/create-nirve-group.dto";

export class NirveGroupService extends BaseService<NirveGroup>{
    constructor(apiInstance: API){
        super(apiInstance, 'nirve-group', NirveGroup);
    }

    async post(data: CreateNirveGroupDto): Promise<NirveGroup>{
        return await super.post(data);
    }
}
