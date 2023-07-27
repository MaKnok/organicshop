import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ManageItemsRoutingModule } from './manage-items-routing.module';
import { ManageItemsComponent } from './manage-items.component';
import { ManageItemComponent } from './manage-item/manage-item.component';
import { AddUpdateItemComponent } from './add-update-item/add-update-item.component';
import { ReactiveFormsModule } from '@angular/forms';
import { FormatDirective } from '../directives/format.directive'
import { ModalComponent } from 'src/app/tools/modal/modal.component';
import { CurrencyPipe, DecimalPipe } from '@angular/common';

@NgModule({
  declarations: [ManageItemsComponent, 
                 ManageItemComponent, 
                 AddUpdateItemComponent, 
                 FormatDirective, 
                 ModalComponent],
  imports: [
    CommonModule,
    ManageItemsRoutingModule,
    ReactiveFormsModule
  ],
  exports:[ManageItemsComponent, FormatDirective, ModalComponent],
  providers: [ CurrencyPipe, DecimalPipe ],
})
export class ManageItemsModule { }
