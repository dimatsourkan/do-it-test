import {Connection, createConnection, MongoRepository, ObjectID, Repository} from "typeorm";
import {connectionOptions} from "../Config/DBConnection";
import {BaseModel, IModel} from "./BaseModel";
import {HttpError} from "routing-controllers";
import {validate} from "class-validator";
import {IUser} from "../Models/UserModel";
import {ISession} from "../Models/SessionModel";

export interface IBaseCrudService<T> {
    user : IUser;
    session : ISession;
    setEntityData(entity : T, data : any) : T;
    validate(model : T) : any;
    setConnection();
    closeConnection();
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

    /** Менеджер для работы с сужностями БД **/
    // protected EntityManager : EntityManager;

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
     * Создание соединения с БД
     * @returns {Promise<T>}
     */
    private static async createConnection() {
        return createConnection(connectionOptions).then(connection => {
            return connection;
        }).catch(error => {
            return error;
        });
    }

    /**
     * Установка соединения с БД
     * @returns {Promise<void>}
     */
    async setConnection() {
        this.Connection = await BaseCrudService.createConnection();
        if(!this.Connection.isConnected) {
            throw new HttpError(500, 'Data Base connection error');
        }

        this.Repository = await this.Connection.getRepository<T>(this.Entity);
    }

    /**
     * Закрытие соединения с БД
     * @returns {Promise<void>}
     */
    async closeConnection() {
        await this.Connection.close();
    }

    /**
     * Получение сущностей из БД
     * @returns {Promise<BaseModel[]>}
     */
    async find() : Promise<T[]> {
        await this.setConnection();
        let entities = await await this.Repository.find();
        await this.closeConnection();
        return entities;
    }

    /**
     * Получение сущности по ID
     * @param id - ID сущности
     * @returns {Promise<undefined|BaseModel>}
     */
    async findById(id : ObjectID) : Promise<T> {
        try {
            await this.setConnection();
            let entity = await this.Repository.findOneById(id);
            await this.closeConnection();
            return entity;
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
            await this.setConnection();
            let entity = await this.Repository.findOne(searchFields);
            await this.closeConnection();
            return entity;
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

        return this.save([entity]);
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

        return this.save(models);
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
            await this.setConnection();
            let resEntity = await this.Repository.persist(entity);
            await this.closeConnection();
            return resEntity;
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
        await this.setConnection();
        if(await this.Repository.findOneById(id)) {
            let res = await this.Repository.removeById(this.Entity, id);
            await this.closeConnection();
            return res;
        }
        else {
            await this.closeConnection();
            throw new HttpError(404);
        }
    }

    /**
     * Сохраняет модель или массив моделей в бд
     * @param models
     * @returns {Promise<T[]>}
     */
    protected async save(models : T[]) {
        await this.setConnection();
        let res = await this.Repository.save(models);
        await this.closeConnection();

        return res;
    }

}