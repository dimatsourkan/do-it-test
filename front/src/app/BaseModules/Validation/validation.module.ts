import {NgModule} from '@angular/core';
import {ValidationComponent} from "./validation.component";
import {FormsModule} from "@angular/forms";
import {CommonModule} from "@angular/common";
import {ValidatorService} from "./validation.service";

@NgModule({
    imports: [
        CommonModule,
        FormsModule
    ],
    providers: [
        ValidatorService
    ],
    declarations: [
        ValidationComponent
    ],
    exports: [
        ValidationComponent
    ]
})

export class ValidationModule{}
