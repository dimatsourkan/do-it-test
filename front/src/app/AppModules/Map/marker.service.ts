/**
 * Created by Дмитрий on 10.07.2017.
 */
import {Injectable} from "@angular/core";
import {CRUDService} from "../../Services/crud.service";
import {Http} from "@angular/http";
import {IMarker} from "./marker.model";


/**
 * Сервис для работы с пользователями
 */
@Injectable()
export class MarkerService extends CRUDService<IMarker> {

    constructor(http : Http) {
        super('markers', http);
    }

    getLocation(callback) {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(callback);
        } else {
            alert("Geolocation is not supported by this browser.");
        }
    }

    saveMarkers(markers : IMarker[]) {
        return this.http
            .post(this.url('all'), markers, { headers: this.headers })
            .map(this.postResponse);
    }
}

