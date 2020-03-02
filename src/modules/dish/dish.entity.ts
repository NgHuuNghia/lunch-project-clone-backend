// eslint-disable-next-line max-classes-per-file
import { Entity, Column, ObjectIdColumn } from 'typeorm'
import { IsString, IsNotEmpty, IsBoolean } from 'class-validator'

@Entity()
export class Dish {
    @ObjectIdColumn()
    _id: string;

    @Column({ unique: true })
    @IsString()
    @IsNotEmpty()
    name: string;

    @Column()
    @IsString()
    @IsNotEmpty()
    shopId: string;

    @Column()
    @IsBoolean()
    @IsNotEmpty()
    isActive: boolean;
}
