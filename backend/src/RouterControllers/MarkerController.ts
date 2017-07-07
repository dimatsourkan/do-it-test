import {Body, JsonController, Get, Post, Req, UseBefore} from "routing-controllers";
import {BaseController, IBaseController} from "../BaseClasses/BaseController";
import {IMarkerCrudService, MarkerCrudService} from "../CrudServices/MarkerCrudService";
import {IMarker} from "../Models/MarkerModel";
import {AuthMiddleware} from "../Middlewares/Auth";

/**
 * Интерфейс контроллера для работы с маркерами
 */
export interface IMarkerController extends IBaseController<IMarker> {
    EntityCrudService : IMarkerCrudService;
}

/**
 * Контроллер для работы с маркерами
 */
@JsonController('/markers')
@UseBefore(AuthMiddleware)
export class MarkerController extends BaseController<IMarker> implements IMarkerController {

    EntityCrudService : IMarkerCrudService;

    constructor() {
        super();
        this.EntityCrudService = new MarkerCrudService();
    }

    @Get('/')
    async getAll(@Req() req : any) {
        return await super.getAll(req);
    }

    @Post('/all')
    async saveMany(@Req() req : any, @Body() markers: IMarker[]) {
        return super.saveMany(req, markers);
    }
}