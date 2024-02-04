import BaseService from "../abstract.service";
import { Profile } from "./profile.class";
import API from "@/functional_components/API/api";

export class ProfileService extends BaseService<Profile> {
    constructor(apiInstance: API) {
        super(apiInstance, 'profile', Profile);
    }

    /**
     * NOT SUPPORTED, DO NOT USE
     * @throws Error
     */
    async post(): Promise<Profile> {
        throw new Error('Not supported by the Profile service');
    }

    /**
     * NOT SUPPORTED, DO NOT USE
     * @throws Error
     */
    async delete(): Promise<Profile> {
        throw new Error('Not supported by the Profile service');
    }
}
