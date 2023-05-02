import { InventoryItem } from '../../models/inventory-item.model';
import { Component, OnInit } from '@angular/core';
import { AddUpdateItemService } from '../add-update-item/add-update-item.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-manage-item',
  templateUrl: './manage-item.component.html',
  styleUrls: ['./manage-item.component.scss']
})
export class ManageItemComponent implements OnInit{

  inventoryItems: any[];

  constructor(private addUpdateItemService: AddUpdateItemService,
              private router: Router) {}

  ngOnInit(){
    this.addUpdateItemService.allItems().subscribe((inventoryItems: InventoryItem[]) => {
      console.table(inventoryItems);
      this.inventoryItems = inventoryItems;
    })
  }

}
