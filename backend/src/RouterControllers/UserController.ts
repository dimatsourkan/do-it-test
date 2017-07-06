import {Body, JsonController, Delete, Get, Param, Post, Put, Req} from "routing-controllers";
import {IUserCrudService, UserCrudService} from "../CrudServices/UserCrudService";
import {BaseController, IBaseController} from "../BaseClasses/BaseController";
import {IUser} from "../Models/UserModel";
import {ObjectID} from "typeorm";

/**
 * Интерфейс контроллера для работы с пользователями
 */
export interface IUserController extends IBaseController<IUser> {
    EntityCrudService : IUserCrudService;
}

/**
 * Контроллер для работы с пользователями
 */
@JsonController('/users')
export class UserController extends BaseController<IUser> implements IUserController {

    EntityCrudService : IUserCrudService;

    constructor() {
        super();
        this.EntityCrudService = new UserCrudService();
    }

    @Get('/')
    async getAll() {
        return await super.getAll();
    }

    @Get('/:id')
    async getOne(@Param("id") id: ObjectID) {
        return await super.getOne(id);
    }

    @Post('/')
    async post(@Body() user: IUser) {
        return await super.post(user);
    }

    @Put('/:id')
    async put(@Param("id") id: ObjectID, @Body() model: IUser) {
        return await super.put(id, model);
    }

    @Delete('/:id')
    async remove(@Param("id") id: ObjectID) {
        return await super.remove(id);
    }
}