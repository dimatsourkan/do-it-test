import {BaseModel, IModel} from "../BaseClasses/BaseModel";
import {Column, Entity} from "typeorm";
import {IsNotEmpty, Length, ValidateIf} from "class-validator";
import {Exclude, Expose} from "class-transformer";
/**
 * Интерфейс модели пользователя
 */
export interface IUser extends IModel {
    name  : string;
    pass  : string;
    salt  : string;
}

/**
 * Модель пользователя
 */
@Entity()
export class User extends BaseModel implements IUser {

    @Column({ unique : true })
    @IsNotEmpty()
    name : string;

    @Column()
    @ValidateIf(o => !o.salt)
    @Length(6, 10)
    @IsNotEmpty()
    @Exclude()
    pass : string;

    @Column()
    @Exclude()
    salt : string;
}