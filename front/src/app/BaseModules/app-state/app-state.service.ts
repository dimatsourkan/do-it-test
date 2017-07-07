import {Injectable} from "@angular/core";

@Injectable()
export class AppState {

    private ready: boolean;
    private resolve: Function;
    private promise: Promise<boolean>;

    constructor(){

        this.ready = false;
        this.promise = new Promise(resolve => this.resolve = resolve)

    }

    makeReady(){
        this.ready = true;
        this.resolve(this.ready);

    }

    getPromise(){

        return this.promise;

    }
}
