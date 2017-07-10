import {Component, OnInit} from '@angular/core';
import {MarkerService} from "../../marker.service";
import {IMarker, Marker} from "../../marker.model";

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
        latitude : null,
        longitude : null
    };

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

    constructor(
        private MarkerService : MarkerService
    ) {}

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
            latitude : latitude,
            longitude : longitude
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
            this.clearNewMarkers();
            this.markers.concat(res.map(marker => {
                this.markers.push(new Marker(marker));
            }));
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

    ngOnInit() {
        this.getLocation();
    }

}