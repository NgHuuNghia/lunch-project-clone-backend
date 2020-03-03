// eslint-disable-next-line max-classes-per-file
import { Entity, Column, ObjectIdColumn } from 'typeorm'
import { IsString, IsNotEmpty } from 'class-validator'

@Entity()
export class Order {
    @ObjectIdColumn()
    _id: string;

    @Column()
    @IsString()
    @IsNotEmpty()
    userId: string;

    @Column()
    @IsString()
    @IsNotEmpty()
    dishId: string;

    @Column()
    @IsString()
    @IsNotEmpty()
    menuId: string;

    @Column()
    @IsString()
    @IsNotEmpty()
    isConfirmed: boolean;
}

export class CreateOrderInput {
    @IsString({ message: 'userId is not string' })
    @IsNotEmpty({ message: 'userId is not blank' })
    userId: string;

    @IsString({ message: 'dishId is not string' })
    @IsNotEmpty({ message: 'dishId is not blank' })
    dishId: string;

    @IsString({ message: 'menuId is not string' })
    @IsNotEmpty({ message: 'menuId is not blank' })
    menuId: string;
}
