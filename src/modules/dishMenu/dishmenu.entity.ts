// eslint-disable-next-line max-classes-per-file
import {
  Entity, Column, ObjectIdColumn, CreateDateColumn, UpdateDateColumn
} from 'typeorm'
import { IsString, IsNotEmpty, IsNumber } from 'class-validator'

@Entity()
export class DishMenu {
  @ObjectIdColumn()
  _id: string;

  @Column()
  @IsString()
  @IsNotEmpty()
  name: string;

  @Column()
  @IsNumber()
  @IsNotEmpty()
  orderCount: number;

  @Column()
  @IsNumber()
  @IsNotEmpty()
  count: number;

  @Column()
  @IsString()
  @IsNotEmpty()
  menuId: string;

  @CreateDateColumn()
  createdAt: string;

  @UpdateDateColumn()
  updatedAt: string;
}
