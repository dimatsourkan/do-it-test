import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from "./AppModules/Auth/Components/Login/login.component";
import {IsAuthenticated, NotAuthenticated} from "./BaseModules/auth/auth.service";
import {MapComponent} from "./AppModules/Map/Components/Map/map.component";
import {RegistrationComponent} from "./AppModules/Auth/Components/Registration/registration.component";
import {AboutComponent} from "./AppModules/About/Components/About/about.component";

const routes: Routes = [
    {
        path: 'login',
        component: LoginComponent,
        canActivate : [ NotAuthenticated ]
    },
    {
        path : 'registration',
        component : RegistrationComponent,
        canActivate : [ NotAuthenticated ]
    },
    {
        path : 'map',
        component : MapComponent,
        canActivate : [ IsAuthenticated ]
    },
    {
        path : 'about',
        component : AboutComponent,
        canActivate : [ IsAuthenticated ]
    },
    {
        path: '**',
        redirectTo: '/login'
    }
];

export const ROUTING = RouterModule.forRoot(routes);
