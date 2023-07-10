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

  constructor(private httpClient: HttpClient) {
    this.inventoryItem = [];
  }

  get inventoryItems() {
    return this.inventoryItem;
  }

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
    return this.httpClient.post<InventoryItem>(this.url, inventoryItem);
  }

  private hydrate(inventoryItem: any) {
    inventoryItem.date = new Date();
  }

  verifyExistingItem(itemName: string) {
    return this.httpClient.get(
      `http://localhost:3000/inventoryItems/exists/${itemName}`
    );
  }
}
