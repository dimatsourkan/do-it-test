import {UserCrudService} from "../CrudServices/UserCrudService";
import {SessionCrudService} from "../CrudServices/SessionCrudService";
import {IUser, User} from "../Models/UserModel";
import {Session} from "../Models/SessionModel";
let crypto = require('crypto');

/**
 * Сервис для работы с авторизацией
 */
export class AuthService {

    UserCrudService    : UserCrudService;
    SessionCrudService : SessionCrudService;

    constructor() {
        this.UserCrudService    = new UserCrudService();
        this.SessionCrudService = new SessionCrudService();
    }

    /**
     * Получение пользователя по имени
     * @param userName - Имя пользователя
     * @returns {Promise<IUser>}
     */
    async getUser(userName : string) {
        return await this.UserCrudService.findOne({name : userName});
    }

    /**
     * Проверка пароля пользователя
     * @param user
     * @param pass
     * @returns {Promise<any>}
     */
    async checkPass(user: IUser, pass: string) {
        if(this.UserCrudService.encryptPassword(pass, user.salt) === user.pass) {
            return user;
        }
        else {
            return false;
        }
    }

    /**
     * Создание сессии для пользоветля
     * @returns {Promise<string>}
     */
    async createSession(user : IUser) {
        let session = new Session();

        session.token   = crypto.randomBytes(32).toString('base64');
        session.user_id = user._id;
        return await this.SessionCrudService.create(session);
    }

    /**
     * Аутентификация пользователя
     * @param name
     * @param pass
     * @returns {Promise<any>}
     * @constructor
     */
    async AuthenticateUser(name : string, pass: string) {
        let user = await this.getUser(name);

        if(!user) {
            return false;
        }

        if(this.checkPass(user, pass)) {
            return await this.createSession(user);
        }
        else {
            return false;
        }
    }

}