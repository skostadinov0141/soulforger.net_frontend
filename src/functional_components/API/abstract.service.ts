import API from "./api";
import { Queries } from "./queryConstructor";

export default abstract class BaseService {
	protected api: API;
	protected uri: string;

	constructor(api: API) {
		this.api = api;
	}

	/**
	 * NOT IMPLEMENTED, DO NOT USE
	 */
	async post(data: any, ...args: any): Promise<any> {}

	/**
	 * NOT IMPLEMENTED, DO NOT USE
	 */
	async getById(id: string): Promise<any> {}
	/**
	 * NOT IMPLEMENTED, DO NOT USE
	 */
	async search<T>(
		query?: Partial<{ [K in keyof T]: Queries }>,
		limit?: number,
		skip?: number
	): Promise<any> {}

	/**
	 * NOT IMPLEMENTED, DO NOT USE
	 */
	async patch(id: string, data: any): Promise<any> {}

	/**
	 * NOT IMPLEMENTED, DO NOT USE
	 */
	async deleteById(id: string): Promise<any> {}
}
