/* eslint-disable no-return-await */
import { Injectable, HttpException } from '@nestjs/common'
import { MongoRepository } from 'typeorm'
import { Order, CreateOrderInput } from './order.entity'
import * as uuid from 'uuid'
import { InjectRepository } from '@nestjs/typeorm'
@Injectable()
export class OrderService {
  constructor(@InjectRepository(Order) private readonly orderReposity: MongoRepository<Order>) {}

  async findAll(): Promise<Order[]> {
    return await this.orderReposity.find()
  }
}
