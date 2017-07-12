import {NgModule} from "@angular/core";
import {MdCardModule} from "@angular/material";
import {AboutComponent} from "./Components/About/about.component";
import {RouterModule} from "@angular/router";


@NgModule({
    imports: [
        MdCardModule,
        RouterModule
    ],
    declarations: [
        AboutComponent
    ],
    exports : [
        AboutComponent
    ],
    providers: []
})

export class AboutModule {

}