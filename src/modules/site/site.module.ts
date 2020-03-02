import { Module } from '@nestjs/common'
import { SiteResolver } from './site.resolver'
import { SiteService } from './site.service'
import { TypeOrmModule } from '@nestjs/typeorm'
import { Site } from './site.entity'

@Module({
  imports: [TypeOrmModule.forFeature([Site])],
  providers: [SiteService, SiteResolver],
  exports: [SiteService]
})
export class SiteModule {}
