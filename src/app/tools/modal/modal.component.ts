import { Component, EventEmitter, Input, Output } from '@angular/core';
import { AddUpdateItemService } from 'src/app/manage-items/add-update-item/add-update-item.service'
import { InventoryItem } from 'src/app/models/inventory-item.model';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss']
})


export class ModalComponent {

  constructor(private addUpdateItemService: AddUpdateItemService) { }

  DELETE_ICON: string = 'fa fa-trash';


  statusModal: boolean = true;
  @Input() message: string;
  @Input() icon: string;
  @Input() item: InventoryItem;
  @Input() catId: string; 
  @Output() changedModal = new EventEmitter()

  yesAnswer(){
    switch(this.icon){
      case this.DELETE_ICON:
        console.log('Item >>', this.item);
        this.addUpdateItemService.setCatId(this.catId);
        this.addUpdateItemService.deleteItem(this.item).subscribe({
            next: () => {
              this.closeModal();
            },
            error: (error) => {
              console.log(error);
            },
            complete: () => console.info('Item was deleted!'),
            })
        ;
        break;
      default:
        this.closeModal();
    }
    this.closeModal();
  }

  closeModal(){
    this.statusModal = false
    this.changedModal.emit(this.statusModal)
  }

 

}
