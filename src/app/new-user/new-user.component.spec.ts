import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { NewUserComponent } from './new-user.component';
import { NewUserService } from './new-user.service';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators, AbstractControl, AsyncValidatorFn, ValidationErrors  } from '@angular/forms';
import { confirmPasswordValidator } from './confirm-password.validator';
import { UserExistsService } from './user-exists.service';
import { userPasswordEqualValidator } from './user-password-equal.validator';
import { passwordStrenghtValidator } from './password-strength.validator';
import { ageValidator } from './age.validator';
import { ModalService } from '../tools/modal/modal.service';
import { of } from 'rxjs';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { By } from '@angular/platform-browser';
import { RouterTestingModule } from '@angular/router/testing';
import { Router } from '@angular/router';

describe(NewUserComponent.name, () => {
  let component: NewUserComponent;
  let fixture: ComponentFixture<NewUserComponent>;
  let newUserService: jasmine.SpyObj<NewUserService>;
  let formBuilder: FormBuilder;
  let router: Router;

  const userExistsSpy = jasmine.createSpy('userExists').and.callFake(() => {
    return (control: AbstractControl) => {
      return of(null); // Simulate async operation, return appropriate ValidationErrors if needed
    };
  });

  const emailExistsSpy = jasmine.createSpy('emailExists').and.callFake(() => {
    return (control: AbstractControl) => {
      return of(null); // Simulate async operation, return appropriate ValidationErrors if needed
    };
  });

  const userExistsServiceMock = jasmine.createSpyObj('UserExistsService', {
    userExists: userExistsSpy,
    emailExists: emailExistsSpy
  });


  beforeEach(async () => {

    const newUserServiceSpy = jasmine.createSpyObj('NewUserService', ['registerNewUser']);

    await TestBed.configureTestingModule({
      declarations: [ NewUserComponent ],
      providers: [ NewUserService, 
                   UserExistsService,
                   FormBuilder,
                  { provide: NewUserService, useValue: newUserServiceSpy },
                  { provide: UserExistsService, useValue: userExistsServiceMock },
                    ],
      imports: [ HttpClientModule,ReactiveFormsModule,RouterTestingModule ],
      schemas: [NO_ERRORS_SCHEMA]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NewUserComponent);
    component = fixture.componentInstance;
    router = TestBed.inject(Router);
    newUserService = TestBed.inject(NewUserService) as jasmine.SpyObj<NewUserService>;
    formBuilder = TestBed.inject(FormBuilder);

    component.newUserForm = formBuilder.group({
      userName: [
        'Test User Name',
        [Validators.required],
        [userExistsSpy()]
      ],
      userEmail: ['testemail@test.com', [Validators.required, Validators.email],  
        [emailExistsSpy()]],
      userPassword: ['123#Test', [Validators.required, passwordStrenghtValidator]],
      userPasswordConfirm: ['123#Test', [confirmPasswordValidator]], // password strength
      userFullName: ['User Test Name', [Validators.required]],
      userBirthday: ['1990-01-01', [Validators.required, ageValidator(18)]],
      userSegment: ['TI', [Validators.required]],
      userRole: ['Desenvolvedor Fullstack', [Validators.required]],
    }, {
      validators: [userPasswordEqualValidator, confirmPasswordValidator, passwordStrenghtValidator],
      //whole form validator
    });

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should disable submit button when form is invalid', () => {
    // Simulate form validation by setting an invalid form state
    component.newUserForm.controls['userName'].setValue(''); // Set an invalid value
    component.newUserForm.controls['userName'].markAsTouched(); // Mark field as touched

    fixture.detectChanges();

    const submitButton = fixture.debugElement.query(By.css('button[type=submit]')).nativeElement;
    expect(submitButton.disabled).toBeTruthy();
  });


  it('should clear the form when the clear button is clicked', () => {

    const birthday = new Date('1990-01-01');

    component.newUserForm.controls['userName'].setAsyncValidators(null);
    component.newUserForm.controls['userEmail'].setAsyncValidators(null);

    component.newUserForm.setValue({
      userName: 'initialUserName',
      userEmail: 'initialUserEmail@example.com',
      userPassword: 'password#123',
      userPasswordConfirm: 'password#123',
      userFullName: 'Full User Name',
      userBirthday: birthday,
      userSegment: 'IT',
      userRole: 'Fullstack Developer'
      // Set values for other form controls as needed
    },
    { emitEvent: false }
    );

    // Trigger click event on the clear button
    const clearButton = fixture.debugElement.query(By.css('button[type=reset]')).nativeElement;
    clearButton.click();

    // Expect form controls to be reset to their initial state
    expect(component.newUserForm.value).toEqual({
      userName: null,
      userEmail: null,
      userPassword: null,
      userPasswordConfirm: null,
      userFullName: null,
      userBirthday: null,
      userSegment: null,
      userRole: null
      // Expect other form controls to be null as well
    });
  });

  it(`${NewUserComponent.prototype.registerNewUser.name} should register a new user`, async () => {

    component.newUserForm.controls['userName'].setAsyncValidators(null);
    component.newUserForm.controls['userEmail'].setAsyncValidators(null);

    component.newUserForm.setValue({
      userName: 'Test User Name',
      userEmail: 'testemail@test.com',
      userPassword: '123#Test',
      userPasswordConfirm: '123#Test',
      userFullName: 'User Test Name',
      userBirthday: '1990-01-01',
      userSegment: 'TI',
      userRole: 'Desenvolvedor Fullstack'
    }, 
    { emitEvent: false }
    );

    const birthday = new Date('1990-01-01');

    const response = {
      userName: 'Test User Name', 
      userEmail: 'testemail@test.com', 
      userPassword: '65e8ad9785213b1dfc4d8c1adb32e11d036b8b7a70c844732d…30089b0df8fb2961a5acb49d6WdBFt+KsgmW/hjbKG1UeqA==', 
      userFullName: 'User Test Name', 
      userBirthday: birthday,
      userSegment: "TI",
      userRole: "Desenvolvedor Fullstack",
    }

    newUserService.registerNewUser.and.returnValue(of(response));

    component.registerNewUser();

    fixture.detectChanges();
    await fixture.whenStable();

    expect(newUserService.registerNewUser).toHaveBeenCalledWith(jasmine.objectContaining({
      userName: 'Test User Name',
      userEmail: 'testemail@test.com',
      userPassword: '123#Test',
      userFullName: 'User Test Name',
      userBirthday: '1990-01-01',
      userSegment: 'TI',
      userRole: 'Desenvolvedor Fullstack'
    }));


  })

  it('should navigate to home page when the router link is clicked', () => {
    const navigateSpy = spyOn(router, 'navigateByUrl').and.stub();
  
    fixture.detectChanges();
  
    const loginLink = fixture.debugElement.query(By.css('a'));
  
    if (loginLink) {
      loginLink.nativeElement.click();
  
      expect(navigateSpy).toHaveBeenCalledTimes(1); // Ensure navigateByUrl is called exactly once
      expect(navigateSpy).toHaveBeenCalledWith(jasmine.stringMatching('/'), jasmine.anything());
    } else {
      fail('Login link not found');
    }
  });


});