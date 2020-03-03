import {
  Resolver, Query, Args, Mutation
} from '@nestjs/graphql'
import { DishMenu } from './dishmenu.entity'
import { DishMenuService } from './dishmenu.service'

@Resolver('DishMenu')
export class DishMenuResolver {
  constructor(private readonly dishmenuService: DishMenuService) {}

  @Query(() => [DishMenu])
  async dishesByMenu(@Args('menuId') menuId: string) {
    return this.dishmenuService.findDishMenu(menuId)
  }

  @Query(() => [DishMenu])
  async dishesByMenuPublished() {
    return this.dishmenuService.findDishMenuPublish()
  }

  @Query(() => DishMenu)
  async dishMenu(@Args('_id') _id: string) {
    return this.dishmenuService.findOne(_id)
  }

  @Mutation(() => Boolean)
  async createDishMenu(@Args('name') name: string, @Args('menuId') menuId: string, @Args('count') count: number) {
    return this.dishmenuService.createDishMenu(name, menuId, count)
  }

  @Mutation(() => Boolean)
  async updateDishMenu(@Args('_id') _id: string, @Args('name') name: string, @Args('count') count: number) {
    return this.dishmenuService.updateDishMenu(_id, name, count)
  }

  @Mutation(() => Boolean)
  async deleteDishMenu(@Args('_id') _id: string) {
    return this.dishmenuService.deleteDishMenu(_id)
  }
}
