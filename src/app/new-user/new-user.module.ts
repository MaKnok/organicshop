import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NewUserComponent } from './new-user.component';
import { NewUserRoutingModule } from './new-user-routing.module';

@NgModule({
  declarations: [NewUserComponent],
  imports: [CommonModule, NewUserRoutingModule],
  exports: [NewUserComponent],
})
export class NewUserModule {}
