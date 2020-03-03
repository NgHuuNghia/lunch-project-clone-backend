import { Module } from '@nestjs/common'
import { MenuResolver } from './menu.resolver'
import { MenuService } from './menu.service'
import { TypeOrmModule } from '@nestjs/typeorm'
import { Menu } from './menu.entity'
import { SiteModule } from '../site/site.module'
import { ShopModule } from '../shop/shop.module'

@Module({
  imports: [TypeOrmModule.forFeature([Menu]), SiteModule, ShopModule],
  providers: [MenuResolver, MenuService],
  exports: [MenuService]
})
export class MenuModule {}
