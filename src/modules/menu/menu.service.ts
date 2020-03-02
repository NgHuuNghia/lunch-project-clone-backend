/* eslint-disable no-return-await */
import { Injectable, HttpException } from '@nestjs/common'
import { Menu } from './menu.entity'
import * as uuid from 'uuid'
import { InjectRepository } from '@nestjs/typeorm'
import { MongoRepository } from 'typeorm'
import { SiteService } from '../site/site.service'
import { ShopService } from '../shop/shop.service'

@Injectable()
export class MenuService {
  constructor(@InjectRepository(Menu) private readonly menuReposity: MongoRepository<Menu>,
  private readonly siteService: SiteService, private readonly shopService: ShopService) {}

  async findAll(): Promise<Menu[]> {
    return await this.menuReposity.find()
  }

  async findOne(id: string): Promise<Menu> {
    return await this.menuReposity.findOne({ _id: id })
  }

  async findMenuBySite(siteId : string): Promise<Menu[]> {
    return await this.menuReposity.find({ siteId })
  }

  async createMenu(name: string, siteId: string, shopId: string): Promise<Boolean> {
    // check shopId này có thuộc siteId này không
    const checkMenu = await this.menuReposity.findOne({ name })
    if (checkMenu) {
      throw new HttpException('tên menu này đã tồn tại', 400)
    }
    const menu = new Menu()
    const checkSite = await this.siteService.findOne(siteId)
    if (!checkSite) {
      throw new HttpException('not found site', 403)
    }
    const checkShop = await this.shopService.findOne(shopId)
    if (!checkShop) {
      throw new HttpException('not found shop', 400)
    }
    // eslint-disable-next-line no-underscore-dangle
    menu._id = uuid.v4()
    menu.name = name
    menu.siteId = siteId
    menu.shopId = shopId
    menu.isActive = false
    menu.isPublic = false

    return !!(await this.menuReposity.save(menu))
  }

  async publishAndUnpublishMenu(id: string): Promise<Boolean> {
    // unpublic all another menu
    const ArrMenu = await this.menuReposity.find()
    ArrMenu.forEach((menu) => {
      // eslint-disable-next-line no-param-reassign
      menu.isPublic = false
      this.menuReposity.save(menu)
    })
    const currentMenu = await this.menuReposity.findOne({ _id: id })
    if (!currentMenu) {
      throw new HttpException('tên menu này không tồn tại', 400)
    }
    currentMenu.isPublic = true

    return !!(await this.menuReposity.save(currentMenu))
  }

  async updateMenu(id: string, name: string, isActive: boolean) : Promise<Boolean> {
    const currentMenu = await this.menuReposity.findOne({ _id: id })

    if (!currentMenu) {
      throw new HttpException('not found menu ', 404)
    }

    currentMenu.name = name
    currentMenu.isActive = isActive
    return !!(await this.menuReposity.save(currentMenu))
  }

  async deleteMenu(id: string): Promise<Boolean> {
    const currentMenu = await this.menuReposity.findOne({ _id: id })
    if (!currentMenu) {
      throw new HttpException('not found menu ', 404)
    }
    return !!(await this.menuReposity.remove(currentMenu))
  }
}
