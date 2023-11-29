import { plainToClass } from "class-transformer";
import API from "../api";
import { Queries } from "../queryConstructor";
import { NirveCommon } from "./nirve-common.class";
import { NirveCreateDto } from "./dto/nirve-create.dto";
import { NirveCommonDto } from "./dto/nirve-common.dto";

export type NirveCreatorSearchQuery = Partial<{
  [K in keyof NirveCommonDto]: Queries;
}>;

export class NirveCreatorService {
  api: API;
  uri: string;

  constructor(api: API) {
    this.api = api;
    this.uri = "nirve-creator";
  }

  /**
   * Sends a POST request to create a new Nirve object.
   * @param data - The data to be sent in the request body.
   * @returns A Promise that resolves with the created Nirve object.
   * @throws An error if the request fails.
   */
  async post(data: NirveCreateDto): Promise<NirveCommon> {
    const axiosInstance = await this.api.getAxios();
    return new Promise((resolve, reject) => {
      try {
        axiosInstance
          .post(`${this.uri}`, data)
          .then((res) => {
            resolve(plainToClass(NirveCommon, res.data));
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
   * Retrieves a user by their ID.
   * @param id The ID of the user to retrieve.
   * @returns A Promise that resolves with the retrieved User object, or rejects with an error.
   */
  async getById(id: string): Promise<NirveCommon> {
    const axiosInstance = await this.api.getAxios();
    return new Promise((resolve, reject) => {
      try {
        axiosInstance
          .get(`${this.uri}/${id}`)
          .then((res) => {
            resolve(plainToClass(NirveCommon, res.data));
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
    query?: Partial<{ [K in keyof NirveCommon]: Queries }>,
    limit?: number,
    skip?: number
  ): Promise<NirveCommon[]> {
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
  async patch(id: string, data: Partial<NirveCommon>): Promise<NirveCommon> {
    const axiosInstance = await this.api.getAxios();
    return new Promise((resolve, reject) => {
      try {
        axiosInstance
          .patch(`${this.uri}/${id}`, data)
          .then((res) => {
            resolve(plainToClass(NirveCommon, res.data));
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
   * Deletes an item from the database by its ID.
   * @param id The ID of the item to delete.
   * @returns A Promise that resolves with the deleted item.
   */
  async deleteById(id: string): Promise<any> {
    const axiosInstance = await this.api.getAxios();
    return new Promise((resolve, reject) => {
      try {
        axiosInstance
          .delete(`${this.uri}/${id}`)
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
}
