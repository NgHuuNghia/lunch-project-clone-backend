// eslint-disable-next-line max-classes-per-file
import { Entity, Column, ObjectIdColumn } from 'typeorm'
import { IsString, MinLength, IsNotEmpty } from 'class-validator'

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
}

export class UserInput {
    @MinLength(4, {
      message: 'username must be at least 4 characters',
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
