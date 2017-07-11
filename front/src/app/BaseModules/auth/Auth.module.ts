import {NgModule} from "@angular/core";
import {AuthService, IsAuthenticated, NotAuthenticated} from "./auth.service";


@NgModule({
    imports : [],
    providers: [
        AuthService,
        NotAuthenticated,
        IsAuthenticated,
    ],
})
export class AuthModule{}

