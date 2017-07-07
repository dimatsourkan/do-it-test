import {Injectable} from "@angular/core";
import {ConnectionBackend, RequestOptions, RequestOptionsArgs, Http, Response} from "@angular/http";
import {Observable} from "rxjs";
import {TokenService} from "../../Services/token.service";
import 'rxjs/add/operator/map';

@Injectable()
export class AppHttpService extends Http {

    protected token : TokenService;

    constructor(
        _backend          : ConnectionBackend,
        _defaultOptions   : RequestOptions
    ) {
        super(_backend, _defaultOptions);

        this.token = new TokenService();
    }

    /**
     * Функция добавляет токен в хедер
     * @param options
     */
    private setAccessHeader(options?: RequestOptionsArgs) {

        this.token.addToHeader(options.headers);

    }

    /**
     * Функция добавляет хередеры перед отправкой запроса
     * @param options
     */
    private modifyHeaders(options?: RequestOptionsArgs){

        if(options && options.headers){
            options.headers.set('X-Requested-With', 'XMLHttpRequest');
            options.headers.set('Accept', 'application/json');
            this.setAccessHeader(options);
        }

    }


    get(url: string, options?: RequestOptionsArgs): Observable<Response> {

        this.modifyHeaders(options);
        return super.get(url, options)
            .catch(error => this.errorHandler(error));
    }

    post(url: string, body: any, options?: RequestOptionsArgs): Observable<Response> {

        this.modifyHeaders(options);
        return super.post(url, body, options)
            .catch(error => this.errorHandler(error));
    }

    put(url: string, body: any, options?: RequestOptionsArgs): Observable<Response> {

        this.modifyHeaders(options);
        return super.put(url, body, options)
            .catch(error => this.errorHandler(error));
    }

    delete(url: string, options?: RequestOptionsArgs): Observable<Response> {

        this.modifyHeaders(options);
        return super.delete(url, options)
            .catch(error => this.errorHandler(error));
    }

    private errorHandler(error: Response){
        return Observable.throw(error.json());
    }
}
