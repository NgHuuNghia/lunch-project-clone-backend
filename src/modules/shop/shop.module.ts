import { Module } from '@nestjs/common'
import { ShopResolver } from './shop.resolver'
import { ShopService } from './shop.service'
import { TypeOrmModule } from '@nestjs/typeorm'
import { Shop } from './shop.entity'
import { SiteModule } from '../site/site.module'

@Module({
  imports: [TypeOrmModule.forFeature([Shop]), SiteModule],
  providers: [ShopService, ShopResolver],
  exports: [ShopService]
})
export class ShopModule {}
