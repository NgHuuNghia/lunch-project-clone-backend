import { Module } from '@nestjs/common'
import { AppController } from './app.controller'
import { AppService } from './app.service'
import { ConfigModule } from '@nestjs/config'
import { GraphQLModule } from '@nestjs/graphql'
import { UserModule } from './modules/user/user.module'
import { TypeOrmModule } from '@nestjs/typeorm'
import { join } from 'path'
import { SiteModule } from './modules/site/site.module'
import { ShopModule } from './modules/shop/shop.module'
import { DishModule } from './modules/dish/dish.module'
import { MenuModule } from './modules/menu/menu.module'
import { DishMenuModule } from './modules/dishMenu/dishmenu.module'

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot({
      type: 'mongodb',
      url: process.env.MONGO_URI,
      entities: [join(__dirname, '**/**.entity{.ts,.js}')],
      synchronize: true,
      useNewUrlParser: true,
      useUnifiedTopology: true,
      logging: true,
      keepAlive: 300000,
      connectTimeoutMS: 50000
    }),
    GraphQLModule.forRoot({
      typePaths: ['./**/*.graphql'],
      context: ({ req }) => ({ req }),
      playground: true,
    }),
    UserModule,
    SiteModule,
    ShopModule,
    DishModule,
    MenuModule,
    DishMenuModule
  ],
  controllers: [AppController],
  providers: [AppService]
})
export class AppModule { }
