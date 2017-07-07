import {NgModule} from "@angular/core";
import {AuthService, IsAuthenticated, NotAuthenticated} from "./auth.service";
import {AppStateModule} from "../app-state/app-state.module";


@NgModule({
    imports : [
        AppStateModule
    ],
    providers: [
        AuthService,
        NotAuthenticated,
        IsAuthenticated,
    ],
})
export class AuthModule{}

