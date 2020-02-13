import {
  Resolver, Query, Mutation, Args, Subscription
} from '@nestjs/graphql'
import { UserService } from './user.service'
import { User, UserInput, LoginResponse } from './user.entity'


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

  @Mutation(() => User)
  async register(@Args('input') input: UserInput) {
    return this.userService.createUser(input)
  }

  @Mutation(() => LoginResponse)
  async login(@Args('input') input: UserInput) {
    return this.userService.login(input)
  }
}
