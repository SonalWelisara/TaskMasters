import { Injectable } from '@angular/core';
import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export const emailRegex: RegExp =
  /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
export const phoneRegex: RegExp = /^\+?[0-9]+$/;

@Injectable({
  providedIn: 'root',
})
export class ValidationService {
  constructor() {}

  validEmail(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      if (!control.value) {
        return null;
      }
      const regex = new RegExp(emailRegex);
      const valid = regex.test(control.value);
      return valid ? null : { invalidEmailFormat: true };
    };
  }

  validPhone(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      if (!control.value) {
        return null;
      }
      const regex = new RegExp(phoneRegex);
      const valid = regex.test(control.value);
      return valid ? null : { invalidPhoneNumberFormat: true };
    };
  }
}
