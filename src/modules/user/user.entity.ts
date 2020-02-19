// eslint-disable-next-line max-classes-per-file
import { Entity, Column, ObjectIdColumn } from 'typeorm'
import { IsString, MinLength, IsNotEmpty } from 'class-validator'

export enum ROLES {
  USER = 'USER',
  ADMIN = 'USER'
}
export enum SITES {
  SG = 'SG',
  NT = 'NT',
  DN = 'DN'
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
  site: SITES;

  @Column()
  @IsString()
  @IsNotEmpty()
  role: ROLES;
}

export class CreateUserInput {
  @MinLength(4, {
    message: 'username must be at least 4 characters'
  })
  @Column()
  @IsString({ message: 'username is not string' })
  @IsNotEmpty({ message: 'username can not be blank.' })
  username: string;

  @Column()
  @IsString()
  @IsNotEmpty({ message: 'fullname can not be blank.' })
  fullname: string;

  @Column()
  @IsString()
  @IsNotEmpty({ message: 'site can not be blank.' })
  site: SITES;

  @Column()
  @IsString()
  @IsNotEmpty({ message: 'password can not be blank.' })
  password: string;
}

export class LoginUserInput {
  @MinLength(4, {
    message: 'username must be at least 4 characters'
  })
  @Column()
  @IsString({ message: 'username is not string' })
  @IsNotEmpty({ message: 'username can not be blank.' })
  username: string;

  @Column()
  @IsString()
  @IsNotEmpty({ message: 'password can not be blank.' })
  password: string;
}

export class LoginResponse {
  token: string;
}
