import { Module } from '@nestjs/common'
import { DishResolver } from './dish.resolver'
import { DishService } from './dish.service'
import { TypeOrmModule } from '@nestjs/typeorm'
import { Dish } from './dish.entity'
import { ShopModule } from '../shop/shop.module'
@Module({
  imports: [TypeOrmModule.forFeature([Dish]), ShopModule],
  providers: [DishResolver, DishService]
})
export class DishModule {}
