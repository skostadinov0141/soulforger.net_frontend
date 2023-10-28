import API from "./api_new";

export default abstract class BaseService {
	protected api: API;
	protected uri: string;

	constructor(api: API) {
		this.api = api;
	}

	// Create
	abstract post(data: any): Promise<any>;

	// Read
	abstract get(): Promise<any>;
	abstract getById(id: string): Promise<any>;
	abstract search(query: string): Promise<any>;

	// Update
	abstract put(data: any): Promise<any>;
	abstract putById(id: string, data: any): Promise<any>;

	// Delete
	abstract delete(): Promise<any>;
	abstract deleteById(id: string): Promise<any>;
}
