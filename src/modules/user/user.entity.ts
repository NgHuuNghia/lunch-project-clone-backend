// eslint-disable-next-line max-classes-per-file
import { Entity, Column, ObjectIdColumn } from 'typeorm'
import {
  IsString, MinLength, IsNotEmpty, Length
} from 'class-validator'

export enum ROLES {
  USER = 'USER',
  ADMIN = 'USER',
  SUPERADMIN = 'SUPERADMIN'
}

@Entity()
export class User {
  @ObjectIdColumn()
  _id: string;

  @Column({ unique: true })
  @IsString()
  @IsNotEmpty()
  username: string;

  @Column()
  @IsString()
  @IsNotEmpty()
  password: string;

  @Column()
  @IsString()
  @IsNotEmpty()
  fullname: string;

  @Column()
  @IsString()
  @IsNotEmpty()
  siteId: string;

  @Column()
  @IsString()
  @IsNotEmpty()
  role: ROLES;
}

export class CreateUserInput {
  @MinLength(4, {
    message: 'username must be at least 4 characters'
  })
  @IsString({ message: 'username is not string' })
  @IsNotEmpty({ message: 'username can not be blank.' })
  username: string;

  @IsString()
  @IsNotEmpty({ message: 'fullname can not be blank.' })
  fullname: string;

  @IsString()
  @IsNotEmpty({ message: 'site can not be blank.' })
  siteId: string;

  @IsString()
  @IsNotEmpty({ message: 'password can not be blank.' })
  @Length(3, 20, {
    message: 'Your fullName must be between 3 and 20 characters.'
  })
  password: string;
}

export class LoginUserInput {
  @MinLength(4, {
    message: 'username must be at least 4 characters'
  })
  @IsString({ message: 'username is not string' })
  @IsNotEmpty({ message: 'username can not be blank.' })
  username: string;

  @IsString()
  @IsNotEmpty({ message: 'password can not be blank.' })
  password: string;
}

export class LoginResponse {
  token: string;
}
