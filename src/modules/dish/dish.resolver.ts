import {
  Resolver, Query, Args, Mutation
} from '@nestjs/graphql'
import { Dish } from './dish.entity'
import { DishService } from './dish.service'

@Resolver('Dish')
export class DishResolver {
  constructor(private readonly dishService: DishService) {}


  @Query(() => [Dish])
  async dishesByShop(@Args('shopId') shopId: string) {
    return this.dishService.findDishByShop(shopId)
  }

  @Query(() => Dish)
  async dish(@Args('_id') id: string) {
    return this.dishService.findById(id)
  }

  @Mutation(() => Boolean)
  async createDish(@Args('name') name: string, @Args('shopId') shopId: string) {
    return this.dishService.createDish(name, shopId)
  }

  @Mutation(() => Boolean)
  async deleteDish(@Args('_id') id : string) {
    return this.dishService.deleteDish(id)
  }


  @Mutation(() => Boolean)
  async updateDish(@Args('_id') id : string, @Args('name') name: string, @Args('isActive') isActive: boolean) {
    return this.dishService.updateDish(id, name, isActive)
  }
}
