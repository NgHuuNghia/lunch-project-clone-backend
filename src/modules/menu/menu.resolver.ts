import {
  Resolver, Query, Args, Mutation
} from '@nestjs/graphql'
import { MenuService } from './menu.service'
import { Menu } from './menu.entity'

@Resolver('Menu')
export class MenuResolver {
  constructor(private readonly menuService: MenuService) {}

  @Query(() => [Menu])
  async menus() {
    return this.menuService.findAll()
  }

  @Query(() => Menu)
  async menu(@Args('id') id: string) {
    return this.menuService.findOne(id)
  }

  @Query(() => [Menu])
  async menusBySite(@Args('siteId') siteId: string) {
    return this.menuService.findMenuBySite(siteId)
  }

  @Mutation(() => Boolean)
  async createMenu(@Args('name') name: string, @Args('siteId') siteId: string, @Args('shopId') shopId: string) {
    return this.menuService.createMenu(name, siteId, shopId)
  }

  @Mutation(() => Boolean)
  async publishAndUnpublishMenu(@Args('id') id: string) {
    return this.menuService.publishAndUnpublishMenu(id)
  }

  @Mutation(() => Boolean)
  async updateMenu(@Args('id') id: string, @Args('name') name: string, @Args('isActive') isActive: boolean) {
    return this.menuService.updateMenu(id, name, isActive)
  }

  @Mutation(() => Boolean)
  async deleteMenu(@Args('id') id: string) {
    return this.menuService.deleteMenu(id)
  }
}
