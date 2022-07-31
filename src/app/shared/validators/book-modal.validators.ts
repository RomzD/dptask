import { AbstractControl, ValidationErrors, ValidatorFn, Validators } from "@angular/forms";

function NumberValidator(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
        const numbsersOnly = /^\d+$/.test(control.value);
        return !numbsersOnly ? { fail: { value: control.value } } : null;
    };
}
export const validators = {
    number: [Validators.required, NumberValidator()],
    string: [Validators.required]
}