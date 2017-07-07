import {LoginComponent} from "./Components/Login/login.component";
import {NgModule} from "@angular/core";
import {AppHttpModule} from "../../BaseModules/http/http.module";
import {RouterModule} from "@angular/router";
import {CommonModule} from "@angular/common";
import {HttpModule} from "@angular/http";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {MdInputModule, MdCardModule, MdButtonModule} from "@angular/material";
import {RegistrationComponent} from "./Components/Registration/registration.component";


@NgModule({
    imports: [
        FormsModule,
        ReactiveFormsModule,
        HttpModule,
        CommonModule,
        RouterModule,
        AppHttpModule,
        MdInputModule,
        MdCardModule,
        MdButtonModule
    ],
    declarations: [
        RegistrationComponent,
        LoginComponent
    ],
    exports : [
        RegistrationComponent,
        LoginComponent
    ],
    providers: [

    ]
})

export class AuthorizationModule {

}