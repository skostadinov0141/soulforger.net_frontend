import API from "./api";
import { Queries } from "./query.types";
import { plainToInstance } from "class-transformer";
import { AxiosError } from "axios";

export default class BaseService<T> {
  api: API;
  uri: string;
  classType: new () => T;

  constructor(api: API, uri: string, classType: new () => T) {
    this.api = api;
    this.uri = uri;
    this.classType = classType;
  }

  /**
   * Sends a POST request to create an entry in the Backend.
   * @param data - The data to be sent in the request body.
   * @param isPublic - A boolean indicating whether the request should be made without an authorization token.
   * @returns A Promise that resolves with the created object.
   * @throws AxiosError error if the request fails.
   */
  async post(data: any, isPublic: boolean = false): Promise<T> {
    const axiosInstance = await this.api.getAxios(isPublic);
    return new Promise((resolve, reject) => {
      try {
        axiosInstance
          .post(`${this.uri}`, data)
          .then((res) => {
            resolve(plainToInstance(this.classType, res.data));
          })
          .catch((err: AxiosError) => {
            reject(err);
          });
      } catch (err) {
        reject(err);
      }
    });
  }

  /**
   * Retrieves an object from the Backend by its ID.
   * @param id The ID of the object to retrieve.
   * @param isPublic A boolean indicating whether the request should be made without an authorization token.
   * @returns A Promise that resolves with the retrieved User object, or rejects with an error.
   * @throws AxiosError If the request fails.
   */
  async getById(id: string, isPublic: boolean = false): Promise<T> {
    const axiosInstance = await this.api.getAxios(isPublic);
    return new Promise((resolve, reject) => {
      try {
        axiosInstance
          .get(`${this.uri}/${id}`)
          .then((res) => {
            resolve(plainToInstance(this.classType, res.data));
          })
          .catch((err: AxiosError) => {
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
   * @param isPublic - A boolean indicating whether the request should be made without an authorization token.
   * @returns A Promise that resolves with the search results or rejects with an error.
   * @throws AxiosError If the request fails.
   */
  async search(
    query?: Partial<{ [K in keyof T]: Queries }>,
    limit: number = 50,
    skip: number = 0,
    isPublic: boolean = false
  ): Promise<T[]> {
    const axiosInstance = await this.api.getAxios(isPublic);
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
            const result = plainToInstance(this.classType, res.data);
            if (result instanceof Array) {
              resolve(result);
            } else {
              resolve([result]);
            }
          })
          .catch((err: AxiosError) => {
            reject(err);
          });
      } catch (err) {
        reject(err);
      }
    });
  }

  /**
   * Updates an object with the given ID using the provided data.
   * @param id The ID of the object to update.
   * @param data The data to update the object with. The data should be a partial object, containing only the fields to update.
   * @param isPublic A boolean indicating whether the request should be made without an authorization token.
   * @returns A Promise that resolves with the updated object.
   * @throws AxiosError If the request fails.
   */
  async patch(
    id: string,
    data: Partial<T>,
    isPublic: boolean = false
  ): Promise<T> {
    const axiosInstance = await this.api.getAxios(isPublic);
    return new Promise((resolve, reject) => {
      try {
        axiosInstance
          .patch(`${this.uri}/${id}`, data)
          .then((res) => {
            resolve(plainToInstance(this.classType, res.data));
          })
          .catch((err: AxiosError) => {
            reject(err);
          });
      } catch (err) {
        reject(err);
      }
    });
  }

  /**
   * Deletes an object from the database by its ID.
   * @param id The ID of the item to delete.
   * @param isPublic A boolean indicating whether the request should be made without an authorization token.
   * @returns A Promise that resolves with the deleted object.
   * @throws AxiosError If the request fails.
   */
  async deleteById(id: string, isPublic: boolean = false): Promise<T> {
    const axiosInstance = await this.api.getAxios(isPublic);
    return new Promise((resolve, reject) => {
      try {
        axiosInstance
          .delete(`${this.uri}/${id}`)
          .then((res) => {
            resolve(plainToInstance(this.classType, res.data));
          })
          .catch((err: AxiosError) => {
            reject(err);
          });
      } catch (err) {
        reject(err);
      }
    });
  }
}
