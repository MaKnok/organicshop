import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, map, retry, tap, throwError } from 'rxjs';
import { InventoryItem } from '../../models/inventory-item.model';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class AddUpdateItemService {
  private inventoryItem: any[];
  private url: string = environment.apiURL;

  private categoryId: string = '';
  private categoryLabel: string = '';
  private action:string = '';
  private selectedItem:InventoryItem;

  constructor(private httpClient: HttpClient) {
    this.inventoryItem = [];
  }

  /*GETTERS AND SETTERS*/

  public getSelectedItem():InventoryItem{
    return this.selectedItem;
  }

  public setSelectedItem(item:InventoryItem){
    this.selectedItem = item; 
  }

  public getCatLabel():string{
    return this.categoryLabel;
  }

  public setCatLabel(label:string){
    this.categoryLabel = label; 
  }

  public getAction():string{
    return this.action;
  }

  public setAction(action:string){
    this.action = action; 
  }

  public getCatId():string{
    return this.categoryId;
  }

  public setCatId(catId:string){
    this.categoryId = catId; 
  }

  get inventoryItems() {
    return this.inventoryItem;
  }

  
  /*HTTP SERVICES*/

  allItems(id: string): Observable<any> {
    return this.httpClient.get<InventoryItem[]>(this.url + '/' + id);
  }

  searchItems(id: string, searchedValue:any): Observable<any> {
    console.log('Searched value >>', searchedValue);
    return this.httpClient.get<InventoryItem[]>(this.url + '/' + id).pipe(
      map((items) => items.filter((item) => item.itemName.toUpperCase().
                                            includes(searchedValue.searchValue.toUpperCase()))),
      tap((items) => console.log(items)),
      catchError((err) => throwError(() => new Error(err))),
      retry(3)
    );;
  }

  addItem(inventoryItem: InventoryItem): Observable<InventoryItem> {
    this.hydrate(inventoryItem);
    return this.httpClient.post<InventoryItem>(this.url + '/' + this.getCatId(), inventoryItem);
  }

  private hydrate(inventoryItem: any) {
    inventoryItem.date = new Date();
  }

  verifyExistingItem(searchedValue: string) {
    const list = this.allItems(this.getCatId());
    const filteredList = list.pipe(
      map((items) => items.filter((item) => item.itemName.toUpperCase() === searchedValue.toUpperCase())),
      tap((items) => console.log(items)),
      catchError((err) => throwError(() => new Error(err))),
      retry(3)
    );
    console.log(filteredList);
    return filteredList
    
  }

  
  /*CLEAR ENVIRONMENT*/

  clearAddUpdateEnvironment(){
    this.inventoryItem = [];
    this.categoryId = '';
    this.categoryLabel = '';
    this.action = '';
  }

}
