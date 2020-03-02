import { Injectable, HttpException } from '@nestjs/common'
/* eslint-disable no-return-await */
import { Dish } from './dish.entity'
import { MongoRepository } from 'typeorm'
import { ShopService } from '../shop/shop.service'
import { InjectRepository } from '@nestjs/typeorm'
import * as uuid from 'uuid'
@Injectable()
export class DishService {
  constructor(@InjectRepository(Dish) private readonly dishReposity: MongoRepository<Dish>,
  private readonly shopService: ShopService) {}

  async findDishByShop(shopId: string): Promise<Dish[]> {
    return await this.dishReposity.find({ shopId })
  }

  async findById(id: string): Promise<Dish> {
    return await this.dishReposity.findOne({ _id: id })
  }

  async createDish(name: string, shopId: string): Promise<Boolean> {
    const checkDish = await this.dishReposity.findOne({ name })
    if (checkDish) {
      throw new HttpException('tên dish này đã tồn tại', 400)
    }
    const dish = new Dish()
    const checkShop = await this.shopService.findOne(shopId)
    if (!checkShop) {
      throw new HttpException('not found shop', 403)
    }
    // eslint-disable-next-line no-underscore-dangle
    dish._id = uuid.v4()
    dish.name = name
    dish.shopId = shopId
    dish.isActive = false
    return !!(await this.dishReposity.save(dish))
  }

  async deleteDish(id: string): Promise<Boolean> {
    const currentDish = await this.dishReposity.findOne({ _id: id })
    if (!currentDish) {
      throw new HttpException(' not found dish', 404)
    }
    return !!(await this.dishReposity.remove(currentDish))
  }

  async updateDish(id: string, name: string, isActive: boolean) : Promise<Boolean> {
    const currentDish = await this.dishReposity.findOne({ _id: id })
    if (!currentDish) {
      throw new HttpException(' not found dish', 404)
    }

    currentDish.name = name
    currentDish.isActive = isActive


    return !!(await this.dishReposity.save(currentDish))
  }
}
