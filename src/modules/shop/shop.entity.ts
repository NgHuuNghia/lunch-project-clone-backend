// eslint-disable-next-line max-classes-per-file
import { Entity, Column, ObjectIdColumn } from 'typeorm'
import { IsString, IsNotEmpty, IsBoolean } from 'class-validator'

@Entity()
export class Shop {
    @ObjectIdColumn()
    _id: string;

    @Column({ unique: true })
    @IsString()
    @IsNotEmpty()
    name: string;

    @Column()
    @IsString()
    @IsNotEmpty()
    siteId: string;

    @Column()
    @IsBoolean()
    @IsNotEmpty()
    isActive: boolean;
}

export class CreateShopInput {
    @IsString({ message: 'Shop name is not string' })
    @IsNotEmpty({ message: 'Shop name is not blank' })
    name: string;

    @IsString({ message: 'siteID name is not string' })
    @IsNotEmpty({ message: 'siteID name is not blank' })
    siteId: string;
}

export class UpdateShopInput {
    @IsString({ message: 'Shop name is not string' })
    @IsNotEmpty({ message: 'Shop name is not blank' })
    name: string;

    @IsBoolean()
    @IsNotEmpty()
    isActive: boolean;
}
