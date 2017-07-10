import {NgModule} from "@angular/core";
import {MapComponent} from "./Components/Map/map.component";
import {MAP_API_KEY} from "../../constants";
import {AgmCoreModule, GoogleMapsAPIWrapper} from "angular2-google-maps/core";
import {MdCardModule, MdButtonModule} from "@angular/material";
import {MarkerService} from "./marker.service";
import {CommonModule} from "@angular/common";


@NgModule({
    imports: [
        CommonModule,
        MdCardModule,
        MdButtonModule,
        AgmCoreModule.forRoot({
            apiKey: MAP_API_KEY
        })
    ],
    declarations: [
        MapComponent
    ],
    exports : [
        MapComponent
    ],
    providers: [
        MarkerService,
        GoogleMapsAPIWrapper
    ]
})

export class MapModule {

}