import {Component, Input} from "@angular/core";

@Component({
    selector: 'validation-message',
    templateUrl: './validation.component.html',
    styleUrls : [ './validation.component.less' ]
})

export class ValidationComponent {

    @Input() public errors : any;

}
