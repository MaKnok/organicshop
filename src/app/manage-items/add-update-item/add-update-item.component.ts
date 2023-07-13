import { AddUpdateItemService } from 'src/app/manage-items/add-update-item/add-update-item.service';
import { Component, Input, OnInit } from '@angular/core';
import { InventoryItem } from '../../models/inventory-item.model';
import { Router } from '@angular/router';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ItemExistsService } from './item-exists.service';
import { ManageItemsService } from '../manage-items.service';

@Component({
  selector: 'app-add-update-item',
  templateUrl: './add-update-item.component.html',
  styleUrls: ['./add-update-item.component.scss']
})
export class AddUpdateItemComponent implements OnInit{

  public action:string = '';
  public ADD_ITEM_TITLE = 'Adicionar itens';
  public UPDATE_ITEM_TITLE = 'Atualizar item';

  public ADD_ITEM: string = 'add-item';
  public UPDATE_ITEM: string = 'update-item';

  public categoryLabel = '';

  newItemForm!: FormGroup;
  un: string;
  kg: string;

  constructor(
    public addUpdateItemService:AddUpdateItemService,
    public manageItemsService: ManageItemsService,
    private formBuilder:FormBuilder,
    private itemExistsService:ItemExistsService,
    public router: Router
    ){
  }

  ngOnInit(): void {

    this.newItemForm = this.formBuilder.group({
      itemName:['',
                [Validators.required, Validators.minLength(3)],
                [this.itemExistsService.itemExists()]
              ],
      itemPrice:['',[Validators.required]],
      itemType:['un',[Validators.required]],
    })

    this.configureSection();

  }

  private configureSection(){
    this.categoryLabel = this.addUpdateItemService.getCatLabel();

    switch(this.addUpdateItemService.getAction()){

      case(this.ADD_ITEM):
      this.action = this.ADD_ITEM_TITLE;
      break;

      case(this.UPDATE_ITEM):
      this.action = this.UPDATE_ITEM_TITLE;
      break;

      default:
      this.action = '';

    }
  }

  addUpdateItem(){
    if(this.newItemForm.valid){
      if (this.addUpdateItemService.getAction() == this.ADD_ITEM){
        const newItem = this.newItemForm.getRawValue() as InventoryItem;
        console.log(newItem);
        this.addUpdateItemService.addItem(newItem).subscribe({
          next: () => {
            this.router.navigate(['/manage-item', { id: this.addUpdateItemService.getCatId() }]);
          },
          error: (error) => {
            console.log(error);
          },
          complete: () => console.info('Register completed!'),
          }
        )
      }else if (this.addUpdateItemService.getAction() == this.UPDATE_ITEM){
        alert('updating item');
      }
    }
  }

}
