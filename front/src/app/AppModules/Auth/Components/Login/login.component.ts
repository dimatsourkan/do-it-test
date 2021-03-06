import { Component } from '@angular/core';
import {AuthService} from "../../../../BaseModules/auth/auth.service";
import {FormControl, FormGroup} from "@angular/forms";
import {Router} from "@angular/router";

@Component({
    selector: 'login',
    templateUrl: './login.component.html',
    styleUrls: [ './login.component.less' ]
})

export class LoginComponent {

    form  : FormGroup;

    error : string;

    constructor(
        private auth : AuthService,
        private router : Router,
    ) {

        this.form = new FormGroup({
            name : new FormControl(''),
            pass : new FormControl('')
        });

    }

    login() {
        this.error = '';
        this.auth.login(this.form.value).subscribe(() => {
            this.router.navigate(['map']);
        }, err => {
            this.error = err.message;
        });
    }
}