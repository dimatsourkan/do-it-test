import {Injectable} from "@angular/core";
import {Http, Headers} from "@angular/http";
import {Observable} from "rxjs";
import {CanActivate, Router} from "@angular/router";
import 'rxjs/add/operator/map';
import {TokenService} from "../../Services/token.service";
import {BASE_URL} from "../../constants";


@Injectable()
export class AuthService {

    /**
     * Хедеры для отправки на сервер
     */
    headers : Headers;

    constructor(
        private http  : Http,
        private token : TokenService
    ) {
        this.headers = new Headers();
    }

    /**
     * Авторизация пользователя
     * @param data - Объект с данными авторизации { email : '', password : '' }
     * @returns {Observable<Response>}
     */
    login(data : Object): Observable<any> {
        return this.http
            .post(BASE_URL+'/auth/login', data, { headers : this.headers })
            .map(res => {
                return this.setLogin(res);
            });
    };

    registration(data : Object) {
        return this.http
            .post(BASE_URL+'/auth/registration', data, { headers : this.headers })
            .map(res => {
                return this.setLogin(res);
            });
    }

    private setLogin(res) {
        /** Установка токена **/
        this.token.setToken(res.json().token);

        /** Возвращаем результат **/
        return res.json();
    }

    /**
     * Логаут - требуется только вызвать этот метод
     * Токен для идентификации подставляется сам
     * @returns {Observable<Response>}
     */
    logout() {
        this.token.resetToken();
    }

    /**
     * Проверяет авторизован ли пользователь по наличию токена в локальном хранилище
     * @returns {Promise<boolean>}
     */
    isAuthenticated() : boolean {
        if(this.token.getToken()) {
            return true;
        }
        else {
            return false;
        }
    }
}


@Injectable()
export class NotAuthenticated implements CanActivate {

    constructor(private auth : AuthService, private router : Router) {

    }

    canActivate() : Promise<boolean> {
        return new Promise((resolve) => {
            if(this.auth.isAuthenticated()) {
                this.router.navigate(['/map']);
                return resolve(false);
            }
            return resolve(true);
        });
    }

}


@Injectable()
export class IsAuthenticated implements CanActivate {

    constructor(private auth : AuthService, private router : Router) {

    }

    canActivate() : Promise<boolean> {
        return new Promise((resolve) => {
            if(this.auth.isAuthenticated()) {
                return resolve(true);
            }
            this.router.navigate(['login']);
            return resolve(false);
        });
    }

}
