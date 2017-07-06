import "reflect-metadata";
import {createExpressServer} from "routing-controllers";
import {DebugMiddleware} from "./Middlewares/Debug";
import {UserController} from "./RouterControllers/UserController";
import {AuthMiddleware} from "./Middlewares/Auth";
import {AuthController} from "./RouterControllers/AuthController";

class App {

    application : any;

    constructor() {

        this.application = createExpressServer({
            routePrefix : '/api',
            middlewares : [
                AuthMiddleware,
                DebugMiddleware
            ],
            controllers : [
                AuthController,
                UserController
            ]
        });

        this.application.listen(3037);
    }

}

new App();