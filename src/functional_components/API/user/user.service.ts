import { plainToClass } from "class-transformer";
import BaseService from "../abstract.service";
import API from "../api";
import User from "./user.class";
import { CreateUserDto } from "./dto/create-user.dto";
import { Queries } from "../queryConstructor";
import { UpdateUserDto } from "../dto/update-user.dto";

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
  override async getById(id: string): Promise<User> {
    const axiosInstance = await this.api.getAxios();
    return new Promise((resolve, reject) => {
      try {
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

  /**
   * Creates a new user by sending a POST request to the API.
   * @param data The data of the user to be created.
   * @returns A Promise that resolves with the created user.
   * @throws An error if the request fails.
   */
  async post(data: CreateUserDto): Promise<User> {
    const axiosInstance = await this.api.getAxios(true);
    return new Promise((resolve, reject) => {
      try {
        axiosInstance
          .post(`${this.uri}`, data)
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

  /**
   * Searches for resources based on the provided query, limit, and skip parameters.
   * @param query - An optional object containing key-value pairs to filter the search results.
   * @param limit - An optional number indicating the maximum number of results to return.
   * @param skip - An optional number indicating the number of results to skip.
   * @returns A Promise that resolves with the search results or rejects with an error.
   */
  async search(
    query?: Partial<{ [K in keyof User]: Queries }>,
    limit?: number,
    skip?: number
  ): Promise<User> {
    const axiosInstance = await this.api.getAxios();
    return new Promise((resolve, reject) => {
      try {
        axiosInstance
          .post(`${this.uri}/search`, query, {
            params: {
              limit: limit,
              skip: skip,
            },
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
  async patch(id: string, data: Partial<UpdateUserDto>): Promise<User> {
    const axiosInstance = await this.api.getAxios();
    return new Promise((resolve, reject) => {
      try {
        axiosInstance
          .patch(`${this.uri}/${id}`, data)
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
}
