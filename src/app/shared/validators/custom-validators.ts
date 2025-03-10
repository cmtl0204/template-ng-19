import {AbstractControl, Validators} from '@angular/forms';
import {AuthHttpService} from "@core/services";
import {map} from "rxjs/operators";

export class CustomValidators {
  static required({value}: AbstractControl): boolean {
    if (value)
      return value.hasValidator(Validators.required);
    else
      return false;
  }

  static passwordMatchValidator(control: AbstractControl) {
    const passwordNew: string |undefined= control.get('passwordNew')?.value;
    const passwordConfirmation: string|undefined = control.get('passwordConfirmation')?.value;

    if (passwordNew !== passwordConfirmation) {
      control.get('passwordConfirmation')?.setErrors({noPasswordMatch: true});
      return { noPasswordMatch: true };
    } else {
      control.get('passwordConfirmation')?.setErrors(null);
      return null;
    }
  }

  static verifyUser(authHttpService: AuthHttpService) {
    return (control: AbstractControl) => {
      const value = control.value;
      return authHttpService.verifyUser(value)
        .pipe(
          map(response => {
            return response.data === null ? null : {userNotAvailable: true};
          })
        )
    };
  }

  static validateUser(authHttpService: AuthHttpService) {
    return (control: AbstractControl) => {
      const value = control.value;
      return authHttpService.verifyUser(value)
        .pipe(
          map(response => {
            return response.data === null ? null : {userAvailable: true};
          })
        )
    };
  }

  static verifyEmail(authHttpService: AuthHttpService) {
    return (control: AbstractControl) => {
      const value = control.value;
      return authHttpService.verifyEmail(value)
        .pipe(
          map(response => {
            return response.data === null ? null : {emailNotAvailable: true};
          })
        )
    };
  }

  static verifyPhone(authHttpService: AuthHttpService) {
    return (control: AbstractControl) => {
      const value = control.value;
      return authHttpService.verifyPhone(value)
        .pipe(
          map(response => {
            return response.data === null ? null : {phoneNotAvailable: true};
          })
        )
    };
  }
}
