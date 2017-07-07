import {IBaseCrudService} from "./BaseCrudService";
import {Body, Delete, Get, JsonController, Param, Post, Put, Req} from "routing-controllers";
import {ObjectID} from "typeorm";

/**
 * Интерфейс базового контроллера
 */
export interface IBaseController<T> {
    EntityCrudService : IBaseCrudService<T>;
    getAll(req : any);
    getOne(req : any, id: ObjectID);
    post(req : any, model: T);
    put(req : any, model: T,id: ObjectID);
    remove(req : any, id: ObjectID);
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
    async getAll(@Req() req : any) {
        this.setRequestUserSession(req);
        return this.sendRes(await this.EntityCrudService.find());
    }

    /**
     * Получение сущности по ID
     * @returns {Promise<void>}
     */
    @Get('/:id')
    async getOne(@Req() req : any, @Param("id") id: ObjectID) {
        this.setRequestUserSession(req);
        return this.sendRes(await this.EntityCrudService.findById(id));
    }

    /**
     * Создание сущности в БД
     * @returns {Promise<void>}
     */
    @Post('/')
    async post(@Req() req : any, @Body() model: T) {
        this.setRequestUserSession(req);
        return this.sendRes(await this.EntityCrudService.create(model));
    }

    async saveMany(@Req() req : any, @Body() models: T[]) {
        this.setRequestUserSession(req);
        return this.sendRes(await this.EntityCrudService.createMany(models));
    }

    /**
     * Обновление модели в БД
     * @returns {Promise<void>}
     */
    @Put('/:id')
    async put(@Req() req : any, @Body() model: T, @Param("id") id: ObjectID) {
        this.setRequestUserSession(req);
        return this.sendRes(await this.EntityCrudService.update(id, model));
    }

    /**
     * Удаление сущности из БД
     * @returns {Promise<void>}
     */
    @Delete('/:id')
    async remove(@Req() req : any, @Param("id") id: ObjectID) {
        this.setRequestUserSession(req);
        await this.EntityCrudService.remove(id);
        return this.sendRes('Entity was delete');

    }

    setRequestUserSession(req : any) {
        this.EntityCrudService.user    = req.user;
        this.EntityCrudService.session = req.session;
    }

    sendRes(data) {
        return data;
    }

}