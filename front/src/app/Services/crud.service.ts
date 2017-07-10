import {
    Http, Headers, URLSearchParams, Response
} from  '@angular/http';
import {Injectable} from "@angular/core";
import {Observable} from "rxjs";
import {IModel} from "../Models/base.model";
import {BASE_URL} from "../constants";

/**
 * Интерфейс реализации сервиса CRUD
 */
export interface ICrud {

    url( id : string ) : any;
    save( data : IModel ) : Observable<any>;
    query( search : URLSearchParams ) : Observable<any>;
    get( id : number|string, search : URLSearchParams ) : Observable<any>;
    update(data : IModel) : Observable<any>;
    delete(data : IModel) : Observable<any>;

}

/**
 * Абстрактный CRUD Сервис для работы с сервером
 * Его должны унаследовать все crud сервисы
 */
@Injectable()
export abstract class CRUDService<T extends IModel> implements ICrud {

    /**
     * Хедеры которые будут оправляться со всеми запросами
     */
    protected headers : Headers;

    /**
     * Урл на который круд отправляет запросы
     */
    protected crudUrl : string;


    /**
     * Инициализация
     * @param url - Строка вида 'user' по которому должен работать круд
     * @param http - Http объект для работы с сервером
     */
    constructor(url : string, protected http : Http) {

        this.headers = new Headers();

        this.setUrl(url);
        this.headers.append("Accept", 'application/json');

    }

    /**
     * Метод для установки url
     * @param url - Строка вида 'user' по которому должен работать круд
     */
    protected setUrl(url : string) {
        this.crudUrl = `${BASE_URL}/${url}`;
    }

    /**
     * Обрадотка ответа от сервера.
     * Можно преобразовать ответ до того как сервис вернет результат
     * @param res - Результат сервера
     * @returns {any}
     */
    postResponse(res: Response){
        return res.json();
    }

    /**
     * Получает запрос по которому работает урл
     * @param path - Дополнительные параметры url ('/users/23')
     * @returns {string} - Полный url для отправки запроса
     */
    url(path : number|string = '') {

        return `${this.crudUrl}/${path}`;

    }


    /**
     * GET запрос для получения списка моделей
     * @param search - Объект с данными для поиска
     * @returns {Observable<Object>}
     */
    query(search : URLSearchParams = new URLSearchParams()) : Observable<any[]> {

        return this.http
            .get(this.url(), {headers: this.headers, search})
            .map(this.postResponse);

    }

    /**
     * Получение модели по id
     * @param id - ID модели
     * @param search - Объект с данными для поиска
     * @returns {Observable<Object>}
     */
    get(id : number|string, search : URLSearchParams = new URLSearchParams()) : Observable<any> {

        return this.http
            .get(this.url(id), {headers: this.headers, search})
            .map(this.postResponse);

    }

    /**
     * Сохранение новой модели
     * @param data - Данные модели
     * @returns {Observable<Object>}
     */
    save(data : T) : Observable<any> {

        return this.http
            .post(this.url(), data, { headers: this.headers })
            .map(this.postResponse);
    }

    /**
     * Изменение существующей модели
     * @param data - Данные модели
     * @returns {Observable<Object>}
     */
    update(data : T) : Observable<any> {

        return this.http
            .put(this.url(data._id), data, { headers: this.headers })
            .map(this.postResponse);

    }

    /**
     * Удаление существующей модели
     * @param data - Данные модели
     * @returns {Observable<Object>}
     */
    delete(data : T) : Observable<any> {

        return this.http
            .delete(this.url(data._id), { headers: this.headers })
            .map(this.postResponse);

    }
}
