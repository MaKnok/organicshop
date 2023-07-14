import { InventoryItem } from '../../models/inventory-item.model';
import { Component, OnInit } from '@angular/core';
import { AddUpdateItemService } from '../add-update-item/add-update-item.service';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { Observable, Subscription, catchError, filter, map, retry, tap, throwError } from 'rxjs';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-manage-item',
  templateUrl: './manage-item.component.html',
  styleUrls: ['./manage-item.component.scss'],
})
export class ManageItemComponent implements OnInit {
  inventoryItems$: Observable<InventoryItem[]>;
  subscription: Subscription;
  categoryId: string = '';
  selectedItem:InventoryItem;

  searchItemForm!: FormGroup;

  constructor(
    private addUpdateItemService: AddUpdateItemService,
    private route: ActivatedRoute,
    private router: Router, 
    private formBuilder:FormBuilder,
  ) {}

  ngOnInit() {
    this.checkCategory();
    this.provideList();

    this.searchItemForm = this.formBuilder.group({
      searchValue:['',
                   [Validators.required],
                  ],
    })
  }

  ngDoCheck(){
    let id = this.categoryId;
    this.checkCategory();
    if (id !== this.categoryId){
      this.provideList();
    } 
  }

  private checkCategory() {
    this.categoryId = this.route.snapshot.paramMap.get('id');
    console.log('Category Id >>>', this.categoryId);
  }

  private provideList() {
    this.subscription = this.addUpdateItemService
      .allItems(this.categoryId)
      .subscribe({
        next: (res) => {
          console.table(res);
          this.inventoryItems$ = res;
          this.selectedItem = res[0];
          this.addUpdateItemService.setSelectedItem(res[0]);
        },
        error: (error) => {
          console.log('There was an error in Add Update List! >>', error);
        },
        complete: () => console.info('Categories were successfully gotten!'),
      });
  }

  public searchItem(){
    if(this.searchItemForm.valid){
      let searchedItem = this.searchItemForm.getRawValue();
      searchedItem = searchedItem;
      this.subscription = this.addUpdateItemService
      .searchItems(this.categoryId,searchedItem)
      .subscribe({
        next: (res) => {
          console.table(res);
          console.log(res);
          this.inventoryItems$ = res;
        },
        error: (error) => {
          console.log('There was an error in Add Update List! >>', error);
        },
        complete: () => console.info('Items were successfully gotten!'),
      });
    }
  }

  public selectItem(item:InventoryItem ){
    this.selectedItem = item;
    this.addUpdateItemService.setSelectedItem(item);
    console.log('Item Id >>', this.selectedItem);
  }

  public addItem(categoryId:string){
    this.router.navigated = false;
    this.router.navigate(['/add-update-item']);
    this.addUpdateItemService.setCatId(categoryId);
    this.addUpdateItemService.setAction('add-item');
  }

  public editItem(categoryId:string, itemId:InventoryItem ){
    this.router.navigated = false;
    this.router.navigate(['/add-update-item']);
    this.addUpdateItemService.setCatId(categoryId);
    this.addUpdateItemService.setAction('update-item');
  }

  public deleteItem(categoryId:string, itemId:InventoryItem ){
    confirm('Deseja mesmo excluir esse item?');
  }

}
