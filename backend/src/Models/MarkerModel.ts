import {BaseModel, IModel} from "../BaseClasses/BaseModel";
import {Column, Entity, ObjectID} from "typeorm";
import {IsNotEmpty, IsNumber} from "class-validator";

/**
 * Интерфейс маркера
 */
export interface IMarker extends IModel {
    lat     : number;
    lng     : number;
}

/**
 * Модель маркера
 */
@Entity()
export class Marker extends BaseModel implements IMarker {

    @Column()
    @IsNumber()
    @IsNotEmpty()
    lat : number;

    @Column()
    @IsNumber()
    @IsNotEmpty()
    lng : number;
}