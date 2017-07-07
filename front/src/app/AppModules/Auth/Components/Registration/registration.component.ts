import { Component } from '@angular/core';
import {FormControl, FormGroup} from "@angular/forms";
import {AuthService} from "../../../../BaseModules/auth/auth.service";

@Component({
    selector: 'registration',
    templateUrl: './registration.component.html',
    styleUrls: [ './registration.component.less' ]
})

export class RegistrationComponent {

    form : FormGroup;

    constructor(
        private auth : AuthService,
    ) {

        this.form = new FormGroup({
            name : new FormControl(''),
            pass : new FormControl('')
        });

    }

    register() {
        this.auth.login(this.form.value).subscribe(res => {
            console.log(res);
        });
    }
}