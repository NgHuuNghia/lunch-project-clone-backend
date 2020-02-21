/* eslint-disable no-return-await */
import { Injectable, HttpException } from '@nestjs/common'
import { MongoRepository } from 'typeorm'
import { Site, UpdateSiteInput, CreateSiteInput } from './site.entity'
import * as uuid from 'uuid'
import { InjectRepository } from '@nestjs/typeorm'
@Injectable()
export class SiteService {
  constructor(@InjectRepository(Site) private readonly siteReposity: MongoRepository<Site>) {}

  async findAll(): Promise<Site[]> {
    return await this.siteReposity.find()
  }

  async findOne(id: string): Promise<Site> {
    return await this.siteReposity.findOne({ _id: id })
  }

  async findByName(name: string) : Promise<Site> {
    return await this.siteReposity.findOne({ name })
  }

  async createSite(input: CreateSiteInput): Promise<Site> {
    const checkSite = await this.siteReposity.findOne({ name: input.name })
    if (checkSite) {
      throw new HttpException('tên site này đã tồn tại', 400)
    }
    const site = new Site()
    // eslint-disable-next-line no-underscore-dangle
    site._id = uuid.v4()
    site.name = input.name
    return await this.siteReposity.save(site)
  }

  async updateSite(id: string, input : UpdateSiteInput) : Promise<Boolean> {
    const currentSite = await this.siteReposity.findOne({ _id: id })
    if (!currentSite) {
      throw new HttpException(' not found site', 404)
    }
    const checkSite = await this.siteReposity.findOne({ name: input.name })
    if (checkSite) {
      throw new HttpException('tên site này đã tồn tại', 400)
    }
    currentSite.name = input.name
    return !!(await this.siteReposity.save(currentSite))
  }

  async deleteSite(id: string): Promise<Boolean> {
    const currentSite = await this.siteReposity.findOne({ _id: id })
    if (!currentSite) {
      throw new HttpException(' not found site', 404)
    }
    return !!(await this.siteReposity.remove(currentSite))
  }
}
