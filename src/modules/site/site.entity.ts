// eslint-disable-next-line max-classes-per-file
import { Entity, Column, ObjectIdColumn } from 'typeorm'
import { IsString, IsNotEmpty } from 'class-validator'

@Entity()
export class Site {
    @ObjectIdColumn()
    _id: string;

    @Column({ unique: true })
    @IsString()
    @IsNotEmpty()
    name: string;
}

export class CreateSiteInput {
    @IsString({ message: 'site name is not string' })
    @IsNotEmpty({ message: 'site name is not blank' })
    name: string;
}

export class UpdateSiteInput {
    @IsString({ message: 'site name is not string' })
    @IsNotEmpty({ message: 'site name is not blank' })
    name: string;
}
