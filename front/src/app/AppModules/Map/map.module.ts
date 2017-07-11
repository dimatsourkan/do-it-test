import {NgModule} from "@angular/core";
import {MapComponent} from "./Components/Map/map.component";
import {MAP_API_KEY} from "../../constants";
import {MdCardModule, MdButtonModule, MdInputModule} from "@angular/material";
import {MarkerService} from "./marker.service";
import {CommonModule} from "@angular/common";
import {AgmCoreModule} from "@agm/core";
import {FormsModule} from "@angular/forms";
import {RouterModule} from "@angular/router";


@NgModule({
    imports: [
        RouterModule,
        CommonModule,
        FormsModule,
        MdCardModule,
        MdButtonModule,
        MdInputModule,
        AgmCoreModule.forRoot({
            apiKey: MAP_API_KEY,
            libraries: ['places']
        })
    ],
    declarations: [
        MapComponent
    ],
    exports : [
        MapComponent
    ],
    providers: [
        MarkerService
    ]
})

export class MapModule {

}