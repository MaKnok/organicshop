import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NewUserComponent } from './new-user.component';
import { NewUserRoutingModule } from './new-user-routing.module';
import { ReactiveFormsModule } from '@angular/forms';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';

@NgModule({
  declarations: [NewUserComponent],
  imports: [
    CommonModule, 
    NewUserRoutingModule, 
    ReactiveFormsModule,
    BsDatepickerModule,
  ],
  exports: [NewUserComponent],
})
export class NewUserModule {}
