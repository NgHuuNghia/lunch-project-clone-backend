import {
  Resolver, Query, Args, Mutation
} from '@nestjs/graphql'
import { OrderService } from './order.service'
import { Order, CreateOrderInput } from './order.entity'
@Resolver('Order')
export class OrderResolver {
  constructor(private readonly orderService: OrderService) {}

  @Query(() => [Order])
  async orders() {
    return this.orderService.findAll()
  }
}
