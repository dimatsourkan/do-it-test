/**
 * Created by Дмитрий on 10.07.2017.
 */

import {IModel, BaseModel} from "../../Models/base.model";

export interface IMarker extends IModel {
    lat : number;
    lng : number;
}

export class Marker extends BaseModel implements IMarker {
    lat : number;
    lng : number;

    constructor(model ?: any) {
        super(model);

        if(model) {
            this.lat = model.lat;
            this.lng = model.lng;
        }
    }
}