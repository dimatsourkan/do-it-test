import {Body, JsonController, Delete, Get, Param, Post, Put, Req, UseBefore} from "routing-controllers";
import {IUserCrudService, UserCrudService} from "../CrudServices/UserCrudService";
import {BaseController, IBaseController} from "../BaseClasses/BaseController";
import {IUser} from "../Models/UserModel";
import {ObjectID} from "typeorm";
import {AuthMiddleware} from "../Middlewares/Auth";

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
@UseBefore(AuthMiddleware)
export class UserController extends BaseController<IUser> implements IUserController {

    EntityCrudService : IUserCrudService;

    constructor() {
        super();
        this.EntityCrudService = new UserCrudService();
    }

    @Get('/')
    async getAll(@Req() req : any) {
        return await super.getAll(req);
    }

    @Get('/:id')
    async getOne(@Req() req : any, @Param("id") id: ObjectID) {
        return await super.getOne(req, id);
    }

    @Post('/')
    async post(@Req() req : any, @Body() user: IUser) {
        return await super.post(req, user);
    }

    @Put('/:id')
    async put(@Req() req : any, @Body() model: IUser, @Param("id") id: ObjectID) {
        return await super.put(req, model, id);
    }

    @Delete('/:id')
    async remove(@Req() req : any, @Param("id") id: ObjectID) {
        return await super.remove(req, id);
    }
}