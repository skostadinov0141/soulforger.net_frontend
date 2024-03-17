import BaseService from '../abstract.service'
import User from './user.class'
import API from '@/functional_components/API/api'
import { CreateUserDto } from '@/functional_components/API/user/dto/create-user.dto'
import { Profile } from '@/functional_components/API/user/profile.class'
import { plainToClass, plainToInstance } from 'class-transformer'
import { UpdateProfileDto } from '@/functional_components/API/user/dto/update-profile.dto'

export class UserService extends BaseService<User> {
  constructor(apiInstance: API) {
    super(apiInstance, 'user', User)
  }

  async post(data: CreateUserDto): Promise<User> {
    return super.post(data, true)
  }

  async getProfileByUserId(id: string): Promise<Profile> {
    return new Promise<Profile>((resolve, reject) => {
      this.api.getAxios().then((axios) => {
        axios
          .get(`/user/${id}/profile`)
          .then((res) => {
            resolve(plainToInstance(Profile, res.data))
          })
          .catch((err) => reject(err))
      })
    })
  }

  async updateUserProfile(id: string, data: UpdateProfileDto): Promise<Profile> {
    return new Promise<Profile>((resolve, reject) => {
      this.api.getAxios().then((axios) => {
        axios
          .patch(`/user/${id}/profile`, data)
          .then((res) => {
            resolve(plainToInstance(Profile, res.data))
          })
          .catch((err) => reject(err))
      })
    })
  }
}
