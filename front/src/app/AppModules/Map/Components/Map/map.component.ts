import {Component, OnInit} from '@angular/core';
import {MarkerService} from "../../marker.service";
import {IMarker, Marker} from "../../marker.model";
import {MapsAPILoader} from "@agm/core";
import {PLACE_TYPES} from "../../map.constants";

@Component({
    selector: 'map',
    templateUrl: './map.component.html',
    styleUrls: [ './map.component.less' ]
})

export class MapComponent implements OnInit {

    /**
     * Координаты с центром карты
     * @type {{latitude: number; longitude: number}}
     */
    center : any = {
        lat : null,
        lng : null
    };

    /**
     * Масштаб карты по умолчанию
     * @type {number}
     */
    zoom : number = 15;

    /**
     * Массив с сохраненными маркерами
     * @type {Array}
     */
    markers : IMarker[] = [];

    /**
     * Массив с маркерами которые подлежат сохранению
     * @type {Array}
     */
    newMarkers : IMarker[] = [];

    /**
     * Указывает находится ли сохранение в процессе или нет
     * @type {boolean}
     */
    markersSaveInProcess : boolean = false;

    /**
     * Типы мест
     * @type {{GAT_STATION: string; PHARMACY: string; SCHOOL: string; RESTAURANT: string}}
     */
    PLACE_TYPES : any = PLACE_TYPES;

    /**
     * Гугл сервис для работы с местами
     */
    placeService : any;

    /**
     * Радиус поиска мест
     * @type {number}
     */
    searchRadius : number = 700;

    constructor(
        private MarkerService : MarkerService,
        private mapsApiLoader : MapsAPILoader
    ) {}

    /**
     * Загрузка сервиса гугл для построения маршрутов
     */
    loadPlacesService() {
        this.mapsApiLoader.load().then(() => {
            this.placeService = new window['google'].maps.places.PlacesService(document.createElement('div'));
        })
    }

    /**
     * Деактивирует кнопку сохранения
     */
    private deactivateSaveBtn() {
        this.markersSaveInProcess = true;
    }

    /**
     * Активирует кнопку сохранения
     */
    private activateSaveBtn() {
        this.markersSaveInProcess = false;
    }

    /**
     * Очищает массив с маркерами для сохранения
     */
    private clearNewMarkers() {
        this.newMarkers = [];
    }

    /**
     * Получает локацию текущую локацию
     */
    private getLocation() {
        this.MarkerService.getLocation((position : any) => {
            this.setCenter(position.coords.latitude, position.coords.longitude);
        });
    }

    /**
     * Устанавливает координаты для центра карты
     * @param latitude - широта
     * @param longitude - долгота
     */
    private setCenter(latitude : number, longitude : number) {
        this.center = {
            lat : latitude,
            lng : longitude
        };
    }

    /**
     * Загружает и записывает сохраненные маркеры
     */
    showSavedMarkers() {
        this.clearNewMarkers();
        this.MarkerService.query().subscribe((res : any[]) => {
            this.markers = res.map(marker => new Marker(marker));
        })
    }

    /**
     * Сохраняет массив новых маркеров
     * @returns {boolean}
     */
    saveMarkers() {
        if(!this.newMarkers.length) return false;

        this.deactivateSaveBtn();
        this.MarkerService.saveMarkers(this.newMarkers).subscribe(res => {
            this.activateSaveBtn();
            res.map(marker => {
                this.markers.push(new Marker(marker))
            });
        }, () => {
            this.deactivateSaveBtn();
        })
    }

    /**
     * Добавляет на карту новый маркер
     * @param mark
     */
    addNewMarker(mark : any) {
        this.newMarkers.push(new Marker({
            lat : mark.coords.lat,
            lng : mark.coords.lng,
        }));
    }

    /**
     * Возвращает значение активности кнопки сохранения
     * @returns {boolean}
     */
    get saveBtnIsDisabled() {
        return this.markersSaveInProcess || !this.newMarkers.length;
    }

    /**
     * Получает близлежайшие места
     * @param placeName
     */
    getPlaces(placeName : string) {
        if(!this.placeService) return false;
        this.placeService.nearbySearch({
            location : this.center,
            radius   : this.searchRadius || 500,
            type     : [placeName]
        }, (results) => {
            this.setPlaces(results);
        });

    }

    /**
     * Устанавливает маркеры с местами
     * @param places - ответ от гугл апи
     */
    setPlaces(places : any[]) {
        this.clearNewMarkers();
        this.markers = places.map(marker => new Marker({
            lat : marker.geometry.location.lat(),
            lng : marker.geometry.location.lng(),
            label : marker.name
        }));
    }

    ngOnInit() {
        this.getLocation();
        this.loadPlacesService();
    }

}