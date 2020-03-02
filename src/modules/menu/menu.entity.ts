// eslint-disable-next-line max-classes-per-file
import { Entity, Column, ObjectIdColumn } from 'typeorm'
import {
  IsString, IsNotEmpty, IsBoolean
} from 'class-validator'

@Entity()
export class Menu {
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
    @IsString()
    @IsNotEmpty()
    shopId: string;

    @Column()
    @IsBoolean()
    @IsNotEmpty()
    isPublic: boolean;

    @Column()
    @IsBoolean()
    @IsNotEmpty()
    isActive: boolean;
}
