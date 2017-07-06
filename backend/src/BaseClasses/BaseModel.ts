import {Entity, ObjectID, ObjectIdColumn} from "typeorm";

/**
 * Интерфейс базовой модели
 */
export interface IModel {
    _id : ObjectID;
}

/**
 * Базовая модель
 */
@Entity()
export abstract class BaseModel implements IModel {
    @ObjectIdColumn()
    _id : ObjectID;
}