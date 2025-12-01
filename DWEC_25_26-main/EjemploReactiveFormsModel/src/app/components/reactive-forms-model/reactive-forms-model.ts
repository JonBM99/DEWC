import { Component } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { IUser } from '../../interfaces/iuser.interface';

@Component({
    selector: 'app-reactive-forms-model',
    imports: [ReactiveFormsModule],
    templateUrl: './reactive-forms-model.html',
    styleUrl: './reactive-forms-model.css',
})
export class ReactiveFormsModel {

    modelForm: FormGroup;
    private id: number = 0;

    constructor() {
        this.modelForm = new FormGroup({
            id: new FormControl(-1,),
            nombre: new FormControl(null, [Validators.required, Validators.minLength(3)]),
            email: new FormControl(null, [Validators.required, Validators.pattern(/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/)]),
            edad: new FormControl(null, [Validators.required, Validators.min(0), Validators.max(120)]),
            dni: new FormControl(null, [Validators.required, Validators.pattern(/^[0-9]{8}[TRWAGMYFPDXBNJZSQVHLCKE]$/)]),
            password: new FormControl(null, [Validators.required, Validators.minLength(5)]),
            repitePassword: new FormControl(null, [Validators.required, Validators.minLength(5)]),
        }, [this.passValidator]);
    }

    ngOnInit(): void {
        let user: IUser = {
            id: 3,
            nombre: 'Anuar',
            email: 'pp@gmail.com',
            edad: 41,
            dni: '72358245T',
            password: '123456',
            repitePassword: '123456'
        }

        //Opcion 1

        //this.modelForm.setValue(user);

        //Opcion 2: Puedo meter mis propios validadores al cargar, modificar los que tenia, o no cargar controles.
        this.modelForm = new FormGroup({
            id: new FormControl(-1,),
            nombre: new FormControl(user.nombre, [Validators.required, Validators.minLength(3)]),
            email: new FormControl(user.email, [Validators.required, Validators.pattern(/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/)]),
            edad: new FormControl(user.edad, [Validators.required, Validators.min(0), Validators.max(120)]),
            dni: new FormControl(user.dni, [Validators.required, Validators.pattern(/^[0-9]{8}[TRWAGMYFPDXBNJZSQVHLCKE]$/)]),
            password: new FormControl(user.password, [Validators.required, Validators.minLength(5)]),
            repitePassword: new FormControl(user.repitePassword, [Validators.required, Validators.minLength(5)]),
        }, [this.passValidator]);
    }

    getDataForm() {
        let user = this.modelForm.value as IUser;
        user.id = this.id;
        console.log(user);
        this.modelForm.reset();
        this.id++;
    }

    checkControl(formControlName: string, validator: string): boolean | undefined {
        return this.modelForm.get(formControlName)?.hasError(validator) && this.modelForm.get(formControlName)?.touched
    }

    passValidator(formValue: AbstractControl): any {
        const pass1 = formValue.get('password')?.value;
        const pass2 = formValue.get('repitePassword')?.value;

        return (pass1 != pass2) ? { 'passwordnotmatches': true } : null
    }



}
