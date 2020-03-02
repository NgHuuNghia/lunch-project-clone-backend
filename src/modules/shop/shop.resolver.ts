import {
  Resolver, Query, Args, Mutation
} from '@nestjs/graphql'
import { ShopService } from './shop.service'
import { Shop, CreateShopInput, UpdateShopInput } from './shop.entity'
@Resolver('Shop')
export class ShopResolver {
  constructor(private readonly shopService: ShopService) {}

  @Query(() => [Shop])
  async shops() {
    return this.shopService.findAll()
  }

  @Query(() => [Shop])
  async shopInSite(@Args('siteId') siteId: string) {
    return this.shopService.findShopInSite(siteId)
  }

  @Query(() => Shop)
  async shop(@Args('_id') id: string) {
    return this.shopService.findOne(id)
  }

  @Mutation(() => Shop)
  async createShop(@Args('input') input: CreateShopInput) {
    return this.shopService.createShop(input)
  }

  @Mutation(() => Boolean)
  async updateShop(@Args('_id') id : string, @Args('input') input: UpdateShopInput) {
    return this.shopService.updateShop(id, input)
  }

  @Mutation(() => Boolean)
  async deleteShop(@Args('_id') id : string) {
    return this.shopService.deleteShop(id)
  }
}
