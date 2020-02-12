import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'
import { ValidationPipe } from './common/pipes/validation.pipe'
import { Logger } from '@nestjs/common'

const port = process.env.PORT || 3000

async function bootstrap() {
  const app = await NestFactory.create(AppModule)
  app.useGlobalPipes(new ValidationPipe())
  await app.listen(port)
  Logger.log(`🚀 Server running on http://localhost:${port}`, 'Bootstrap')
  Logger.log(`🚀 Subscriptions ready at ws://localhost:${port}/graphql`, 'Bootstrap')
}
bootstrap()
