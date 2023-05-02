import { AddUpdateItemService } from 'src/app/manage-items/add-update-item/add-update-item.service';
import { Component, Input, OnInit } from '@angular/core';
import { InventoryItem } from '../../models/inventory-item.model';
import { Router } from '@angular/router';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ItemExistsService } from './item-exists.service';

@Component({
  selector: 'app-add-update-item',
  templateUrl: './add-update-item.component.html',
  styleUrls: ['./add-update-item.component.scss']
})
export class AddUpdateItemComponent implements OnInit{

  newItemForm!: FormGroup;
  un: string;
  kg: string;


  constructor(
    private addUpdateItemService:AddUpdateItemService,
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
