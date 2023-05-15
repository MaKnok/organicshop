import { Injectable } from '@angular/core';
import { AbstractControl } from '@angular/forms';
import { NewUserService } from './new-user.service';
import { first, map, switchMap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class UserExistsService {
  constructor(private newUserService: NewUserService) {}

  userExists() {
    return (control: AbstractControl) => {
      return control.valueChanges.pipe(
        switchMap((userName) =>
          this.newUserService.verifyExistingUser(userName)
        ),
        map((userExists) => (userExists ? { existingUser: true } : null)),
        first()
      );
    };
  }
}
