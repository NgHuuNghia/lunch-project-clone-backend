import {
  Resolver, Query, Args, Mutation
} from '@nestjs/graphql'
import { SiteService } from './site.service'
import { Site, CreateSiteInput, UpdateSiteInput } from './site.entity'
@Resolver('Site')
export class SiteResolver {
  constructor(private readonly siteService: SiteService) {}

  @Query(() => [Site])
  async sites() {
    return this.siteService.findAll()
  }

  @Query(() => Site)
  async site(@Args('_id') id: string) {
    return this.siteService.findOne(id)
  }

  @Mutation(() => Site)
  async createSite(@Args('input') input: CreateSiteInput) {
    return this.siteService.createSite(input)
  }

  @Mutation(() => Boolean)
  async updateSite(@Args('_id') id : string, @Args('input') input: UpdateSiteInput) {
    return this.siteService.updateSite(id, input)
  }

  @Mutation(() => Boolean)
  async deleteSite(@Args('_id') id : string) {
    return this.siteService.deleteSite(id)
  }
}
