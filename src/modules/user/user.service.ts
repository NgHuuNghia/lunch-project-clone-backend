/* eslint-disable no-return-await */
import { Injectable, HttpException, HttpStatus } from '@nestjs/common'
import {
  User, UserInput, LoginResponse, Permision
} from './user.entity'
import { InjectRepository } from '@nestjs/typeorm'
import { MongoRepository } from 'typeorm'
import * as uuid from 'uuid'
import * as bcrypt from 'bcryptjs'
import * as jwt from 'jsonwebtoken'
@Injectable()
export class UserService {
  constructor(@InjectRepository(User) private readonly userRepository: MongoRepository<User>) {

  }

  async findAll(): Promise<User[]> {
    return await this.userRepository.find()
  }

  async findOne(id: string): Promise<User> {
    return await this.userRepository.findOne({ _id: id })
  }

  async createUser(input: UserInput): Promise<User> {
    const checkUser = await this.userRepository.findOne({ username: input.username })
    if (checkUser) {
      throw new HttpException(
        'username is already!',
        HttpStatus.BAD_REQUEST,
      )
    }
    const user = new User()
    // eslint-disable-next-line no-underscore-dangle
    user._id = uuid.v4()
    user.username = input.username
    user.password = bcrypt.hashSync(input.password, 10)
    user.userPermissions = Permision.USER
    return await this.userRepository.save(user)
  }

  async login(input: UserInput): Promise<LoginResponse> { // authentication
    const user = await this.userRepository.findOne({ username: input.username })
    if (!user) {
      throw new HttpException(
        // 'account does not exist!',
        'Tài khoản hoặc mật khẩu sai',
        HttpStatus.BAD_REQUEST,
      )
    }

    const isEqual = bcrypt.compareSync(input.password, user.password)
    if (!isEqual) {
      // 'Password is incorrect'
      throw new HttpException('Tài khoản hoặc mật khẩu sai', HttpStatus.BAD_REQUEST)
    }
    const token = jwt.sign(
      // eslint-disable-next-line no-underscore-dangle
      { userId: user._id, userPermissions: user.userPermissions },
      'huunghia.nguyen',
      { expiresIn: '30d' },
    )
    return {
      token
    }
  }
}
