import {Injectable} from "@angular/core";
import {FormGroup} from "@angular/forms";


@Injectable()
export class ValidatorService {

    addErrorToForm(form: FormGroup, errors: any[]){

        if(!form.controls) {
            return;
        }

        errors.map( error => {

            if(form.controls[error.property]) {

                let errs = [] = [];

                for(let err in error.constraints) {
                    errs.push(error.constraints[err]);
                }

                form.controls[error.property].setErrors({ server : errs });

            }

        });

    }

}
