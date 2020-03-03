import { Injectable, HttpException } from '@nestjs/common'
/* eslint-disable no-return-await */
import { DishMenu } from './dishmenu.entity'
import { MongoRepository } from 'typeorm'
import { InjectRepository } from '@nestjs/typeorm'
import * as uuid from 'uuid'
import { MenuService } from '../menu/menu.service'
@Injectable()
export class DishMenuService {
  // eslint-disable-next-line max-len
  constructor(@InjectRepository(DishMenu) private readonly dishmenuReposity: MongoRepository<DishMenu>,
  private readonly menuService: MenuService) {}

  async findDishMenu(menuId: string): Promise<DishMenu[]> {
    return await this.dishmenuReposity.find({ menuId })
  }

  async findDishMenuPublish() : Promise<DishMenu[]> {
    const menuId = await this.menuService.findMenuPublish()
    return await this.dishmenuReposity.find({ menuId })
  }

  async findOne(id: string): Promise<DishMenu> {
    return await this.dishmenuReposity.findOne({ _id: id })
  }

  async createDishMenu(name: string, menuId: string, count: number): Promise<Boolean> {
    const checkDishMenu = await this.dishmenuReposity.findOne({ name })
    if (checkDishMenu) {
      throw new HttpException(' name is exists already !', 403)
    }
    // check trung ten
    const dishMenu = new DishMenu()
    // eslint-disable-next-line no-underscore-dangle
    dishMenu._id = uuid.v4()
    dishMenu.name = name
    dishMenu.count = count
    dishMenu.orderCount = 0
    dishMenu.menuId = menuId
    // console.log(dishMenu)

    // check menuId not found
    return !!(await this.dishmenuReposity.save(dishMenu))
  }

  // eslint-disable-next-line max-len
  async updateDishMenu(id: string, name: string, count: number): Promise<Boolean> {
    const currentDishMenu = await this.dishmenuReposity.findOne({ _id: id })
    if (!currentDishMenu) {
      throw new HttpException(' not found dish menu', 404)
    }

    currentDishMenu.name = name
    currentDishMenu.orderCount = 0
    currentDishMenu.count = count


    return !!(await this.dishmenuReposity.save(currentDishMenu))
  }

  async deleteDishMenu(id: string): Promise<Boolean> {
    const currentDishMenu = await this.dishmenuReposity.findOne({ _id: id })
    if (!currentDishMenu) {
      throw new HttpException(' not found dish menu', 404)
    }
    return !!(await this.dishmenuReposity.remove(currentDishMenu))
  }
}
