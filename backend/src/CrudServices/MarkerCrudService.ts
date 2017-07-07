import {BaseCrudService, IBaseCrudService} from "../BaseClasses/BaseCrudService";
import {IMarker, Marker} from "../Models/MarkerModel";
/**
 * Интерфейс сервиса для работы с маркерами
 */
export interface IMarkerCrudService extends IBaseCrudService<IMarker> {
    create(marker : IMarker) : Promise<any>;
}

/**
 * Сервис для работы с маркерами
 */
export class MarkerCrudService extends BaseCrudService<IMarker> implements IMarkerCrudService {

    protected Entity = Marker;

    protected fillable : string[] = [
        'lat',
        'lng'
    ];
}