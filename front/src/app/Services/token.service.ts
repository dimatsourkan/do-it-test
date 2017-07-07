import {Injectable} from "@angular/core";
import {Headers} from "@angular/http";

@Injectable()
export class TokenService {

    private TOKEN_KEY : string = 'token';

    /**
     * Установка токена
     * @param token - Строка с токеном
     */
    setToken(token : string) {
        localStorage.setItem(this.TOKEN_KEY, token);
    }

    /**
     * Получить текущий токен
     */
    getToken() {
        return localStorage.getItem(this.TOKEN_KEY);
    }

    static token() {
        return localStorage.getItem('token');
    }

    /**
     * Удалить токен
     */
    resetToken() {
        localStorage.removeItem(this.TOKEN_KEY);
    }

    /**
     * Добавить токен в хедеры запросов
     * @param headers
     */
    addToHeader(headers: Headers) {
        headers.set('authorization', this.getToken());
    }

}
