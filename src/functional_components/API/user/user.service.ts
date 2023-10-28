import { plainToClass } from "class-transformer";
import BaseService from "../abstract.service";
import API from "../api_new";
import User from "./user.interface";
import { CreateUserDto } from "./dto/create-user.dto";

export class UserService extends BaseService {
	constructor(api: API) {
		super(api);
		this.uri = "user";
	}

	/**
	 * Retrieves a user by their ID.
	 * @param id The ID of the user to retrieve.
	 * @returns A Promise that resolves with the retrieved User object, or rejects with an error.
	 */
	async getById(id: string): Promise<User> {
		return new Promise(async (resolve, reject) => {
			try {
				let axiosInstance = await this.api.getAxios();
				axiosInstance
					.get(`${this.uri}/${id}`)
					.then((res) => {
						resolve(plainToClass(User, res.data));
					})
					.catch((err) => {
						reject(err);
					});
			} catch (err) {
				reject(err);
			}
		});
	}

	async post(data: CreateUserDto): Promise<any> {}
}
