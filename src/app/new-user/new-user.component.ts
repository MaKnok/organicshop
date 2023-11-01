import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { confirmPasswordValidator } from './confirm-password.validator';
import { User } from '../models/user.model';
import { NewUserService } from './new-user.service';
import { UserExistsService } from './user-exists.service';
import { userPasswordEqualValidator } from './user-password-equal.validator';
import { passwordStrenghtValidator } from './password-strength.validator';
import { ModalService } from '../tools/modal/modal.service';

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
    private router: Router,
    public modalService: ModalService
  ) {}

  modalMessage: string;
  modalIcon: string;
  modalType: string; 

  ADDED_USER_MESSAGE: string = 'Usuário adicionado com sucesso!'; 
  SUCCESS_ICON: string = 'fa fa-check';

  ngOnInit(): void {
    this.newUserForm = this.formBuilder.group(
      {
        userName: [
          '',
          [Validators.required],
          [this.userExistsService.userExists()],
        ],
        userEmail: ['', [Validators.required, Validators.email],  
                        [this.userExistsService.emailExists()]],
        userPassword: ['', [Validators.required, passwordStrenghtValidator]],
        userPasswordConfirm: ['', [confirmPasswordValidator]],//password strength
        userFullName: ['', [Validators.required]],
        userBirthday: ['', [Validators.required]],
        userSegment: ['', [Validators.required]],
        userRole: ['', [Validators.required]],
      },
      {
        validators: [userPasswordEqualValidator, confirmPasswordValidator, passwordStrenghtValidator],
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
      } as User;
      console.log(newUser);

      this.newUserService.registerNewUser(newUser).subscribe({
        next: (response) => {
          console.log('API Response:', response);
          this.onModalChangeUserWasAdded(true);
        },
        error: (error) => {
          console.log(error);
        },
        complete: () => console.info('Register completed!'),
      });
    }
  }

  onModalChangeUserWasAdded(event: boolean) {
    this.modalMessage = this.ADDED_USER_MESSAGE;
    this.modalIcon = this.SUCCESS_ICON;
    this.modalType = "ok";
    this.modalService.openModal = event;
    console.log('this.modalService.openModal >>>', this.modalService.openModal )
  }

}
