import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from "./AppModules/Auth/Components/Login/login.component";
import { WrapperComponent } from "./Components/Wrapper/wrapper.component";
// import {IsAuthenticated, NotAuthenticated} from "./BaseModules/auth/auth.service";
import {MapComponent} from "./AppModules/Map/Components/Map/map.component";
import {RegistrationComponent} from "./AppModules/Auth/Components/Registration/registration.component";

const routes: Routes = [
    {
        path: 'login',
        component: LoginComponent,
        // canActivate : [ NotAuthenticated ]
    },
    {
        path : 'registration',
        component : RegistrationComponent,
        // canActivate : [ NotAuthenticated ]
    },
    {
        path: '',
        component: WrapperComponent,
        // canActivate : [ IsAuthenticated ],
        children : [
            {
                path : 'map',
                component : MapComponent
            }
        ]
    },
    {
        path: '**',
        redirectTo: '/login'
    }
];

export const ROUTING = RouterModule.forRoot(routes);
