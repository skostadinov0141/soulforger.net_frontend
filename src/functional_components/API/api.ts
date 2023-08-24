import axios, { AxiosError, AxiosInstance, AxiosResponse } from "axios";
import { VueCookies } from "vue-cookies";
import { AuthResult, RegistrationData } from "../interfaces/api";
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

	/**
	 * Attepmts to login with the given credentials
	 * @param username The user's unique identifier, in this case an email address
	 * @param password The user's password
	 * @param cookies An instance of VueCookies, used to save the auth token
	 * @returns Promise<boolean> True if the login was successful
	 * @throws AxiosError If the login was not successful
	 */
	async login(
		username: string,
		password: string,
		remember: boolean,
		cookies: VueCookies
	): Promise<boolean> {
		const params = new URLSearchParams();
		params.append("username", username);
		params.append("password", password);
		params.append("remember", remember.toString());
		return new Promise((resolve, reject) => {
			this._axios
				?.post("/auth/login", params)
				.then((res: AxiosResponse) => {
					let authResult = plainToClass(AuthResult, res.data);
					cookies.set("authToken", authResult.access_token, authResult.exp);
					this.authed = true;
					resolve(true);
				})
				.catch((err: AxiosError) => {
					reject(err);
				});
		});
	}

	async register(registrationData: RegistrationData): Promise<boolean> {
		return new Promise((resolve, reject) => {
			this._axios
				?.post("/auth/register", registrationData)
				.then((res: AxiosResponse) => {
					resolve(true);
				})
				.catch((err: AxiosError) => {
					reject(err);
				});
		});
	}

	getAxios(): AxiosInstance {
		if (!this._axios) {
			throw new Error("No axios instance found!");
		}
		return this._axios;
	}
}
