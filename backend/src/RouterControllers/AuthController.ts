import {Body, HttpError, JsonController, Post, Req} from "routing-controllers";
import {AuthService} from "../Services/AuthService";
import {UserCrudService} from "../CrudServices/UserCrudService";
import {IUser, User} from "../Models/UserModel";
import {SessionCrudService} from "../CrudServices/SessionCrudService";

/**
 * Контроллер для работы с авторизацией
 */
@JsonController('/auth')
export class AuthController {

    AuthService        : AuthService;
    SessionCrudService : SessionCrudService;
    UserCrudService    : UserCrudService;

    constructor() {
        this.AuthService     = new AuthService();
        this.UserCrudService = new UserCrudService();
    }


    @Post('/registration')
    async registration(@Body() user : IUser) {

        let newUser = await this.UserCrudService.create(user);
        if(!newUser.id) return newUser;

        return await this.autorize({
            name : user.name,
            pass : user.pass
        });
    }

    @Post('/login')
    async login(@Body() data) {
        return await this.autorize(data);
    }

    @Post('/logout')
    async logout(@Req() req : any) {
        return await this.SessionCrudService.remove(req.session._id);
    }



    /**
     * Авторизует пользователя
     * @param data - Объект с полями name и pass
     * @returns {Promise<any>}
     */
    private async autorize(data : any) {
        let session = await this.AuthService.AuthenticateUser(data.name, data.pass);
        if(session) {
            return session;
        }
        else {
            return new HttpError(401, 'Invalid credentials');
        }
    }
}