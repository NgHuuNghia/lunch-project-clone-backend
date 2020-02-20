import {
  Resolver, Query, Mutation, Args, Subscription
} from '@nestjs/graphql'
import { UserService } from './user.service'
import {
  User, CreateUserInput, LoginUserInput, LoginResponse
} from './user.entity'


@Resolver('User')
export class UserResolver {
  constructor(private userService: UserService) {}

  @Query(() => [User])
  async users() {
    return this.userService.findAll()
  }

  @Query(() => User)
  async user(@Args('id') id: string) {
    return this.userService.findOne(id)
  }

  @Query(() => User)
  async verifyToken(@Args('token') token: string) {
    return this.userService.verifyToken(token)
  }

  @Mutation(() => User)
  async register(@Args('input') input: CreateUserInput) {
    return this.userService.createUser(input)
  }

  @Mutation(() => LoginResponse)
  async login(@Args('input') input: LoginUserInput) {
    return this.userService.login(input)
  }

  @Mutation(() => Boolean)
  async changePassword(
  @Args('_id') userId: string,
  @Args('currentpassword') currentpassword: string,
  @Args('password') password: string
  ): Promise<Boolean> {
    return this.userService.changePassword(userId, currentpassword, password)
  }
}
