import BaseService from "../abstract.service";
import User from "./user.class";
import API from "@/functional_components/API/api";
import { CreateUserDto } from "@/functional_components/API/user/dto/create-user.dto";
export class UserService extends BaseService<User> {
  constructor(apiInstance: API) {
    super(apiInstance, "user", User);
  }

  async post(data: CreateUserDto): Promise<User> {
    return super.post(data, true);
  }
}
