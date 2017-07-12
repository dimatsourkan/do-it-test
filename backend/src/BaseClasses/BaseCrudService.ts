import {Connection, createConnection, ObjectID, Repository} from "typeorm";
import {connectionOptions} from "../Config/DBConnection";
import {BaseModel, IModel} from "./BaseModel";
import {HttpError} from "routing-controllers";
import {validate} from "class-validator";
import {IUser} from "../Models/UserModel";
import {ISession} from "../Models/SessionModel";
import {CreatedConnection} from "../App";

export interface IBaseCrudService<T> {
    user : IUser;
    session : ISession;
    setEntityData(entity : T, data : any) : T;
    validate(model : T) : any;
    find() : Promise<T[]>;
    findById(id : ObjectID) : Promise<T>;
    create(model : T) : Promise<any>;
    createMany(models : T[]) : Promise<any>
    update(id : ObjectID, model : T) : Promise<any>;
    remove(id : ObjectID) : Promise<void>;
}

/**
 * Базовый сервис для работы с БД
 */
export abstract class BaseCrudService<T extends IModel> {

    public user : IUser;

    public session : ISession;

    /** Соединение с бд **/
    protected Connection    : Connection;

    /** Репозиторий для работы с сущностями БД **/
    protected Repository    : Repository<T>;

    /** Поля которые сервис может менять в сущности которой принадлежит **/
    protected fillable      : string[] = [];

    /** Сущность с которой работает сервис **/
    protected Entity : any = BaseModel;

    /**
     * Установка данных из запроса для модели
     * @param entity - Модель
     * @param data - Данные для обновления модели
     * @returns {T}
     */
    public setEntityData(entity : T, data : any) : T {
        for(let i in this.fillable) {
            entity[this.fillable[i]] = data[this.fillable[i]] || '';
        }

        return entity;
    }

    async validate(model : T) {
        return await validate(model)
    }

    /**
     * Получение репозитория для работы с моделями
     * @returns {Promise<void>}
     */
    async getRepository() {
        this.Connection = await CreatedConnection;
        this.Repository = await this.Connection.getRepository<T>(this.Entity);
    }

    /**
     * Получение сущностей из БД
     * @returns {Promise<BaseModel[]>}
     */
    async find() : Promise<T[]> {

        await this.getRepository();
        return await await this.Repository.find();
    }

    /**
     * Получение сущности по ID
     * @param id - ID сущности
     * @returns {Promise<undefined|BaseModel>}
     */
    async findById(id : ObjectID) : Promise<T> {
        try {
            await this.getRepository();
            return await this.Repository.findOneById(id);
        }
        catch(err) {
            throw new HttpError(404);
        }
    }

    /**
     * Получение сущности по ID
     * @param searchFields - Объект с параметрами поиска
     * @returns {Promise<undefined|BaseModel>}
     */
    async findOne(searchFields : any) : Promise<T> {
        try {
            await this.getRepository();
            return await this.Repository.findOne(searchFields);
        }
        catch(err) {
            throw new HttpError(404);
        }
    }

    /**
     * Создание сущности в БД
     * @param model - Модель для записи в БД
     * @returns {Promise<T[]>}
     */
    async create(model : T) : Promise<any>  {

        let entity     = this.setEntityData(new this.Entity(), model);
        let validation = await this.validate(entity);
        if(validation.length) {
            return validation;
        }

        await this.getRepository();
        return await this.Repository.save(entity);
    }

    /**
     * Создание многих моделей в бд
     * @param models - массив моделей
     * @returns {Promise<void>}
     */
    async createMany(models : T[]) : Promise<any> {

        models = models.filter((model : T) => {
            return !model._id;
        });

        models = models.map((model) => {
            return this.setEntityData(new this.Entity(), model);
        });

        let validations = [];
        for(let model of models) {
            let validation = await this.validate(model);
            if(validation.length) {
                validations.push(validation);
            }
        }

        if(validations.length) {
            return validations;
        }

        await this.getRepository();
        return await this.Repository.save(models);
    }

    /**
     * Обновление модели в id
     * @returns {Promise<void>}
     */
    async update(id : ObjectID, model : T) : Promise<any> {

        let entity     = await this.findById(id);
            entity     = await this.setEntityData(entity, model);
        let validation = await this.validate(entity);

        if(validation.length) {
            return validation;
        }

        try {
            await this.getRepository();
            return await this.Repository.persist(entity)
        }
        catch(err) {
            throw new HttpError(404);
        }
    }

    /**
     * Удаление сущности из БД
     * @param id - ID сущности
     * @returns {Promise<void>}
     */
    async remove(id : ObjectID) : Promise<void> {
        await this.getRepository();
        if(await this.Repository.findOneById(id)) {
            return await this.Repository.removeById(this.Entity, id);
        }
        else {
            throw new HttpError(404);
        }
    }

}