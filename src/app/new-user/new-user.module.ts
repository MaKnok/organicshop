import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NewUserComponent } from './new-user.component';
import { NewUserRoutingModule } from './new-user-routing.module';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [NewUserComponent],
  imports: [CommonModule, NewUserRoutingModule, ReactiveFormsModule],
  exports: [NewUserComponent],
})
export class NewUserModule {}
