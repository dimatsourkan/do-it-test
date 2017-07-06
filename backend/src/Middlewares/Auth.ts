import {ExpressMiddlewareInterface, HttpError, Middleware} from "routing-controllers";
import {UserCrudService} from "../CrudServices/UserCrudService";
import {AuthService} from "../Services/AuthService";
import {SessionCrudService} from "../CrudServices/SessionCrudService";
import {ISession} from "../Models/SessionModel";
let auth = require('basic-auth');

/**
 * Мидлвейр для дебагинга запросов
 */
@Middleware({type : 'before'})
export class AuthMiddleware implements ExpressMiddlewareInterface {

    AuthService        : AuthService;
    UserCrudService    : UserCrudService;
    SessionCrudService : SessionCrudService;

    constructor() {
        this.AuthService        = new AuthService();
        this.UserCrudService    = new UserCrudService();
        this.SessionCrudService = new SessionCrudService();
    }

    async use(req: any, res: any, next : Function,) : Promise<any> {

        let token = req.headers['authorization'];
        if(!token) {
            return res.send(new HttpError(401, 'Auth token is empty'));
        }

        let Session : ISession = await this.SessionCrudService.findOne({token : token});
        if(!Session) {
            return res.send(new HttpError(401, 'Invalid auth token'));
        }

        let User = await this.UserCrudService.findById(Session.user_id);
        if(!User) {
            return res.send(new HttpError(401, 'Invalid user from token'));
        }

        req.user    = User;
        req.session = Session;

        next();

    }

}