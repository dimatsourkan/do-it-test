import {BaseCrudService, IBaseCrudService} from "../BaseClasses/BaseCrudService";
import {IUser, User} from "../Models/UserModel";
let crypto = require('crypto');
/**
 * Интерфейс сервися для работы с пользователями
 */
export interface IUserCrudService extends IBaseCrudService<IUser> {
    encryptPassword(pass, salt) : string;
    create(model : IUser) : Promise<any>;
}

/**
 * Сервис для работы с пользователями
 */
export class UserCrudService extends BaseCrudService<IUser> implements IUserCrudService {

    protected Entity = User;

    protected fillable : string[] = [
        'name'
    ];

    /**
     * Шифрует пароль с переданной солью
     * @param pass - пароль
     * @param salt - соль
     * @returns {string}
     */
    encryptPassword(pass, salt) : string {
        return crypto.createHmac('sha1', salt).update(pass).digest('hex')
    }

    /**
     * Создание сущности в БД
     * @param model - Модель для записи в БД
     * @returns {Promise<T[]>}
     */
    async create(model : IUser) : Promise<any>  {

        let user  = this.setEntityData(new User(), model);
        user.pass = model.pass;

        let validation = await this.validate(user);
        if(validation.length) {
            return validation;
        }

        user.salt  = crypto.randomBytes(32).toString('base64');
        user.pass  = this.encryptPassword(model.pass, user.salt);
        await this.setConnection();
        let newUser = await this.Repository.save(user);
        await this.closeConnection();
        return newUser;
    }

}