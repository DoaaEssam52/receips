import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export function MatchFieldValidator(
  controlName: string,
  matchingControlName: string
): ValidatorFn {
  return (form: AbstractControl): ValidationErrors | null => {
    const control = form.get(controlName);
    const matchingControl = form.get(matchingControlName);

    if (
      control?.value &&
      matchingControl?.value &&
      control?.value === matchingControl?.value
    ) {
      form?.setErrors(null);

      return null;
    } else {
      const error = {
        notMatch: 'Not match.',
      };

      form?.setErrors(error);

      return error;
    }
  };
}
