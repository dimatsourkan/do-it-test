import {Body, HttpError, JsonController, Post, Req, Res} from "routing-controllers";
import {AuthService} from "../Services/AuthService";
import {UserCrudService} from "../CrudServices/UserCrudService";
import {IUser} from "../Models/UserModel";
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
    async registration(@Req() req : any, @Res() res : any, @Body() user : IUser) {

        let newUser = await this.UserCrudService.create(user);
        if(!newUser._id) throw newUser;

        return await this.autorize({
            name : user.name,
            pass : user.pass
        });
    }

    @Post('/login')
    async login(@Req() req : any, @Res() res : any, @Body() data) {
        return await this.autorize(data);
    }

    @Post('/logout')
    async logout(@Req() req : any, @Res() res : any) {
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
            return {
                token : session.token
            };
        }
        else {
            throw new HttpError(401, 'Invalid credentials');
        }
    }
}