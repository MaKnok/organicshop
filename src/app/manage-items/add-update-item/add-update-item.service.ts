import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { InventoryItem } from '../../models/inventory-item.model';

@Injectable({
  providedIn: 'root'
})
export class AddUpdateItemService {

  private inventoryItem: any[];
  private url = "http://localhost:3000/inventoryItems";

  constructor(private httpClient: HttpClient) {
    this.inventoryItem = [];
  }

  get inventoryItems(){
    return this.inventoryItem;
  }

  allItems(): Observable<InventoryItem[]>{
    return this.httpClient.get<InventoryItem[]>(this.url);
  }

  addItem(inventoryItem: InventoryItem): Observable<InventoryItem>{
    this.hydrate(inventoryItem);
    return this.httpClient.post<InventoryItem>(this.url, inventoryItem)
  }

  private hydrate(inventoryItem: any){
    inventoryItem.date = new Date();
  }

  verifyExistingItem(itemName:string){
    return this.httpClient.get(`http://localhost:3000/inventoryItems/exists/${itemName}`)
  }

}
