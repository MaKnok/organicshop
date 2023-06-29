import { InventoryItem } from '../../models/inventory-item.model';
import { Component, OnInit } from '@angular/core';
import { AddUpdateItemService } from '../add-update-item/add-update-item.service';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { Observable, Subscription } from 'rxjs';

@Component({
  selector: 'app-manage-item',
  templateUrl: './manage-item.component.html',
  styleUrls: ['./manage-item.component.scss'],
})
export class ManageItemComponent implements OnInit {
  inventoryItems$: Observable<InventoryItem[]>;
  subscription: Subscription;
  categoryId: string = '';

  constructor(
    private addUpdateItemService: AddUpdateItemService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit() {
    this.checkCategory();
    this.provideList();
  }

  ngDoCheck() {
    this.checkCategory();
    this.provideList();
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
        },
        error: (error) => {
          console.log('There was an error in Add Update List! >>', error);
        },
        complete: () => console.info('Categories were successfully gotten!'),
      });
  }
}
