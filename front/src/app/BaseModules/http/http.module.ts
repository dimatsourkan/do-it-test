import {NgModule} from "@angular/core";
import {Http, XHRBackend, RequestOptions} from "@angular/http";
import {AppHttpService} from "./http.service";


@NgModule({
    providers: [
        {
            provide: Http,
            useFactory: (backend: XHRBackend, defaultOptions: RequestOptions) =>
                new AppHttpService(backend, defaultOptions),
            deps: [ XHRBackend, RequestOptions ]
        }
    ],
})
export class AppHttpModule{}

