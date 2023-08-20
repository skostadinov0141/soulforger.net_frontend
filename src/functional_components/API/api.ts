import axios, { AxiosError, AxiosInstance, AxiosResponse } from "axios";
import { VueCookies } from "vue-cookies";
import { AuthResult } from "../interfaces/api";
import { plainToClass } from "class-transformer";

export default class API {
	private _axios: AxiosInstance | undefined;
	authed: boolean = false;

	constructor(authToken?: string) {
		if (authToken) {
			this._axios = axios.create({
				baseURL: import.meta.env.VITE_API_URL,
				headers: {
					Authorization: `Bearer ${authToken}`,
				},
			});
		} else {
			this._axios = axios.create({
				baseURL: import.meta.env.VITE_API_URL,
			});
		}
	}

	async login(
		username: string,
		password: string,
		cookies: VueCookies
	): Promise<boolean> {
		const params = new URLSearchParams();
		params.append("username", username);
		params.append("password", password);
		params.append("remember", "true");
		return new Promise((resolve, reject) => {
			this._axios
				?.post("/auth/login", params)
				.then((res: AxiosResponse) => {
					let authResult = plainToClass(AuthResult, res.data);
					cookies.set("authToken", authResult.access_token, authResult.exp);
					console.log(new Date(authResult.exp));
					this.authed = true;
					resolve(true);
				})
				.catch((err: AxiosError) => {
					reject(err);
				});
		});
	}
}
