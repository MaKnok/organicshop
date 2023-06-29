import { Component, OnInit } from '@angular/core';
import { Category } from 'src/app/models/category';
import { ManageItemsService } from './manage-items.service';
import { Router } from '@angular/router';
import { Observable, Subscription } from 'rxjs';

@Component({
  selector: 'app-manage-items',
  templateUrl: './manage-items.component.html',
  styleUrls: ['./manage-items.component.scss'],
})
export class ManageItemsComponent implements OnInit {
  categories$: Observable<Category[]>;
  subscription: Subscription;

  constructor(
    private manageItemsService: ManageItemsService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.subscription = this.manageItemsService.getCategories().subscribe({
      next: (res) => {
        this.categories$ = res;
        console.log('Categories', res);
      },
      error: (error) => {
        console.log('There was an error in Categories! >>', error);
      },
      complete: () => console.info('Categories were successfully gotten!'),
    });
  }

  gotoCategory(category: Category) {
    this.router.navigate(['/manage-item', { id: category.id }]);
  }
}
