import { plainToClass } from "class-transformer";
import BaseService from "../abstract.service";
import API from "../api";
import { Queries } from "../queryConstructor";
import { UpdateUserDto } from "../dto/update-user.dto";
import { Profile } from "./profile.class";
import { UpdateProfileDto } from "./dto/update-profile.dto";

export class ProfileService extends BaseService {
  constructor(api: API) {
    super(api);
    this.uri = "profile";
  }

  /**
   * Retrieves a user by their ID.
   * @param id The ID of the user to retrieve.
   * @returns A Promise that resolves with the retrieved User object, or rejects with an error.
   */
  override async getById(id: string): Promise<Profile> {
    return new Promise(async (resolve, reject) => {
      try {
        const axiosInstance = await this.api.getAxios();
        axiosInstance
          .get(`${this.uri}/${id}`)
          .then((res) => {
            resolve(plainToClass(Profile, res.data));
          })
          .catch((err) => {
            reject(err);
          });
      } catch (err) {
        reject(err);
      }
    });
  }

  /**
   * Searches for resources based on the provided query, limit, and skip parameters.
   * @param query - An optional object containing key-value pairs to filter the search results.
   * @param limit - An optional number indicating the maximum number of results to return.
   * @param skip - An optional number indicating the number of results to skip.
   * @returns A Promise that resolves with the search results or rejects with an error.
   */
  async search(
    query?: Partial<{ [K in keyof Profile]: Queries }>,
    limit?: number,
    skip?: number
  ): Promise<Profile> {
    return new Promise(async (resolve, reject) => {
      try {
        const axiosInstance = await this.api.getAxios();
        axiosInstance
          .post(`${this.uri}/search`, query, {
            params: {
              limit: limit,
              skip: skip
            }
          })
          .then((res) => {
            resolve(res.data);
          })
          .catch((err) => {
            reject(err);
          });
      } catch (err) {
        reject(err);
      }
    });
  }

  /**
   * Updates a user with the given ID using the provided data.
   * @param id The ID of the user to update.
   * @param data The data to update the user with.
   * @returns A Promise that resolves with the updated User object.
   */
  async patch(id: string, data: Partial<UpdateUserDto>): Promise<Profile> {
    return new Promise(async (resolve, reject) => {
      try {
        const axiosInstance = await this.api.getAxios();
        axiosInstance
          .patch(`${this.uri}/${id}`, data)
          .then((res) => {
            resolve(plainToClass(Profile, res.data));
          })
          .catch((err) => {
            reject(err);
          });
      } catch (err) {
        reject(err);
      }
    });
  }
}
