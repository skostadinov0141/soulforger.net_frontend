import axios, { AxiosError, AxiosInstance, AxiosResponse } from "axios";
import { VueCookies } from "vue-cookies";
import { AuthResult, RegistrationData } from "../interfaces/api";
import { plainToClass } from "class-transformer";

export default class API {
	axios: AxiosInstance;
	authed: boolean = false;
	token: string = "";

	constructor(authToken?: string) {
		if (authToken) {
			this.axios = axios.create({
				baseURL: import.meta.env.VITE_API_URL,
				headers: {
					Authorization: `Bearer ${authToken}`,
				},
			});
		} else {
			this.axios = axios.create({
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
			this.axios
				?.post("/auth/login", params)
				.then((res: AxiosResponse) => {
					let authResult = plainToClass(AuthResult, res.data);
					cookies.set("authToken", authResult.access_token, authResult.exp);
					this.authorize(authResult.access_token);
					resolve(true);
				})
				.catch((err: AxiosError) => {
					reject(err);
				});
		});
	}

	async register(registrationData: RegistrationData): Promise<boolean> {
		return new Promise((resolve, reject) => {
			this.axios
				?.post("/auth/register", registrationData)
				.then((res: AxiosResponse) => {
					resolve(true);
				})
				.catch((err: AxiosError) => {
					reject(err);
				});
		});
	}

	authorize(authToken: string) {
		this.axios = axios.create({
			baseURL: import.meta.env.VITE_API_URL,
			headers: {
				Authorization: `Bearer ${authToken}`,
			},
		});
		this.token = authToken;
		this.authed = true;
	}

	getAuthToken(): string {
		return this.token;
	}

	getAxios(): AxiosInstance {
		if (!this.axios) {
			throw new Error("No axios instance found!");
		}
		return this.axios;
	}
}
