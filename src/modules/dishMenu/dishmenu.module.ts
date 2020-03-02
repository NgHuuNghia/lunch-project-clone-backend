import { Module } from '@nestjs/common'
import { DishMenuResolver } from './dishmenu.resolver'
import { DishMenuService } from './dishmenu.service'
import { TypeOrmModule } from '@nestjs/typeorm'
import { DishMenu } from './dishmenu.entity'
@Module({
  imports: [TypeOrmModule.forFeature([DishMenu])],
  providers: [DishMenuResolver, DishMenuService]
})
export class DishMenuModule {}
