
export interface IModel {
    _id : number|string;
}

export class BaseModel implements IModel {
    _id : number|string;
    constructor(model ?: any) {
        if(model) {
            this._id = model._id;
        }
    }
}