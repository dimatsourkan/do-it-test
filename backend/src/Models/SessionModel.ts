import {BaseModel, IModel} from "../BaseClasses/BaseModel";
import {Column, Entity, ObjectID} from "typeorm";
import {IsBase64, IsNotEmpty} from "class-validator";
/**
 * Интерфейс модели пользователя
 */
export interface ISession extends IModel {
    token : string;
    user_id : ObjectID;
}

/**
 * Модель пользователя
 */
@Entity()
export class Session extends BaseModel implements ISession {

    @Column()
    @IsBase64()
    @IsNotEmpty()
    token : string;

    @Column()
    user_id : ObjectID;
}