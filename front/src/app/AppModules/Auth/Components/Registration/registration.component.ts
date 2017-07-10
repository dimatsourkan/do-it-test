import { Component } from '@angular/core';
import {FormControl, FormGroup} from "@angular/forms";
import {AuthService} from "../../../../BaseModules/auth/auth.service";
import {ValidatorService} from "../../../../BaseModules/Validation/validation.service";
import {Router} from "@angular/router";

@Component({
    selector: 'registration',
    templateUrl: './registration.component.html',
    styleUrls: [ './registration.component.less' ]
})

export class RegistrationComponent {

    form : FormGroup;

    constructor(
        private auth      : AuthService,
        private router    : Router,
        private validator : ValidatorService
    ) {

        this.form = new FormGroup({
            name : new FormControl(''),
            pass : new FormControl('')
        });

    }

    registration() {
        this.auth.registration(this.form.value).subscribe(() => {
            this.router.navigate(['map']);
        }, err => {
            this.validator.addErrorToForm(this.form, err);
        });
    }
}