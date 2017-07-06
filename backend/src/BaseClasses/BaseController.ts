import {IBaseCrudService} from "./BaseCrudService";
import {Body, Delete, Get, JsonController, Param, Post, Put, Req} from "routing-controllers";
import {ObjectID} from "typeorm";

/**
 * Интерфейс базового контроллера
 */
export interface IBaseController<T> {
    EntityCrudService : IBaseCrudService<T>;
    getAll();
    getOne(id: ObjectID);
    post(model: T);
    put(id: ObjectID, model: T);
    remove(id: ObjectID);
}

/**
 * Базовый контроллер
 */
@JsonController("/")
export abstract class BaseController<T> implements IBaseController<T> {

    /**
     * Экземпляр сервиса для работы с сущностью контроллера
     */
    EntityCrudService : IBaseCrudService<T>;

    constructor(){}

    /**
     * Получение списка сущностей
     * @returns {Promise<void>}
     */
    @Get('/')
    async getAll() {
        return this.sendRes(await this.EntityCrudService.find());
    }

    /**
     * Получение сущности по ID
     * @returns {Promise<void>}
     */
    @Get('/:id')
    async getOne(@Param("id") id: ObjectID) {
        return this.sendRes(await this.EntityCrudService.findById(id));
    }

    /**
     * Создание сущности в БД
     * @returns {Promise<void>}
     */
    @Post('/')
    async post(@Body() model: T) {
        return this.sendRes(await this.EntityCrudService.create(model));
    }

    /**
     * Обновление модели в БД
     * @returns {Promise<void>}
     */
    @Put('/:id')
    async put(@Param("id") id: ObjectID, @Body() model: T) {
        return this.sendRes(await this.EntityCrudService.update(id, model));
    }

    /**
     * Удаление сущности из БД
     * @returns {Promise<void>}
     */
    @Delete('/:id')
    async remove(@Param("id") id: ObjectID) {
        await this.EntityCrudService.remove(id);
        return this.sendRes('Entity was delete');

    }

    sendRes(data) {
        return data;
    }

}