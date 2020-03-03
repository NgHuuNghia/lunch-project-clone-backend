import { Module } from '@nestjs/common'

import { TypeOrmModule } from '@nestjs/typeorm'
import { Order } from '../order/order.entity'

@Module({
  imports: [TypeOrmModule.forFeature([Order])],
  providers: [],
  exports: []
})
export class OrderModule {}
