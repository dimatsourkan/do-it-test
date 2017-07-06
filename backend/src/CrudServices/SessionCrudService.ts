import {BaseCrudService, IBaseCrudService} from "../BaseClasses/BaseCrudService";
import {ISession, Session} from "../Models/SessionModel";
/**
 * Интерфейс сервиса для работы с сессиями
 */
export interface ISessionCrudService extends IBaseCrudService<ISession> {}

/**
 * Сервис для работы с сессиями
 */
export class SessionCrudService extends BaseCrudService<ISession> implements SessionCrudService {
    protected Entity = Session;

    protected fillable : string[] = [
        'token',
        'user_id'
    ];
}