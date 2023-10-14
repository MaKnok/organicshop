import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { confirmPasswordValidator } from './confirm-password.validator';
import { NewUser } from './new-user';
import { NewUserService } from './new-user.service';
import { UserExistsService } from './user-exists.service';
import { userPasswordEqualValidator } from './user-password-equal.validator';

@Component({
  selector: 'app-new-user',
  templateUrl: './new-user.component.html',
  styleUrls: ['./new-user.component.scss'],
})
export class NewUserComponent implements OnInit {
  newUserForm!: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private newUserService: NewUserService,
    private userExistsService: UserExistsService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.newUserForm = this.formBuilder.group(
      {
        userName: [
          '',
          [Validators.required],
          //[this.userExistsService.userExists()],
        ],
        userEmail: ['', [Validators.required, Validators.email]],
        userPassword: ['', [Validators.required]],
        userPasswordConfirm: ['', [confirmPasswordValidator]],
        userFullName: ['', [Validators.required]],
        userBirthday: ['', [Validators.required]],
        userSegment: ['', [Validators.required]],
        userRole: ['', [Validators.required]],
      },
      {
        validators: [userPasswordEqualValidator, confirmPasswordValidator],
        //whole form validator
      }
    );
  }

  public registerNewUser() {
    if (this.newUserForm.valid) {
      //const newUser = this.newUserForm.getRawValue() as NewUser;
      const username = this.newUserForm.get('userName').value;
      const useremail = this.newUserForm.get('userEmail').value;
      const userpassword = this.newUserForm.get('userPassword').value;
      const userfullname = this.newUserForm.get('userFullName').value;
      const userbirthday = this.newUserForm.get('userBirthday').value;
      const usersegment = this.newUserForm.get('userSegment').value;
      const userrole = this.newUserForm.get('userRole').value;

      let newUser = {
        userName: username,
        userEmail: useremail,
        userPassword: userpassword,
        userFullName: userfullname, 
        userBirthday: userbirthday,
        userSegment: usersegment,
        userRole: userrole, 
      } as NewUser;
      console.log(newUser);

      this.newUserService.registerNewUser(newUser).subscribe({
        next: (response) => {
          console.log('API Response:', response);
          this.router.navigate(['']);
        },
        error: (error) => {
          console.log(error);
        },
        complete: () => console.info('Register completed!'),
      });
    }
  }
}
