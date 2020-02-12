import {
  CanActivate, ExecutionContext, HttpException, HttpStatus, Injectable
} from '@nestjs/common'
import { GqlExecutionContext } from '@nestjs/graphql'
import * as jwt from 'jsonwebtoken'
// import { AuthorService } from 'src/modules/author/author.service'

@Injectable()
export class AuthGuard implements CanActivate {
  constructor() {}
  // private readonly authorService: AuthorService

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const ctx = GqlExecutionContext.create(context)
    const { req } = ctx.getContext()
    const auth = req && req.headers.authorization
    if (!auth) {
      return false
    }
    if (auth.split(' ')[0] !== 'Bearer') {
      throw new HttpException('Invalid token', 401)
    }
    const token = auth.split(' ')[1]
    return jwt.verify(token, 'huunghia.nguyen', async (err, decoded) => {
      if (err) {
        throw new HttpException(
          {
            status: HttpStatus.FORBIDDEN
          },
          403
        )
      } else {
        // const { authorID } = decoded
        // const userCurrent = await this.authorService.findOne(authorID)
        // if (userCurrent) {
        //   req.user = decoded
        //   return true
        // }
        return false
      }
    })
  }
}
