import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ManageItemsRoutingModule } from './manage-items-routing.module';
import { ManageItemsComponent } from './manage-items.component';
import { ManageItemComponent } from './manage-item/manage-item.component';
import { AddUpdateItemComponent } from './add-update-item/add-update-item.component';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [ManageItemsComponent,  ManageItemComponent, AddUpdateItemComponent],
  imports: [
    CommonModule,
    ManageItemsRoutingModule,
    ReactiveFormsModule
  ],
  exports:[ManageItemsComponent]
})
export class ManageItemsModule { }
