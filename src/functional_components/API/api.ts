import axios, { AxiosError, AxiosInstance, AxiosResponse } from "axios";
import { TokenDto } from "./dto/token.dto";
import { SignInDto } from "./dto/sign-in.dto";
import { VueCookies } from "vue-cookies";
import { UserService } from "./user/user.service";
import { ProfileService } from "./profile/profile.service";
import { NirveCreatorService } from "./nirve-creator/nirve-creator.service";
import jwtDecode from "jwt-decode";

export default class API {
	cookies: VueCookies;
	baseUrl: string = import.meta.env.VITE_API_URL;
	apiVersion: string = import.meta.env.VITE_API_VERSION;

	userService: UserService = new UserService(this);
	profileService: ProfileService = new ProfileService(this);
	nirveCreatorService: NirveCreatorService = new NirveCreatorService(this);

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
	async getAxios(isPublic?: boolean): Promise<AxiosInstance> {
		if (isPublic) {
			return axios.create({
				baseURL: `${this.baseUrl}/${this.apiVersion}`,
			});
		}
		return new Promise(async (resolve, reject) => {
			if (!this.getToken()) {
				reject("Du bist nicht eingeloggt!");
			}
			if (this.getToken()!.expires_at < Date.now()) {
				try {
					await this.refreshToken();
				} catch (err) {
					reject(err);
				}
			}
			resolve(
				axios.create({
					baseURL: `${this.baseUrl}/${this.apiVersion}`,
					headers: {
						Authorization: `Bearer ${this.getToken()?.access_token}`,
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
	async refreshToken() {
		return new Promise((resolve, reject) => {
			axios
				.post(`${this.baseUrl}/${this.apiVersion}/auth/refresh`, {
					refresh_token: this.getToken()?.refresh_token,
				})
				.then((res: AxiosResponse) => {
					this.cookies.set("token", res.data, res.data.expires_at);
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
	async login(
		loginDto: SignInDto,
		cookiesInstance: VueCookies
	): Promise<boolean> {
		this.cookies = cookiesInstance;
		return new Promise((resolve, reject) => {
			axios
				.post(`${this.baseUrl}/${this.apiVersion}/auth/sign-in`, loginDto)
				.then((res: AxiosResponse) => {
					this.cookies.set("token", res.data, res.data.expires_at);
					resolve(true);
				})
				.catch((err: AxiosError) => {
					reject(err.message);
				});
		});
	}

	/**
	 * Decodes the access token and returns the decoded token data.
	 * @returns {TokenDto} The decoded token data.
	 * @throws {Error} If no token is found.
	 */
	decodeToken(): any {
		if (!this.getToken()?.access_token) throw new Error("No token found!");
		return jwtDecode(this.getToken()?.access_token!);
	}

	/**
	 * Retrieves the token from the cookies.
	 * @returns The token if it exists, otherwise undefined.
	 */
	getToken(): TokenDto | undefined {
		return this.cookies.get("token");
	}
}
