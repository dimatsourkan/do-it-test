import "reflect-metadata";
import {createExpressServer} from "routing-controllers";
import {DebugMiddleware} from "./Middlewares/Debug";
import {UserController} from "./RouterControllers/UserController";
import {AuthController} from "./RouterControllers/AuthController";
import {MarkerController} from "./RouterControllers/MarkerController";


class App {

    application : any;

    constructor() {

        this.application = createExpressServer({
            cors : true,
            routePrefix : '/api',
            middlewares : [
                DebugMiddleware
            ],
            controllers : [
                AuthController,
                UserController,
                MarkerController
            ]
        });

        this.application.listen(3037);
    }

}

new App();