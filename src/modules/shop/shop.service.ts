/* eslint-disable no-return-await */
import { Injectable, HttpException } from '@nestjs/common'
import { MongoRepository } from 'typeorm'
import { Shop, UpdateShopInput, CreateShopInput } from './shop.entity'
import * as uuid from 'uuid'
import { InjectRepository } from '@nestjs/typeorm'
import { SiteService } from '../site/site.service'

@Injectable()
export class ShopService {
  constructor(@InjectRepository(Shop) private readonly shopReposity: MongoRepository<Shop>,
  private readonly siteService: SiteService) {}

  async findAll(): Promise<Shop[]> {
    return await this.shopReposity.find()
  }

  async findOne(id: string): Promise<Shop> {
    return await this.shopReposity.findOne({ _id: id })
  }

  async findByName(name: string) : Promise<Shop> {
    return await this.shopReposity.findOne({ name })
  }

  async createShop(input: CreateShopInput): Promise<Shop> {
    const checkShop = await this.shopReposity.findOne({ name: input.name })
    if (checkShop) {
      throw new HttpException('tên shop này đã tồn tại', 400)
    }
    const shop = new Shop()
    const checkSite = await this.siteService.findOne(input.siteId)
    if (!checkSite) {
      throw new HttpException('not found site', 403)
    }
    // eslint-disable-next-line no-underscore-dangle
    shop._id = uuid.v4()
    shop.name = input.name
    shop.siteId = input.siteId
    shop.isActive = false

    return await this.shopReposity.save(shop)
  }

  async updateShop(id: string, input : UpdateShopInput) : Promise<Boolean> {
    const currentShop = await this.shopReposity.findOne({ _id: id })
    if (!currentShop) {
      throw new HttpException(' not found shop', 404)
    }

    currentShop.name = input.name
    currentShop.isActive = input.isActive


    return !!(await this.shopReposity.save(currentShop))
  }

  async deleteShop(id: string): Promise<Boolean> {
    // delete all dish in shopId
    const currentShop = await this.shopReposity.findOne({ _id: id })
    if (!currentShop) {
      throw new HttpException(' not found shop', 404)
    }
    return !!(await this.shopReposity.remove(currentShop))
  }

  async findShopInSite(siteId: string): Promise<Shop[]> {
    return await this.shopReposity.find({ siteId })
  }
}
