import axios, { AxiosError, AxiosInstance, AxiosResponse } from "axios";
import { TokenDto } from "./dto/token.dto";
import { LoginDto } from "./dto/login.dto";
import { VueCookies } from "vue-cookies";
import { UserService } from "./user/user.service";
import { ProfileService } from "./profile/profile.service";
import { NirveCreatorService } from "./nirve-creator/nirve-creator.service";
import jwtDecode from "jwt-decode";
import { useApiStore } from "@/store/api";
import { NirveGroupService } from "@/functional_components/API/nirve-group/nirve-group.service";
import { NirveTagService } from "@/functional_components/API/nirve-tag/nirve-tag.service";
import { useAppStore } from "@/store/app";
import User from "@/functional_components/API/user/user.class";

export default class API {
  cookies: VueCookies;
  baseUrl: string = import.meta.env.VITE_API_URL;
  apiVersion: string = import.meta.env.VITE_API_VERSION;

  apiStore = useApiStore();

  userService: UserService = new UserService(this);
  nirveCreatorService: NirveCreatorService = new NirveCreatorService(this);
  nirveGroupService: NirveGroupService = new NirveGroupService(this);
  nirveTagService: NirveTagService = new NirveTagService(this);

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
    if (!this.getToken()) {
      throw new Error("Du bist nicht eingeloggt!");
    }
    if (this.getToken()!.expires_at < Date.now()) {
      await this.refreshToken();
    }
    this.apiStore.authed = true;
    return axios.create({
      baseURL: `${this.baseUrl}/${this.apiVersion}`,
      headers: {
        Authorization: `Bearer ${this.getToken()?.access_token}`,
      },
    });
  }

  /**
   * @description Refresh the access token
   * @returns {Promise<boolean>} True if refresh was successful
   * @throws {AxiosError} API Error if token refresh was not successful
   * @memberof API
   */
  async refreshToken(): Promise<boolean> {
    return new Promise<boolean>((resolve, reject) => {
      axios
        .post(`${this.baseUrl}/${this.apiVersion}/auth/refresh`, {
          refresh_token: this.getToken()?.refresh_token,
        })
        .then((res: AxiosResponse) => {
          this.cookies.set("token", res.data, res.data.expires_at);
          useApiStore().authed = true;
          resolve(true);
        })
        .catch((err: AxiosError) => {
          reject(err);
          this.apiStore.authed = false;
        });
    });
  }

  /**
   * @description Login to the API and save the access token
   * @param {LoginDto} loginDto Login data (username, password)
   * @param {VueCookies} cookiesInstance VueCookies instance
   * @returns {Promise<boolean>} True if login was successful
   * @throws {AxiosError} API Error if login was not successful
   * @memberof API
   */
  async login(
    loginDto: LoginDto,
    cookiesInstance: VueCookies
  ): Promise<boolean> {
    this.cookies = cookiesInstance;
    return new Promise((resolve, reject) => {
      axios
        .post(`${this.baseUrl}/${this.apiVersion}/auth/sign-in`, loginDto)
        .then((res: AxiosResponse) => {
          this.cookies.set("token", res.data, res.data.expires_at);
          useApiStore().authed = true;
          resolve(true);
        })
        .catch((err: AxiosError) => {
          reject(err);
        });
    });
  }

  /**
   * @description Logout from the API and remove the access token
   * @returns {Promise<boolean>} True if logout was successful
   * @memberof API
   */
  async logout(): Promise<boolean> {
    this.cookies.remove("token");
    this.cookies.remove("currentUser");
    useApiStore().authed = false;
    return true;
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
