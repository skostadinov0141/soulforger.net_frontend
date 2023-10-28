import axios, { AxiosError, AxiosInstance } from "axios";
import { TokenDto } from "./dto/token.dto";
import { SignInDto } from "./dto/sign-in.dto";
import { VueCookies } from "vue-cookies";

export default class API {
	token?: TokenDto;
	cookies: VueCookies;
	baseUrl: string = import.meta.env.VITE_API_URL;
	apiVersion: string = import.meta.env.VITE_API_VERSION;

	constructor(cookies: VueCookies) {
		this.cookies = cookies;
	}

	/**
	 * @description Get an axios instance with the authorization header, automatically refreshes the token if it is expired
	 * @returns {Promise<AxiosInstance>} Axios instance
	 * @throws {string} Error if user is not logged in
	 * @throws {AxiosError} API Error if token refresh was not successful
	 * @memberof API
	 */
	async getAxios(): Promise<AxiosInstance> {
		return new Promise(async (resolve, reject) => {
			if (!this.token) {
				reject("Du bist nicht eingeloggt!");
			}
			if (this.token!.expires_at < Date.now()) {
				try {
					await this.refreshToken(this.token!.refresh_token);
				} catch (err) {
					reject(err);
				}
			}
			resolve(
				axios.create({
					baseURL: `${this.baseUrl}/${this.apiVersion}`,
					headers: {
						Authorization: `Bearer ${this.token?.access_token}`,
					},
				})
			);
		});
	}

	/**
	 * @description Refresh the access token
	 * @param {string} refreshToken Refresh token
	 * @returns {Promise<boolean>} True if refresh was successful
	 * @throws {AxiosError} API Error if token refresh was not successful
	 * @memberof API
	 */
	private async refreshToken(refreshToken: string) {
		return new Promise((resolve, reject) => {
			axios
				.post(`${this.baseUrl}/${this.apiVersion}/auth/refresh`, {
					refresh_token: refreshToken,
				})
				.then((res) => {
					this.token = res.data;
					this.cookies.set(
						"token",
						this.token?.access_token,
						this.token?.expires_at
					);
					resolve(true);
				})
				.catch((err: AxiosError) => {
					reject(err);
				});
		});
	}

	/**
	 * @description Login to the API and save the access token
	 * @param {SignInDto} loginDto Login data (username, password)
	 * @returns {Promise<boolean>} True if login was successful
	 * @throws {AxiosError} API Error if login was not successful
	 * @memberof API
	 */
	async login(loginDto: SignInDto): Promise<boolean> {
		return new Promise((resolve, reject) => {
			axios
				.post(`${this.baseUrl}/${this.apiVersion}/auth/sign-in`, loginDto)
				.then((res) => {
					this.token = res.data;
					this.cookies.set(
						"token",
						this.token?.access_token,
						this.token?.expires_at
					);
					resolve(true);
				})
				.catch((err: AxiosError) => {
					reject(err.message);
				});
		});
	}
}
