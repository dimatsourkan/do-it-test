import {ExpressMiddlewareInterface, HttpError, Middleware} from "routing-controllers";
import {UserCrudService} from "../CrudServices/UserCrudService";
import {AuthService} from "../Services/AuthService";
import {SessionCrudService} from "../CrudServices/SessionCrudService";
import {ISession} from "../Models/SessionModel";
let auth = require('basic-auth');

/**
 * Мидлвейр для проверки авторизации
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

        /**
         * Если токен передан то пропускаем дальше иначе ошибка
         * @type {any|string}
         */
        let token = req.headers['authorization'];
        if(!token) {
            return res.send(new HttpError(401, 'Auth token is empty'));
        }

        /**
         * Если сессия найдена то пропускаем дальне иначе ошибка
         * @type {ISession}
         */
        let Session = await this.SessionCrudService.findOne({token : token});
        if(!Session) {
            return res.send(new HttpError(401, 'Invalid auth token'));
        }

        /**
         * Если пользователь найден то пропускаем дальше иначе ошибка
         * @type {IUser}
         */
        let User = await this.UserCrudService.findById(Session.user_id);
        if(!User) {
            return res.send(new HttpError(401, 'Invalid user from token'));
        }

        /**
         * В запрос вписываем текущего пользователя и сессию
         * @type {IUser}
         */
        req.user    = User;
        req.session = Session;

        next();

    }

}