/* eslint-disable no-return-await */
import { Injectable, HttpException, HttpStatus } from '@nestjs/common'
import {
  User, CreateUserInput, LoginResponse, ROLES, SITES, LoginUserInput
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

  async createUser(input: CreateUserInput): Promise<User> {
    const checkUser = await this.userRepository.findOne({ username: input.username })
    if (checkUser) {
      throw new HttpException(
        'Tài khoản đã tồn tại!',
        HttpStatus.BAD_REQUEST,
      )
    }
    const user = new User()
    // eslint-disable-next-line no-underscore-dangle
    user._id = uuid.v4()
    user.username = input.username
    user.password = bcrypt.hashSync(input.password, 10)
    user.fullname = input.fullname
    user.site = input.site
    user.role = ROLES.USER
    return await this.userRepository.save(user)
  }

  async login(input: LoginUserInput): Promise<LoginResponse> { // authentication
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
      { userId: user._id },
      process.env.TOKEN_SECRET,
      { expiresIn: '30d' },
    )
    return {
      token
    }
  }

  async verifyToken(token: string): Promise<User> {
    if (!token) {
      throw new HttpException('Invalid token', 401)
    }
    if (token.split(' ')[0] !== 'Bearer') {
      throw new HttpException('Invalid token', 401)
    }
    const tokenValue = token.split(' ')[1]
    return jwt.verify(tokenValue, process.env.TOKEN_SECRET, async (err, decoded) => {
      if (err) {
        throw new HttpException('decode faild', 403)
      } else {
        const { userId } = decoded
        const userCurrent = await this.findOne(userId)
        if (userCurrent) {
          return userCurrent
        }
        throw new HttpException('không tồn tại tài khỏan này', 404)
      }
    })
  }
}
