
export interface IModel {
    id : number|string;
}

export class BaseModel implements IModel {
    id : number|string;
    constructor(model ?: IModel) {
        this.addData(model);
    }

    addData(model : IModel) {

        if(!model.id) {
            return
        }

        this.id = model.id;
    }
}