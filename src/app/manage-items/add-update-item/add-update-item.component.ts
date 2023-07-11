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

  private ADD_ITEM: string = 'add-item';
  private UPDATE_ITEM: string = 'update-item';

  public categoryLabel = '';

  newItemForm!: FormGroup;
  un: string;
  kg: string;

  constructor(
    public addUpdateItemService:AddUpdateItemService,
    public manageItemsService: ManageItemsService,
    private formBuilder:FormBuilder,
    private itemExistsService:ItemExistsService){
  }

  ngOnInit(): void {

    this.newItemForm = this.formBuilder.group({
      itemName:['',
                [Validators.required, Validators.minLength(3)],
                [this.itemExistsService.itemExists()]
              ],
      itemPrice:['',[Validators.required]],
      itemType:new FormControl(this.un),
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

  addItem(){
    if(this.newItemForm.valid){
      const newItem = this.newItemForm.getRawValue() as InventoryItem;
      this.addUpdateItemService.addItem(newItem).subscribe(()=>{
        alert('Cadastrado com sucesso!')
      },
      (error) =>{
        console.log(error);
      }
      )
    }
  }

}
